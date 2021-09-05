import React, {useEffect, useState} from "react";
import axios from "axios";
import { Breadcrumb, Button, Image, Card} from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import Clamp from 'react-multiline-clamp';

const Series = ({ match }) => {

    let id = match.params.id;

    const [series, setSeries ] = useState([])
    const [picture, setPicture] = useState([]);
    const [errors, setErrors] = useState([]);
    const [view, setView] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [episodeID, setEpisodeID] = useState(0);
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

    const getEpisodes = async (event) => {
        event.preventDefault()
        let betaseriesURL = process.env.REACT_APP_API_URL+"shows/episodes";

        const response =  await axios.get(betaseriesURL, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
                id: id,
                season: event.target.dataset.season

            }
        })
        setEpisodes(response.data.episodes)
        setEpisodeID(response.data.episodes.id)
    }

    const season = (nbSeason) => {

        return (
            <div className="season mt-2">
                {/* <Button variant="primary" data-season={nbSeason} onClick={getEpisodes}>Afficher</Button> */}
                <h3 class="w-25 text-center d-block mx-auto bg-primary bg-opacity-25 p-2 rounded">Saison {nbSeason}</h3>
                <div data-season={nbSeason} onLoad={getEpisodes}>
                    <div class="d-flex flex-wrap gap-5 mt-4">
                     {    
                        episodes.map((item) => {
                            return (
                                <div class="episodes">

                                    <Card border="primary" style={{ width: '17rem', height: 'auto' }}>           
                                        <Card.Body>
                                        <Card.Title className="p-2 text-center">{item.title}</Card.Title>
                                            <Clamp withTooltip lines={4}>
                                                <p>{item.description}</p> 
                                            </Clamp>                                       
                                            {/* <Card.Text>
                                                Résumé : {item.description}
                                            </Card.Text> */}
                                            <Card.Text>
                                                Date de sortie : {item.date}
                                            </Card.Text>

                                            <div class="d-flex justify-content-start">
                                            <Card.Text className="mt-1" style={{ color: 'gray'}}>{item.note.mean.toFixed(2)} / 5  </Card.Text>
                                            <Card.Text className="ms-1 p-1" style={{ color: 'gold'}}> <FaStar/></Card.Text>
                                            </div>
                                            <Button variant="primary" href="#" className="d-block mx-auto"> Épisode {item.episode}</Button>
                  
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            </div>)
    }

    const printSeason = () => {
        let nbSeason = series.seasons;
        let res = []

        for (let i = 1; i <= nbSeason; i++){
            res[i] = season(i)
        }

        return res
    }

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
                             <h3 className="p-2">Description :</h3>
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
            
                <div className="mt-5 p-3 bg-light pb-5">
                   <div class="d-flex justify-content-between mt-4 p-2 mb-5">
                        <h1 class="fs-2 me-4">Liste des saisons :</h1>
                        <Button variant="primary" onClick={getEpisodes} className="px-3 bg-primary bg-opacity-75">Afficher les épisodes</Button>
                    </div>
                    {
                        printSeason()
                    }
                </div>
            </div>
    );
}

export default Series;