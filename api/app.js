var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var csvParser = require('csv-parser');
var fs = require('fs');
var cors = require('cors');


var app = express();

const db = new sqlite3.Database('./students.db'); 


app.use(bodyParser.json());
app.use(express.static('client'));
app.use(cors());
app.use('/docs', express.static('api'));


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT
    )`);
});


const importCSV = () => {
    db.run('DELETE FROM students');
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



/**
 * @api {get} /students Display all Students
 * @apiVersion 1.2.0
 * @apiGroup STUDENTS
 * @apiSuccess {Object[]} students List of students.
 * @apiSuccess {Number} students.id Student ID.
 * @apiSuccess {String} students.name Student Name.
 * @apiSuccess {Number} students.age Student Age.
 * @apiSuccess {String} students.gender Student Gender.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "list": 0,
 *      "id": "1001",
 *      "name": "Maria",
 *      "age": 17,
 *      "gender": "Female"
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        res.json(rows);
    });
});

/**
 * @api {post} /Students/ Add A New Student
 * @apiVersion 1.2.0
 * @apiGroup STUDENTS
 *  @apiSuccess {String} students.name Student Name.
 * @apiSuccess {Number} students.age Student Age.
 * @apiSuccess {String} students.gender Student Gender.
 *
 * @apiParamExample {json} Input
 *    {
 *      "name": "Maria",
 *      "age": 17,
 *      "gender": "Female"
 *    }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
app.post('/students', (req, res) => {
    let { name, age, gender } = req.body;
    db.run('INSERT INTO students (name, age, gender) VALUES (?, ?, ?)', [name, age, gender], function () {
        res.json({ id: this.lastID, name, age, gender });
    });
});


/**
 * @api {delete} /students/:id Delete A Student
 * @apiVersion 1.2.0
 * @apiGroup STUDENTS
 * 
 * @apiParam {id} id Student Identifier
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
app.delete('/students/:id', (req, res) => {
    let { id } = req.params;
    db.run('DELETE FROM students WHERE id = ?', [id], function () {
        res.json({ message: `Student with ID ${id} deleted` });
    });
});


let PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/students`);
});