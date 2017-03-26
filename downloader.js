const YoutubeMp3Downloader = require.main.require('./ytcore');
const path = require("path");
var Downloader = function(window) {

    var self = this;
    self.mainWindow = window;

    //Configure YoutubeMp3Downloader with your settings `
    console.log(path.join(__dirname, "ffmpeg"));
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/Users/florentcardoen/Desktop/electube/ffmpeg",        // Where is the FFmpeg binary located?
        "outputPath": '/Users/florentcardoen/Desktop/electube/mp3/',    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 1000                 // How long should be the interval of the progress reports
    });


    self.YD.on("finished", function(error, data) {
        self.mainWindow.webContents.send("finished", error, data);

    });
    self.YD.on("progress", function(progress){
        console.log("Vid id : "+ progress.videoId +" Progress : " + progress.progress.percentage);
        self.mainWindow.webContents.send("progress", progress);
    });
    self.YD.on("error", function(error, data) {

        console.error(error + " on videoId " + data.videoId);
        self.mainWindow.webContents.send("error", error, data);

    });
    self.YD.on("queueSize", function(size) {
        console.log(size);
        self.mainWindow.webContents.send("queueSize", size);
    });
};

Downloader.prototype.getMP3 = function(track){
    var self = this;

    // Register callback 
//    self.callbacks[track.videoId] = callback;
//    self.callbacks_progress[track.videoId] = progress_callback;
    // Trigger download 
    self.YD.download(track.videoId, track.name);

}

module.exports = Downloader;