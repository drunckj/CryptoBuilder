import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
const DisplayModal=(props)=>{
    console.log(props)
    const[alertModal,setAlertModal]=useState(true)
    return(
<Modal backdrop="static" show={alertModal} centered>
          <Modal.Body style={{ textAlign: "center", fontWeight: "bold" }}>
          {props.data}
          </Modal.Body>
          <Modal.Footer style={{ textAlign: "center" }}>
            <Button variant="danger" onClick={() => setAlertModal(false)}>
              OK
            </Button>
            </Modal.Footer>
            </Modal>
    )};
export default DisplayModal;