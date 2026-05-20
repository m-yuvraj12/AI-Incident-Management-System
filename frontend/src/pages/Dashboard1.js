import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard1 = () => {
  const [incidentData, setIncidentData] = useState({ low: 0, medium: 0, high: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data (this could be from an API or hardcoded)
    const fetchIncidentData = async () => {
      try {
        // Example API fetch, replace with your actual API call
        const response = await fetch("http://localhost:5000/incidents");
        const data = await response.json();

        const counts = {
          low: data.filter((incident) => incident.priority === "Low").length,
          medium: data.filter((incident) => incident.priority === "Medium").length,
          high: data.filter((incident) => incident.priority === "High").length,
        };

        setIncidentData(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidentData();
  }, []);

  const chartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Incidents",
        data: [incidentData.low, incidentData.medium, incidentData.high],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        borderRadius: 5,
      },
    ],
  };

  if (loading) {
    return <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>Loading data...</Typography>;
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
    }}>
      <Typography variant="h3" sx={{ color: "white", textAlign: "center", mb: 2, fontWeight: "bold" }}>
        Incident Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: "80%" }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#4caf50", color: "white", textAlign: "center", p: 2, minWidth: 200 }}>
            <CardContent>
              <Typography variant="h6">Low Priority</Typography>
              <Typography variant="h4">{incidentData.low}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#ffeb3b", color: "black", textAlign: "center", p: 2, minWidth: 200 }}>
            <CardContent>
              <Typography variant="h6">Medium Priority</Typography>
              <Typography variant="h4">{incidentData.medium}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#f44336", color: "white", textAlign: "center", p: 2, minWidth: 200 }}>
            <CardContent>
              <Typography variant="h6">High Priority</Typography>
              <Typography variant="h4">{incidentData.high}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, width: "80%", background: "white", p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Bar data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />
      </Box>
    </Box>
  );
};

export default Dashboard1;
