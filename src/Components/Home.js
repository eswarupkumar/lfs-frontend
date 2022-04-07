import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "../css/landing.css";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
// import image from "../img/undraw_lost_bqr2.svg";
// import {annotate} from "rough-notation"
import image from "../img/lost-2.svg";
import developer from "../img/developer_outline I.svg";
import login from "../img/login-1.svg";
import list_item from "../img/list-item.svg";
import notification from "../img/notification.svg";
import github from "../img/github.svg";
import linkedin from "../img/linkedin.svg";
import instagram from "../img/instagram.svg";
import mail from "../img/mail.svg";
import feature from "../img/feature.svg";

// import image from "../img/earth.svg";
import { Container, Row, Button, Form } from "react-bootstrap";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const postitem = () => {
  //   if (localStorage.getItem("user") !== null) {
  //     console.log("User already logged in !");
  //   } else {
  //     console.log("Not logged in");
  //   }
  // };
  const ref = useRef();
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  // const e=document.getElementById('.title-h')
  // const annotation=annotate(e,{ type: 'underline' })
  // annotation.show()
  const sendMessage = () => {
    const data = {
      name,
      email,
      message,
    };
    Axios({
      method: "POST",
      url: "https://lfs-backend.herokuapp.com/sendmessage",
      data: data,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <Navbar />
      <div data-aos="fade-right" className="main">
        <div className="intro">
          <div className="part-1">
            <div className="title">
              <h1 id="title-h">Lost and Found</h1>
              <p>Lost it😕. List it📃. Find it🤩.</p>
              <Button
                variant="custom"
                size="lg"
                onClick={() => {
                  ref.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="part-2">
            <div className="image">
              <img
                src={image}
                style={{ width: "500px", height: "500px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="demo_video">
          <h6 className="section-heading">Working Demo 🚀</h6>
          <iframe
            className="yt_video"
            width="600"
            height="400"
            src="https://www.youtube.com/embed/7pioxo5yjGI?controls=0"
          ></iframe>
        </div>

        {/* <div className="post-item">
          <button class="button" onClick={postitem}>Post Item</button>
        </div>         */}
      </div>
      {/* <div className="project-inspiration">
        <h6>My Project Inspiration</h6>
        <p>Landy comes with multi-lingual support, all of the content is stored in the JSON files, so that you can manage the texts without having any prior knowledge in developing web applications using React.js.</p>
      </div> */}
      <div data-aos="fade-right">
        <Container fluid className="total-inspiration">
          <div>
            <img className="developer-img" src={developer} alt="" />
          </div>
          <Row className="inspiration">
            <h6 className="section-heading">My Project Inspiration💡</h6>
            <p>
              Colleges are the place where we come to home mentioning about
              losing our new earphone which might have kept in a desk but not
              sure if it's still there. This problem feels so relatable to most
              of the college students. A problem will still remain the same
              until someone builds a solution to it.
            </p>
            {/* <Button variant="custom" size="lg" onClick={()=>{ref.current.scrollIntoView({ behavior: 'smooth' })}}>
              Get Started
            </Button> */}
          </Row>
        </Container>
      </div>
      {/* <div data-aos="fade-left">
        <Container fluid>
          <div className="feature">
            <div>
              <h6 className="section-heading">What makes this Unique?</h6>
              <div>
                <p>
                  Personal informartion are is something which should be taken
                  utmost care and should be shared only to the right user.
                </p>
              </div>
            </div>
            <div>
              <img className="feature-img" src={feature} alt="" />
            </div>
          </div>
        </Container>
      </div> */}
      <div data-aos="fade-left">
        <Container fluid>
          <div className="total-about">
            <div ref={ref} className="about-heading">
              <h6 className="section-heading">How it works ⚒️?</h6>
            </div>
            <div className="about-card">
              <div className="info">
                <img
                  src={login}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>Create an account</h4>
                <p>Initially, you have to create an account to get started.</p>
                <a href="/log-in">
                  <Button variant="custom" size="lg">
                    Sign Up
                  </Button>
                </a>
              </div>
              <div className="info">
                <img
                  src={list_item}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>List Lost/Found Item</h4>
                <p>
                  List your item on the wall by filling certain details and
                  image. That's it !
                </p>
              </div>
              <div className="info">
                <img
                  src={notification}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
                <h4>Get Notified</h4>
                <p>
                  Once anyone posts an item, we make our registred users aware
                  about the same by sending notification .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div data-aos="fade-right">
        <Container fluid>
          <div className="total-contact-form">
            <div className="contact-title">
              <h6 className="section-heading"> Contact Form 📨📬</h6>
              <p>
                If there is something you want to suggest or may be just a hello
                do reach out.
              </p>
            </div>
            <div className="contact-form">
              <Form>
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address :</Form.Label>
                  <Form.Control
                    type="email"
                    size="lg"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message :</Form.Label>
                  <Form.Control
                    size="lg"
                    as="textarea"
                    rows={6}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="custom" onClick={sendMessage}>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>

      <div className="footer">
        <div className="social-icon">
          <a
            href="https://github.com/eswarupkumar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} className="icon github" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/e-swarup-kumar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} className="icon" alt="" />
          </a>
          {/* <a
            href="https://www.instagram.com/_swarup._.kumar_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} className="icon" alt="" />
          </a> */}
          <a
            href="mailto:eswarupkumar1111@silicon.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mail} className="icon" alt="" />
          </a>
        </div>
        <div className="personal-info">
          <p>Created with ❤️ using MERN by </p>
          <h4>
            <span className="symbol">&#60;</span>E Swarup Kumar
            <span className="symbol">/&#62;</span>
          </h4>
          <h6>Full Stack Developer</h6>
          {/* <a
            href="https://www.swarupwho.codes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h6>swarupwho.codes</h6>
          </a> */}
        </div>
        <h5 style={{ textAlign: "center" }}>
          Copyright © 2022 E Swarup Kumar. All rights reserved.
        </h5>
      </div>
      {/* <div className="About">
        <div>
          <h1>About the project</h1>
          <p>
            
          </p>
        </div>
      </div> */}
    </>
  );
}
