import React, { Component } from "react";
import "../css/newSignup.css";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      info: "",
    };
  }
  // state={
  //     username:'',
  //     pass:'',
  //     cpass:''
  // }
  // handleChange=(event)=>{
  //     const target= event.target
  //     const name=event.name
  //     const value=event.value

  //     console.log("Event is :"+event)
  //     console.log("Event.target = "+target+"Event.name = "+name+"Event.value =  "+value)

  //     this.setState({
  //         [name]:value
  //     })
  // }
  submit = () => {
    this.setState({
      info: "",
    });
    // console.log("Inside Submit");
    // console.log(this.state);
    const payload = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      password: document.getElementById("password").value,
      cpassword: document.getElementById("cpassword").value,
    };
    // console.log(payload.username)
    axios({
      url: "https://lfs-backend.herokuapp.com/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        // console.log("Response is :", response);
        this.setState({
          info: response.data,
        });
        // console.log("Data has been sent")
        if (response.data === "Done") {
          this.props.history.push("/log-in");
        }
        // console.log(document.getElementById('password').value)
        // console.log(document.getElementById('cpassword').value)
        // if(document.getElementById('password').value==document.getElementById('cpassword').value){
        //     console.log('Client : Password did matched')
        //     // this.props.history.push('/log-in')
        // }
        // else{
        //     document.getElementById('message').innerHTML='pass did not match'
        //     console.log('Client : Password did not matched')
        // }
        // return <Redirect to='/log-in'/>
      })
      .catch(() => {
        console.log("Error occured");
      });
  };
  render() {
    // console.log("State is :"+ this.state)
    return (
      <>
        <Navbar />

        <div>
          <form className="Box-1">
            <h1 className="name">Sign up</h1>
            <p style={{ color: "white" }}>{this.state.info}</p>
            <div className="row1">
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="row1">
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="number"
                id="number"
                placeholder="Phone Number"
                required
                onChange={(e) => {
                  this.setState({ number: e.target.value });
                }}
              />
            </div>
            {/* <input type="text" name="username" id='username' placeholder="User Name" required onChange={(e)=>{this.setState({username:e.target.value})}} /> */}
            <div className="row1">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                required
                onChange={(e) => {
                  this.setState({ cpassword: e.target.value });
                }}
              />
            </div>
            <button type="button" className="submit" onClick={this.submit}>
              Submit
            </button>
            <p style={{ color: "white" }}>
              Have an account?{" "}
              <a style={{ color: "black" }} href="/log-in">
                Click here
              </a>
            </p>
          </form>
        </div>
        {/* <div className='Box-1'>
        <form>
          <h3>Sign Up</h3>
          <p style={{color:'white'}}>{this.state.info}</p>
          <div className="row1">
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              placeholder="First name"
              required 
              onChange={(e)=>{this.setState({firstname:e.target.value})}}
            />
          </div>

          <div style={{marginLeft:"2%"}} className="form-group">
            <label>Last name</label>
            <input
              id="lastname"
              type="text"
              className="form-control"
              placeholder="Last name"
              required 
              onChange={(e)=>{this.setState({lastname:e.target.value})}}
            />
          </div>
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
                id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              required 
              onChange={(e)=>{this.setState({email:e.target.value})}}
            />
          </div>

          <div className="row1">
          <div className="form-group">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              required 
              onChange={(e)=>{this.setState({password:e.target.value})}}
            />
          </div>
          <div style={{marginLeft:"2%"}} className="form-group">
            <label>Confirm Password</label>
            <input
              id="cpassword"
              type="password"
              className="form-control"
              placeholder="Confirm password"
              required 
              onChange={(e)=>{this.setState({cpassword:e.target.value})}}
            />
          </div>
          </div>

          <button onClick={this.submit} type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href='/log-in'>login in?</a>
          </p>
        </form>
        </div> */}
      </>
    );
  }
}
