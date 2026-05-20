const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/incidents";

// Create a new incident
export const createIncident = async (incidentData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incidentData),
    });
    return response.json();
};

// Fetch all incidents
export const getIncidents = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Fetch a single incident by ID
export const getIncidentById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};
