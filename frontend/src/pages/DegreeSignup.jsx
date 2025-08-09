import { useState } from "react";
import axios from "axios";

export default function UserDetails({ userID }) {
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!university || !degree) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.patch("http://localhost:5000/api/degree-details", {
        userID,
        university,
        degree,
      });

      setSuccess(response.data.message || "Details updated successfully");
      setUniversity("");
      setDegree("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Update failed");
      } else {
        setError("Update failed");
      }
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          University:
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Degree:
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Save Details</button>
      </form>
    </div>
  );
}
