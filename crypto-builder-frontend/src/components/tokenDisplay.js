import React,{useState} from "react";
import { Col, Row } from "react-bootstrap";
import reactDom from "react-dom";
import { AiFillInfoCircle } from "react-icons/ai"; 
import LoadingAnimation from "./animation/loadingAnimation";
import NavbarComponent from "./navbar";


const TokenDisplay = (props) => {
var wallet=props.data?.Wallet
  async function MovetoWallet(){
    var obj
    var movedetails={
      'wallet': sessionStorage.getItem('wallet'),
      'amount': props.data?.Amount,
      'account': props.data?.Token

    }
    fetch("http://localhost:5000/move", {
      method: "POST", // or 'PUT'
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movedetails),
    })
      .then((res) => res.json())
      .then((data) => (obj = data))
      .then(() => {
        window.location.href="/dashboard"
      });
  }  
  console.log(props)
  const inputVal= ([
    { title: "Token name", value: props.data?.Coinname },
    { title: "Token Address", value: props.data?.Token },
    { title: "Token Symbol", value: props.data?.CoinSymbol },
    { title: "Mint authority", value: props.data?.Account, isDisabled: true },
    {
      title: "Freeze authority",
      value: props.data?.Account,
      isDisabled: true,
    },
    { title: "Decimals", value: props.data?.Amount },
  ]);
  function renderForm() {
    return inputVal.map((item) => {
      return (
        <Row
          style={{
            margin: "10px",
            justifyContent: 'center'
          }}
        >
          <Col
            lg={2}
            style={{
              justifyContent: "space-between",
              borderRight: "1px solid black",
              textAlign: "center",
              padding:"2px",
              borderRadius:"10px",
              backgroundImage:
                "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
            }}
          >
            <div>
              <Row>
                <Col lg={8} className="mt-2">
                  <h6 style={{ color: "white" }}>{item.title}</h6>
                </Col>
                <Col className="mt-1" style={{ textAlign: "center" }}>
                  <AiFillInfoCircle color="black" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={4} style={{ paddingLeft: "2px", paddingRight: "2px" }}>
            <input
              disabled={item.isDisabled}
              style={{
                borderRadius:"5px",
                border: "none",
                width: "100%",
                height: "100%",
                color: "black",
              }}
              value={item.value}
            />
          </Col>
        </Row>
      );
    });
  }

  return (
    <>
      {<div id="hello"
      style={{
        borderRadius: "20px"
      }}
      className="m-4 customShadow"
    >
      <div className="p-3" style={{ textAlign: "center" }}>
        <h4 style={{ color: "white" }}>Token Details</h4>
        <hr style={{ color: "white" }} />
      </div>
      <Row>
        <div className="text-center py-3" style={{color:"white", fontSize:"20px"}}>
          <p>Token Created.<br></br> The Details are given below.</p>
          </div>
      </Row>
      <div className="py-3 px-3">{renderForm()}</div>
      <Row>
        <div className="text-center py-3">
          
          <button
          onClick={MovetoWallet}
            style={{
              border: "none",
              width: "20%",
              backgroundImage:
                "linear-gradient(to right top, #be0019, #b30039, #990057, #6c006f, #13097f)",
              color: "white",
              padding: "6px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "10px",
            }}
          >
            Move to account
          </button>
        </div>
      </Row>
    </div>}
    </>
    
  );
};

export default TokenDisplay;
