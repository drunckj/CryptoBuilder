import React,{useState, useEffect} from 'react';
import reactDom from 'react-dom';
import NavbarComponent from './navbar';
import { Col, Row, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import LoadingAnimation from "./animation/loadingAnimation";
var obj;var obj2;
const NFTdetail = () => {
  const[showAnimation,setAnimationState]=useState(true)
const [show, setShowState] = useState(false);
let str = String(window.location.href);
let index=str.indexOf('?')
let substring = str.substring(index+1);
var Token={
    'Token':substring
}

  useEffect(() => {
    fetch("http://localhost:5000/findNFT", {
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
        for(var i=0;i<obj.NFT.length;i++)
        {
          if(obj.NFT[i].Account===Token.Token)
          break
        }
          obj2={
                         
                         "Account":obj.NFT[i].Account,
                         "NFTname":obj.NFT[i].NFTname,
                         "NFTSymbol":obj.NFT[i].NFTSymbol,
                         "attributes":obj.NFT[i].attributes,
                         "description":obj.NFT[i].description,
                         "image":obj.NFT[i].image
                         }
                         
        console.log(obj.NFT[i])
        setAnimationState(false)
        
        setShowState(true)
        console.log(obj)
        reactDom.unmountComponentAtNode(NFTdetail); 
      });
  })
     
return (<><NavbarComponent/>
{showAnimation && <LoadingAnimation/>}
    {show && <CoinDisplay data={obj2}/>}
    
    </>
)}
    

const CoinDisplay=(props)=>{
  console.log("me run")
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
        <h4 style={{ color: "white" }}>NFT Details</h4>
        <hr style={{ color: "white" }} />
      </div>
      <Row>
        <div className="text-center py-3" style={{color:"white", fontSize:"20px"}}>
          
          </div>
      </Row>
      <div className="text-center" id="img1"></div>
          <div className="text-center">
      <img src={props.data.image} width="256" height="256" />
      </div>
      <div className="py-3 px-3">{renderForm()}</div>
    </div>
    
  );
};


export default NFTdetail;