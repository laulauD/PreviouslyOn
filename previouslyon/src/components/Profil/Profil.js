import {Container, Col, Row} from "react-bootstrap";
import {Button} from "@material-ui/core";
import "../Error.css";

const Profile = () => {
 
    return (
        <div>
            <h1 class="text-center mb-5 text-dark bg-opacity-25 bg-primary py-3"> Mon profil </h1>
            <Container fluid>
                <Row className="justify-content-center mt-4">
                    <Col md="auto p-5 m-2 rounded userseries"> <Button variant="contained" color="primary" href={"/myshows"}> Mes séries </Button></Col>
                    <Col md="auto p-5 m-2 rounded usermovies"><Button variant="contained" color="primary"  href={"/mymovies"}> Mes films </Button></Col>
                    <Col md="auto p-5 m-2 rounded userfriends"><Button variant="contained" color="primary"  href="/friendslist">  Mes amis  </Button></Col>
                    <Col md="auto p-5 m-2 rounded userparams"><Button variant="contained" color="primary" href={"#"}> Paramètres </Button></Col>
                </Row>
                <Row>
                    <Col className="mx-auto mt-5"><img src="/cdpgif.gif"></img>  <img src="/bb.gif"></img>  <img src="/op.gif"></img></Col>
                   
                </Row>
                </Container>

        </div>
    )
}

export default Profile;