import React from "react";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";
import {ProductsContent} from "./Products";

function HighQualityProducts() {
    return <ProductsContent group={'quality'}/>
}

export default function HighQualityCodes() {
    return (
        <>
            <Header/>
            <HighQualityProducts/>
            <Footer/>
        </>
    )
}