var express = require('express');
const db = require('../database/database');
var router = express.Router();

router.post('/', (req, res) => {
    const {project_id, name, description, status, position} = req.body;
    const sql = 'INSERT INTO tasks (project_id, name, description, status, position) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [project_id, name, description, status, position], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, description });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "task not found" });
        res.json(row);
    });
});

router.get('/:id/subtasks', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM subtasks WHERE task_id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, name, description, status, position } = req.body;
    const sql = 'UPDATE tasks SET project_id = ?, name = ?, description = ?, status = ?, position = ? WHERE id = ?';
    db.run(sql, [project_id, name, description, status, position], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id, project_id, name, description, status, position  });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deletedID: id })
        });
});

module.exports = router;