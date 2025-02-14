import React, { useEffect, useState } from "react";
import { Button, Drawer, Select, message } from "antd";
import { getGuardians } from "../api/guardianService";
import { assignGuardian } from "../api/studentService";

interface Guardian {
  id: number;
  name: string;
}

interface GuardianDrawerProps {
  open: boolean;
  onClose: () => void;
  student: { id: number; name: string; guardianName: string } | null;
  fetchStudents: () => void;
}

const GuardianDrawer: React.FC<GuardianDrawerProps> = ({
  open,
  onClose,
  student,
  fetchStudents,
}) => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [selectedGuardian, setSelectedGuardian] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGuardians = async () => {
      setLoading(true);
      try {
        const guardiansData = await getGuardians();
        setGuardians(guardiansData);
      } catch (error) {
        message.error("Failed to fetch guardians. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchGuardians();
    }
  }, [open]);

  const handleUpdateGuardian = async () => {
    if (!student || selectedGuardian === null) return;
    try {
      await assignGuardian(student.id, selectedGuardian);
      message.success("Guardian updated successfully.");
      fetchStudents();
      onClose();
    } catch (error) {
      message.error("Failed to update guardian.");
    }
  };

  return (
    <Drawer
      title={`Update Guardian for ${student?.name}`}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <p>Loading guardians...</p>
      ) : (
        <Select
          style={{ width: "100%" }}
          placeholder="Select a guardian"
          onChange={(value) => setSelectedGuardian(value)}
        >
          {guardians.map((guardian) => (
            <Select.Option key={guardian.id} value={guardian.id}>
              {guardian.name}
            </Select.Option>
          ))}
        </Select>
      )}
      <Button
        type="primary"
        onClick={handleUpdateGuardian}
        style={{ marginTop: "16px" }}
      >
        Update Guardian
      </Button>
    </Drawer>
  );
};

export default GuardianDrawer;
