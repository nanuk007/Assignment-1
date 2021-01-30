import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import axios from 'axios';
import "./Login.css";

export default function Dashboard() {

    var [cities, setCities] = useState([]);


    function getCities() {
        axios.get('http://localhost:5000/api/cities')
            .then(res => {

                if (res) {
                    setCities(res);
                }
            })
            .catch(err => {

                console.log(err);
            });

    }

    return (
        <div>
            <div class="row">
                <div class="col s12 m6 l12">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">List of Cities</span>
                        </div>

                    </div>
                </div>
            </div>

            {
                cities ? cities.forEach((data) => {

                    <Card>
                        <div class="row">
                            <div class="col s12 m6 l12">
                                <div class="card ">

                                    <span class="card-title">City:{data.name}</span>
                                    <span class="card-title">city:{data.state}</span>


                                </div>
                            </div>
                        </div>
                    </Card>
                })
                    : null
            }
        </div>
    );
}