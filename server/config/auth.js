/**
 * Created by raul on 06/11/15.
 */

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1664340757147626', // your App ID
        'clientSecret'  : 'a057ef78137483fb8f401362eba64de3', // your App Secret
        'callbackURL'   : 'https://localhost:3000/auth/facebook/callback'
    }

    //'twitterAuth' : {
    //    'consumerKey'       : 'your-consumer-key-here',
    //    'consumerSecret'    : 'your-client-secret-here',
    //    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    //},
    //
    //'googleAuth' : {
    //    'clientID'      : 'your-secret-clientID-here',
    //    'clientSecret'  : 'your-client-secret-here',
    //    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    //}

};
