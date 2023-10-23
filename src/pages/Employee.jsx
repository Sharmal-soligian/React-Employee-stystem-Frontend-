import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";

const paperStyle = {
  padding: "50px 20px",
  width: 600,
  margin: "20px auto",
};

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, address };
    try {
      const res = await fetch("http://localhost:8080/employee/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setName('');
        setAddress('');
      } else if (res.status === 400) {
        const errorData = await res.text();
        console.log('Error creating employee', errorData);
        alert(errorData);
      } else {
        console.log('Failed to create employee');
      }
    } catch (err) {
      console.log("Error creating user", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/employee/all", {
          method: "GET",
        });
        if (res.ok) {
            const data = await res.json();
            setEmployees(data);
        } else {
            console.log('Failed to fetch data');
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "#553690" }}>
          <u>Add Employee</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Employee Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Employee address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
      <h1>Employees Details</h1>
      <Paper elevation={3} style={ paperStyle } >
          {employees.map(employee => (
            <Paper elevation={6} style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={employee.id}>
                Name: { employee.name } <br />
                Address: { employee.address }
            </Paper>
          ))}
      </Paper>
    </Container>
  );
}
