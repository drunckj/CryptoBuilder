import React, { useState } from "react";
import { Col, Row, Form, Modal, Button } from "react-bootstrap";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";
import DisplayModal from "./modal";
import QRCodeComponent from "./qrCode";
import LoadingAnimation from "./animation/loadingAnimation";
var wallet; 

const CreateToken = (props) => {
  const[showModal,setModalstate]=useState(false)
  const[showAnimation,setAnimationState]=useState(false)
  const [inputVal, setInputVal] = useState([
    { title: "Token name", value: "",placeholder:"Name of Coin" },
    { title: "Token Symbol", value: "", placeholder:"Symbol you want to give to your coin"  },
    { title: "Mint authority", value: props.data?.Wallet, isDisabled: true },
    {
      title: "Freeze authority",
      value: props.data?.Wallet,
      isDisabled: true,
    },
    { title: "Decimals", value: "",placeholder:"Enter the number of coins you want to mint"  },
  ]);


  const [qrCodePage, setQrCodePage] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
const [sentence,setsentence]=useState("")
  function Createcoin(){
   var obj =new Object()
  
   if(isNaN(parseInt(inputVal[4].value)) && inputVal[4].value!="")
   {
     setsentence("Enter a Decimal Value for Coins")
      setModalstate(true)
      return
   }
   if(inputVal[0].value==="")
   {
     setsentence("Please enter a value for CoinName")
      setModalstate(true)
      return
   }
   if(inputVal[1].value==="")
   {
     setsentence("Please enter a value for CoinSymbol")
      setModalstate(true)
      return
   }
   
   
   obj.coinname=inputVal[0].value;
   obj.coinsymbol=inputVal[1].value;
   obj.amount=inputVal[4].value;

 fetch("http://localhost:5000/create", {
        method: "POST", // or 'PUT'
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
      .then((res) => res.text())
        .then((data) => (wallet = data))
        .then(() => {
          console.log("Success:", wallet);
          console.log(isSwitchOn)
          setAnimationState(false) 
          setQrCodePage(true) 
        });      
  }

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  

  function renderForm() {
    return inputVal.map((item, index) => {
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
              borderRadius:"20px",
              //boxShadow:"0px 0px 5px 0px  #ffffff  ",
              backgroundImage:
              "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
              //backgroundColor:" #06C0A5 " 
            }}
          >
            <div>
              <Row>
                  <h6 style={{ color: "white", fontWeight: 'bold', fontSize: '20px' }}>{item.title}</h6>
              </Row>
            </div>
          </Col>
          <Col lg={4} style={{ paddingLeft: "2px", paddingRight: "2px" }}>
            <input placeholder={item.placeholder} 
            onChange={(e)=> {
              let obj=[
                ...inputVal
              ]
              obj[index].value=e.target.value;
              setInputVal(obj)
            }}
              disabled={item.isDisabled}
              style={{textAlign:"center", backgroundColor:"#  ADD8E6",border: "none", width: "100%", height: "100%", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px" }}
              value={item.value}
            />
          </Col>
        </Row>
      );
    });
  }


  return (
    <>
    {/*showModal && <DisplayModal data={sentence}/>*/}
    {
      <Modal backdrop="static" show={showModal} centered>
      <Modal.Body style={{ textAlign: "center", fontWeight: "bold" }}>
      {sentence}
      </Modal.Body>
      <Modal.Footer style={{ textAlign: "center" }}>
        <Button variant="danger" onClick={() => setModalstate(false)}>
          OK
        </Button>
        </Modal.Footer>
        </Modal>
    }
    {showAnimation && <LoadingAnimation/>}
      {qrCodePage && <QRCodeComponent data={wallet} />}
      {!qrCodePage && (
        <div
          style={{
            borderRadius: "20px",
          }}
          className="m-4 customShadow"
        >
          <div className="p-3" style={{ textAlign: "center" }}>
            <h4 style={{ color: "white",fontWeight:'bold' }}>Token Management</h4>
            <hr style={{ color: "white" }} />
          </div>
          <Row className="m-3">
            <h3 style={{ color: "white" }}>Create SPL Token</h3>
            <p style={{ color: "white" }}>
              Creating a SPL token with SolMinter is easy as 1,2,3. start with
              the basic requirements: Mint authority, freeze, authority and
              number of decimals.
              <br />
              <AiOutlineInfoCircle color="red" size={25} /> it takes 1 SOL to
              mint a token
            </p>
          </Row>
          {/* <Row>
            <div className="text-center py-3">
              <Form>
                <Form.Check
                  inline
                  style={{ color: "white"}}
                  label="Limit Supply"
                  name="group1"
                  type="checkbox"
                />
              </Form>
            </div>
          </Row> */}
          <div className="py-3 px-3">{renderForm()}</div>
          <Row>
            <div className="px-5" style={{textAlign:"center"}}>
              <Form>
                <Form.Check
                  onChange={onSwitchAction}
                  inline
                  style={{ color: "white",  fontSize: "20px"  }}
                  label="Limit Supply"
                  name="group1"
                  type="switch" 
                  checked={isSwitchOn}
                />
              </Form>
            </div>
          </Row>
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
                onClick={() => Createcoin()}
              >
                Create Token
              </button>
            </div>
          </Row>
        </div>
      )}
    </>
  );
};

export default CreateToken;
