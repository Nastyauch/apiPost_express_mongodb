const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostDB', {useNewUrlParser: true}, (err) => {
    if (!err) {console.log('NomgoDB connection Succeeded 27017')}
    else {console.log('Error in DB connection: ' + err)}
});
require('./models/posts');
require('./models/users');
//let MongoClient = require('mongodb').MongoClient;
//
//let state = {
//    db: null
//};
//
//exports.connect = function (url, done) {
//    if (state.db) {
//        return done();
//    }
//    
//    MongoClient.connect(url, function (err, db) {
//        if (err) {
//            return done(err);
//        }
//        state.db = db;
//        done();
//    })
//}
// exports.get = function () {
//     return state.db;
// }