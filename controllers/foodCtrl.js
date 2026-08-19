const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

const index = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.locals.pantry = user.pantry;
    res.locals.user = user;

    res.render('foods/index.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const food = user.pantry.id(req.params.itemsId);

    res.locals.food = food;
    res.locals.user = user;

    res.render('foods/show.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newItem = async(req,res)=>{
    try{
        res.render('foods/new.ejs')
    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

const create =async(req,res)=>{
    try{
        const food = await User.findById(req.session.user._id);
        food.pantry.push(req.body);
        
        await food.save();

res.redirect(`/users/${food._id}/foods`);    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

const deleteItem = async(req,res)=>{
    try{
        const food = await User.findById(req.session.user._id);
        food.pantry.id(req.params.itemId).deleteOne();

        await food.save();
        res.redirect(`/users/${req.session.user._id}/foods`);

    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

const editItem = async(req,res)=>{
    try{
        const user = await User.findById(req.session.user._id);
        const food = user.pantry.id(req.params.itemId);

        res.locals.food = food;

        res.render('foods/edit.ejs');
    }catch(err){
        console.log(err);
        res.redirect('/');
    }

}

const updateItem = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    const food = user.pantry.id(req.params.itemId);

    food.set(req.body);

    await user.save();

    res.redirect(`/users/${user._id}/foods/${food._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
};


module.exports = {
    newItem, create, show, index, deleteItem, editItem, updateItem,
};