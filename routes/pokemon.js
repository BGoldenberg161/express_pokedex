const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const faveData = await db.pokemon.findAll()
    res.render('favorites', {pokemon: faveData})
  } catch (err) { 
    console.log('Error:', err)
  }
  // render favorites with pokemon table
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    await db.pokemon.findOrCreate({
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
    if (req.params && req.params.name) {
      const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`
      const result = await axios.get(pokeUrl)
      let pokemonData = result.data
      res.render('detail', {pokedata: pokemonData})
    }
  } catch (err) { 
    console.log('Error:', err) // render error
  }
})
// Delete /pokemon - receive the name of a pokemon and add it to the database
router.delete('/', async (req, res) => {
  try {
    await db.pokemon.destroy({
      where: {
        name: req.body.name,
      }
    })
    res.redirect('/pokemon')
  } catch (err){ 
    console.log('Error:', err) // render error
  }
})

module.exports = router;
