import React, { useState } from "react";
import "./Login.css";

async function CreateUser(credentials) {
  return fetch("http://localhost:3001/api/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function CreatUserForm() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateUser({
      email,
      password,
      name,
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Create new accoun</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>name</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
