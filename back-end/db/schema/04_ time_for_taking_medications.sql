
DROP TABLE IF EXISTS time_for_taking_medications CASCADE;

CREATE TABLE time_for_taking_medications (
  id SERIAL PRIMARY KEY NOT NULL,
  time VARCHAR(255) NOT NULL,
  childrens_medications_id INTEGER REFERENCES childrens_medications(id),
);
