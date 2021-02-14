import React from 'react';
import Button from '@material-ui/core/Button';
import {auth, provider} from "../../firebase"
import "../styles/login.css"


function login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
    return (
        <div className="signin" >
            <Button  className="sign_button" variant="contained" color="primary" onClick={signIn}>
            Sign In
          </Button>
        </div>
    )
}

export default login
