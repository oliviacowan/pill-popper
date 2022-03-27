const { response } = require('express');
const express = require('express');
const router = require('express').Router();

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    db.query(
      `SELECT childrens_medications.*, ARRAY[times.time] AS times
      FROM childrens_medications
      JOIN times ON childrens_medications.id = childrens_medications_id
      WHERE childrens_medications.id = $1::integer
      GROUP BY childrens_medications.id, time;`, [Number(req.params.id)] 
    ).then(({ rows: medication }) => { setTimeout(() => { res.json(medication)} , 3000) }) 
    .catch(err => console.log('There has been an ERROR: ', err));
  })

  router.post('/:childId/new', (req, res) => {
    childId = Number(req.params.childId);
    const { dose, name, with_food, start_date, end_date, fda_id, times } = req.body;
    console.log("FDAID: ", fda_id);
    db.query(
      `INSERT INTO childrens_medications 
      (child_id, name, dose, with_food, end_date, fda_id)
      Values ($1, $2, $3, $4, $5, $6)
      RETURNING id;`, [childId, name, dose, with_food, end_date, fda_id]
      ).then((response)=> {
         const medId = response.rows[0].id;
          Promise.all(
            times.map((time) => {
              db.query(
                `INSERT INTO times
                (time, childrens_medications_id)
                VALUES ($1, $2);`, [time, medId]
              )
            })
          ).then(() => {
            setTimeout(() => { res.send({ status: "good" }) }, 3000)
          }).catch(err => console.log('There has been an ERROR: ', err));
        }).catch(err => console.log('There has been an ERROR: ', err));
  });

  router.put('/:med_id/edit', (req, res) => {
    const { dose, name, with_food, text_message, times } = req.body;
    const medId = req.params.med_id;
    console.log(times);
    Promise.all([
      db.query(
        `DELETE FROM times
        WHERE childrens_medications_id = $1;`, [medId]
        ),
      db.query(
        `UPDATE childrens_medications
        SET name = $1,
        with_food = $2,
        dose = $3,
        text_message = $4,
        WHERE id = $5;`, [name, with_food, dose, text_message, medId]
        )
    ]).then(() => {
      Promise.all([
        times.map((time) => {
          db.query(
            `INSERT INTO times
            (time, childrens_medications_id)
            VALUES ($1, $2);`, [time, medId]
          )
        })
      ]).then(() => { setTimeout(() => { res.send({ status: "good"}) },3000) });
    }).catch((err) => { console.log('There was an ERROR: ', err) });
  });

  router.delete('/:medId/delete', (req, res) => {
    db.query(
      `DELETE FROM childrens_medications
      WHERE id = $1::integer`, [req.params.medId]
    ).then(()=> { setTimeout(() => { res.send({ status: "good" }) }, 3000) })
  });

  return router;
}

