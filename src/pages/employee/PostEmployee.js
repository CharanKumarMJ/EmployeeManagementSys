import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./PostEmployee.css";
import { useNavigate } from "react-router-dom";

const PostEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const res = await fetch("http://localhost:8080/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Employee created:", data);
      navigate("/");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <>
      <div className="center-form">
        <h1>Post New Employee</h1>
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
            Post
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PostEmployee;
