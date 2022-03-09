import React, { useState } from "react";
import { Col, Row, Modal,Button } from "react-bootstrap";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai";

import QRCodeComponent from "./qrCode";
import TokenDisplay from "./NFTdisplay";
import LoadingAnimation from "./animation/loadingAnimation";
var wallet; 

export const files = [];

var obj2 =new Object()
const CreateToken = (props) => {
  
  const[showAnimation,setAnimationState]=useState(false)
  const[showModal,setModalstate]=useState(false)
  const [inputVal, setInputVal] = useState([
    { title: "NFT name", value: "" ,placeholder:"Name of NFT" },
    { title: "NFT Symbol", value: "" ,placeholder:"Symbol you want to give to your NFT" }, 
    { title: "NFT Description", value: "" , placeholder:"Description fo your NFT" },
    { title: "NFT Attributes", value: "",placeholder:"Seperate attributes with commas" },
    { title: "NFT Value", value: "", placeholder:"Selling price of your NFT" },
    { title: "Mint authority", value: props.data?.Wallet, isDisabled: true },
    {
      title: "Freeze authority",
      value: props.data?.Wallet,
      isDisabled: true,
    },
  ]); 

  
  const [NFTDisplay, setNFTDisplay] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [sentence,setsentence]=useState("")
	
function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
}
  function Createcoin(){
    
   
 if(isFileImage(files[0])===false)
 {
  setsentence("Please upload only image file")
  setModalstate(true)
  return
 }
   if(isNaN(parseInt(inputVal[4].value)) && inputVal[4].value!="")
   {
    setsentence("Please enter the price of your value. Remember you'll have to transfer that much sol first inorder to mint it at that price")
      setModalstate(true)
      return
   }
   if(inputVal[0].value==="")
   {
     setsentence("Please enter a name for NFT")
      setModalstate(true)
      return
   }
   if(inputVal[1].value==="")
   {
     setsentence("Please enter a symbol for NFT")
      setModalstate(true)
      return
   }
   if(inputVal[2].value==="")
   {
     setsentence("Please enter some description for your NFT")
      setModalstate(true)
      return
   }
   if(inputVal[3].value==="")
   {
     setsentence("Please enter some attributes for your NFT")
      setModalstate(true)
      return
   }
  
   const formData = new FormData();
   formData.append('pic', files[0]);
   console.log(files[0])
   var obj =new Object()
   
   
   obj.NFTname=inputVal[0].value;
   obj.NFTsymbol=inputVal[1].value;
   obj.value=inputVal[4].value;
   obj.description=inputVal[2].value;
   obj.attributes=inputVal[3].value;
   formData.append('NFTname',obj.NFTname)
   formData.append('NFTsymbol',obj.NFTsymbol)
   formData.append('NFTdescription',obj.description)
   formData.append('NFTvalue',obj.value)
   formData.append('NFTattributes',obj.attributes)
    setAnimationState(true)
 
 fetch("http://localhost:5000/createNFT", {
        method: "POST", // or 'PUT'
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      })
      .then((res) => res.json())
        .then((data) => (obj2 = data))
        .then(() => {
          console.log("Success:", obj2);
          setAnimationState(false) 
          setNFTDisplay(true) 
        });      
  }

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const loadCoverImg = (event) => {
    var image = document.getElementById('img1');
    if(image != null){
      var url = URL.createObjectURL(files[0]);
      image.innerHTML = "<img width=\"200\" height=\"200\" class=\"output\" src=\"" + url + "\" alt=\"img\" >";
      
    }
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
              style={{ textAlign:"center",backgroundColor:"#  ADD8E6",border: "none", width: "100%", height: "100%", borderRadius:"10px", paddingLeft:"10px", paddingRight:"10px" }}
              value={item.value}
            />
          </Col>
        </Row>
      );
    });
  }


  return (
    <>{
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
    {NFTDisplay && <TokenDisplay data={obj2} />}
  {!NFTDisplay && (
        <div
          style={{
            borderRadius: "20px",
          }}
          className="m-4 customShadow"
        >
          <div className="p-3" style={{ textAlign: "center" }}>
            <h4 style={{ color: "white",fontWeight:'bold' }}>NFT Management</h4>
            <hr style={{ color: "white" }} />
          </div>
          <Row className="m-3">
            <h3 style={{ color: "white" }}>Create NFT</h3>
            <p style={{ color: "white" }}>
              Creating a NFT token with Cryptobuilder is easy as 1,2,3. 
              <br />
              <AiOutlineInfoCircle color="red" size={25} /> it takes a minute or two to mint a NFT. BE PATIENT.
            </p>
          </Row>
          <div className="text-center" id="img1"></div>
          <div className="text-center">
          <input style={{ color: 'white'}} name="image" id="file-upload" type="file" accept="image/png, image/jpg" onChange={(e) => {
            files[0] = e.target.files[0];
            loadCoverImg(e);
          }}/>
          </div>
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
                Create NFT
              </button>
            </div>
          </Row>
        </div>
      )}
    </>
  );
};

export default CreateToken;
