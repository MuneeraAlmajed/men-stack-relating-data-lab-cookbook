const User = require('../models/user');
const Recipe = require('../models/recipe');

const index = async(req,res)=>{
    try{
        const users = await User.find({});

        res.locals.users = users;

        res.render('users/index.ejs')

    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

const show = async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const recipes = await Recipe.find({ owner: req.params.userId });

        res.locals.user = user;
        res.locals.recipes = recipes;

        res.render('users/show.ejs');

    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

module.exports = {index, show, }