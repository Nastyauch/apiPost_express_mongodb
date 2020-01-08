const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const {ensureAuthenticated} = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render("addOrEditPost", {
       title: "Посты"         
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req,res);
});

insertRecord = (req, res) => {
    let post = new Post();
    post.title = req.body.title;
    post.categories = req.body.categories;
    post.content = req.body.content;
    post.save((err, doc) => {
        if (!err)
            res.redirect('post/list');
        else {
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEditPost", {post: req.body})   
            }
            else
                console.log('Error: ' + err);
        }
    });
}

updateRecord = (req, res) => {
    Post.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err,doc) => {
        if(!err) {
            res.redirect('post/list');
        }
        else {
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addOrEditPost", {post: req.body})
            }
            else 
               console.log('Error: ' + err);
        }
    });
}

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            case 'categories':
                body['categoriesError'] = err.errors[field].message;
                break;
            case 'content':
                body['contentError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/list', ensureAuthenticated, (req, res) => {
    Post.find((err, docs) => {
        if (!err) {
            res.render("list", {
                posts:docs,
                //name: req.user.name
            })
        }
    })
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("addOrEditPost", {post: doc})
        }
    });
});
router.get('/:id', ensureAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("viewOnePost", {post: doc})
        }
    });
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/post/list');
        }
        else 
            console.log('Error: ' + err);
    })
})
module.exports = router;