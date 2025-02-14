import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import CoursesTable from "../components/CoursesTable";
import { getCourses } from "../api/courseService";
import CourseForm from "../components/CourseForm";

const { Title } = Typography;

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Title level={4}>Course Registration</Title>
      <CourseForm fetchCourses={fetchCourses} />
      <Title level={4}>Course List</Title>
      <CoursesTable courses={courses} fetchCourses={fetchCourses} />
    </div>
  );
};

export default Courses;
