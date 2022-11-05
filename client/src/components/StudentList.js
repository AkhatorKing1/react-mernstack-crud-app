import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import StudentTableRow from "./StudentTableRow";

export default function StudentList() {
  const [studentsObj, setStudentsObj] = useState({ students: [] });

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then((res) => {
        setStudentsObj({ students: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function DataTable() {
    return studentsObj.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
}
