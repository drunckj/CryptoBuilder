import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import "react-pro-sidebar/dist/css/styles.css";
import NavbarComponent from "./navbar";
import DashboardEntries from "./coindashboard";
import LoadingAnimation from "./animation/loadingAnimation";
import { FaScroll,FaWallet } from "react-icons/fa";
import Torus from "../assets/torus.svg"
import Phantom from "../assets/phantom.png"
import Solfare from "../assets/solfare.svg"

var wallet;
const ConnectToWallet = (props) => {
  const [show, setShow] = useState(false);
  const [showDashboard, setShowDashboardState] = useState(false);
  const [showNFTDashboard, setShowNFTDashboardState] = useState(false);
  const[showAnimation,setAnimationState]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getProvider = async () => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (isPhantomInstalled === true) {
      try {
        const resp = await window.solana.connect();
        resp.publicKey.toString();
      
      } catch (err) {}
      sessionStorage.setItem("wallet", window.solana.publicKey.toString())
       wallet = {
        'wallet': window.solana.publicKey.toString(),
      };
var obj;
      fetch("http://localhost:5000/authenticate", {
        method: "POST", // or 'PUT'
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wallet),
      })
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => {
          handleClose();
          if (props.data==="NFT")
          {
           window.location.href ="/NFTdashboard"
          }
          else{
          setShowDashboardState(true);
          }
        });
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  };

  return (
    <>
      <NavbarComponent  />
      {showDashboard && <DashboardEntries data={wallet} />}
      {!showDashboard && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              textAlign: "center",
              margin: "0",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              
            }}
          >
            <Button variant="success" size="lg" style={{  borderRadius:"20px",backgroundImage: 'linear-gradient(90deg, rgba(2,6,57,1) 10%, rgba(0,0,0,1) 100%)'   }} onClick={handleShow}>
              Connect To Wallet <FaWallet/>
            </Button>
            <p className="mt-3" style={{ color: "gray" }}>
              Please connect your wallet
            </p>
          </div>
          
          {
            <Modal show={show}  onHide={handleClose} centered size="sm">
              <Modal.Header style={{color:'white',backgroundImage:"linear-gradient(90deg, rgba(2,6,57,1) 10%, rgba(0,0,0,1) 100%)"}} closeButton>
                <Modal.Title>Select Wallet <FaWallet/></Modal.Title>
              </Modal.Header>
              <Modal.Body  style={{backgroundImage:'radial-gradient(circle, rgba(0,0,0,1) 58%, rgba(52,49,49,1) 100%)'}}>
                <Row style={{ padding: "10px" }}>
                  <Button style={{backgroundColor:'transparent', fontWeight:'bold', color:'white', borderRadius:'40px',borderColor:"white"}}
                    variant="warning"
                    size="lg"
                    onClick={() => {
                      //handleShow();
                      setAnimationState(true)
                      getProvider();
                    }}
                  >
                          Phantom  <img src={Phantom}  width="30px" height="30px" float="left"></img>
                  </Button>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Button  style={{borderColor:"white",background:'transparent',color:'white',fontWeight:'bold', borderRadius:'40px'}} variant="warning" size="lg" onClick={handleShow}>
                    Solfare  <img src={Solfare}  width="30px" height="30px" float="left"></img>
                  </Button>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Button style={{borderColor:"white",background:'transparent',color:'white', fontWeight:'bold', borderRadius:'40px'}} variant="warning" size="lg" onClick={handleShow}>
                  Torus  <img src={Torus}  width="30px" height="30px" float="left"></img>
                  </Button>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Button  style={{borderColor:"white",background:'transparent',color:'white', fontWeight:'bold', borderRadius:'40px'}} variant="warning" size="lg" onClick={handleShow}>
                    Ledger
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
          }
          {showAnimation && <LoadingAnimation/>}

          
        </div>
      )}
    </>
  );
};

export default ConnectToWallet;
