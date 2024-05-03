import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavigationBar.css';

function NavigationBar() {
    const imgUrl="/studentDash.png";
    const imgUrl2="/sapir-logo.jpg";
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#1f4e79' }} variant="light" dir="rtl">
      <Container fluid style={{ position: 'relative', backgroundColor: '#1f4e79' }}>
      <Navbar.Brand href="#" style={{ position: 'relative', right: 0, display: 'flex', alignItems: 'center' }}>
          <img src={imgUrl} alt="Logo" width={200} className="d-inline-block align-top logo-image" style={{ borderRadius:10 }} />
          <Navbar.Text className="specialButton" style={{
            position: 'absolute',
            right: '85%', // Align to the left side of the Navbar.Brand
            whiteSpace: 'nowrap',
            transform: 'translateX(10%)', 
            backgroundColor: 'rgb(255, 192, 0)',
            border:'1px solid transparent',
            zIndex: 4,
            borderRadius:10,
            maxWidth: '100vw', // Maximum width can be 100% of the viewport width
            overflow: 'hidden', // Prevents overflow
            textOverflow: 'ellipsis',
          }}>
            הי הלן, ברוך שובך!
          </Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ position: 'absolute', left: 0, top:0, backgroundColor:'rgb(90, 228, 198)', }} />
        <Navbar.Collapse id="basic-navbar-nav" style={{zIndex:2}}>
          <Nav className="ms-auto" style={{ 
            position: 'absolute', 
            left: 80,
            border:'1px solid transparent',
            padding:'40px',
            borderRadius:"10px",
            backgroundColor:'rgb(90, 228, 198)',
            }}>
            <NavDropdown title="פרטי הסטודנט" id="student-details-dropdown">
              <NavDropdown.Item>הלן שוסטר</NavDropdown.Item>
              <NavDropdown.Item>222222223</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="מחלקה" id="department-dropdown">
              <NavDropdown.Item>ניהול תעשייתי</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="מגמה" id="specialization-dropdown">
              <NavDropdown.Item>מערכות מידע</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="שנת לימוד" id="study-year-dropdown">
              <NavDropdown.Item>ג</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="ממוצא ציונים" id="grades-origin-dropdown">
              <NavDropdown.Item>99</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <img src={imgUrl2} className='logo-image2' alt="College Logo" width={100}  style={{ 
            position: 'absolute', 
            left: 0, 
            top: '60%',
            transform: 'translateY(-50%)',
            zIndex:2,
            borderRadius:9 }} />
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
