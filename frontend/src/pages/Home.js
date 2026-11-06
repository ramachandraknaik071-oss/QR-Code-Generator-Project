// frontend/src/pages/Home.js

import React, { useState } from "react";
import "../App.css";

function Home() {
  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const userId = localStorage.getItem("userId");

  // Logout Function
  const logout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  // Generate QR Function
  const generateQR = async () => {
    const userId = localStorage.getItem("userId");

    if (!text) {
      alert("Enter text or URL first!");
      return;
    }

    try {
      // Call backend API with userId
      const response = await fetch(
        `http://localhost:5000/qr/generate?text=${encodeURIComponent(
          text
        )}&userId=${userId}`
      );

      const data = await response.json();

      // Set QR image from backend response
      setQrImage(data.qr);
      setShowPopup(true);

    } catch (error) {
      console.log(error);
      alert("Failed to generate QR");
    }
  };

  // Close Popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div id="mainContainer" className={showPopup ? "opacity" : ""}>
        <div className="sidebar">
          <div className="textContainer">
            <h1>Generate QR Code</h1>
            <p>Just in one click</p>

            {!userId ? (
  <button
    onClick={() => {
      window.location.href = "/login";
    }}
    style={{
      marginTop: "20px",
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor:"black",
      color:"white",
      border: "none",
      borderRadius: "8px"
    }}
  >
    Sign In
  </button>
) : (
  <button
    onClick={logout}
    style={{
      marginTop: "20px",
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "8px"
    }}
  >
    Logout
  </button>
)}

          </div>
        </div>

        <div className="homeContainer">
          <div className="home">
            <h2>Enter Text or URL</h2>

            <input
              type="text"
              id="qrInput"
              placeholder="Text or URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button id="generateBtn" onClick={generateQR}>
              Generate QR Code
            </button>

            <br />
            <br />

            <button
              onClick={() => {
                window.location.href = "/history";
              }}
            >
              View History
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div id="qrPopup" className="show">
          <h2>QR Generated</h2>

          <img
            src={qrImage}
            alt="QR Code"
            id="qrImg"
          />

          <a href={qrImage} download="qr.png">
            <button id="downloadBtn">
              Download QR
            </button>
          </a>

          <button
            id="closeBtn"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;




