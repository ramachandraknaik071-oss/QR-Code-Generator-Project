import React, { useEffect, useState } from "react";

function History() {
  const [allQR, setAllQR] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:5000/qr/all/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllQR(data))
      .catch((error) => {
        console.log(error);
        alert("Failed to load history");
      });
  }, []);

  // DELETE FUNCTION
  const deleteQR = async (id) => {
    try {
      await fetch(`http://localhost:5000/qr/delete/${id}`, {
        method: "DELETE"
      });

      setAllQR(allQR.filter((item) => item._id !== id));

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>My QR History</h1>

      {allQR.length === 0 ? (
        <p>No QR history found</p>
      ) : (
        allQR.map((item) => (
          <div
            key={item._id}
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.imageUrl}
              alt="QR Code"
              width="200"
            />

            <p>{item.text}</p>

            {/* Download Button (GREEN) */}
            <a href={item.imageUrl} download="qr.png">
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Download QR
              </button>
            </a>

            {/* Delete Button (RED) */}
            <button
              onClick={() => deleteQR(item._id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete History
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default History;



