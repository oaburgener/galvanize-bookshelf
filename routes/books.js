'use strict';
const knex = require('../knex.js')
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/books', (req,res,next) => {
  return knex('books').select('id', 'title', 'author', 'genre', 'description', 'cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt').orderBy('title')
  .then((data) => res.status(200).send(data))
})

router.get('/books/:id', (req,res,next) => {
  let id = req.params.id
  return knex('books').where('id', id).first('id', 'title', 'author', 'genre', 'description', 'cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt')
  .then((result) => res.status(200).send(result))
})

router.post('/books', (req,res,next) => {
  return knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })

  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'description',  'id'])
  .then((data) => res.status(200).send(data[0]))

})

router.patch('/books/:id', (req,res,next) => {
  return knex('books')
  .update({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })

  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'description',  'id'])
  .then((data) => res.status(200).send(data[0]))
})

router.delete('/books/:id', (req,res,next) => {
  let id = req.params.id
  return knex('books').where('books.id', id).del().returning(['title', 'author', 'genre', 'description', 'cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt'])
  .then((data) => res.status(200).send(data[0]))
})


module.exports = router;
