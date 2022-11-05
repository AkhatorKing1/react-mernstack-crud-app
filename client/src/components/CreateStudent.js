import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export function handleInputChange(e, field, setStudentDetails) {
  setStudentDetails((current) => {
    return {
      name: `${field === "name" ? e.target.value : current.name}`,
      email: `${field === "email" ? e.target.value : current.email}`,
      rollno: `${field === "rollno" ? e.target.value : current.rollno}`
    };
  });
}

export default function CreateStudent({ studentDetails, setStudentDetails }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const studentObject = {
      name: studentDetails.name,
      email: studentDetails.email,
      rollno: studentDetails.rollno
    };
    axios
      .post("http://localhost:4000/students/create-student", studentObject)
      .then((res) => console.log(res.data));
    setStudentDetails({ name: "", email: "", rollno: "" });
  };

  useEffect(() => {
    console.log(studentDetails);
  }, [studentDetails]);

  return (
    <div className="form-wrapper">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={studentDetails.name}
            onChange={(e) => handleInputChange(e, "name", setStudentDetails)}
          />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={studentDetails.email}
            onChange={(e) => handleInputChange(e, "email", setStudentDetails)}
          />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control
            type="text"
            value={studentDetails.rollno}
            onChange={(e) => handleInputChange(e, "rollno", setStudentDetails)}
          />
        </Form.Group>
        <Button
          variant="danger"
          size="lg"
          block="block"
          type="submit"
          className="mt-4"
        >
          Create Student
        </Button>
      </Form>
    </div>
  );
}
