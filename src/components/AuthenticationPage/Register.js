import authenticationImage from '../../img/authentication/authentication.png';
import Header from '../Commons/Header';
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from '../Commons/Footer';

import {Toast} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";

import {registerError} from "../../redux/redux_tai/Action";
import {hashText, isEmail, isEmpty} from "../../javascript/utils/Utils_Tai";
import {errorRegisterSelector} from "../../redux/redux_tai/Selectors";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {checkEmailExists, addAccount} from "../../javascript/api/Api_Tai";

const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Đăng ký", link: "/register"}]

function SectionRegister(){
    const timeOut = 2000
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_pass,setConfirm_pass] = useState("");
    const dispatch = useDispatch();
    const errorString = useSelector(errorRegisterSelector);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(email) || isEmpty(password) || isEmpty(confirm_pass)){
            dispatch(registerError({
                errorRegister: "Hãy điền đầy đủ thông tin"
            }))
        }else if(!isEmail(email)){
            dispatch(registerError({
                errorRegister: "Nhập đúng định dạng email"
            }))
        }else if(password.localeCompare(confirm_pass) !==0){
            dispatch(registerError({
                errorRegister: "Xác thực mật khẩu không chính xác"
            }))
        }
        else{
            checkEmailExists(email).then(emailExists => {
                if(emailExists){
                    dispatch(registerError({
                        errorRegister: "Tài khoản đã tồn tại vui lòng đăng ký email khác!"
                    }))
                }else{
                    setShowToast(true)
                    dispatch(registerError({
                        errorRegister: ""
                    }))
                    let hashPass = hashText(password);
                    let fullname = "";
                    let gender = "";
                    let phone = "";
                    let personal_email = email;
                    let address = "";
                    let province = "";
                    let account = {email, hashPass, fullname, gender, phone, personal_email, address, province};
                    addAccount(account).then(() =>{
                        setTimeout(() => {
                            navigate('/login');
                        }, timeOut);
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
    const handleInputRePassword = (e) =>{
        setConfirm_pass(e.target.value)
    }
    return(
        <section className="form-input py-5">
            {/*Thông báo Toast*/}
            <div>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={timeOut} autohide>
                    <Toast.Body className="text-white" style={{backgroundColor: '#7fad39'}}>
                        Đăng ký thành công!
                    </Toast.Body>
                </Toast>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-12 d-flex align-items-center">
                        <img width="80%" src={authenticationImage} alt=""/>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="h-100 d-flex align-items-center">
                            <form id="form-register" className="m-0 p-5 text-center" onSubmit={handleSubmit}>
                                <h5 className="mb-4">Đăng Ký</h5>
                                {errorString && <div className="alert alert-danger" role="alert">
                                    {errorString}
                                </div>}
                                <input value={email} onChange={handleInputEmail} id="email" className="w-100 mb-3" type="text" placeholder="Email" name="email"/>
                                <input value={password} onChange={handleInputPassword} id="password" className="w-100 mb-3" type="password" placeholder="Mật khẩu"
                                       name="password"/>
                                <input value={confirm_pass} onChange={handleInputRePassword} id="confirm-pass" className="w-100 mb-4" type="password"
                                       placeholder="Nhập lại mật khẩu" name="confirm-pass"/>
                                <button className="btn next w-100 mb-3">Tiếp theo</button>
                                <span className="shotcut">Bạn đã có tài khoản?
                                    <Link to="/login">Đăng nhập</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function RegisterPage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionRegister/>
            <Footer/>
        </>
    )
};