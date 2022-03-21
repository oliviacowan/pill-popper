const { response } = require('express');
const express = require('express')
const router = require('express').Router();

module.exports = (db) => {
  //get list of children
  router.get('/:userId/children', (req, res) => {
    db.query(
      `SELECT * FROM children
      WHERE user_id = $1;`, [Number(req.params.userId)]
    ).then(({rows: children}) => {
      res.json(
        children.reduce((prev, curr) =>({
          ...prev, [curr.id]: curr
        }), {})
      );
    }); 
  });

  //add child
  router.post('/:userId/children/new', (req, res) => {
    const userId = Number(req.params.userId);
    const { name, avatar } = req.body;
    db.query(
      `INSERT INTO children (name, user_id, avatar_url)
      VALUES ($1, $2, $3);`, [name, userId, avatar]
    ).then(()=> { res.send({ status: 'good' }) });
  });
  return router;
}