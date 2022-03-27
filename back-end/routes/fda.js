const { default: axios } = require('axios');

const router = require('express').Router();

module.exports = (db) => {

  router.get('/:fdaId', (req, res) => {
    const fdaId = req.params.fdaId;
    axios.get(`https://api.fda.gov/drug/label.json?search=id:${fdaId}`)
    .then(results => console.log(results))
  });

  return router;
}