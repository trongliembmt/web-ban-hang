import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/error-page-404.css';

export function ErrorPage404() {

    return (

        <div id="error-404-page">
            <div className="body-page">
                <div className="mars"></div>
                <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404"/>
                <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor"/>
                <p className="title">Oh no!!</p>
                <p className="subtitle">
                    <br/>Trang không tồn tại
                </p>
                <div align="center">
                    <Link className="btn-back" to="/">Trở về trang chủ</Link>
                </div>
                <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut"/>
                <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship"/>
            </div>
        </div>

    );
}
