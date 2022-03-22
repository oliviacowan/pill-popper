const router = require('express').Router();

module.exports = (db) => {
  
  router.get('/:id/medications', (req, res) => {
    userId = Number(req.params.id);
    db.query(
      `SELECT children.name AS child_name,
      children.id AS child_id,
      childrens_medications.*,
      times.time AS time 
      FROM childrens_medications
      JOIN Children
      ON children.id = child_id
      JOIN users
      ON users.id = user_id
      JOIN times
      ON childrens_medications.id = childrens_medications_id
      WHERE users.id = $1
      ORDER BY time;`, [userId]
    ).then((response) => {
      res.json(response.rows);
    }).catch((err) => { console.log('There has been an ERROR: ', err) });
  });

  return router;
}