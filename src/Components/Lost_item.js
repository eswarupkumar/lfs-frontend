import React, { useState } from "react";
import axios from "axios";
import lodash from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import { useToasts } from "react-toast-notifications";
import { Button, Modal, Form } from "react-bootstrap";
function Lost_item() {
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const token = window.localStorage.getItem("token");

  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [type, settype] = useState("");
  const [alertshow, setalertShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    // const form = new FormData();
    // form.append("name", itemname);
    // form.append("description", description);
    // form.append('itemPictures',itemname)
    // const payload = {
    //   name: itemname,
    //   description: description,
    //   type:type,
    //   itemPictures: itemimage,
    // };
    // console.log(payload)
    if (itemname && description && type) {
      console.log("Item image : ", itemimage);
      const info = new FormData();
      info.append("name", itemname);
      info.append("description", description);
      info.append("question", itemquestion);
      info.append("type", type);
      itemimage.map((itemImage) => {
        info.append("itemPictures", itemImage, itemImage.name);
      });

      axios({
        url: "http://localhost:5000/postitem",
        method: "POST",
        data: info,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
        credentials: "include",
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
        // url: "http://localhost:5000/login"
      })
        .then((response) => console.log(response))
        .then(() => {
          // eslint-disable-next-line no-lone-blocks
          addToast("Wohoo 🤩! Item listed successfully.", {
            appearance: "success",
          });
          setitemname("");
          setdescription("");
          settype("");
          setitemquestion("");
          setitemimage([]);
          console.log("Executed");
          setShow(false);
        })
        .catch((err) => {
          console.log(err);
          addToast("Oops 😞! Check internet connection or try again later.", {
            appearance: "error",
          });
        });
    }
    else{
      addToast("Did you missed any of the required fields 🙄?", {
        appearance: "error",
      });
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Post Item
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item name<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter a question based on the item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex:- What is the color of the phone ?"
                value={itemquestion}
                onChange={(e) => setitemquestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Item type<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                onChange={(e) => settype(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File
                type="file"
                id="formimage"
                label="Image input"
                onChange={(e) => {
                  // console.log(e.target.files)
                  let { files } = e.target;
                  lodash.forEach(files, (file) => {
                    console.log(file);
                    setitemimage((item) => [...item, file]);
                  });
                }}
                multiple
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Lost_item;
