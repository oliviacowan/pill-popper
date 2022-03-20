const router = require ('express').router();

module.exports = (db) => {

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
    const newChild = req.body.name;
    db.query(
      `INSERT INTO children (name, user_id)
      VALUES ($1, $2);`, [newChild, ]
    );
  });

}