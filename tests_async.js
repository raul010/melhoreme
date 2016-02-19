/**
 * Created by raul on 03/02/16.
 */

var async = require('async');
var _ = require('lodash')
var moment = require('moment');

async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    // result now equals 'done'
});
function myFirstFunction(callback) {
    console.log('first');


    callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    console.log('second');
    console.log(arg1);
    console.log(arg2);
    callback(null, 'three');
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    console.log('third');
    console.log(arg1);
    callback(null, 'done');
}