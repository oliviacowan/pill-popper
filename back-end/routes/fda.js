const { default: axios } = require('axios');

const router = require('express').Router();

module.exports = (db) => {

  router.get('/search/generic/:term', (req, res) => {
    const searchTerm = req.params.term
    const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            console.log('Generic');
            resObj[result.id] = result.openfda.generic_name
          })
          res.json(resObj);
        })
      .catch(() => { console.log("ERRROOOOORRR!") });
  });

  router.get('/search/brand/:term', (req, res) => {
    const searchTerm = req.params.term
    const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            console.log('brand');
            resObj[result.id] = result.openfda.generic_name
          })
          res.json(resObj);
        })
      .catch(() => { console.log("ERRROOOOORRR!") });
  });

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