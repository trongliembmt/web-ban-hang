import authenticationImage from '../../img/authentication/authentication.png';
import Header from '../Commons/Header';
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from '../Commons/Footer';
import {Toast} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {isEmpty} from "../../javascript/utils/Utils_Tai";
import {changePassError, loginError} from "../../redux/redux_tai/Action";
import {changePassword, checkLogin} from "../../javascript/api/Api_Tai";
import {useDispatch, useSelector} from "react-redux";
import {errorChangePassSelector} from "../../redux/redux_tai/Selectors";
import {useNavigate} from "react-router-dom";
const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Đổi mật khẩu", link: "/change-password"}]
function SectionChangePass(){
    const timeOut = 1500;
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");
    const [old_password, setOld_password] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_pass,setConfirm_pass] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const errorString = useSelector(errorChangePassSelector);

    useEffect(()=>{
        const storedEmail = localStorage.getItem("account");
        if(storedEmail){
            setEmail(storedEmail);
        }
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(old_password) || isEmpty(password) || isEmpty(confirm_pass)){
            dispatch(changePassError({
                errorChangePass: "Hãy điền đầy đủ thông tin"
            }))
        }else{
            checkLogin(email, old_password).then((check)=>{
                if(check){
                    if(password.localeCompare(confirm_pass) !==0){
                        dispatch(changePassError({
                            errorChangePass: "Xác thực mật khẩu không chính xác"
                        }))
                    }else{
                        setShowToast(true);
                        changePassword(email, password)
                        dispatch(changePassError({
                            errorChangePass: ""
                        }));
                        setOld_password('');
                        setPassword('');
                        setConfirm_pass('');
                        setTimeout(() => {
                            navigate('/');
                        }, timeOut);
                    }
                }else{
                    dispatch(changePassError({
                        errorChangePass: "Mật khẩu cũ không chính xác"
                    }))
                }
            })
        }
    }

    const handleInputOldPass = (e) =>{
        setOld_password(e.target.value)
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
                        <div className="h-100 d-flex align-items-center">
                            <form id="form-change-pass" className="m-0 p-5 text-center" onSubmit={handleSubmit}>
                                <h5 className="mb-4">Đổi Mật Khẩu</h5>
                                {errorString && <div className="alert alert-danger" role="alert">
                                    {errorString}
                                </div>}
                                <input onChange={handleInputOldPass} id="old-pass" className="w-100 mb-3 insert" type="password"
                                       placeholder="Mật khẩu cũ" name="old-pass"/>
                                <input onChange={handleInputPassword} id="new-pass" className="w-100 mb-3 insert" type="password"
                                       placeholder="Mật khẩu mới" name="new-pass"/>
                                <input onChange={handleInputRePassword} id="re-pass" className="w-100 mb-4 insert" type="password"
                                       placeholder="Xác nhận lại mật khẩu mới" name="confirm-pass"/>
                                <button className="btn next w-100 mb-3" id="confirm-change">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function ChangePassPage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionChangePass/>
            <Footer/>
        </>
    )
};