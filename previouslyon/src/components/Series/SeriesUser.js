import axios from "axios";
import {useEffect, useState} from "react";
import {Card, Button, Breadcrumb} from "react-bootstrap";
import Clamp from 'react-multiline-clamp';
import { FaStar, FaHeart} from 'react-icons/fa';

const SeriesUser = () => {

    let betaseriesURLSeries = process.env.REACT_APP_API_URL+"shows/member";
    let userId = parseInt(localStorage.getItem("Id"));

    const [series, setSeries] = useState([]);
    const [errors, setErrors] = useState([])

    
    const getSeries = () => {

        axios.get(betaseriesURLSeries, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
                id: userId,
            }
        }).then(response => {
            console.log(response.data.shows)
            setSeries(response.data.shows);
        }).catch(error => {
            setErrors(error.response);
        });
    }

    useEffect(() => {
        getSeries();
    }, []);

    return (
        <div className="container mt-2">

        <Breadcrumb>
        <Breadcrumb.Item href="/profil">Mon profil</Breadcrumb.Item>
        <Breadcrumb.Item active>Mes séries</Breadcrumb.Item>
        </Breadcrumb>

        <h1 class="text-center mb-5 text-dark bg-opacity-25 bg-primary py-3">Mes séries</h1>

            <div className="serie">
                {
                    series.length === 0 && (
                        <p>Aucune série pour le moment, allez decouvrir</p>
                    )
                }

                <div class="d-flex flex-wrap gap-4 bg-light">
                {
                    series.length !== 0 && (
                        series.map((item, index) => {
                            return  <div class="m-2">
           
                                    <Card border="primary" style={{ width: '18rem', height: '25rem' }}>
                                        <Card.Img variant="top" src={item.images.poster} height="170" weight="286" style={{ objectFit: 'cover'}}/>
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>

                                            <Clamp withTooltip lines={3}>
                                                <p>{item.description}</p>
                                            </Clamp>
                      
                                            <div class="d-flex justify-content-start">
                                            <Card.Text style={{ color: 'gray', padding: '3px' }}>{item.notes.mean.toFixed(2)} / 5  </Card.Text>
                                            <Card.Text style={{ color: 'gold',padding: '1px' }}>    <FaStar/>  </Card.Text>
                                            </div>

                                             <div class="d-flex justify-content-between">
                                            <Button variant="primary" href={"/shows/"+item.id}>Infos</Button>
                                            <Button variant="light" href={"#"} className=" border border-danger"> Ajouter au favoris <FaHeart className="text-danger mb-1"/> </Button>
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

export default SeriesUser;