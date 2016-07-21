'use strict';

/**
 * lei-stream
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const fs = require('fs');
const stream = require('../');
const should = require('should');

describe('ReadLineStream', function () {

  it('#1 autoNext=false', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/json_small.txt')));
    s.on('data', function (data) {
      counter++;
      s.next();
    });
    s.on('end', function () {
      counter.should.equal(93);
      done();
    });

  });

  it('#2 autoNext=true', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/json_small.txt')), {
      autoNext: true
    });
    s.on('data', function (data) {
      counter++;
    });
    s.on('end', function () {
      counter.should.equal(93);
      done();
    });

  });

  it('#3 big file, autoNext=false', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/json_big.txt')));
    s.on('data', function (data) {
      counter++;
      s.next();
    });
    s.on('end', function () {
      counter.should.equal(7627);
      done();
    });

  });

  it('#4 big file, autoNext=true', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/json_big.txt')), {
      autoNext: true
    });
    s.on('data', function (data) {
      counter++;
    });
    s.on('end', function () {
      counter.should.equal(7627);
      done();
    });

  });

    it('#5 big number file, autoNext=false', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/number_big.txt')));
    s.on('data', function (data) {
      counter++;
      s.next();
    });
    s.on('end', function () {
      counter.should.equal(1000000);
      done();
    });

  });

  it('#6 big number file, autoNext=true', function (done) {

    let counter = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/number_big.txt')), {
      autoNext: true
    });
    s.on('data', function (data) {
      counter++;
    });
    s.on('end', function () {
      counter.should.equal(1000000);
      done();
    });

  });

  it('#7 autoNext=true, custom encoding', function (done) {

    let counter = 0;
    let counter2 = 0;
    const s = stream.readLine(fs.createReadStream(path.resolve(__dirname, 'files/json_small.txt')), {
      autoNext: true,
      encoding: function (str) {
        counter2++;
        return str;
      }
    });
    s.on('data', function (data) {
      counter++;
    });
    s.on('end', function () {
      counter.should.equal(93);
      counter2.should.equal(93);
      done();
    });

  });

  it('#8 filename', function (done) {

    let counter = 0;
    const s = stream.readLine(path.resolve(__dirname, 'files/json_small.txt'));
    s.on('data', function (data) {
      counter++;
      s.next();
    });
    s.on('end', function () {
      counter.should.equal(93);
      done();
    });

  });

  it('#9 simple', function (done) {

    let counter = 0;
    stream.readLine(path.resolve(__dirname, 'files/json_small.txt')).go(function (data, next) {
      counter++;
      next();
    }, function () {
      counter.should.equal(93);
      done();
    });

  });

  it('#9 simple - error', function (done) {

    let counter = 0;
    stream.readLine(path.resolve(__dirname, 'files/json_small.txt.not_exists')).go(function (data, next) {
      counter++;
      next();
    }, function (err) {
      err.code.should.equal('ENOENT');
      done();
    });

  });

});