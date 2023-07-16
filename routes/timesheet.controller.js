const express = require('express')
const dataModel = require('../models/timesheet.model');
const router = express.Router();

router.post('/create-task', async (req, res) => {
    try {
        const newTask = new dataModel({
            project: req.body.project,
            task: req.body.task,
            inDate: req.body.inDate,
            outDate: req.body.outDate,
            duration: req.body.duration
        });
        await newTask.save();
        res.status(200).send({
            message: "success",
        });
    }
    catch {
        res.status(500).send({
            message: err.message,
        });
    }
})
router.get('/tasks', async (req, res) => {
    const data = await dataModel.find({});
    try {
        res.status(200).send({
            message: "success",
            data: data
        });
    }
    catch {
        res.status(500).send({
            message: err.message,
        });
    }
})
module.exports = router
