import React, { useState, useEffect } from "react";
import "../App.css";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const [ProgramCategories, setProgramCategories] = useState([]);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);

  const toggleShowFailToast = () => setShowFailToast(!showFailToast);
  const toggleShowSuccessToast = () => setShowSuccessToast(!showSuccessToast);

  const columns = [
    {
      dataField: "categories",
      text: "All Categories",
      formatter: (rowContent, row) => {
        return (
          <div>
            <Button
              variant="primary"
              onClick={() => fetchProgramCategories(row.id)}
            >
              {row.name}
            </Button>
          </div>
        );
      },
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        {ProgramCategories.map((category) => (
          <p className="favprog">
            {category.name}{" "}
            <Button
              disabled={!sessionStorage.getItem("token")}
              variant="primary"
              onClick={() => addFavorite(category)}
            >
              Add favorit
            </Button>
          </p>
        ))}
      </div>
    ),
    showExpandColumn: true,
  };

  useEffect(() => {
    fetch(`/api/v1/channels/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.programcategories);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchProgramCategories = (id) => {
    fetch(`/api/v1/channels/categories/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProgramCategories(res.programs);
      })
      .catch((err) => console.log(err));
  };
  async function addFavorite(prog) {
    const program = {
      programid: prog.id,
      programname: prog.name,
    };
    return fetch("http://localhost:3001/api/favprog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program),
    })
      .then((data) => data.json())

      .then((data) => {
        if (data.error) {
          setShowFailToast(true);
        } else {
          setShowSuccessToast(true);
        }
      });
  }

  return (
    <div>
      <Toast
        show={showFailToast}
        onClose={toggleShowFailToast}
        bg="danger"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>Failed to add to Favorite</Toast.Body>
      </Toast>
      <Toast
        show={showSuccessToast}
        onClose={toggleShowSuccessToast}
        bg="danger"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>ADDED to favorit</Toast.Body>
      </Toast>
      <h1>All Categories</h1>
      <div className="abc"></div>

      <BootstrapTable
        keyField="id"
        data={Categories}
        columns={columns}
        expandRow={expandRow}
      />
    </div>
  );
}
