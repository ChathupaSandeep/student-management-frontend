import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import GuardiansTable from "../components/GuardianTable";
import { getGuardians } from "../api/guardianService";
import GuardianForm from "../components/GuardianForm";

const { Title } = Typography;

const Guardians = () => {
  const [guardians, setGuardians] = useState([]);

  const fetchGuardians = async () => {
    try {
      const data = await getGuardians();
      setGuardians(data);
    } catch (error) {
      console.error("Error fetching guardians:", error);
    }
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  return (
    <div>
      <Title level={4}>Guardian Registration</Title>
      <GuardianForm fetchGuardians={fetchGuardians} />
      <Title level={4}>Guardian List</Title>
      <GuardiansTable guardians={guardians} fetchGuardians={fetchGuardians} />
    </div>
  );
};

export default Guardians;
