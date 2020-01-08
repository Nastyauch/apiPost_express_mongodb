const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is requried'
    },
    categories: {
        type: String,
        required: 'This field is requried'
    },
    content: {
        type: String,
        required: 'This field is requried'
    }                                     
});

mongoose.model('Post', postSchema);