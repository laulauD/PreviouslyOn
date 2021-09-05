import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {Button} from "react-bootstrap";

const News = ({ match }) => {

    let config = {'Authorization': process.env.REACT_APP_PRESVIOUSLYON_API_KEY};
    let numberOfSeries = match.params.numberOfSeries;
    let betaseriesURL = "https://api.betaseries.com/news/last";
    let tailored;
  
    if (match.params.tailored === "true"){
        tailored = true;
    }else{
        tailored = false;
    }
    console.log(numberOfSeries)
    const [news, setNews] = useState([]);
    const [errors, setErrors] = useState([]);

    const getNews = () => {

        axios.get(betaseriesURL, {
            headers: config,
            params: {
                tailored: tailored,
                number: numberOfSeries,
                client_id: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
            }
        }).then (response => {
            setNews(response.data.news);
        }).catch(error => {
                setErrors(error.response);
            });

    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div>
             <h1 class="text-center mb-5 text-dark bg-opacity-25 bg-primary py-3">Toute l'actualité</h1>
                     <div className="container">
                        <div className="d-flex flex-wrap gap-4">
            {
                news.map((item, index) => {
                    return  <div>
                        <Card key={index} style={{ width: '25rem'}} >
                        <CardContent>
                            <div className="mb-4 d-block mx-auto" >
                            <img src={item.picture_url} style={{ width: '100%', height: '14rem'}}></img>
                            </div>
                            <Typography variant="h5" color="dark" >
                                {item.title}
                            </Typography>

                            <div class="d-flex mt-2 justify-content-between">                          
                            <Typography variant="body2" color="primary" style={{ marginTop: '5%'}}>
                                Publié le {item.date}
                            </Typography>   
                            <Button href={item.url} target="blank" className="float-end m-2"> Voir l'article </Button>          
                           </div>             

                        </CardContent>
                    </Card>
                    </div>
                   
                })
            }
            </div>

            </div>
        </div>
    )
}

export default News;