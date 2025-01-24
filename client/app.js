const studentList = document.getElementById('studentList');
const addStudentForm = document.getElementById('addStudentForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const genderInput = document.getElementById('gender');


const fetchStudents = async () => {
    const response = await fetch('http://localhost:3000/students');
    const students = await response.json();
    studentList.innerHTML = ''; 
    students.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = `${student.name}, ${student.age} years old, ${student.gender}`;
        studentList.appendChild(li);
    });
};


addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const age = parseInt(ageInput.value, 10);
    const gender = genderInput.value;
    
    const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender }),
    });
    
    if (response.ok) {

        nameInput.value = '';
        ageInput.value = '';
        genderInput.value = '';
        fetchStudents();
    }
});


fetchStudents();