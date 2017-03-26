# prettify-time
[ ![Codeship Status for arnireynir/prettify-time](https://codeship.com/projects/fcf26af0-f28d-0133-1d88-521033f49c46/status?branch=master)](https://codeship.com/projects/149505)
[![coverage](https://codecov.io/gh/arnireynir/prettify-time/branch/version2/graph/badge.svg)](https://codecov.io/gh/arnireynir/prettify-time)


[![NPM](https://nodei.co/npm/prettify-time.png)](https://nodei.co/npm/prettify-time/)

## Description
 Converts seconds into human readable text,


     PrettifyTime.duration(3600) // Returns "1h"
     PrettifyTime.duration(5400) // Return "1h 30m"
 ...more to come

## Install
    npm i prettify-time

## Usages
    Type:
      seconds: number,
      units: array


## API
    PrettifyTime
      displayZeroValues: Default is false.

        .duration(seconds, units, displayZeroValues);

        Type:
            seconds: number,
            units: Array containg any of these options ['h','m', 's']. Default is ['h','m']
            displayZeroValues: boolean // Default false

## Examples
    // ES6
    import PrettifyTime from 'prettify-time';

    var PrettifyTime = require('prettify-time');

    PrettifyTime.duration(3600); // Returns "1h"
    PrettifyTime.duration(3600, ['h','m','s'], true); // Returns "1h 0m 0s"
    PrettifyTime.duration(3600, ['h','m','s']); // Returns "1h"
    PrettifyTime.duration(-3600); // Returns "-1h"


    For more examples you look at the tests.
