const { default: axios } = require('axios');

const router = require('express').Router();

module.exports = (db) => {

  router.get('/search/generic/:term', (req, res) => {
    const searchTerm = req.params.term
    const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            resObj[result.id] = result.openfda.generic_name
          })
          res.json(resObj);
        })
      .catch((err) => { console.log("There has been an error: ", err) });
  });

  router.get('/search/brand/:term', (req, res) => {
    const searchTerm = req.params.term
    const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            resObj[result.id] = result.openfda.generic_name
          })
          res.json(resObj);
        })
        .catch((err) => { console.log("There has been an error: ", err) });
  });

  router.get('/:fdaId', (req, res) => {
    const fdaId = req.params.fdaId;
    axios.get(`https://api.fda.gov/drug/label.json?search=id:${fdaId}`)
    .then(results => {
      res.json(results.data.results)
    })
  });

  return router;
}