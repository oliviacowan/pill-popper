
DROP TABLE IF EXISTS times CASCADE;

CREATE TABLE times (
  id SERIAL PRIMARY KEY NOT NULL,
  time VARCHAR(255) NOT NULL,
  childrens_medications_id INTEGER REFERENCES childrens_medications(id)
);
