import { useState } from "react";

import axios from "axios";

import { Button, Grid2, Paper, TextField, Typography } from "@mui/material";

import { setAuthenticated } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.name !== "" && formData.email !== "") {
      axios
        .post(
          "https://frontend-take-home-service.fetch.com/auth/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(() => {
          dispatch(setAuthenticated(true));
        })
        .catch((err) => console.log(err));
    }
  };

  // TODO: change to MUI
  return (
    <Grid2
      sx={{ width: "100vw", height: "100vh" }}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={{ p: 2 }}>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold", mb: 2 }}
          align="center"
        >
          Login
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid2>
  );
}
