import React,{useState, useEffect} from 'react';
import reactDom from 'react-dom';
import NavbarComponent from './navbar';
import { Col, Row, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import LoadingAnimation from "./animation/loadingAnimation";
var obj;var obj2;
const CoinDetail = () => {
  const[showAnimation,setAnimationState]=useState(true)
const [show, setShowState] = useState(false);
let str = String(window.location.href);
let index=str.indexOf('?')
let substring = str.substring(index+1);
var Token={
    'Token':substring
}

  useEffect(() => {
    fetch("http://localhost:5000/findcoin", {
      method: "POST", // or 'PUT'
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Token),
    })
    .then((res) => res.json())
      .then((data) => (obj = data))
      .then(() => {
        for(var i=0;i<obj.Coins.length;i++)
        {
          if(obj.Coins[i].Token===Token.Token)
          break
        }
          obj2={
                         "Token": obj.Coins[i].Token,
                         "Account":obj.Coins[i].Account,
                         "Coinname":obj.Coins[i].Coinname,
                         "CoinSymbol":obj.Coins[i].CoinSymbol,
                         "Amount":obj.Coins[i].Amount
                         }
        console.log(obj.Coins[i])
        setAnimationState(false)
        
        setShowState(true)
        console.log(obj)
        reactDom.unmountComponentAtNode(CoinDetail); 
      });
  })
     
return (<><NavbarComponent/>
{showAnimation && <LoadingAnimation/>}
    {show && <CoinDisplay data={obj2}/>}
    
    </>
)}
    

const CoinDisplay=(props)=>{
  console.log("me run")
  console.log(props.Token)  
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
    <div id="hello"
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
          
          </div>
      </Row>
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
              margin:"5px",
              borderRadius: "10px",
            }}
          > Mint Coins
          </button>
          <button
            style={{
              border: "2px",
              width: "20%",
              backgroundImage:
                "linear-gradient(to right top, #be0019, #b30039, #990057, #6c006f, #13097f)",
              color: "white",
              padding: "4px",
              borderRadius: "10px",
              margin:"5px"
            }}
          > Burn Coins
          </button>
          <button
            style={{
              border: "none",
              width: "20%",
              backgroundImage:
                "linear-gradient(to right top, #be0019, #b30039, #990057, #6c006f, #13097f)",
              color: "white",
              padding: "6px",
              margin:"5px",
              borderRadius: "10px",
            }}
          > Change Authority
          </button>


        </div>
      </Row>
    </div>
    
  );
};


export default CoinDetail;