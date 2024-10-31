import React, { useEffect, useState } from 'react';
import './myCohort.css';

const MyCohort = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('YOUR_STUDENTS_API_URL') // Replace with actual students API endpoint
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));

    // Fetch teachers data
    fetch('YOUR_TEACHERS_API_URL') // Replace with actual teachers API endpoint
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error('Error fetching teachers:', error));
  }, []);

  return (
    <div className="cohort-page">
      <div className="cohort-content">
        <h1>My Cohort</h1>

        <div className="cohort-section">
          <h2>Software Development, Cohort 4</h2>
          <p>January 2023 - June 2023</p>
          <div className="student-list">
            {students.map((student, index) => (
              <div className="student-item" key={index}>
                <div className="initials">{student.initials}</div>
                <div className="name">{student.name}</div>
                <div className="menu">...</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right-side container for Teachers and My Exercises */}
      <div className="sidebar">
        <div className="teacher-section">
          <h2>Teachers</h2>
          {teachers.map((teacher, index) => (
            <div className="teacher-item" key={index}>
              <div className="initials">{teacher.initials}</div>
              <div className="name">{teacher.name}</div>
              <div className="subject">{teacher.subject}</div>
              <div className="menu">...</div>
            </div>
          ))}
        </div>

        <div className="my-exercises">
          <h2>My Exercises</h2>
          <p>Modules: 2/7 completed</p>
          <p>Units: 4/10 completed</p>
          <p>Exercises: 34/58 completed</p>
          <button>See Exercises</button>
        </div>
      </div>
    </div>
  );
};

export default MyCohort;
