import authenticationImage from '../../img/authentication/authentication.png';
import logoGoogle from '../../img/authentication/logo-google.png';
import logoFacebook from '../../img/authentication/logo-fb.png';

import Header from '../Commons/Header';
import Footer from '../Commons/Footer';
import {Link, useNavigate} from "react-router-dom";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import React, {useEffect, useState} from "react";
import {hashText, isEmail, isEmpty} from "../../javascript/utils/Utils_Tai";
import {loginError} from "../../redux/redux_tai/Action";
import {checkEmailExists, checkLogin, getProvinces} from "../../javascript/api/Api_Tai";
import {useDispatch, useSelector} from "react-redux";
import {errorLoginSelector, errorRegisterSelector} from "../../redux/redux_tai/Selectors";

const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Đăng nhập", link: "/login"}]

function SectionLogin(){
    const timeOut = 2000
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const errorString = useSelector(errorLoginSelector);

    useEffect(()=>{
        const storedEmail = localStorage.getItem("account");
        if(storedEmail){
            navigate('/');
        }
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(email) || isEmpty(password)){
            dispatch(loginError({
                errorLogin: "Hãy điền đầy đủ thông tin"
            }))
        }else if(!isEmail(email)){
            dispatch(loginError({
                errorLogin: "Nhập đúng định dạng email"
            }))
        }else{
            checkEmailExists(email).then(emailExists => {
                if(!emailExists){
                    dispatch(loginError({
                        errorLogin: "Tài khoản không tồn tại vui lòng nhập lại!"
                    }))
                }else{
                    dispatch(loginError({
                        errorLogin: ""
                    }))
                    checkLogin(email, password).then((check)=>{
                        if(check){
                            navigate("/");
                            localStorage.setItem("account", email);
                        }else{
                            dispatch(loginError({
                                errorLogin: "Tài khoản hoặc mật khẩu không đúng. Vui lòng đăng nhập lại!"
                            }))
                        }
                    })
                }
            })
        }
    }
    const handleInputEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handleInputPassword = (e) =>{
        setPassword(e.target.value)
    }
    return(
        <section className="form-input py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-12 d-flex align-items-center">
                        <img width="80%" src={authenticationImage} alt=""/>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="h-100 d-flex align-items-center">
                            <form id="form-login" className="m-0 p-5 text-center" name="form_login" onSubmit={handleSubmit}>
                                <h5 className="mb-4">Đăng Nhập</h5>
                                {errorString && <div className="alert alert-danger" role="alert">
                                    {errorString}
                                </div>}
                                <input value={email} onChange={handleInputEmail} id="email" className="w-100 mb-3" placeholder="Email" name="email"/>
                                <input value={password} onChange={handleInputPassword} id="password" className="w-100 mb-4" type="password" placeholder="Mật khẩu"
                                       name="password"/>
                                <button type="submit" className="mb-4 btn next w-100">Đăng nhập</button>
                                <a id="google-login-button"
                                   className="google d-flex justify-content-center w-100 mb-3">
                                    <img src={logoGoogle} width="25px" className="mr-2"/>Google</a>
                                <a id="fb-login-button"
                                   className="google d-flex justify-content-center w-100 mb-3">
                                    <img src={logoFacebook} width="30px" className="mr-2"/>Facebook</a>
                                <span className="shotcut">
                                <Link className="mr-3" to="/forgot-password">Quên mật khẩu?</Link>
                                <Link to="/register">Đăng ký?</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function LoginPage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionLogin/>
            <Footer/>
        </>
    )
}