import React from 'react';

import Header from '../Commons/Header'
import SectionBreadcrumb from '../Commons/SectionBreadcrumb'
import SectionCart from './SectionCart'
import Footer from '../Commons/Footer'
import {ModalPayment} from "../Commons/Modal"

function CartDetailPage() {

    const breadcrumbs = [{name: "Trang chủ", link: "/"}, {name: " Chi tiết giỏ hàng", link: ""}]

    return (
        <div>
            <Header/>
            <SectionBreadcrumb breadcrumbs={breadcrumbs}/>
            <SectionCart/>
            <Footer/>
            <ModalPayment/>
        </div>
    )
}

export default CartDetailPage;