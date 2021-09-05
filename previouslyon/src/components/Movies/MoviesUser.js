import axios from "axios";
import {useEffect, useState} from "react";
import {Card, Col, Row, Button, Breadcrumb} from "react-bootstrap";
import Clamp from 'react-multiline-clamp';
import { FaStar, FaHeart} from 'react-icons/fa';

const MoviesUser = () => {

    let betaseriesURLMovies = process.env.REACT_APP_API_URL+"movies/member";
    let userId = parseInt(localStorage.getItem("Id"));
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([])

    const getMovies = () => {

        axios.get(betaseriesURLMovies, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
                id: userId,
            }
        }).then(response => {
            setMovies(response.data.movies);
        }).catch(error => {
            setErrors(error.response);
        });
    }

    useEffect(() => {
        getMovies();
    }, []);


    return (
        <div className="container mt-2">

        <Breadcrumb>
        <Breadcrumb.Item href="/profil">Mon profil</Breadcrumb.Item>
        <Breadcrumb.Item active>Mes films</Breadcrumb.Item>
        </Breadcrumb>

        <h1 class="text-center mb-5 text-dark bg-opacity-25 bg-primary py-3">Mes films</h1>


            <div className="film">
                {
                    movies.length === 0 && (
                        <p class="p-3 text-center">Aucun film dans votre liste pour l'instant..</p>
                    )
                }

            <div class="d-flex flex-wrap gap-4 bg-light">

                {
                   movies.length !== 0 && (
                    movies.map((item) => {
                     return <div class="m-2">              
                        <Card border="primary" style={{ width: '18rem', height: '27rem' }}>
                            <Card.Img variant="top" src={item.poster} height="170" weight="286" style={{ objectFit: 'cover'}}/>
                            <Card.Body>
                                <Card.Title style={{ margin: '5px'}}>{item.title}</Card.Title>

                                <Clamp withTooltip lines={3}>
                                    <p>{item.synopsis}</p>
                                </Clamp>
                                <div class="d-flex justify-content-start">
                                            <Card.Text style={{ color: 'gray', padding: '3px' }}>{item.notes.mean.toFixed(2)} / 5  </Card.Text>
                                            <Card.Text style={{ color: 'gold',padding: '1px' }}>    <FaStar/>  </Card.Text>
                                </div> 
                                <div class="d-flex justify-content-between">
                                <Button variant="primary" href={"/movies/"+item.id}>Infos</Button>
                                <Button variant="danger" href={"#"}> Ajouter au favoris <FaHeart class="mb-1 ms-1"/> </Button>
                                </div>                     
                            </Card.Body>
                        </Card>
            </div>
                    })
                )
            }
                </div>
            </div>
        </div>


    )
}

export default MoviesUser;