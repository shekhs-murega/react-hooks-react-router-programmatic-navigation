import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ onLogin }) {
  // Use the useHistory hook to get access to the browser history object
  const history = useHistory();

  // Use the useState hook to define the initial state of the form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Define a handleChange function that updates the form data based on user input
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Define a handleSubmit function that sends the form data to the server
  function handleSubmit(e) {
    e.preventDefault(); // prevent the default form submission behavior

    // Send a POST request to the login endpoint with the form data in the request body
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // parse the response as JSON
      .then((user) => {
        // Call the onLogin function passed as a prop with the user data
        onLogin(user);

        // Use the history object to navigate to the home page
        history.push("/");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  // Render a form with two input fields and a submit button
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
