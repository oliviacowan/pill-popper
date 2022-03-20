const router = require ('express').Router();

module.exports = (db) => {
  console.log('Inside children routes function')
  //get list of children
  router.get('/', (req, res) => {
    const userId = Number(req.params.id);
    db.query(
      `SELECT * FROM children
      JOIN users
      ON users.id = users_id
      WHERE user.id =$1;`, [userId]
    ).then(({rows: children}) => {
      res.json(
        children.reduce((prev, curr) =>({
          ...prev, [current.id]: current
        }), {})
      );
    }); 
  });

  //add child
  router.post('/new', (req, res) => {
    const userId = Number(req.params.id);
    const { name, avatar } = req.body.name;
    db.query(
      `INSERT INTO children (name, user_id)
      VALUES ($1, $2);`, [newChild, avatar]
    );
  });
  return router;
}