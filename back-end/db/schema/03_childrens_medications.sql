
DROP TABLE IF EXISTS childrens_medications CASCADE;

CREATE TABLE childrens_medications (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  with_food BOOLEAN DEFAULT false,
  limit INTEGER  NOT NULL DEFAULT 0,
  dose SMALLINT NOT NULL DEFAULT 0,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  child_id INTEGER REFERENCES children(id),
  UNIQUE (child_id)
);
