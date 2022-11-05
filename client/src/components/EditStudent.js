import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { handleInputChange } from "./CreateStudent";
import { useNavigate, useParams } from "react-router";

export default function EditStudent({ studentDetails, setStudentDetails }) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/edit-student/" + id)
      .then((res) => {
        setStudentDetails({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const studentObject = {
      name: studentDetails.name,
      email: studentDetails.email,
      rollno: studentDetails.rollno
    };
    axios
      .put("http://localhost:4000/students/update-student/" + id, studentObject)
      .then((res) => {
        console.log(res.data);
        console.log("Student successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
    // Redirect to Student List
    navigate("/student-list");
  };

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
        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
  );
}
