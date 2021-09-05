import React from 'react';
import Button from "@material-ui/core/Button";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container } from "react-bootstrap";

const Home = () => {
  
    return (
       <div class="container">
        <h1 class="text-center mt-3 mb-4 text-dark bg-opacity-25 bg-primary py-3">Salut {localStorage.getItem('Login')} ! </h1>
            <Container style={{ width: '65%', margin: 'auto' }}>
                 <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./bluebg.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Bienvenue sur Previously On</h3>
                        <p>Un site créée avec React, et l'API de betaseries.</p>
                        <img src="./popcorn.png" class="m-3 w-25 sm-m-1"></img>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./bluebg3.jpg"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Connectez-vous avec votre compte betaseries</h3>
                        <p class="my-3">Retrouvez toutes vos séries, vos films, vos amis.</p>

                        <Button href="/login" variant="contained" color="primary" style={{ marginBottom: '70px' , marginTop: '30px'}}>
                            Connexion
                        </Button>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./bluebg2.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Le meilleur site pour savoir exactement ce que vous avais vu, et ce que vous devez voir.</h3>
                        <img src="./movies.png" class="m-3 mb-5"></img>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>       
            </div> 
    );
}

export default Home;