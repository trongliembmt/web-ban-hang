import Header from "./Header";
import Footer from "./Footer";
import {useSelector} from "react-redux";
import {buildQuery} from "../../javascript/utils";
import React, {useEffect, useState} from "react";
import {ProductContainer} from "../ListProductsPage/Products";
import SectionBreadcrumb from "./SectionBreadcrumb";
import {fetchCodes} from "../../javascript/api/Api_Dat";

export function Codes() {
    const likedCodes = useSelector(state => state.likedCodesReducer.liked)
    const ids = likedCodes.map((value) => value.id)
    const [data, setData] = useState([])

    useEffect(() => {
        if (ids.length > 0) {
            fetchCodes(buildQuery(ids)).then(json => setData(json.data))
        } else {
            setData(likedCodes)
        }
    }, [ids, likedCodes, setData])

    function breadcrumbs() {
        return [{name: 'Trang chủ', link: '/'}, {name: 'Codes đã thích', link: '/liked-codes'}]
    }

    return (
        <>
            <SectionBreadcrumb breadcrumbs={breadcrumbs()}/>
            <div className="container">
                <ProductContainer total={data.length} data={data} forLiked={true}/>
            </div>
        </>
    )
}

export function LikedCodes() {
    return (
        <>
            <Header/>
            <Codes/>
            <Footer/>
        </>
    )
}