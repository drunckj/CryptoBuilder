import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import LoadingAnimation from "./animation/loadingAnimation";
import { AiOutlineCopy } from "react-icons/ai";
import TokenDisplay from "./tokenDisplay";

var QRCodeimage = require('qrcode.react');
var obj
const QRCode = (props) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const[showAnimation,setAnimationState]=useState(false);
  const [alertModal, setAlertModal]=useState(false);
console.log(props)
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
function mintcoins(){
  fetch("http://localhost:5000/createcoin", {
    method: "POST", // or 'PUT'
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({a: 1})
  })
    .then(response => response.json())
    .then((data) => (obj = data))
    .then(() => { 
      console.log(obj)
      setAnimationState(false)
      setShow(true);
    })
}


  function checkbalance(){
  fetch("http://localhost:5000/balance")
  .then(response => response.text())
    .then((data) => { 
      console.log(data)
      if(data==='1')
      {
        handleClose();
        setAnimationState(true)
        console.log("im running")
        mintcoins()       
        //
      }
      else{
        //need modal here
        handleClose();
        setAlertModal(true)
        //alert("1 Sol hasn't reached the wallet. Send if not already or wait for the amount to reach the walllet")
}});}
  return (
    <>
      {show && <TokenDisplay data={obj} />}
      {!show && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div id="alertmodal"
            className="customShadow px-5 py-4"
            style={{
              textAlign: "center",
              margin: "0",
              position: "absolute",
              borderRadius: "20px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage:"linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
            }}
          >
            <div 
              className="mb-4 my-3"
              style={{
                background: "white ",
                fontFamily: "Dancing Script, cursive",
                fontWeight: "bold",
                fontSize: "30px",
                borderRadius: "15px",
              }}
            >
              Transfer 1 sol
            </div>
            <div className="mt-3" style={{ color: "white" }}>
            <QRCodeimage value={props.data} />
            </div>
            <div>Scan the above QR code for the wallet address</div>
            <div style={{ fontWeight: 'bold'}}>OR</div>
            <div>Copy the below wallet address</div>
            <div
              className="mt-3 p-2"
              style={{ backgroundColor: "lightblue", borderRadius: "10px" }}
            >
              <Row>
                <Col lg={10}>{props.data}</Col>
                <Col>
                  <AiOutlineCopy
                    color="#F54748"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              </Row>
            </div>
            <button
              className="mx-3 my-3"
              style={{
                border: "none",
                padding: "10px 60px 10px 60px",
                backgroundColor: "#0A81AB",
                borderRadius: "10px",
              }}
              onClick={() => handleShow()}
            >
              Transferred
            </button>
          </div>
        </div>
      )}
      {showAnimation && <LoadingAnimation/>}
      {
        <Modal backdrop="static" show={showModal} onHide={handleClose} centered>
          <Modal.Body style={{ textAlign: "center", fontWeight: "bold" }}>
            Have you Transfered the coins?{" "}
          </Modal.Body>
          <Modal.Footer style={{ textAlign: "center" }}>
            <Button variant="danger" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="success"
              onClick={() => {
                checkbalance()
                //handleClose();
                //setShow(true);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {
        <Modal backdrop="static" show={alertModal} centered>
          <Modal.Body style={{ textAlign: "center", fontWeight: "bold" }}>
          1 Sol hasn't reached the wallet. Send if not already or wait for the amount to reach the walllet
          </Modal.Body>
          <Modal.Footer style={{ textAlign: "center" }}>
            <Button variant="danger" onClick={() => setAlertModal(false)}>
              OK
            </Button>
            </Modal.Footer>
            </Modal>
      }
      
    </>
  );
};

export default QRCode;
