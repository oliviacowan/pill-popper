const { response } = require('express');
const express = require('express');
const router = require('express').Router();

module.exports = (db) => {
  router.get('/:childId', (req, res) => {
    db.query(
      `SELECT * FROM childrens_medications
      JOIN times ON childrens_medications.id = childrens_medications_id
      WHERE child_id = $1::integer
      ORDER BY time
      ;`, [Number(req.params.childId)] 
    ).then(({ rows: medication }) => { res.json(medication) });
  });

  router.post('/:childId/new', (req, res) => {
    childId = Number(req.params.childId);
    const { dose, name, with_food, start_date} = req.body;

    db.query(
      `INSERT INTO childrens_medications 
      (child_id, name, dose, with_food, start_date)
      Values ($1, $2, $3, $4, $5);`, [childId, name, dose, with_food, start_date]
      );
  });

  router.put('/:med_id/edit', (req, res) => {
    const { dose, name, with_food } = req.body;

    db.query(
      `UPDATE childrens_medications
      SET name = $1,
      with_food = $2,
      dose = $3
      WHERE id = $4;`, [name, with_food, dose, req.params.med_id]
      );
  });

  router.delete('/:medId/delete', (req, res) => {
    db.query(
      `DELETE FROM childrens_medications
      WHERE id = $1::integer`, [req.params.medId]
    )
  });

  return router;
}