import axios from "axios";
import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import { FaStar, FaHeart} from 'react-icons/fa';

const Allmovies = () => {

    let betaseriesURLMovies = process.env.REACT_APP_API_URL+"movies/list";
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState([])

    const getMovies = () => {

        axios.get(betaseriesURLMovies, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
                order: "popularity",
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
        <h1 class="text-center m-5 text-dark bg-opacity-25 bg-primary py-3">Tous les films</h1>
            <div class="d-flex flex-wrap gap-4 bg-light">

                {
                   movies.length !== 0 && (
                    movies.map((item) => {
                     return <div class="m-2">              
                        <Card border="primary" style={{ width: '18rem', height: '14.5rem' }}>
                          <Card.Title className="text-center m-2 h-25">{item.title}</Card.Title>
                           <Card.Body>
                            <div className="sticky-bottom">
                                <Card.Text className="">Followers : {item.followers} personnes </Card.Text>
                                <Card.Text className="">Date de création : {item.production_year}  </Card.Text>

                                <div class="d-flex justify-content-between mt-3">
                                <Button variant="primary" href={"/movies/"+item.id}>Infos</Button>
                                <Button variant="danger" href={"#"}> Ajouter au favoris <FaHeart class="mb-1 ms-1"/> </Button>
                                </div>   
                             </div>
                            </Card.Body>
                        </Card>
            </div>
                    })
                )
            }
                </div>
            </div>
    )
}

export default Allmovies;