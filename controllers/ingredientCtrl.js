const express = require('express');
const Ingredient = require('../models/ingredient');
const User = require('../models/user')

const index = async(req,res)=>{
    try{
        const ingredients = await Ingredient.find();

        res.locals.ingredients = ingredients;

        res.render('ingredients/index.ejs')

    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const newIng = async(req,res)=>{
    try{
        res.render('ingredients/new.ejs')

    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const createIng = async(req,res)=>{
    try{
    await Ingredient.create(req.body);

    res.redirect('/ingredients');
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const showIng = async(req,res)=>{
    try{
    const ingredient = await Ingredient.findById(req.params.ingredientId);

    res.locals.ingredient = ingredient;
    res.render('ingredients/show.ejs')

    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}

const deleteIng = async(req,res)=>{
    try{
    const ingredient = await Ingredient.findById(req.params.ingredientId);

    await ingredient.deleteOne();
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
}

module.exports = {index,newIng,createIng,showIng,deleteIng};
