import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaCoins, FaRocket, FaSnowflake, FaScroll } from "react-icons/fa";
import image from "../assets/image.png"
const NavbarComponent = (props) => {
  let width = window.innerWidth;

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ width: "100%" , backgroundColor: '#923cb5',backgroundImage: 'linear-gradient(90deg, rgba(2,6,57,1) 10%, rgba(0,0,0,1) 100%)', borderRadius:'40px'}}
      >
        <Container>
          <Navbar.Brand href="/" >
            <img
              alt=""
              src={image}
              
              width="120"
              height="40"
              className="d-inline-block align-top "
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

            <Nav>
              <Nav.Link href="/" className="mx-1">
                {width > 950 ? 
                <a style={{borderRadius:"5px", padding: "10px", boxShadow: `${window.location.href === 'http://localhost:3000/' || window.location.href ==="http://localhost:3000/dashboard" || window.location.href === 'http://localhost:3000/coindetail?*' ? '0px 14px 0px -12px  #FFFFFF' : ''}`
                ,fontSize:'15px'}} className="navbar-brand" >
                  
                  <FaCoins/>  Token Management
                  </a>
                : ( 
                  "Token Management"
                )}
              </Nav.Link>
              <Nav.Link href="/IDO" className="mx-1">
                {width > 950 ? 
                <a style={{borderRadius:"5px", padding: "10px", boxShadow: `${window.location.href === 'http://localhost:3000/IDO' ? '0px 14px 0px -12px  #FFFFFF' : ''}`, fontSize:'15px'}}className="navbar-brand" >
                <FaRocket /> Apply for IDO
                </a>  
                : (
                  "Apply for IDO"
                )}
              </Nav.Link>
              <Nav.Link href="/NFT" className="mx-1">
                {width > 950 ? 
                <a style={{ borderRadius:"5px", padding: "10px", boxShadow: `${window.location.href ===  'http://localhost:3000/NFT' || window.location.href === 'http://localhost:3000/NFTdetail?*' ||  window.location.href ===  'http://localhost:3000/NFTdashboard'  ? '0px 14px 0px -12px  #FFFFFF' : ''}`
                ,fontSize:'15px'}}
                className="navbar-brand" >
                  <FaSnowflake />  NFT
                  </a> : (
                  "NFT"
                )}
              </Nav.Link>
              <Nav.Link href="#" className="mx-1">
              {width > 950 ? 
              <a style={{ fontSize:'15px'}}className="navbar-brand" href="#">
              <FaScroll /> Documentation
              </a>
              : (
                  "Documentation"
                )}
              
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
