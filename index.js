//-----------------------------------------------------
//
// Author: Daeren
// Site: 666.io
//
//-----------------------------------------------------

"use strict";

//-----------------------------------------------------

const fs          = require("fs");
const {Writable}  = require("stream");

const pump        = require("pump"),
      split       = require("split"),
      map         = require("map-stream");

//-----------------------------------------------------

const defSplitter = /\r?\n/;

//-----------------------------------------------------

class Wait extends Writable {
    constructor(options, callback) {
        super(options);
        this.callback = callback;
    }

    _write(chunk, encoding, done) {
        this.callback(chunk, done);
    }
}

//-----------------------------------------------------

function readFile(file, filter, iterator, splitter) {
    let index = 0;

    //---------]>

    if(typeof(iterator) != "function" && typeof(filter) === "function") {
        splitter = iterator;
        iterator = filter;
        filter = null;
    }

    //---------]>

    return new Promise(function(resolve, reject) {
        const stack = [
            fs.createReadStream(file),
            split(splitter || defSplitter)
        ];

        if(filter) {
            stack.push(map(filter));
        }

        stack.push(
            wait(function(data, next) {
                iterator(data.toString(), index++, next);
            }),
            function(e) {
                if(e) {
                    reject(e);
                }
                else {
                    resolve(index);
                }
            }
        )

        pump.apply(pump, stack);
    });
}

function wait(callback, options) {
    return new Wait(options, callback);
}

//-----------------------------------------------------

module.exports = readFile;