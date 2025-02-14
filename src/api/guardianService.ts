import api from "./axiosInstance";

export const getGuardians = async () => {
  try {
    const response = await api.get("/guardian");

    return response.data;
  } catch (error) {
    console.error("Error fetching guardians:", error);
    throw error;
  }
};

export const createGuardian = async (guardianData: any) => {
  try {
    const response = await api.post("/guardian", guardianData);
    return response.data;
  } catch (error) {
    console.error("Error creating guardian:", error);
    throw error;
  }
};

export const deleteGuardian = async (guardianId: any) => {
  try {
    const response = await api.delete(`/guardian/${guardianId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating guardian:", error);
    throw error;
  }
};
