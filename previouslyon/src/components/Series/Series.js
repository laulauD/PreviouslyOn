import React, {useEffect, useState} from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Card} from "react-bootstrap";
import EpisodesUser from "../Episodes/Episodes";
import { FaStar} from 'react-icons/fa';

const Series = ({ match }) => {

    let id = match.params.id;

    const [series, setSeries ] = useState([])
    const [picture, setPicture] = useState([]);
    const [errors, setErrors] = useState([]);
    const [archiveSuccess, setArchiveSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleArchive = async (event) => {
        event.preventDefault();

        let betaseriesURL = process.env.REACT_APP_API_URL+"shows/archive";

        const response = await axios.post(betaseriesURL, {
            key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
            v: 3.0,
            id: id,
            token: localStorage.getItem("token")
        }).catch((error) => {
            setErrors(error.response.data.errors[0].text);
        });
        setArchiveSuccess(true);
    };

    useEffect(() => {
        const getSeries = async () => {

            let betaseriesURL = process.env.REACT_APP_API_URL+"shows/display";

            const response =  await axios.get(betaseriesURL, {
                params: {
                    key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                    v: 3.0,
                    id: id
                }
            })
            setSeries(response.data.show)
            setPicture(response.data.show.images);
            setIsLoading(false)
        }
        getSeries()
    }, [])


    return isLoading ? <span>chargement</span> : (

            <div className="container mt-2">

                <Breadcrumb>
                <Breadcrumb.Item href="/profil">Mon profil</Breadcrumb.Item>
                <Breadcrumb.Item href="/myshows">Mes séries</Breadcrumb.Item>
                <Breadcrumb.Item active>{series.original_title}</Breadcrumb.Item>
                </Breadcrumb>

                <h1 class="text-center my-4 text-primary">{series.original_title}</h1>

                 <div  class="d-flex justify-content-between">
            
                    <Image src={picture.poster}  height="400" rounded />
                   
                        <div className="m-5 w-75">
                             <h3>Description :</h3>
                                 <p>{series.description}</p>
                                    <h6 className="py-2">Nombre de saisons : {series.seasons}</h6>
                                    <h6 className="py-2">Nombre d'épisodes : {series.episodes}</h6>
                                    <h6 className="py-2">Durée des épisodes : {series.length} minutes en moyenne</h6>
                                      <div class="d-flex justify-content-start">
                                            <Card.Text style={{padding: '3px', marginRight: '3px' }}>{series.notes.mean.toFixed(2)} </Card.Text>
                                            <Card.Text style={{ color: 'gold' , padding: '1px' }}>  <FaStar/> </Card.Text>
                                            <Card.Text style={{ color: 'gold' , padding: '1px' }}>  <FaStar/> </Card.Text>
                                            <Card.Text style={{ color: 'gold' , padding: '1px' }}>  <FaStar/> </Card.Text>
                                            <Card.Text style={{ color: 'gold' , padding: '1px' }}>  <FaStar/> </Card.Text>
                                            <Card.Text style={{ color: 'gold' , padding: '1px' }}>  <FaStar/> </Card.Text>
                                       </div>
                        </div>
                 </div>

                    <div>
                        <div class="error">
                            { errors &&
                            <p severity="error">{errors}</p>
                            }
                        </div>
                        <div className="success">
                            {archiveSuccess &&
                                <p class="text-center fs-5">La série a bien été archivé.</p>
                            }
                        </div>
                            <Button variant="primary" onClick={handleArchive}>Archiver cette série</Button>
                    </div>
                                
                 <div>
                  <EpisodesUser/>
                 </div>
            </div>
    );
}

export default Series;