const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        rollNumber: req.body.rollNumber
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:id/attendance', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let todayAttendance = student.attendance.find(a => {
            const attendanceDate = new Date(a.date);
            attendanceDate.setHours(0, 0, 0, 0);
            return attendanceDate.getTime() === today.getTime();
        });

        if (!todayAttendance) {
           
            student.attendance.push({
                date: new Date(),
                present: req.body.present,
                checkInTime: new Date(),
                checkOutTime: req.body.present ? null : new Date()
            });
        } else {
            
            todayAttendance.present = req.body.present;
            if (!req.body.present) {
                todayAttendance.checkOutTime = new Date();
            }
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/:id/attendance', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student.attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;