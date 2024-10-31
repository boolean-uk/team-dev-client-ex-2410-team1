import React, { useEffect, useState } from 'react';
import { get } from '../../service/apiClient';
import './myCohort.css';

const MyCohort = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await get('users');
        const users = res.data;
        console.log(users);

        const studentList = users.filter((user) => user.role === 'STUDENT');
        const teacherList = users.filter((user) => user.role === 'TEACHER');

        setStudents(studentList);
        setTeachers(teacherList);
      } catch (error) {}
    }

    fetchUsers();
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
                <div className="initials">
                  {student.firstName ? student.firstName[0] : '?'}
                  {student.lastName ? student.lastName[0] : '?'}
                </div>
                <div className="name">
                  {student.firstName} {student.lastName}
                </div>
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
              <div className="initials">
                {teacher.firstName ? teacher.firstName[0] : '?'}
                {teacher.lastName ? teacher.lastName[0] : '?'}
              </div>
              <div className="name">
                {teacher.firstName}
                {teacher.lastName}
              </div>
              <div className="subject">{teacher.specialism}</div>
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
