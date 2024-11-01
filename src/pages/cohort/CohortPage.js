import React, { useEffect, useState } from 'react';
import { getCohortsById } from '../../service/apiClient';
import './CohortPage.css';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const MyCohort = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getCohortsById(loggedInUser.cohort_id);

        const studentList = res.filter((user) => user.role === 'STUDENT');
        const teacherList = res.filter((user) => user.role === 'TEACHER');

        setStudents(studentList);
        setTeachers(teacherList);
      } catch (error) {}
    }

    fetchUsers();
  }, []);

  return (
    <div className="cohort-page">
      <div className="cohort-content">
        <div className="cohort-section">
          <h1>My Cohort</h1>
          <h4>Software Development, Cohort {loggedInUser.cohort_id}</h4>
          <p>January 2023 - June 2023</p>
          <div className="student-list">
            {students.map((student, index) => (
              <div className="student-item" key={index}>
                <div className="initials">
                  {student.firstName ? student.firstName[0] : '?'}
                  {student.lastName ? student.lastName[0] : '?'}
                </div>
                <NavLink className="nameLink" to={`/profile/${student.id}`}>
                  <div className="name">
                    {student.firstName} {student.lastName}
                  </div>
                </NavLink>
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
              <NavLink className="nameLink" to={`/profile/${teacher.id}`}>
                <div className="name">
                  {teacher.firstName} {teacher.lastName}
                </div>
              </NavLink>

              <div className="subject">{teacher.specialism}</div>
            </div>
          ))}
        </div>

        <div className="my-exercises">
          <h2>My Exercises</h2>
          <p>Modules: 2/7 completed</p>
          <p>Units: 4/10 completed</p>
          <p>Exercises: 34/58 completed</p>
          <button className="button-cohort">See Exercises</button>
        </div>
      </div>
    </div>
  );
};

export default MyCohort;
