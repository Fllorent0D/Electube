var expect = require('chai').expect;
var PrettifyTime = require('../src/PrettifyTime.js');

describe("Convert duration to seconds", function() {

  it("Return undefined if invalid value is entered", function() {
    expect(PrettifyTime.durationToSeconds(200).totalSeconds).to.equal(undefined);
  });

  it("Take in 1h and return 3600s", function() {
    expect(PrettifyTime.durationToSeconds("1h").totalSeconds).to.equal(3600);
  });

  it("Take in 1h 30m and return 5400", function() {
    expect(PrettifyTime.durationToSeconds("1h 30m").totalSeconds).to.equal(5400);
  });

  it("Supports comma fractions take in 1,5h and return 5400", function() {
    expect(PrettifyTime.durationToSeconds("1,5h").totalSeconds).to.equal(5400);
  });

  it("Supports dot fraction take in 1.5h", function() {
    expect(PrettifyTime.durationToSeconds("1.5h").totalSeconds).to.equal(5400);
  });

  it("Default value is hours, 1.5 will return 5400", function() {
    expect(PrettifyTime.durationToSeconds("1.5").totalSeconds).to.equal(5400);
  });

  it(".5h turns into 0.5h", function() {
    expect(PrettifyTime.durationToSeconds(".5h").totalSeconds).to.equal(1800);
  });

  it(".5 turns into 1800", function() {
    expect(PrettifyTime.durationToSeconds(".5").totalSeconds).to.equal(1800);
  });

  it("Take in -1h 30m and return -5400s", function() {
    expect(PrettifyTime.durationToSeconds("-1h 30m").totalSeconds).to.equal(-5400);
  });

  it("Take in 1 3600s", function() {
    expect(PrettifyTime.durationToSeconds("1").totalSeconds).to.equal(3600);
  });

  it("1m 30s turns into 90s", function() {
    expect(PrettifyTime.durationToSeconds("1m 30s").totalSeconds).to.equal(90);
  });

  it("1m 35s turns into 95s", function() {
    expect(PrettifyTime.durationToSeconds("1m 35s").totalSeconds).to.equal(95);
  });

  it("Take in 1h 0m and return 3600s", function() {
    expect(PrettifyTime.durationToSeconds("1h 0m").totalSeconds).to.equal(3600);
  });

});
