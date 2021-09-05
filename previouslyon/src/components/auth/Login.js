import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormLabel } from '@material-ui/core';
import axios from "axios";
import md5 from "md5";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };


    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        let betaseriesURL = process.env.REACT_APP_API_URL+"members/auth";

        await axios.post(betaseriesURL, {
            key: process.env.REACT_APP_PRESVIOUSLYON_API_KEY,
            v: 3.0,
            login: email,
            password: md5(password),
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('Login', response.data.user.login);
            localStorage.setItem('Id', response.data.user.id);
            localStorage.setItem('name', response.data.user.name);
            history.push("/");
        })
        .catch((error) => {
            console.log(error.response.data.errors[0].text)
            setErrors(error.response.data.errors[0].text);
        });
    };

  
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) history.push("/");
    }, [history]);

    return (
        <div>
            <h1 class="text-center mt-4 text-secondary">
                Connexion Betaseries
            </h1>
          <div class="container w-75 p-3 mt-2">
            <form onSubmit={handleLogin} >
                <div class="m-4"> 
                <FormLabel class="m-2">Adresse email</FormLabel>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    color="primary"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Adresse mail"
                />
                </div>
           

                <div class="m-4"> 
                <FormLabel class="m-2">Mot de passe</FormLabel>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    color="primary"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Mot de passe"
                />
                </div>

                   <div>
                   { errors &&
                        <p severity="error" class="text-center d-block mx-auto m-2 w-25 py-3 h6 text-danger rounded">
                             {errors} 
                        </p>
                    }
                    </div>

                    <div class="mx-auto d-block w-75 text-center">
                        <Button type="submit" variant="contained" color="primary">
                            Connexion
                        </Button>
                    </div>
                 </form>
            </div>
        </div>
    );
};

export default Login;