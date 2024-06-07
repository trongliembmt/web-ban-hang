import authenticationImage from '../../img/authentication/authentication.png';
import Header from '../Commons/Header';
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from '../Commons/Footer';
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {isEmail, isEmpty} from "../../javascript/utils/Utils_Tai";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassError} from "../../redux/redux_tai/Action";
import {errorForgotPassSelector} from "../../redux/redux_tai/Selectors";
import {checkEmailExists} from "../../javascript/api/Api_Tai";

const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Quên mật khẩu", link: "/forgot-password"}]
function SectionForgotPass(){
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const errorString = useSelector(errorForgotPassSelector);
    const navigate = useNavigate();
    const handleInputEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isEmpty(email)){
            dispatch(forgotPassError({
                errorForgotPass: "Hãy điền đầy đủ thông tin"
            }))
        }else if(!isEmail(email)){
            dispatch(forgotPassError({
                errorForgotPass: "Nhập đúng định dạng email"
            }))
        }else{
            checkEmailExists(email).then(check=>{
                if(check){
                    sessionStorage.setItem("email_forgot", email);
                    dispatch(forgotPassError({
                        errorForgotPass: ""
                    }))
                    navigate('/verify-password');
                }else{
                    dispatch(forgotPassError({
                        errorForgotPass: "Tài khoản không tồn tại vui lòng nhập lại!"
                    }))
                }
            })
        }
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
                            <form className="m-0 p-5 text-center" onSubmit={handleSubmit}>
                                <h5 className="mb-4">Quên Mật Khẩu</h5>
                                {errorString && <div className="alert alert-danger" role="alert">
                                    {errorString}
                                </div>}
                                <input onChange={handleInputEmail} id="email" className="w-100 mb-4" type="text" placeholder="Email" name="email"/>
                                <button type="submit" className="btn next w-100 mb-3">Xác nhận</button>
                                <span className="shotcut">
                                <Link className="mr-3" to="/login">Đăng nhập?</Link>
                                <Link to="/register">Đăng ký?</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function ForgotPassPage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionForgotPass/>
            <Footer/>
        </>
    )
};