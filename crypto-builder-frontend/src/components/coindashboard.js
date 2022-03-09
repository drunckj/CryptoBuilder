import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineCopy } from "react-icons/ai";
import "../index.css";

import CreateToken from "./createToken";
import LoadingAnimation from "./animation/loadingAnimation";
import Animation from "./animation/emptyAnimation";
import NavbarComponent from "./navbar";
var obj
const DashboardEntries=(props) =>{
  
  const[showAnimation,setAnimationState]=useState(true)
  const [showDashboard2, setShowDashboardState2] = useState(false);
   useEffect(() => {
    fetch("http://localhost:5000/authenticate", {
      method: "POST", // or 'PUT'
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    })
      .then((res) => res.json())
      .then((data) => (obj = data))
      .then(() => {
        console.log(obj)
        setAnimationState(false)
        setShowDashboardState2(true);
      });
   });
  
return(
  <>{showAnimation && <LoadingAnimation/>}
    { props.state && <NavbarComponent/> }
    {showDashboard2 && <Dashboard data={obj}/>}</>
)
}

const Dashboard = (props) => {
  console.log("im running")
  let width = window.innerWidth;
  var obj = props.data;
  const [show, setShow] = useState(false);

  function renderCoinDetails() {
    if (props?.data?.Coins?.length === 0 || props.data === null)
      return (
        <div className="text-center py-3">
          <Animation path="./noData.json" />
          <br />
          <h4 style={{ color: "white" }}>No coins available</h4>
        </div>
      );
    else {
      return props.data?.Coins?.map((item) => {
        return (
          <Row
            style={{
//              border: "1px solid blue",
              boxShadow:"0px 0px 9px 0px  #ffffff",
              margin: "20px",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            <Col lg={3}>
              <h5 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>NAME</h5>
              <h3 style={{color:"white", fontSize:"15px"}}>{item.Coinname}</h3>
            </Col>
            <Col lg={2}>
              <h5 style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>SYMBOL</h5>
              <h3 style={{color:"white", fontSize:"15px"}}>{item.CoinSymbol}</h3>
            </Col>
            <Col lg={4}>
              <h5 style={{color:"white", fontWeight:"bold",fontSize:"2  0px"}} >ADDRESS</h5>
              <h3 style={{color:"white", fontSize:"15px"}}>
              
                {item.Token}<AiOutlineCopy size={20} color="#06C0A5" />
              </h3>
              
            </Col>
            <Col lg={3} style={{ textAlign: "center", marginTop: "20px" }}>
              <button
              onClick={() =>{window.location.href=`/coindetail?${item.Token}`}}
                style={{
                  border: "none",
                  backgroundColor: " #06C0A5  ",
                  color: "white",
                  padding: "6px",
                  borderRadius: "10px",
                }}
              >
                View Details
              </button>
            </Col>
            
          </Row>
        );
      });
    }
  }

  return (
    <>
      {show && <CreateToken data={obj} />}
      {!show && (
        <div
          style={{
            borderRadius: "20px",
            height: "90%",
          }}
          className={`m-3 ${width > 950 ? "customShadow" : ""}`}
        >
          <div className="p-3" style={{ textAlign: "center" }}>
            <h4 style={{ color: "white" }}>Token Management</h4>
            <hr style={{ color: "white" }} />
          </div>
          <Row className="m-3">
            <h5 style={{ color: "white" }}>Tokens in your wallet: </h5>
            <p style={{ color: "white" }}>
              Any tokens minted using the address connected to Solminter will
              appear below. Please note: if you have transferred ownership of a
              token you've minted here, it will not appear below.
            </p>
          </Row>
          <Row>
            <div className="text-center py-3">
              <button
                style={{
                  border: "none",
                  width: `${width > 950 ? "20%" : "40%"}`,
                  backgroundImage:
                    "linear-gradient(to right top, #be0019, #b30039, #990057, #6c006f, #13097f)",
            
                
                  color: "white",
                  padding: "6px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "10px",
                }}
                onClick={() => setShow(true)}
              >
                Create A new SPL Token +
              </button>
            </div>
          </Row>
          <div style={{overflow: 'auto', maxHeight: '700px'}}>{renderCoinDetails()}</div>
        </div>
      )}
    </>
  );
};

export default DashboardEntries;
