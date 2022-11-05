// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreateStudent from "./components/CreateStudent";
import EditStudent from "./components/EditStudent";
import StudentList from "./components/StudentList";

function App() {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    rollno: ""
  });

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-student"} className="nav-link">
                  React MERN Stack App
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-student"} className="nav-link">
                    Create Student
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/student-list"} className="nav-link">
                    Student List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route
                    path="/create-student"
                    element={
                      <CreateStudent
                        studentDetails={studentDetails}
                        setStudentDetails={setStudentDetails}
                      />
                    }
                  />
                  <Route
                    path="/edit-student/:id"
                    element={
                      <EditStudent
                        studentDetails={studentDetails}
                        setStudentDetails={setStudentDetails}
                      />
                    }
                  />
                  <Route path="/student-list" element={<StudentList />} />
                  <Route
                    path="/"
                    element={
                      <CreateStudent
                        studentDetails={studentDetails}
                        setStudentDetails={setStudentDetails}
                      />
                    }
                  />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
