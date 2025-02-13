import api from "./axiosInstance";

export const getStudents = async () => {
  try {
    const response = await api.get("/student");

    const updatedData = response.data.map((student: any) => ({
      ...student,
      courses: student.courses.map((course: any) => course.name),
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

export const deleteStudent = async (studentId: any) => {
  try {
    const response = await api.delete(`/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
