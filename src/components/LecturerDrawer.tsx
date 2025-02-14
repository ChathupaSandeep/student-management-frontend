import React, { useEffect, useState } from "react";
import { Button, Drawer, Select, message } from "antd";
import { getLecturers } from "../api/lecturerService";
import { enrollLecturer } from "../api/courseService";

interface Lecturer {
  id: number;
  name: string;
}

interface LecturerDrawerProps {
  open: boolean;
  onClose: () => void;
  course: { id: number; name: string; lecturerName: string } | null;
  fetchCourses: () => void;
}

const LecturerDrawer: React.FC<LecturerDrawerProps> = ({
  open,
  onClose,
  course,
  fetchCourses,
}) => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [selectedLecturer, setSelectedLecturer] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLecturers = async () => {
      setLoading(true);
      try {
        const lecturersData = await getLecturers();
        setLecturers(lecturersData);
      } catch (error) {
        message.error("Failed to fetch lecturers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchLecturers();
    }
  }, [open]);

  const handleAssignLecturer = async () => {
    if (!course || selectedLecturer === null) return;
    try {
      await enrollLecturer(selectedLecturer, course.id);
      message.success("Lecturer assigned successfully.");
      fetchCourses();
      onClose();
    } catch (error) {
      message.error("Failed to assign lecturer.");
    }
  };

  return (
    <Drawer
      title={`Assign Lecturer to ${course?.name}`}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <p>Loading lecturers...</p>
      ) : (
        <Select
          style={{ width: "100%" }}
          placeholder="Select a lecturer"
          onChange={(value) => setSelectedLecturer(value)}
        >
          {lecturers.map((lecturer) => (
            <Select.Option key={lecturer.id} value={lecturer.id}>
              {lecturer.name}
            </Select.Option>
          ))}
        </Select>
      )}
      <Button
        type="primary"
        onClick={handleAssignLecturer}
        style={{ marginTop: "16px" }}
      >
        Assign Lecturer
      </Button>
    </Drawer>
  );
};

export default LecturerDrawer;
