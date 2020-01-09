const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@apicluster-qsbz5.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: false}, (err) => {
    if (!err) {console.log('MongoDB connection Succeeded')}
    else {console.log('Error in DB connection: ' + err)}
});
require('./models/posts');
require('./models/users');