
DROP TABLE IF EXISTS childrens_medications CASCADE;

CREATE TABLE childrens_medications (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  with_food BOOLEAN DEFAULT false,
  dose SMALLINT NOT NULL DEFAULT 0,
  start_date NOW(),
  end_date DATETIME OR NULL,
  child_id INTEGER REFERENCES children(id)
);
