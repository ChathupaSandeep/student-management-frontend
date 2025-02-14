import React, { useEffect, useState } from "react";
import { Button, Drawer, List, message } from "antd";
import { getCourses } from "../api/courseService";
import { enrollCourse, unenrollCourse } from "../api/studentService";

interface Course {
  id: number;
  name: string;
}

interface CoursesDrawerProps {
  open: boolean;
  onClose: () => void;
  student: { id: number; name: string; courses: string[] } | null;
  fetchStudents: () => void;
}

const CoursesDrawer: React.FC<CoursesDrawerProps> = ({
  open,
  onClose,
  student,
  fetchStudents,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        message.error("Failed to fetch courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCourses();
    }
  }, [open]);

  const handleEnroll = async (courseId: number) => {
    if (!student) return;
    try {
      await enrollCourse(student.id, courseId);
      message.success("Enrolled in course successfully.");
      fetchStudents();
      onClose();
    } catch (error) {
      message.error("Failed to enroll in course.");
    }
  };

  const handleUnenroll = async (courseId: number) => {
    if (!student) return;
    try {
      await unenrollCourse(student.id, courseId);
      message.success("Unenrolled from course successfully.");
      fetchStudents();
      onClose();
    } catch (error) {
      message.error("Failed to unenroll from course.");
    }
  };

  return (
    <Drawer
      title={`Available Courses`}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <List
          bordered
          dataSource={courses}
          renderItem={(course) => (
            <List.Item>
              {course.name}
              {student?.courses.includes(course.name) ? (
                <Button
                  color="red"
                  variant="solid"
                  className="ml-5"
                  onClick={() => handleUnenroll(course.id)}
                >
                  Unenroll
                </Button>
              ) : (
                <Button
                  color="green"
                  variant="solid"
                  className="ml-5"
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll
                </Button>
              )}
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CoursesDrawer;
