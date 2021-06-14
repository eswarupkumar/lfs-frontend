import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/myresponses.css";
import Axios from "axios";
import { Button, Modal, Badge } from "react-bootstrap";

function Response() {
  const [responses, setResponse] = useState("");
  const [showNumber, setShowNumber] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const handleCloseNumber = () => {
    setShowNumber(false);
  };
  const handleShowNumber = (response) => {
    // console.log("Inside :", response);
    Axios({
      url: `https://lfs-backend.herokuapp.com/getnumber/${response.belongsTo}`,
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.Number);
        setPhoneNumber(response.data.Number);
      })
      .finally(() => {
        setShowNumber(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const temp = [];
  useEffect(() => {
    Axios({
      url: `https://lfs-backend.herokuapp.com/myresponses/${JSON.parse(localStorage.getItem("user"))._id}`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res)
        const responses = res.data.item;
        // console.log(responses)

        responses.reverse().map((response) => {
          let created_date = new Date(response.createdAt);
          let date =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          // console.log(response);
          temp.push(
            <div className="responese-card">
              <h5>
                <span className="attributes">Item ID :</span> {response.itemId}
              </h5>
              <h5>
                <span className="attributes">Question :</span>{" "}
                {response.question}
              </h5>
              <h5>
                <span className="attributes">Your Answer :</span>
                {response.answer}
              </h5>
              <h5>
                <span className="attributes">Time :</span> {date}
              </h5>
              {response.response === "Moderation" ? (
                // <p style={{ color: "orange" }}>
                //   Please wait, it's in moderation. We will get back to you once
                //   response recieved from the owner
                // </p>
                <h6>
                  <h6>
                    <Badge pill variant="primary">
                      Moderation
                    </Badge>
                  </h6>
                </h6>
              ) : (
                <h6>
                  {response.response === "Yes" ? (
                    <>
                      {/* <p style={{ color: "green" }}>Approved !!</p> */}
                      <h6>
                        <Badge pill variant="success">
                          Approved
                        </Badge>
                      </h6>
                      <Button
                        className="btn-primary"
                        onClick={() => handleShowNumber(response)}
                      >
                        Show Number
                      </Button>
                    </>
                  ) : (
                    <h6>
                      <Badge pill variant="danger">
                        Opps !!
                      </Badge>
                    </h6>
                  )}
                </h6>
              )}
            </div>
          );
        });
        setResponse(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  },);

  return (
    <>
      <Navbar />
      <Modal show={showNumber} onHide={handleCloseNumber} backdrop="static">
        <Modal.Body>
          <p>Here is the number : {PhoneNumber}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseNumber}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseNumber}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="response-title">
        <h2>Your responses</h2>
        <div className="title-border"></div>
      </div>
      <div className="responses-list">{responses}</div>
    </>
  );
}

export default Response;
