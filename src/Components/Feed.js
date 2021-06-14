import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Feed() {
  // console.log("Status :", LOGGED_IN)
  // const [user_info,setuser_info]=useState(localStorage.getItem("user"))
  // const [user_info,setuser_info]=useState(localStorage.getItem('user'))
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  // const [user_info,setuser_info]=useState('')
  // console.log(user_info)

  // const location = useLocation();
  // useEffect(()=>{
  //   if(location.user==null){
  //     console.log("if statement",user_info)
  //     // location.user=''
  //   }
  //   else{
  //     // console.log("Else",user_info)
  //     console.log(location.user)
  //     setuser_info(location.user)
  //     console.log(user_info)
  //     // console.log("Else statement",user_info)
  //   }
  // },[])
  // useEffect(()=>{
  //   console.log(location.user)
  //   localStorage.setItem('user',JSON.stringify(location.user))
  //   setuser_info((localStorage.getItem('user')))
  // },[])
  // console.log("User info is :", location.user);
  setConstraint(true);
  // var user_info
  // if(NEW_USER===false){
  //   user_info=location.user
  //   setUser(true)
  // }
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  useEffect(() => {
    // console.log("Test");
    Axios({
      url: "https://lfs-backend.herokuapp.com/getitem",
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.postitems;
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(created_date);
          // console.log(created_date.getDate()+"/"+created_date.getMonth()+"/"+created_date.getFullYear()+" "+created_date.getHours()+":"+created_date.getMinutes());
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          // category.postitem.findOne({createdBy: item.createdBy}).populate('name')
          // .exec(function (err, story) {
          //   if (err) return err
          //   console.log('The author is %s', story);
          //   // prints "The author is Ian Fleming"
          // });
          // console.log(item.itemPictures[0].img)
          if (item.type === "Lost" && item.status===true) {
            let user = false;
            if (item.createdBy === user_info._id) {
              user = true;
            }
            // console.log(item)
            // console.log("Lost item "+user+item.name)
            // console.log(`http://localhost:5000/${item.itemPictures[0].img}`)
            items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
              >
                <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card">
                    <Card.Img
                      variant="top"
                      src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          } else {
            var user1 = false;
            if (item.createdBy === user_info._id) {
              user1 = true;
            }
            // console.log("Lost item "+user1+item.name)

            Found_items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
              >
                <Col style={{ marginTop: "2%" }} md={3}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card" key={item.name}>
                    <Card.Img
                      variant="top"
                      src={`https://lost-and-found-system.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          }
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  },[]);

  return (
    <div>
      <div>
        <Navbar />
        <h2
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            marginLeft: "5px",
          }}
        >
          Welcome {user_info.firstname} 👋!
        </h2>
      </div>
      <div>
        <Container fluid>
          <h2 style={{ textAlign: "center" }}>Lost items :</h2>
          <div className="title-border"></div>
          <Row>{item}</Row>
        </Container>
      </div>
      <div>
        <Container fluid>
          {Found_item ? (
            <div>
              <h2 style={{ textAlign: "center" }}>Found items :</h2>
              <div className="title-border"></div>
              <Row>{Found_item}</Row>
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    </div>
  );
}
