import Header from '../Commons/Header';
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from '../Commons/Footer';
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {changeProfile, getProvinces, loadInfo} from "../../javascript/api/Api_Tai";
import {isEmail, isEmpty, isPhoneNumber} from "../../javascript/utils/Utils_Tai";
import {useDispatch, useSelector} from "react-redux";
import {profileError} from "../../redux/redux_tai/Action";
import {errorProfileSelector} from "../../redux/redux_tai/Selectors";
import Swal from "sweetalert2";

const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: "Hồ sơ cá nhân", link: "/profile"}]
function SectionProfile() {
    const [provinces, setProvinces] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorString = useSelector(errorProfileSelector);
    const storedEmail = localStorage.getItem('account');

    const [fullnameInput, setFullnameInput] = useState('');
    const [genderInput, setGenderInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [provinceInput, setProvinceInput] = useState('Thành phố Hà Nội');

    useEffect(() => {
        if (!storedEmail) {
            navigate('/login');
        }
    }, []);
    useEffect(()=>{
        try {
            getProvinces().then(data =>{
                setProvinces(data)
            })
        }catch (error) {
            console.error('Lỗi khi gọi API:', error)
        }
    },[])
    useEffect(()=>{
        try {
            loadInfo(storedEmail).then(data =>{
                setFullnameInput(data.fullname);
                setGenderInput(data.gender);
                setPhoneInput(data.phone);
                setEmailInput(data.personal_email);
                setAddressInput(data.address);
                setProvinceInput(data.province === ""? 'Thành phố Hà Nội': data.province);
            })
        }catch (error){
            console.error('Lỗi khi gọi API:', error)
        }
    },[])
    const handleLogout = () => {
        localStorage.removeItem('account');
        navigate('/');
    };

    console.log(fullnameInput);
    const handleInputFullname = (e) =>{
        setFullnameInput(e.target.value);
    }
    const handleInputPhone = (e) =>{
        setPhoneInput(e.target.value);
    }
    const handleInputEmail = (e) =>{
        setEmailInput(e.target.value);
    }
    const handleInputAddress = (e) =>{
        setAddressInput(e.target.value)
    }
    const handleInputGender = (e) =>{
        setGenderInput(e.target.value)
    }
    const handleInputProvince = (e) =>{
        setProvinceInput(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isEmpty(fullnameInput) || isEmpty(genderInput) || isEmpty(phoneInput) || isEmpty(emailInput)
        || isEmpty(addressInput) || isEmpty(provinceInput)){
            dispatch(profileError({
                errorProfile: "Hãy điền đầy đủ thông tin"
            }))
        }else if(!isEmail(emailInput)){
            dispatch(profileError({
                errorProfile: "Nhập đúng định dạng email"
            }))
        }else if(!isPhoneNumber(phoneInput)){
            dispatch(profileError({
                errorProfile: "Nhập đúng định dạng số điện thoại của Việt Nam"
            }))
        }else{
            dispatch(profileError({
                errorProfile: ""
            }))
            const data = {fullname: fullnameInput, gender: genderInput, phone: phoneInput, personal_email: emailInput,
            address: addressInput, province: provinceInput};
            console.log(data.fullname);
            changeProfile(storedEmail, data);
            Swal.fire({
                title: '',
                text: 'Cập nhập thông tin thành công',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000, // Thời gian tự động tắt thông báo sau 3 giây
                timerProgressBar: true // Hiển thị thanh tiến trình đếm ngược
            }).then(() => {

            });
        }
    }
    return (
        <section className="contact-us profile">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <div className="single-head">
                            <div className="single-info">
                                <div className="d-flex flex-column align-items-center text-center mb-5">
                                    <img className="rounded-circle" width="150px"
                                         src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                         alt=""/>
                                    <span className="font-weight-bold">{storedEmail}</span>
                                </div>
                                <ul>
                                    <li>
                                        <Link to="/change-password"><i className="bi bi-lock"></i> Đổi mật khẩu</Link>
                                    </li>
                                    <li>
                                        <a href="/" onClick={handleLogout}><i className="bi bi-box-arrow-in-right"></i> Đăng xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="form-main">
                            <div className="title-profile">
                                <h3>Hồ sơ của tôi</h3>
                                <p className="m-0">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            </div>

                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group">
                                            <label>Họ và tên</label>
                                            <input value={fullnameInput} onChange={handleInputFullname} name="name" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <div className="form-group sex">
                                            <label className="mr-4">Giới tính:</label>
                                            <div className="form-check form-check-inline mr-4 d-inline-flex  align-items-center">
                                                <input checked={genderInput === 'Nam'} onChange={handleInputGender} className="form-check-input" type="radio"
                                                       name="sex" id="male" value="Nam"/>
                                                    <label className="form-check-label d-inline-block ml-2"
                                                           htmlFor="male">Nam</label>
                                            </div>
                                            <div className="form-check form-check-inline mr-4 d-inline-flex  align-items-center">
                                                <input checked={genderInput === 'Nữ'} onChange={handleInputGender} className="form-check-input" type="radio"
                                                       name="sex" id="female" value="Nữ"/>
                                                <label className="form-check-label d-inline-block ml-2"
                                                       htmlFor="male">Nữ</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Số điện thoại<span>*</span></label>
                                            <input onChange={handleInputPhone} value={phoneInput} name="phone" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label>Email<span>*</span></label>
                                            <input onChange={handleInputEmail} value={emailInput} name="email_customer"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-12">
                                        <div className="form-group">
                                            <label>Địa chỉ<span>*</span></label>
                                            <input onChange={handleInputAddress} value={addressInput} name="address" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="form-group">
                                            <label htmlFor="company">Tỉnh / Thành phố<span>*</span></label>
                                            <select className="region" name="city" id="company" value={provinceInput === ""? "Thành phố Hà Nội": provinceInput} onChange={handleInputProvince}>
                                                {provinces.map(province =>(
                                                    <option key={province.code} value={province.name}>
                                                        {province.name}
                                                    </option>)
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="form-group button">
                                            <button type="submit" className="btn">Lưu</button>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-12">
                                        {errorString && <div className="alert alert-danger" role="alert">
                                            {errorString}
                                        </div>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function ProfilePage(){
    return(
        <>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionProfile/>
            <Footer/>
        </>
    )
};