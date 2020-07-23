const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req,res) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "error retreiving accounts", err});
  }
});

module.exports = router;
