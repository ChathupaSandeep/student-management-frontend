import api from "./axiosInstance";

export const getCourses = async () => {
  try {
    const response = await api.get("/course");

    const updatedData = response.data.map((course: any) => ({
      id: course.id,
      name: course.name,
      duration: course.duration,
      lecturerName: course.lecturer ? course.lecturer.name : null,
    }));
    return updatedData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const createCourse = async (courseData: any) => {
  try {
    const response = await api.post("/course", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId: any) => {
  try {
    const response = await api.delete(`/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getCourseNames = async () => {
  try {
    const response = await api.get("/course");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const enrollLecturer = async (lecturerId: number, courseId: number) => {
  try {
    const response = await api.patch(
      `/lecturer/enroll/${lecturerId}/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning lecturer:", error);
    throw error;
  }
};
