const { default: axios } = require('axios');

const router = require('express').Router();

module.exports = (db) => {

  router.get('/:fdaId', (req, res) => {
    const fdaId = req.params.fdaId;
    console.log('here');
    axios.get(`https://api.fda.gov/drug/label.json?search=id:${fdaId}`)
    .then(results => {
      res.json(results.data.results)
    })
  });

  return router;
}