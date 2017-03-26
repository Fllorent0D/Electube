// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require("electron").ipcRenderer;
const psize = require('pretty-size');
const time = require('prettify-time');
const win = require("electron").remote.getCurrentWindow();
let fitWindowSizeToContent = () => {
    let currentsize = win.getSize();
    if($(".list-group").height() <= 800)
    win.setContentSize(currentsize[0], $(".list-group").height() + 70, true);
};

$(()=>{
   fitWindowSizeToContent();
});
$("#download").click(event =>{
    ipc.send('playlist', $("#url").val());
});
ipc.on("progress",(event, status)=>{

/*
    {
        "videoId": "xh0ctVznxdM",
        "progress": {
        "percentage": 76.81,
            "transferred": 5619680,
            "length": "7315910",
            "remaining": 1696230,
            "eta": 3,
            "runtime": 8,
            "delta": 1834992,
            "speed": 661138.82
          }
    }
*/  $(`#summary #speed`).text(psize(status.progress.speed /10, true) + "/s");
    $(`li[id=${status.videoId}] progress`).attr("value", status.progress.percentage);
    $(`li[id=${status.videoId}] #info`).text(`${psize(status.progress.transferred /10, true)}/${psize(status.progress.length/10, true)} | Temps restant : ${time.secondsToDuration(status.progress.eta, ["m", "s"], false).totalTime}`);

});
ipc.on("finished", (event, error, data)=>{
    $(`li[id=${data.videoId}] strong`).text(`${data.artist} - ${data.title}`);
    $(`li[id=${data.videoId}] progress`).remove();
    fitWindowSizeToContent();

    console.log(error);
console.log(data);
/*
 "videoId": "xh0ctVznxdM",
 "file": "/path/to/mp3/folder/Winter By CyberSDF.mp3",
 "youtubeUrl": "http://www.youtube.com/watch?v=xh0ctVznxdM",
 "videoTitle": "Winter By CyberSDF ( Genre : Ambient ) Creative Commons",
 "artist": "Unknown",
 "title": "Winter By CyberSDF ( Genre : Ambient ) Creative Commons",
 "stats": {
 "transferred": 7315910,
 "runtime": 9,
 "averageSpeed": 713747.31
 }

 */

});
ipc.on("queueSize", (event, arg)=>{
    $(`#summary #queue`).text(arg + " actifs");

    console.log(arg) ;
});
ipc.on("new-download", (event, idVideo)=>{

    let li = $("<li>",{
        id:idVideo,
        class:"list-group-item"
    });
    let img = $("<img>", {
        class:"media-object pull-left",
        width:32,
        heigth:32
    });
    let mediabody = $("<div>", {
        class:"media-body"
    });
    let title = $("<strong>", {
        text:idVideo,
        style:"display:block"
    });
    let progress = $("<progress>",{
        max:100
    });

    let text = $("<p>",{
        id:"info"
    });
    li.append(img);
    mediabody.append(title);
    mediabody.append(progress);
    mediabody.append(text);
    li.append(mediabody);

    $("#downloads").append(li);
    fitWindowSizeToContent();
});
