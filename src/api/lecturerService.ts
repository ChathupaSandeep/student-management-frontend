import api from "./axiosInstance";

export const getLecturers = async () => {
  try {
    const response = await api.get("/lecturer");

    return response.data;
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    throw error;
  }
};

export const createLecturer = async (lecturerData: any) => {
  try {
    const response = await api.post("/lecturer", lecturerData);
    return response.data;
  } catch (error) {
    console.error("Error creating lecturer:", error);
    throw error;
  }
};

export const deleteLecturer = async (lecturerId: any) => {
  try {
    const response = await api.delete(`/lecturer/${lecturerId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating lecturer:", error);
    throw error;
  }
};
