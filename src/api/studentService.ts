import api from "./axiosInstance";

export const getStudents = async () => {
  try {
    const response = await api.get("/student");

    const updatedData = response.data.map((student: any) => ({
      ...student,
      courses: student.courses.map((course: any) => course.name),
      guardianName: student.guardian ? student.guardian.name : null,
    }));
    return updatedData;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const createStudent = async (studentData: any) => {
  try {
    const response = await api.post("/student", studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteStudent = async (studentId: number) => {
  try {
    const response = await api.delete(`/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const unenrollCourse = async (studentId: number, courseId: number) => {
  try {
    const response = await api.delete(
      `/student/${studentId}/courses/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const enrollCourse = async (studentId: number, courseId: number) => {
  try {
    const response = await api.post(
      `/student/${studentId}/courses/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

export const assignGuardian = async (studentId: number, guardianId: number) => {
  try {
    const response = await api.patch(
      `/student/assign-guardian/${studentId}/${guardianId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning guardian:", error);
    throw error;
  }
};

export const updateStudent = async (studentId: number, studentData: any) => {
  try {
    const response = await api.patch(`/student/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};
