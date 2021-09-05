import React, {useEffect, useState} from 'react';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";

const NavBar = () => {

    const [isConnected, setIsConnected] = useState(null);
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Login");
        localStorage.removeItem("Id");
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) setIsConnected(true);
    }, [history]);

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="text-light" href="/">Previously On</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavDropdown title="Regarder" id="navbarScrollingDropdown" color="white">
                        {/* <NavDropdown.Item href="/shows/9669">Séries</NavDropdown.Item> */}
                        <NavDropdown.Item href="/series">Séries</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/allmovies">Films</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/news/20/false">Actualité</NavDropdown.Item>
                    </NavDropdown>

                    {isConnected && (
                            <Nav.Link href="/profil">Profil</Nav.Link>
                    )}
                      {isConnected && (
                            <Nav.Link href="/friendslist">Mes amis</Nav.Link>
                    )}
                    {isConnected && (
                        <Nav.Link href="/" onClick= {handleLogout}>Déconnexion</Nav.Link>
                    )}

                    {!isConnected && (
                        <Nav.Link href="/login">Connexion</Nav.Link>
                    )}

                </Nav>
                <Form className="d-flex me-3">
                    <FormControl
                        type="search"
                        placeholder="Recherchez..."
                        className="me-1 bg-light bg-opacity-50 text-dark"
                        aria-label="Search"
                    />
                    <Button variant="outline-light">GO</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;