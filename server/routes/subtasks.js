var express = require('express');
const db = require('../database/database');
var router = express.Router();

router.post('/', (req, res) => {
    const {task_id, name, description, status, position} = req.body;
    const sql = 'INSERT INTO subtasks (task_id, name, description, status, position) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [task_id, name, description, status, position], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, description });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM subtasks WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "task not found" });
        res.json(row);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task_id, name, description, status, position } = req.body;
    const sql = 'UPDATE subtasks SET task_id = ?, SET name = ?, description = ?, status = ?, position = ? WHERE id = ?';
    db.run(sql, [task_id, name, description, status, position], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id, task_id, name, description, status, position  });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM subtasks WHERE id = ?', id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deletedID: id })
        });
});

module.exports = router;