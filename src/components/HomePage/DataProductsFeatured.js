import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from 'react-bootstrap';
import {default as queryString} from 'query-string';

import {addItemToCart} from '../../redux/redux_tuyen/Action_Tuyen';

import Pagination from './Pagination'

import {Link} from "react-router-dom";
import {StarRate} from "../ProductDetailPage/ProductDetails";
import {formatNumber, formatRating} from "../../javascript/utils";
import {addLiked} from "../../redux/Action";

function DataProductsFeatured() {

    const [products, setProducts] = useState([]);// => trạng thái (state) ban đầu của component DataProductFeatured là []

    const [pagination, setPagination] = useState({}); // => trạng thái ban đầu của component Panigation

    const [filters, setFilters] = useState({
        _limit: 8,
        _page: 1
    })

    useEffect(() => {

        // Hàm sử dụng async/await để gọi API và lấy danh sách sản phẩm nổi bật
        async function fetchListProductFeatured() {
            try {
                //_limit=8&_page=1
                const paramsString = queryString.stringify(filters) // => chuyển object sang chuỗi
                const requestUrl = `https://server-share-code.onrender.com/api/products-featured?${paramsString}`

                // Gửi yêu cầu GET đến API và chờ nhận được phản hồi
                const response = await fetch(requestUrl);

                // Chuyển đổi phản hồi thành dữ liệu dạng JSON và chờ cho đến khi hoàn thành
                const responseJson = await response.json();

                // console.log({responseJson});

                const {data, pagination} = responseJson;

                console.log("Data :", data);
                console.log("Pagination :", pagination);

                setProducts(data);

                setPagination(pagination); // thay đổi trạng thái của component Panigation

            } catch (error) {
                console.log('Khong the load danh sach code noi bat ', error.message)
            }
        }

        // Gọi hàm fetchListProductFeatured để lấy danh sách sản phẩm (code) nổi bật
        fetchListProductFeatured();

        /**
         * có 3 trường hợp khi sử dụng useEffect()
         - TH1 (ít sử dụng) : useEffect(callback)
         + Gọi callback mỗi khi component re-ender
         + Gọi callback sau khi component thêm element vào DOM

         - TH2 : useEffect(callback,[])
         + Chỉ gọi callback 1 lần sau khi component mounted

         - TH3: useEffect(callback,[deps])
         + Callback được gọi mỗi khi deps thay đổi

         **Lưu ý : Callback luôn được gọi sau khi component mount
         */

        /**
         useEffect là một hook trong React được sử dụng để thực hiện các tác vụ liên quan đến hiệu ứng (effects) trong thành phần React.
         Nó cho phép bạn thực hiện các tác vụ như gọi API, tương tác với DOM, đăng ký sự kiện, và thực hiện các tác vụ bất đồng bộ khác.
         Bạn có thể xem useEffect như một cách để "kích hoạt" các tác vụ sau khi React hoàn thành việc render giao diện người dùng.
         */

            // Cuộn trang lên phần đầu của component SectionProductsFeatured
        const element = document.getElementById("sect-product-featured");
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }

    }, [filters])

    function handlePageChange(newPage) {
        console.log('New page: ' + newPage)
        setFilters({
            ...filters,
            _page: newPage
        })
        /**
         => được sử dụng để xử lý sự kiện khi người dùng thay đổi trang trên thanh phân trang.
         Khi có sự kiện, nó sẽ cập nhật trạng thái filters với trang mới.
         */
    }

    return (
        <>
            <div className="row featured__filter">
                {products.map((value, index) => (
                        <ItemProductFeatured key={index} product={value}
                        ></ItemProductFeatured>
                    )
                )}
            </div>
            <div className="d-flex justify-content-center">
                <Pagination pagination={pagination} onPageChange={handlePageChange} currentPage={filters._page}/>
            </div>
        </>
    )


}

function ItemProductFeatured({product}) {

    const likedCodes = useSelector(state => state.likedCodesReducer.liked)
    const [showToast, setShowToast] = useState(false)

    /**
     useState là một hook dùng để lưu trữ và quản lý state(trạng thái) của một component
     => cú pháp :
     const[state,setState] = useState(initState)

     - Component được re-render sau khi 'setState'
     - Initial state chỉ dùng cho lần đầu
     - Set state với callback ?
     - Initial state với callback ?
     - setState là thay thế state bằng giá trị mới
     */

    const dispatch = useDispatch();

    /**
     useDispatch là một hook của thư viện React Redux,
     cho phép bạn gửi các action đến Redux store từ thành phần React của bạn.
     Nó trả về một hàm mà bạn có thể sử dụng để gửi action đi.
     */

    function clickAddItemToCart() {
        dispatch(addItemToCart(product))
        setShowToast(true)
    }

    function clickAddLiked(){
        dispatch(addLiked(product))
    }

    return (

        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">

            {/*Thông báo Toast*/}
            <div>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body className="text-white" style={{backgroundColor: '#7fad39'}}>
                        Mã nguồn đã được thêm vào giỏ hàng
                    </Toast.Body>
                </Toast>
            </div>

            <div className="product-item">
                <Link to={`products/product/${product.id}`} state={product} className="product-item-img">
                    <img src={product.img} alt=""/>
                </Link>
                <div className="product-item-title d-flex justify-content-center align-items-center text-center pt-2">
                    <div className="title-wrapper">
                        <Link to={`products/product/${product.id}`} state={product}>{product.name}</Link>
                    </div>
                </div>
                <div className="product-item-stats d-flex justify-content-between">
                    <div><i className="fa fa-eye"></i> {product.viewed}</div>
                    <div><i className="fa fa-download"></i> {product.downloaded}</div>
                </div>
                <div className="product-item-actions d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start">
                        <a className={`mr-1 action-like ${likedCodes.some(c => c.id === product.id) && 'is-active'}`}><i className="fa fa-thumbs-up" onClick={clickAddLiked} ></i></a>
                        <a className="product-item-action"><i className="fa fa-shopping-cart" onClick={clickAddItemToCart}></i></a>
                    </div>
                    <div className="product-item-stars"><StarRate stars={formatRating(product.rating).average}
                                                                  type={"bi bi-star-fill"}/></div>
                </div>
                <div className="product-item-bottom d-flex justify-content-between align-items-center">
                    <div className="product-item-brand"><i className={product.type.icon}></i> {product.type.name}</div>
                    <Link to={`products/product/${product.id}`} state={product}
                          className="product-item-price">{formatNumber(product.price, '.')}đ</Link>
                </div>
            </div>
        </div>
    )

}

export default DataProductsFeatured;