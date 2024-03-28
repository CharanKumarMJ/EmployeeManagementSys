import { Button, Form } from "react-bootstrap";
import "./UpdateEmployee.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employee/${id}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchEmployees();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("User updated:", data);

      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <>
      <div className="center-form">
        <h1>Update Employee</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter employee phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="department"
              placeholder="Enter employee department"
              value={formData.department}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateEmployee;
