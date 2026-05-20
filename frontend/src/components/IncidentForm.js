import React, { useState } from "react";
import { toast } from "react-toastify";
import { createIncident } from "../api/IncidentApi";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const IncidentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    reportedBy: "",
    assignedTo: "",
  });
  const [isLoading,setIsLoading]=useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const newIncident = await createIncident(formData);
      setIsLoading(false);
      toast.success("🎉 Incident created successfully!");
      navigate("/"); // Redirect to incident list page
    } catch (error) {
        setIsLoading(false);
      console.error("Error creating incident:", error);
      toast.error("❌ Failed to create incident");
    }
  };

  return (
    isLoading ?
    <CircularProgress />
    :
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create New Incident
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Reported By"
              name="reportedBy"
              value={formData.reportedBy}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Assigned To"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              margin="normal"
            />

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Create Incident
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default IncidentForm;
