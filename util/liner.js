/*jslint node:true,nomen: true*/
'use strict';

/** Line chunker from http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/ */
var stream = require('stream');
var liner = new stream.Transform({objectMode: true});

liner._transform = function (chunk, encoding, done) {
  var data = chunk.toString(), lines;
  if (this._lastLineData) {
    data = this._lastLineData + data;
  }
  
  lines = data.split('\n');
  this._lastLineData = lines.splice(lines.length - 1, 1)[0];
  
  lines.forEach(this.push.bind(this));
  done();
};

liner._flush = function (done) {
  if (this._lastLineData) {
    this.push(this._lastLineData);
  }
  this._lastLineData = null;
  done();
};
/** end line chunker */

module.exports = {
  liner: liner
};
