var expect = require('chai').expect;
var PrettifyTime = require('../src/PrettifyTime.js');

describe('Conver seconds secondsToDuration to string both negative and positve time', () => {

  it('Should return "0h" as default zero', () => {
    expect(PrettifyTime.secondsToDuration(-0).totalTime).to.equal('0h');
    expect(PrettifyTime.secondsToDuration(0).totalTime).to.equal('0h');
  });

  it('Should return "1h" from 3600 seconds', () => {
    expect(PrettifyTime.secondsToDuration(-3600).totalTime).to.equal('-1h');
    expect(PrettifyTime.secondsToDuration(3600).totalTime).to.equal('1h');
  });

  it('Should return "30m" from 1800 seconds', () => {
    expect(PrettifyTime.secondsToDuration(-1800).totalTime).to.equal('-30m');
    expect(PrettifyTime.secondsToDuration(1800).totalTime).to.equal('30m');
  });

  it('Should return "1h 30m" from 5400 seconds', () => {
    expect(PrettifyTime.secondsToDuration(-5400).totalTime).to.equal('-1h 30m');
    expect(PrettifyTime.secondsToDuration(5400).totalTime).to.equal('1h 30m');
  });

  it('Should return "24h 16m" from 87360 seconds', () => {
    expect(PrettifyTime.secondsToDuration(-87360).totalTime).to.equal('-24h 16m');
    expect(PrettifyTime.secondsToDuration(87360).totalTime).to.equal('24h 16m');
  });

  it('Should return undefined invalid value entered', () => {
    expect(PrettifyTime.secondsToDuration("ABC").totalTime).to.equal("0h");
  });

});

describe('Time unit support.', () => {

  it('Should return lowest default value as "0h" ', () => {
    expect(PrettifyTime.secondsToDuration(0).totalTime).to.equal('0h');
  });

  it('Should return only hours', () => {
    var units = ['h'];
    expect(PrettifyTime.secondsToDuration(3700, units).totalTime).to.equal('1h');
  });

  it('Should return only hours and seconds', () => {
    var units = ['h', 's'];
    expect(PrettifyTime.secondsToDuration(3720, units).totalTime).to.equal('1h 120s');
  });

  it('Should return only hours and minutes', () => {
    var units = ['h', 'm'];
    expect(PrettifyTime.secondsToDuration(3720, units).totalTime).to.equal('1h 2m');
  });

  it('Should return default hours and minutes', () => {
    var units = ['h', 'm'];
    expect(PrettifyTime.secondsToDuration(3900, units).totalTime).to.equal('1h 5m');
  });

  it('Should return hours, minutes, seconds', () => {
    var units = ['h', 'm', 's'];
    expect(PrettifyTime.secondsToDuration(3999, units).totalTime).to.equal('1h 6m 39s');
  });

});

describe('Display units with displayZeroValues flag', () => {
    it('Display zero values default OFF', () => {
      var units = ['h', 'm', 's'];
      expect(PrettifyTime.secondsToDuration(3600, units).totalTime).to.equal('1h');
    });

    it('Display zero values with hours,minues,seconds 1h 0m 0s', () => {
      var units = ['h', 'm', 's'];
      expect(PrettifyTime.secondsToDuration(3600, units, true).totalTime).to.equal('1h 0m 0s');
    });

    it('Display zero values with hours,minues,seconds 1h 0m 6s', () => {
      var units = ['h', 'm', 's'];
      expect(PrettifyTime.secondsToDuration(3606, units, true).totalTime).to.equal('1h 0m 6s');
    });

    it('Display zero values with hours,minues 1h 0m', () => {
      var units = ['m'];
      expect(PrettifyTime.secondsToDuration(0, units, true).totalTime).to.equal('0m');
    });

});
