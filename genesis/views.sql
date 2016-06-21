CREATE OR REPLACE VIEW core.agendas_json (
    agenda_id,
    agenda)
AS
SELECT r.agenda_id,
    row_to_json(r.*, true) AS agenda
FROM (
    SELECT d.id AS agenda_id,
            d.agenda,
            COALESCE(json_agg(c_row.*) FILTER (
    WHERE c_row.agenda_id IS NOT NULL), '[]'::json) AS categories
    FROM core."Agendas" d
             LEFT JOIN (
        SELECT c.id AS category_id,
                    c.agenda_id,
                    c.category,
                    COALESCE(json_agg(m.*) FILTER (
        WHERE m.task_id IS NOT NULL), '[]'::json) AS tasks
        FROM core."AgendaCategories" c
                     LEFT JOIN (
            SELECT "AgendaCategoryTasks".category_id,
                            "AgendaCategoryTasks".task,
                            "AgendaCategoryTasks".location,
                            "AgendaCategoryTasks".file_id AS image,
                            "AgendaCategoryTasks".visited,
                            "AgendaCategoryTasks".id AS task_id
            FROM core."AgendaCategoryTasks"
            ) m ON c.id = m.category_id
        GROUP BY c.id
        ) c_row ON c_row.agenda_id = d.id
    GROUP BY d.id
    ) r(agenda_id, agenda, categories);



--
CREATE VIEW core.categories_json AS
SELECT r.id as category_id, row_to_json(r, true) as category
FROM (
    SELECT
        d.id as category_id,
        d.category,
        json_agg(m) AS categories
    FROM core."AgendaCategories" d
    LEFT JOIN core."AgendaCategoryTasks" m ON (d.id = m.category_id)
    GROUP BY d.id
) r(id, agenda, categories);