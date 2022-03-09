import React,{useState} from "react";
import { Col, Row } from "react-bootstrap";
import reactDom from "react-dom";
import { AiFillInfoCircle } from "react-icons/ai"; 
import LoadingAnimation from "./animation/loadingAnimation";
import NavbarComponent from "./navbar";

const TokenDisplay = (props) => {
console.log('hey its display')
console.log(props.data)
var obj
   function MovetoWallet(){
    console.log("me run")
    var movedetails={
      'wallet': sessionStorage.getItem('wallet'),
      'amount': 1,
      'account': props.data?.Account
    }
    console.log(movedetails)
    fetch("http://localhost:5000/moveNFT", {
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
        window.location.href="/NFTdashboard"
      });
  }  
  console.log(props)
  const [inputVal, setInputVal] = useState([
    { title: "NFT name", value: props.data.NFTname ,isDisabled: true},
    { title: "NFT Symbol", value:props.data.NFTSymbol,isDisabled: true}, 
    { title: "NFT Description", value: props.data.description,isDisabled: true },
    { title: "NFT Attributes", value: props.data.attributes,isDisabled: true},
    { title: "Mint authority", value: props.data.Account, isDisabled: true },
    {
      title: "Freeze authority",
      value: props.data.Account,
      isDisabled: true,
    },
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
        <h4 style={{ color: "white" }}>NFT Details</h4>
        <hr style={{ color: "white" }} />
      </div>
      <Row>
        <div className="text-center py-3" style={{color:"white", fontSize:"20px"}}>
          <p>NFT Created.<br></br> The Details are given below.</p>
          </div>
      </Row>
      <div className="text-center" id="img1"></div>
          <div className="text-center">
      <img src={props.data.image} width="256" height="256" />
      </div>
      <div className="py-3 px-3">{renderForm()}</div>
      <Row>
        <div className="text-center py-3">
          
          <button
          
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
            onClick={() => MovetoWallet()}
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
