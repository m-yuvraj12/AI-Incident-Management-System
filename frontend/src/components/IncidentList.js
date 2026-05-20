import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid, Box, TextField } from "@mui/material";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:5000/incidents");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch incidents");
        }

        setIncidents(data);
        setFilteredIncidents(data); // initially show all
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = incidents.filter(
      (incident) =>
        incident.title.toLowerCase().includes(term) ||
        incident.status.toLowerCase().includes(term)
    );
    setFilteredIncidents(filtered);
  }, [searchTerm, incidents]);

  if (loading) return <Typography variant="h6" color="textSecondary">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Incident List</Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search incidents"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "70%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
          sx={{ ml: 2 }}
        >
          Create Incident
        </Button>
      </Box>

      {filteredIncidents.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No matching incidents found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredIncidents.map((incident) => (
            <Grid item xs={12} md={4} key={incident.id}>
              <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{incident.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{incident.status}</Typography>
                </CardContent>
                <Box sx={{ padding: 2 }}>
                  <Button
                    component={Link}
                    to={`/incidents/${incident.id}`}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default IncidentList;
