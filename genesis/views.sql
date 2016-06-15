DROP VIEW core.agendas_json;
CREATE VIEW core.agendas_json AS
SELECT r.id as agenda_id, row_to_json(r, true) as agenda
FROM (
    SELECT
        d.id as agenda_id,
        d.agenda,
        json_agg(c_row) AS categories
    FROM core."Agendas" d
    LEFT JOIN (
        SELECT
            c.id as category_id,
            c.agenda_id,
            c.category,
            json_agg(m) AS tasks
        FROM core."AgendaCategories" c
        LEFT JOIN core."AgendaCategoryTasks" m ON (c.id = m.category_id)
        GROUP BY c.id
    ) c_row ON (c_row.agenda_id = d.id)
    GROUP BY d.id
) r(id, agenda, categories);