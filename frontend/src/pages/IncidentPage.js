import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncidentForm from "../components/IncidentForm";
import IncidentList from "../components/IncidentList";

const IncidentPage = () => {
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <h1>Incident Management</h1>
            <button onClick={() => navigate("/create-incident")}>
                Create Incident
            </button>
            <IncidentForm onIncidentCreated={() => setRefresh(!refresh)} />
            <IncidentList key={refresh} />
        </div>
    );
};

export default IncidentPage;
