import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./Login.css";
import NewUserModal from "./newusermodal";
const md5 = require("md5"); // Use const instead.(fixed)

// TODO Change login to a post and add the email and password to the body object.
//are you sure you dont mean createuser. this call shuld get an already existing user. 
async function loginUser(credentials) {
  return fetch(`http://localhost:3001/api/user/${credentials.email}`, {
    method: "GET", // POST
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({email, password})
    // please see above comment
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.data.password === md5(credentials.password)) { // This check should be in backend. You should be able to use md5 in backend.
        return credentials;
      } else {
        alert("fel lösenord   " + md5(data.data.password));
      }
    }).catch((err) => alert("Hittade inte email adressen"));
}

export default function Login({ setToken }) {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    if (token){
      setToken(token)
      history.push("/");
      }
  };

  return (
    <div className="login-wrapper">
      <h1>Welcome to Best Radio </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
        <Button type="submit">Login</Button>
          <Button variant="primary" onClick={() => setModalShow(true)}>            Create User
          </Button>
        </div>
      </form>
      <NewUserModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
