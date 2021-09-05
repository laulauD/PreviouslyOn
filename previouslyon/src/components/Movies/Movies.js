import React, {useEffect, useState} from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Image} from "react-bootstrap";
import { FaStar, FaHeart} from 'react-icons/fa';


const Movies = ({ match }) => {

    let id = match.params.id;

    const [movie, setMovie] = useState([]);
    const [errors, setErrors] = useState([]);
    const [favoriSuccess, setFavoriSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleFavori = async (event) => {
        event.preventDefault();

        let betaseriesURL = process.env.REACT_APP_API_URL+"movies/favorite";

        const response = await axios.post(betaseriesURL, {
            key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
            v: 3.0,
            id: id,
            token: localStorage.getItem("token")
        }).catch((error) => {
            setErrors(error.response.data.errors[0].text);
        });
        setFavoriSuccess(true);
    };

    useEffect(() => {
        const getMovie = async () => {

            let betaseriesURL = process.env.REACT_APP_API_URL+"movies/movie";

            const response =  await axios.get(betaseriesURL, {
                params: {
                    key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                    v: 3.0,
                    id: id
                }
            })
            setMovie(response.data.movie)
            setIsLoading(false)
        }
        getMovie()
    }, [])

    return isLoading ? <span>chargement</span> : (

        // series.map((serie) => {
        //     return
      
        <div className="container mt-2">

        <Breadcrumb>
        <Breadcrumb.Item href="/profil">Mon profil</Breadcrumb.Item>
        <Breadcrumb.Item href="/mymovies">Mes films</Breadcrumb.Item>
        <Breadcrumb.Item active>{movie.original_title}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 class="text-center my-4 text-primary">{movie.original_title}</h1>

        <div  class="d-flex justify-content-between">
            
            <Image src={movie.poster}  height="400" rounded />
           
                <div className="m-5 w-75">
                     <h3>Synopsis :</h3>
                         <p>{movie.synopsis}</p>
                            <h6 className="py-2">Année de production : {movie.production_year}</h6>
                            <h6 className="py-2"> Producteur : {movie.director} </h6>
                            <h6 className="py-2">Followers : {movie.followers} </h6>
                           

                              <div class="d-flex justify-content-start">
                                    <Card.Text style={{padding: '3px', marginRight: '3px' }}>{movie.notes.mean.toFixed(2)} </Card.Text>
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
                    {favoriSuccess &&
                    <p class="text-center fs-5">Le film a bien été ajouté aux favoris.</p>
                    }
                </div>
                <Button variant="danger" onClick={handleFavori}> Ajouter au favoris <FaHeart class="mb-1 ms-1"/> </Button>
            </div>


        </div>
        // })
    );
    // return (
    //     <div className="component-display">
    //
    //         {
    //             errorsList.length === 0 && (
    //                 <div>
    //                     <img src={movie.poster}/>
    //                 </div>
    //             )
    //         }
    //
    //         {
    //             errorsList.length === 0 && (
    //                 <div>
    //                     <h1>{movie.title}</h1>
    //                     <p>Description : {movie.synopsis}</p>
    //                     <p>Année de production : {movie.production_year}</p>
    //                     <p>Producteur : {movie.director}</p>
    //                     <p>Followers : {movie.followers}</p>
    //                 </div>
    //
    //             )
    //         }
    //     </div>
    //
    // )

};
export default Movies;