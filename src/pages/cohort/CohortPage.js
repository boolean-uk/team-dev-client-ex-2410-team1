import React, { useEffect, useState } from 'react';
import { get } from '../../service/apiClient';
import './CohortPage.css';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';

const MyCohort = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const loggedInId = jwtDecode(token).userId;

    async function fetchUser() {
      try {
        const res = await get(`users/${loggedInId}`);
        const user = res.data;
        setLoggedInUser(user);
      } catch (error) {}
    }

    fetchUser();
  }, [token]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await get('users');
        const users = res.data;

        const studentList = users.filter(
          (user) => user.role === 'STUDENT' && user.cohort_id === loggedInUser.cohort_id
        );
        const teacherList = users.filter(
          (user) => user.role === 'TEACHER' && user.cohort_id === loggedInUser.cohort_id
        );

        setStudents(studentList);
        setTeachers(teacherList);
      } catch (error) {}
    }

    fetchUsers();
  }, [loggedInUser]);

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
                <div className="name">
                  {student.firstName} {student.lastName}
                </div>
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
