var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var csvParser = require('csv-parser');
const fs = require('fs');

var app = express();

const db = new sqlite3.Database('./students.db'); 


app.use(bodyParser.json());

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT
    )`);
});


const importCSV = () => {
    const students = [];
    fs.createReadStream('./Students.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            students.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            students.forEach((student) => {
                db.run(
                    `INSERT INTO students (id, name, age, gender) VALUES (?, ?, ?, ?)`,
                    [student.StudentID, student.Name, student.Age, student.Gender],
                    (err) => {
                        if (err) {
                            console.error(`Error inserting student: ${student.Name}`);
                        }
                    }
                );
            });
        });
};

importCSV();


app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        res.json(rows);
    });
});


app.post('/students', (req, res) => {
    let { name, age, gender } = req.body;
    db.run('INSERT INTO students (name, age, gender) VALUES (?, ?, ?)', [name, age, gender], function () {
        res.json({ id: this.lastID, name, age, gender });
    });
});



app.delete('/students/:id', (req, res) => {
    let { id } = req.params;
    db.run('DELETE FROM students WHERE id = ?', [id], function () {
        res.json({ message: `Student with ID ${id} deleted` });
    });
});


let PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});