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

router.get('/:id', async(req,res) => {
  const { id } = req.params;

  try{
    const account = await db('accounts').where( { id }).first();
    if(account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req,res) => {
  const accountData = req.body;

  try {
    const account = await db.insert(accountData).into('accounts');
    res.status(201).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to add account', error:err });
  }
});

router.put('/:id', async (req,res) => {
  const { id } = req.params;
  const changes = req.body;

  db('accounts').where({ id }).update(changes)
    .then(count => {
      if(count) {
        res.status(200).json({ update: count });
      } else {
        res.status(404).json({ message: 'There is no account that matches that ID' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to update account' });
    });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try{
    const deleteAccount = await db.del().from('accounts').where({ id })
    if(deleteAccount) {
    res.status(200).json({ deleted: deleteAccount});
  } else {
    res.status(404).json ({ message: "There is no account with that ID" });
  }
} catch (err) {
  res.status(500).json({ message: 'Database Error'});
}
});

module.exports = router;
