import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Register.css';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const body ={
        username: username,
        email: email,
        password: password
    }

    const register =() =>{
        console.log(body);
        axios.request({
            method:'POST',
            url:'http://localhost:5000/api/auth/signup',
            headers:{
            'Content-Type': 'application/json'
        } ,
          params:{
              value:body
          }
             })
        .then(res =>{
            alert(res);
        })
        .catch(err =>{

            console.log(err);
        });
          
    }

    return (
        <div className="Register" >
         
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button onClick={()=>{register()}} block size="lg" type="submit" disabled={!validateForm()}>
                        Register
        </Button>
      </Form>
     
    </div>
  );
}