import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/slide.css'

import img_banner_1 from '../../img/banner/banner-1.jpg';
import img_banner_2 from '../../img/banner/banner-2.jpg';
import img_banner_3 from '../../img/banner/banner-3.jpg';
import {Link} from "react-router-dom";

function Banner() {

    // Định nghĩa thuộc tính của hình ảnh slide
    const styleImage = {
        // width: '80%',
        // height: '30%'
    }

    // Định nghĩa các thiết lập của carousel
    const carouselSettings = {
        showIndicators: false,
        showThumbs: false,
        showStatus: false,
        showArrows: true,
        autoPlay: true, // Tự động phát carousel
        interval: 5000,  // Thời gian giữa các lần chuyển đổi ảnh là 8 giây (8000 mili giây)
        infiniteLoop: true, // Cho phép lặp vô hạn carousel
        stopOnHover: true  // Dừng carousel khi con trỏ chuột nằm trên nó
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="banner-left list-group">
                            <Link to="/products?type=android" className="list-group-item"><i className="fa fa-code"></i> Android</Link>
                            <Link to="/products?type=c_cpp" className="list-group-item"><i className="fa fa-code"></i> C/C++</Link>
                            <Link to="/products?type=ios" className="list-group-item"><i className="fa fa-code"></i> iOS</Link>
                            <Link to="/products?type=html" className="list-group-item"><i className="fa fa-code"></i> HTML & Template</Link>
                            <Link to="/products?type=java_jsp" className="list-group-item"><i className="fa fa-code"></i> Java/JSP</Link>
                            <Link to="/products?type=php_mysql" className="list-group-item"><i className="fa fa-code"></i> PHP & MySQL</Link>
                            <Link to="/products?type=unity" className="list-group-item"><i className="fa fa-code"></i> Unity</Link>
                            <Link to="/products?type=visual_c_sharp" className="list-group-item"><i className="fa fa-code"></i> Visual C#</Link>
                            <Link to="/products?type=wordpress" className="list-group-item"><i className="fa fa-code"></i> Wordpress</Link>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <Carousel className="main-slide" {...carouselSettings}>
                            <div>
                                <img style={styleImage} src={img_banner_1} alt=""/>
                            </div>
                            <div>
                                <img style={styleImage} src={img_banner_2} alt=""/>
                            </div>
                            <div>
                                <img style={styleImage} src={img_banner_3} alt=""/>
                            </div>
                        </Carousel>
                    </div>
                    <div className="col-sm-2 pl-0">
                        <div className="banner-right text-right">
                            <img src="https://sharecode.vn/assets/images/thiet-ke-web-gia-re.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Banner;
