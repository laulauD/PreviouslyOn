import axios from "axios";
import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import Clamp from 'react-multiline-clamp';
import { FaStar, FaHeart} from 'react-icons/fa';

const Allseries = () => {

    let betaseriesURLShows = process.env.REACT_APP_API_URL+"shows/discover";
    const [shows, setShows] = useState([]);
    const [errors, setErrors] = useState([])

    const getShows = () => {

        axios.get(betaseriesURLShows, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
            }
        }).then(response => {
            setShows(response.data.shows);
        }).catch(error => {
            setErrors(error.response);
        });
    }

    useEffect(() => {
        getShows();
    }, []);


    return (
        <div className="container mt-2">
        <h1 class="text-center m-5 text-dark bg-opacity-25 bg-primary py-3">Toutes les séries</h1>
            <div class="d-flex flex-wrap gap-4 bg-light">

                {
                   shows.length !== 0 && (
                    shows.map((item) => {
                     return <div class="m-2">              
                        <Card border="primary" style={{ width: '18rem', height: 'auto' }}>
                             <Card.Img variant="top" src={item.images.poster} height="360" weight="286" />                  

                           <Card.Body>
                                <Card.Title style={{ textAlign: 'center'}}>{item.title}</Card.Title>
                             
                                <Clamp withTooltip lines={3}>
                                    <p className="m-2">{item.description}</p>
                                </Clamp>

                                <Card.Text style={{ color: 'black', margin: '2px' }}>Disponible sur : {item.network}  </Card.Text>
                                <Card.Text style={{ color: 'black', margin: '2px' }}>Followers : {item.followers} personnes </Card.Text>
                                <Card.Text style={{ color: 'black', margin: '2px' }}>Date de création : {item.creation}  </Card.Text>
                                {/* <Card.Text style={{ color: 'gray', padding: '3px' }}>genre : {item.genres.}  </Card.Text> */}
                                
                                <div class="d-flex justify-content-end">
                                            <Card.Text style={{ color: 'black', margin: 'none', marginRight: '10px' }}>{item.notes.mean.toFixed(2)} / 5  </Card.Text>
                                            <Card.Text style={{ color: 'gold', margin: '-3px' }}>  <FaStar/> </Card.Text>
                                </div> 


                                <div class="d-flex justify-content-between">
                                <Button variant="primary" href={"/shows/"+item.id}>Infos</Button>
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
    )
}

export default Allseries;