import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IncidentDetail = () => {
    const { id } = useParams(); // ✅ Get incident ID from URL
    const [incident, setIncident] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/incidents/${id}`)
            .then((res) => res.json())
            .then((data) => setIncident(data))
            .catch((error) => console.error("Error fetching incident:", error));
    }, [id]);

    if (!incident) return <p>Loading...</p>;

    return (
        <div>
            <h2>Incident Details</h2>
            <p><strong>Title:</strong> {incident.title}</p>
            <p><strong>Description:</strong> {incident.description}</p>
            <p><strong>Status:</strong> {incident.status}</p>
            <p><strong>Priority:</strong> {incident.priority}</p>
            <p><strong>Assigned To:</strong> {incident.assigned_to}</p>
            <p><strong>Reported By:</strong> {incident.reported_by}</p>
            <p><strong>AI Suggestion:</strong> {incident.ai_suggestion}</p>
        </div>
    );
};

export default IncidentDetail;
