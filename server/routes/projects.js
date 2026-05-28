var express = require('express');
const db = require('../database/database');
var router = express.Router();

router.post('/', (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO projects (name, description) VALUES (?, ?)';
    db.run(sql, [name, description], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, description  });
    });
});

router.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "project not found" });
        res.json(row);
    });
});

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM tasks WHERE project_id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
    db.run(sql, [name, description, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id, name, description });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM projects WHERE id = ?', id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: id })
    });
});

module.exports = router;