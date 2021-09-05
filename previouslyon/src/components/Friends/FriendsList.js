import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button, Card, Form, FormControl} from "react-bootstrap";


const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [errors, setErrors] = useState([]);

    const handleDelete = async (event) => {
        event.preventDefault();
        let idFriend= event.target.dataset.idfriend
        let betaseriesURL = process.env.REACT_APP_API_URL+"friends/friend";
        console.log(idFriend)
        const response = await axios.delete(betaseriesURL, {
            params: {
                key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                v: 3.0,
                id: idFriend,
                token: localStorage.getItem("token")
            }
        }).catch((error) => {
            setErrors(error.response.data.errors[0].text);
        });
        setDeleteSuccess(true);
    };

    useEffect(() => {
        const getFriends = async () => {

            let betaseriesURL = process.env.REACT_APP_API_URL+"friends/list";

            const response =  await axios.get(betaseriesURL, {
                params: {
                    key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
                    v: 3.0,
                    token: localStorage.getItem("token")
                }
            })
            setFriends(response.data.users)
        }
        getFriends()
    }, [])


    return (

    <div className="container">
        <div>
            <h1 class="text-center mb-5 text-dark bg-opacity-25 bg-primary py-3">Vos amis : </h1>
                {
                    friends.length === 0 && (                      
                        <p class="text-center">Pas encore d'amis sur Betaseries ? Ajoutes-les sans attendre !</p>
                    )             
                }
                        <div class="d-flex flex-wrap gap-4 bg-light">
                                {
                                     friends.length !== 0 && (
                                        friends.map((item, index) => {
                                            return  <div class="m-2">
                        
                                                    <Card border="primary" style={{ width: '22rem', padding: '3%'}}>
                                                        <Card.Body>
                                                            
                                                            <Card.Title className="text-center">{item.login}</Card.Title>
                                                            
                                                            <Card.Text className="p-2">Vous pourrez ajouter des amis mais aussi recevoir les demandes d’amis.</Card.Text>
                                                            <Card.Text>Points d'experience : {item.xp} </Card.Text> 
                                                            {deleteSuccess &&
                                                                <p>L'ami a bien été supprimé.</p>
                                                            }
                                                           
                                                            <div class="d-flex justify-content-between">
                                                            <Button variant="primary" href="#"> Message </Button>
                                                            <Button variant="danger" data-idfriend={item.id} onClick={handleDelete}>Supprimer de vos amis</Button>
                                                            </div>
                                                        
                                                        </Card.Body>
                                                    </Card>
                                                     </div>
                                             }))}
                         </div>
                        <div className="w-75 my-5 mx-auto">
                            <h2 class="text-center my-3">Trouves et ajoutes tes amis !</h2>
                        <Form className="d-flex mt-4">
                            <FormControl
                                type="search"
                                placeholder="Recherchez vos amis..."
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">GO</Button>
                         </Form>
                         </div>
            </div>
       </div>
     
        
)}

export default FriendsList;