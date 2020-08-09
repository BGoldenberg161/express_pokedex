const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // check for errors
  try {
    //if no errors, get data, render favorites
    const faveData = await db.pokemon.findAll()
    res.render('favorites', {pokemon: faveData})
  } catch (err) { 
    console.log('Error:', err)
  }
  // render favorites with pokemon table
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // check for errors
  try {
    // if no errirs, create new(if doesn't already exist)
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    // load favorites page
    res.redirect('/pokemon')
  } catch (err){ 
    console.log('Error:', err) // render error
  }
})

// Delete pokemon from favorites
router.delete('/', async (req, res) => {
  try {
    await db.pokemon.destroy({
      where: {
        name: req.body.name
      }
    })
    res.redirect('/pokemon')
  } catch (err){ 
    console.log('Error:', err) // render error
  }
})

//get details(show)
router.get('/:name', async (req, res) => {
  try {
    if (req.params.name) {
      const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`
      const result = await axios.get(pokeUrl)
      let pokemonData = result.data
      res.render('detail', {pokedata: pokemonData})
    }
  } catch (err) { 
    console.log('Error:', err) // render error
  }
})



module.exports = router;
