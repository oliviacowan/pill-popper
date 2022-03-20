const { response } = require('express');

const router = require('express').Router();

module.export = (db) => {
  router.get('/', (req, res) => {
    childId = Number(req.params.id);
    db.query(
      `SELECT medications.* FROM medications
      JOIN children ON children.id = child_id
      WHERE children.id = $1::integer;`, [childId] 
    ).then(({rows: medication}) => response.json(medication));
  });

  router.post('/new', (req, res) => {
    childId = Number(req.params.id);
    const { interval, dose, medication_name, with_food } = req.body.medication;

    db.query(
      `INSERT INTO childrens_medications 
      (child_id, interval, dose, medication_name, with_food)
      Values ($1, $2, $3);`, [interval, dose, medication_name, with_food]
      );
  });

  router.put('/:med_id/edit', (req, res) => {
    const { interval, dose, medication_name, with_food } = req.body.medication;

    db.query(
      `UPDATE childrens_medications
      SET interval = $1,
      does = $2
      medication_name = $3
      with_food = $4
      WHERE id = $5::interger`, [interval, dose, medication_name, with_food, req.params.med_id]
      );
  });

  router.delete('/:med_id/delete', (req, res) => {
    db.query(
      `DELETE FROM childerns-medications
      WHERE id = $1::integer`, [req.params.med_id]
    )
  })
}