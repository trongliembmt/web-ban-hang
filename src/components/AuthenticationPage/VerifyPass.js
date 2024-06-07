import authenticationImage from '../../img/authentication/authentication.png';
import Header from '../Commons/Header';
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from '../Commons/Footer';
import {Toast} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {isEmpty} from "../../javascript/utils/Utils_Tai";
import {useDispatch, useSelector} from "react-redux";
import {verifyPassError} from "../../redux/redux_tai/Action";
import {changePassword} from "../../javascript/api/Api_Tai";
import {errorVerifyPassSelector} from "../../redux/redux_tai/Selectors";

const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Quên mật khẩu", link: "/forgot-password"},
    {name: "Xác thực mật khẩu", link: "/verify-password"}]
function SectionVerifyPass(){
    const timeOut = 1500;
    const [showToast, setShowToast] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_pass,setConfirm_pass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorString = useSelector(errorVerifyPassSelector);
    useEffect(()=>{
        const storedForgotEmail = sessionStorage.getItem('email_forgot');
        if(!storedForgotEmail){
            navigate('/forgot-password')
        }
    },[])

    const handelSubmit = (e) =>{
        e.preventDefault();
        if(isEmpty(password) || isEmpty(confirm_pass)){
            dispatch(verifyPassError({
                errorVerifyPass: "Hãy điền đầy đủ thông tin"
            }))
        }else if(password.localeCompare(confirm_pass) !==0){
            dispatch(verifyPassError({
                errorVerifyPass: "Xác thực mật khẩu không chính xác"
            }))
        }else{
            const emailForgot = sessionStorage.getItem('email_forgot');
            dispatch(verifyPassError({
                errorVerifyPass: ""
            }))
            changePassword(emailForgot, password);
            setShowToast(true);
            setTimeout(() => {
                navigate('/login');
                sessionStorage.removeItem('email_forgot');
            }, timeOut);
        }
    }
    const handleInputPassword = (e) =>{
        setPassword(e.target.value)
    }
    const handleInputRePassword = (e) =>{
        setConfirm_pass(e.target.value)
    }
    return(
        <section className="form-input py-5">
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={timeOut} autohide>
                <Toast.Body className="text-white" style={{backgroundColor: '#7fad39'}}>
                    Đổi mật khẩu thành công!
                </Toast.Body>
            </Toast>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-12 d-flex align-items-center">
                        <img width="80%" src={authenticationImage} alt=""/>
                    </div>
                    <div className="col-lg-5 col-md-5 col-12">
                        <div className="h-100 d-flex align-items-center" onSubmit={handelSubmit}>
                            <form className="m-0 p-5 text-center">
                                <h5 className="mb-4">Quên Mật Khẩu</h5>
                                {errorString && <div className="alert alert-danger" role="alert">
                                    {errorString}
                                </div>}
                                <input onChange={handleInputPassword} id="new-pass" className="w-100 mb-4 insert" type="password"
                                       placeholder="Mật khẩu mới" name="new-pass"/>
                                <input onChange={handleInputRePassword} id="re-pass" className="w-100 mb-4 insert" type="password"
                                       placeholder="Xác nhận lại mật khẩu mới" name="confirm-pass"/>
                                <button type="submit" className="btn next w-100 mb-3">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function VerifyPassPage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionVerifyPass/>
            <Footer/>
        </>
    )
};