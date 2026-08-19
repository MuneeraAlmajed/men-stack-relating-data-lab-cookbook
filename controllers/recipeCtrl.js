const express = require('express');
const Recipe = require('../models/recipe');
const User = require('../models/user')

const index = async(req,res)=>{
    try{
        const recipes = await Recipe.find({
            owner: req.session.user._id,
        })
        
        res.locals.recipes = recipes;

        res.render('recipes/index.ejs');

    }catch(err){
        console.log(err);
        res.redirect('/');
        }
}

const newRecipe = async(req,res)=>{
    try{
        res.render('recipes/new.ejs');
    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

const createRecipe = async(req,res)=>{
    try{
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();

    res.redirect('/recipes');
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    res.locals.recipe = recipe;

    res.render('recipes/show.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    await recipe.deleteOne();

    res.redirect('/recipes');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

const editRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    res.locals.recipe = recipe;

    res.render('recipes/edit.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const updateRecipe = async(req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId);

        recipe.name = req.body.name;
        recipe.instructions = req.body.instructions;

        await recipe.save();

        res.redirect(`/recipes/${recipe._id}`);

    }catch(err){
        console.log(err)
        res.redirect('/');
        }
}






module.exports = {index, newRecipe, createRecipe,show,deleteRecipe,editRecipe,updateRecipe};
