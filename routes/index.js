const express = require('express')
const router = express.Router()

const db = require('./../helpers/Database')
const test = require('./../helpers/Model').test

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/test/:id', async (req, res, next) => {
  let t = await test(req.params.id)  
  res.render('test', { test: t })
})

router.get('/wipe', async (req, res, next) => {
  await db.createTables()
  await db.populate()
  res.redirect('/')
})

module.exports = router;
