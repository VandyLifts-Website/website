import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function SurveySelect() {
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/organizations/`);
      console.log("Response", response);

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      setOrgData(response.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  const orgList = orgData?.map((org) => {
    return (
      <Link key={org.id} to={`/organizations/${org.id}`}>
        <Button variant="primary" size="lg" style={{ width: "400px" }}>
          {org.title}
        </Button>
      </Link>
    );
  });

  return (
    <div>
      <div
        className="d-grid gap-2"
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          left: "50%",
          msTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      >
        {orgList}
      </div>
    </div>
  );
}
export default SurveySelect;
