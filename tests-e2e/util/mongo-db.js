var mongoose = require('mongoose');
require('../../env');

module.exports.connection = {
    get: get
}

module.exports.model = {
    removeAll: removeAll
}

/**
 * Connects Mongoose
 */
function get() {

    if (mongoose.connection.db) {
        console.log('ja tem conexao ***');
        return;
    } else {
        mongoose.connect(
                process.env.MONGOOSE_URI_TEST, {
                    user: process.env.MONGOOSE_USER_TEST,
                    pass: process.env.MONGOOSE_PASS_TEST
                });

        mongoose.connection.on('connected', function () {
            //console.log('Mongoose default connection open to ' + process.env.MONGOOSE_URI_TEST);
        });

        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        mongoose.connection.on('disconnected', function (obj) {
            //console.log('Mongoose default connection disconnected');
        });
        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            //mongoose.connection.close(function () {
            //    console.log('Mongoose default connection disconnected through app termination');
            //    process.exit(0);
            //});
        });
    }
}

/**
 * Remove all documents from collection
 * @param {Schema} model
 * @param {Function} [fn] - Callback
 */
function removeAll(model, fn) {
    model.remove({}, function (err, model) {
        if (err) {
            throw new Error('Erro ao remover: ' + err);
        }
        if (typeof fn === 'function') {
            fn();
        }

    });
}
