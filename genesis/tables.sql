CREATE TABLE core."Agendas" (
  id BIGSERIAL NOT NULL,
  agenda TEXT NOT NULL,
  PRIMARY KEY(id)
) 
WITH (oids = false);

CREATE TABLE core."AgendaCategories" (
  id BIGSERIAL NOT NULL,
  agenda_id BIGINT,
  category TEXT NOT NULL,
  PRIMARY KEY(id)
) 
WITH (oids = false);

CREATE TABLE core."AgendaCategoryTasks" (
  id BIGSERIAL NOT NULL,
  category_id BIGINT,
  task TEXT NOT NULL,
  location TEXT,
  file_id BIGINT,
  visited TIMESTAMP,
  PRIMARY KEY(id)
) 
WITH (oids = false);

INSERT INTO 
  core."Agendas"
(
  agenda
)
VALUES (
  'nyc'
);

INSERT INTO 
  core."AgendaCategories"
(
  agenda_id,
  category
)
VALUES (
  1,
  'food'
);

INSERT INTO 
  core."AgendaCategoryTasks"
(
  category_id,
  task
)
VALUES (
  1,
  'kimchi'
);