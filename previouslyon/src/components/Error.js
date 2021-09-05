import React from 'react';
import './Error.css';

const Error = () => {

    return (
        <div class="er">
            <h1 class="error">404</h1>
            <p class="err">Oups! Page d'erreur..<br></br>Pas de panique.</p>
            <div class="align">
                <a class="backToHome" href="/">
                    Retour à l'accueil 
                </a>
            </div> 
        </div> 
    );
}

export default Error;

