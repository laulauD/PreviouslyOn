import React from "react";
import { Col, Container, Row, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';

const FooterPage = () => {
  return (

  <div class="bg-primary bg-opacity-75 mt-4 border-top border-4 border-primary fontRobo">

      <Container fluid className="text-center">
        <Row>
        <Col md="6">
          <div class="container">
             <div class="row">
                <div class="m-2">
                     <h2 className="h2 roboto mt-3">Actifs sur tous vos réseaux</h2>
                     <div className="mx-auto p-2 d-flex gap-4 w-50">
                             <Button href="#" ><FaInstagram /></Button>
                             <Button href="#"><FaFacebook /></Button>
                             <Button href="#" ><FaGithub /></Button>
                             <Button href="#" ><FaLinkedin /></Button>
                             <Button href="/error" ><FaTwitter /></Button>
                     </div>
                               
                 </div>
                </div>
              </div>
           </Col>
         
          <Col md="6">
            <div class="container">
                <div class="row">
                    <div class="m-2">
                         <h5 className="h2 roboto my-3">Previously On </h5>
                           <ul>
                                <li class="d-inline m-3"><a href="#" class="text-dark text-decoration-none fs-5">Besoin d'aide ?</a></li>
                                <li class="d-inline m-1"><a href="#" class="text-dark text-decoration-none fs-5">F.A.Q</a></li>
                                <li class="d-inline m-3"><a href="#" class="text-dark text-decoration-none fs-5">Politique de confidentialité</a></li>
                                <li class="d-inline m-1"><a href="#" class="text-dark text-decoration-none fs-5">Contact</a></li>
                            </ul> 
                    </div> 
                </div> 
            </div> 
          </Col>
         </Row>
       </Container>

      <div className="pb-4 text-center">
        <Container fluid>
          &copy; {new Date().getFullYear()} - Site réalisé par Laurine Dewaele 
        </Container>
      </div>
  </div>

  );
}

export default FooterPage;