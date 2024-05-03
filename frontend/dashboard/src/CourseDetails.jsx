import React from 'react';
import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import './CourseDetails.css'; // Make sure to adjust the CSS file for Bootstrap compatibility
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';
function CourseDetails() {
  return (
    
    <Container style={{ backgroundColor: '#1f4e79' }}>
    <NavigationBar/>
    <Container fluid className="p-3" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
    
      {/* Navbar-like header with images and title */}
      
      <Row className="d-flex justify-content-between ">
        <Col><a href="#"><Link to="/back"><Image src="/collapse_content.png" alt="collapse content" /></Link></a></Col>
        <Col ><h3>תכנות מונחה עצמית בפיתון</h3></Col>
        <Col><a href="#"><Image className='keyboard_backspace' src="/keyboard_backspace.png" width="50" height="30" alt="nothing"/></a></Col>
      </Row>

      {/* Lecture times table */}
      <Row>
        <Col >
          <Table responsive="sm" className=" lecture-time"  >
            
              <tr>
                <th></th>
                <th></th>
                <th>יום בשבוע</th>
                <th>שעות</th>
                <th>הרצאות שהועברו</th>
              </tr>
            
            <tr>
                <td>הרצאות</td>
                <td>ד"ר חסידים יואש</td>
                <td>יום חמישי</td>
                <td>10:15 - 13:30</td>
                <td>6/12 </td>
                </tr>
                <tr>
                <td>תרגול</td>
                <td>מר דדון שלום</td>
                <td>יום חמישי</td>
                <td>08:30 - 10:00</td>
                <td>5/12</td>
                </tr>
           
          </Table>
        </Col>
      </Row>

      {/* Subject detail table */}
      <Row className='subject-detail'>
        <Col>
          <Table responsive="sm" >
            
              <tr>
                <th>מס"ד</th>
                <th>סוג המטלה</th>
                <th>שם המטלה</th>
                <th>מועד אחרון</th>
                <th>מועד בפועל</th>
                <th>סטטוס</th>
                <th></th>
                <th></th> 
                <th></th>
                <th></th>
              </tr>
            
            <tr>
                <td>1</td>
                <td>תיבת הגשה</td>
                <td>מטלת הגשה ראשונה</td>
                <td>28/01/24</td>
                <td>16/01/24</td>
                <td>הושלמה</td>
                <td><Image src="/library_books.svg" alt=""/></td>
                <td><Image src="/developer_guide.svg" alt=""/></td>
                <td><Image src="/calendar_clock.svg" alt=""/></td>
                <td><Image src="/bid_landscape.svg" alt=""/></td>
            </tr>  
          </Table>
            <div class="add-activity">
                <span><Link to="/ToDo"> &#65291; הוספת משימה אישית</Link></span>
            </div>
        </Col>
      </Row>

      {/* Example for a responsive dual-column layout for extra details */}
      <Row className="mb-3">
        <Col className="responsive-table-col" md={6} sm={12} >
          {/* Exam details table */}
          <Table responsive="sm" className='examZoom-records'>
          <tr>
                <th>מס"ד</th>
                <th>סוג מבחן</th> 
                <th>מועד מבחן</th>
                <th> שעות מבחן</th>
                <th>משך </th> 
                <th>מיקום</th>
            </tr>
            <tr>
                <td>1</td>
                <td>מבחן אמצע </td>
                <td>22/02/24</td>
                <td>09:00 - 11:00</td>
                <td>2 שעות</td>
                <td>מקוון</td>
            </tr>
            <tr>
                <td>2</td>
                <td>מבחן אמצע</td>
                <td>12/04/24</td>
                <td>09:00 - 12:00</td>
                <td>3 שעות</td>
                <td>טרם נקבע</td>
            </tr>
            <tr>
                <td>3</td>
                <td>מבחן אמצע</td>
                <td>01/05/24</td>
                <td>12:00 - 15:00</td>
                <td>3 שעות</td>
                <td>טרם נקבע</td>
            </tr> 
          </Table>
        </Col>
        <Col className="responsive-table-col" md={6} sm={12} >
          {/* Zoom details table */}
          <Table responsive="sm" className='examZoom-records'>
          <tr>
                <th>מס"ד</th>
                <th>סוג הקלטה</th> 
                <th>שם הקלטה</th>
                <th>מועד הקלטה</th>                               
                <th>סטטוס</th>
                <th></th>                              
            </tr>
            <tr>
                <td>1</td>
                <td>שיעור </td>
                <td>שיעור 1 הקלטה</td>
                <td>28/01/24</td>
                <td>נצפה</td>
                <td></td>                              
            </tr>
            <tr>
                <td>2</td>
                <td>תרגול </td>
                <td>תרגול 1 הקלטה</td>
                <td>04/02/24</td>
                <td>נצפה</td>
                <td></td>                                
            </tr>
            <tr>
                <td>3</td>
                <td>שיעור</td>
                <td>שיעור 2 הקלטה</td>
                <td>04/02/24</td>
                <td>נצפה</td>
                <td></td>                                
            </tr>
            <tr>
                <td>4</td>
                <td>תרגול </td>
                <td>תרגול 2 הקלטה</td>
                <td>11/02/24</td>
                <td>נצפה</td>
                <td></td>                                
            </tr>
            <tr>
                <td>5</td>
                <td>שיעור</td>
                <td>שיעור4 הקלטה  </td>
                <td>18/02/24</td>
                <td>טרם נצפה</td>
                <td></td>                                
            </tr>        
          </Table>
        </Col>
      </Row>
      
    </Container>
    </Container>
   
  );
}


export default CourseDetails;
