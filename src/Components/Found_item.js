import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form } from "react-bootstrap";

function Found_item() {
  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemimage, setitemimage] = useState("");

  const [showF, setShowF] = useState(false);
  const token = window.localStorage.getItem("token");

  const handleCloseF = () => {
    // const form = new FormData();
    // form.append("name", itemname);
    // form.append("description", description);
    // form.append('itemPictures',itemname)
    const payload = {
      name: itemname,
      description: description,
      itemPictures: itemimage,
    };
    console.log(payload);
    axios({
      url: "http://localhost:5000/founditem",
      method: "POST",
      data: payload,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
      credentials: "include",
      // url: "http://localhost:5000/login"
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    setShowF(false);
  };
  const handleShowF = () => setShowF(true);

  return (
    <>
      <Button variant="primary" onClick={handleShowF}>
        Found Item
      </Button>

      <Modal
        show={showF}
        onHide={handleCloseF}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Found item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                type="file"
                id="formimage"
                label="Image input"
                onChange={(e) => setitemimage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowF(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseF}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Found_item;
