import '../../css/product-detail.css'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {formatNumber, formatRating, getFirstLetter, getPassedTimeInText} from "../../javascript/utils";
import Parser from 'html-react-parser'
import {useDispatch, useSelector} from "react-redux";
import {addLiked} from "../../redux/Action";
import {addItemToCart} from "../../redux/redux_tuyen/Action_Tuyen";
import {PopularCode} from "../ListProductsPage/Products";
import {fetchCodes, putCodes} from "../../javascript/api/Api_Dat";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";

function DetailLeft({product}) {
    const [slideIndex, setSlideIndex] = useState(0)

    function moveSlide(dir) {
        const currentSlide = slideIndex + dir
        if (currentSlide > -1 && currentSlide < 3)
            setSlideIndex(currentSlide)
    }

    return (
        <div className="detail-left">
            <div className="detail-slider">
                <div className="detail-slide" style={{transform: `translateX(${100 * (0 - slideIndex)}%)`}}>
                    <img src={product.thumbnails[0]} alt=""/>
                </div>
                <div className="detail-slide" style={{transform: `translateX(${100 * (1 - slideIndex)}%)`}}>
                    <img src={product.thumbnails[1]} alt=""/>
                </div>
                <div className="detail-slide" style={{transform: `translateX(${100 * (2 - slideIndex)}%)`}}>
                    <img src={product.thumbnails[2]} alt=""/>
                </div>
            </div>
            <button className="btn slide-arrow btn-prev" onClick={() => moveSlide(-1)}><i className="bi bi-chevron-left"></i></button>
            <button className="btn slide-arrow btn-next" onClick={() => moveSlide(1)}><i className="bi bi-chevron-right"></i></button>
            <div className="slider-thumbnails d-flex justify-content-between">
                <div className={slideIndex === 0 && 'active'} onClick={() => setSlideIndex(0)}>
                    <img src={product.thumbnails[0]} alt=""/>
                </div>
                <div className={slideIndex === 1 && 'active'} onClick={() => setSlideIndex(1)}>
                    <img src={product.thumbnails[1]} alt=""/>
                </div>
                <div className={slideIndex === 2 && 'active'} onClick={() => setSlideIndex(2)}>
                    <img src={product.thumbnails[2]} alt=""/>
                </div>
            </div>
        </div>
    )
}

export function StarRate({stars, type}) {
    const fullStars = Math.floor(stars)
    const remain = (5 - stars) - Math.floor(5 - stars)
    return (
        <>
            {Array(fullStars).fill(1).map((value, index) => (<i className={type} key={index}></i>))}
            {remain < 1 && remain > 0 && <i className={type} key={fullStars} style={{color: '#BEBEBE'}}></i>}
            {Array(Math.floor(5 - stars)).fill(1).map((value, index) =>
                (<i className={type} key={index} style={{color: '#BEBEBE'}}></i>))}
        </>
    )
}

function DetailCenter({product}) {

    return (
        <div className="detail-center">
            <h6>{product.name} <span>[Mã code {product.id}]</span></h6>
            <div className="detail-center-stats">
                <div className="product-item-stars mr-3">
                    <StarRate stars={formatRating(product.rating).average} type={"bi bi-star-fill"}/>
                </div>
                <span>({formatRating(product.rating).total} Đánh giá)</span>
                <span><i className="fa fa-eye"></i> {product.viewed}</span>
                <span><i className="fa fa-download"></i> {product.downloaded}</span>
            </div>
            <div className="detail-center-des">{product.description}</div>
            <div className="detail-center-info">
                <div>
                    <i className="fa fa-list"></i><span>Danh mục</span> <Link to={`/products?type=${product.type.id}`}>{product.type.name}</Link>
                </div>
                <div><i className="fa fa-layer-group"></i><span>Nhóm code</span> <Link to={'/top-codes'}>Top code</Link></div>
                <div><i className="fa fa-calendar"></i><span>Ngày đăng</span> {product.release}</div>
                <div><i className="fa fa-object-group"></i><span>Loại file</span> {product.file.type}</div>
                <div><i className="fa fa-file-code"></i><span>File download</span> {product.file.name}
                    <span>[{product.file.size} {product.file.unit}]</span></div>
            </div>
        </div>
    )
}

function DetailRight({product}) {
    const cart = useSelector(state => state.cartReducer.cart)
    const likedCodes = useSelector(state => state.likedCodesReducer.liked)
    const dispatch = useDispatch()

    const inLiked = likedCodes.some(c => c.id === product.id)

    function handledDownload() {
        dispatch(addItemToCart(product))
    }

    return (
        <div className="detail-right">
            <div className="detail-right-offer">
                <h6>PHÍ DOWNLOAD</h6>
                <span className="offer-price">{product.price === 0 ? 'FREE' : <>{formatNumber((product.price), '.')}<sup>đ</sup></>}</span>
                <button className="offer-download" onClick={handledDownload}>
                    {cart.some(item => item.id === product.id)
                        ? (<><i className="fa fa-check"></i> ĐÃ THÊM</>)
                        : (<><i className="fa fa-cart-shopping"></i> THÊM VÀO GIỎ HÀNG</>)}
                </button>
                <button className={`offer-favorite ${inLiked && 'offer-active'}`}
                        onClick={() => dispatch(addLiked(product))}><i className="fa fa-thumbs-up"></i> {inLiked ? 'Xóa khỏi' : 'Lưu vào'} yêu thích
                </button>
                <span><span>CHIA SẺ NHANH</span> (CODE {product.id})</span>
                <div>
                    <img src="https://topcode.vn/assets/images/share-email.png" alt=""/>
                    <div>Gửi code tới email bạn bè</div>
                </div>
                <div className="d-flex justify-content-center">
                    <span><i className="fa fa-thumbs-up"></i> Like</span>
                    <span><i className="fa fa-share-alt"></i> Share</span>
                </div>
            </div>
        </div>
    )
}

function DetailDivider({title, refData}) {
    return (<div className="detail-divider mt-5" ref={refData}><span>{title}</span></div>)
}

function DetailDescription({product, goTo}) {
    return (
        <>
            <DetailDivider title={'MÔ TẢ CHI TIẾT'}/>
            <div className="detail-description">
                <div>{product.description}</div>
                {Parser(product.detail)}
                <div className="di-guide">XEM THÊM <span>==></span><span onClick={goTo}> Hướng dẫn cài đặt chi tiết</span></div>
            </div>
        </>
    )
}

function DemoImage({product}) {
    return (
        <>
            <DetailDivider title={'HÌNH ẢNH DEMO'}/>
            <div className="text-center">
                {product.thumbnails.map((value, index) => {
                    return (
                        <div key={index}>
                            <img style={{display: 'inline-block', marginBottom: '15px'}} key={index} src={value} alt=""/>
                            <p className="text-center mt-0 mb-5 font-italic text-dark">Hình {index + 1}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function Installation({product, refData}) {
    return (
        <>
            <DetailDivider title={'HƯỚNG DẪN CÀI ĐẶT'} refData={refData}/>
            <div className="installation">
                {Parser(product.installation)}
            </div>
        </>
    )
}

function RatingModal({product, setProduct, closeModal}) {
    const ratingCriteria = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt']
    const [starIndex, setStarIndex] = useState(-1)
    const [feel, setFeel] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [limit, setLimit] = useState(0)
    const [checkFeel, setCheckFeel] = useState(false)
    const [checkName, setCheckName] = useState(false)
    const starRef = useRef(-1)

    useEffect(() => {
        document.querySelectorAll('.rating-modal-stars > div').forEach(function (value) {
            value.addEventListener('mouseover', function () {
                setStarIndex(Number(this.getAttribute('aria-valuenow')))
            })
            value.addEventListener('mouseleave', function () {
                if (starRef.current !== Number(this.getAttribute('aria-valuenow'))) {
                    setStarIndex(-1)
                }
                if (starRef.current !== -1) {
                    setStarIndex(starRef.current)
                }
            })
        })
    }, [starIndex])

    function onStarClicked(index) {
        setStarIndex(index)
        starRef.current = index
    }

    function handleFeel(e) {
        const text = e.target.value
        setFeel(text)
        setLimit(text.length)
        if (text.length >= 3) setCheckFeel(false)
    }

    function handleName(e) {
        setName(e.target.value)
        setCheckName(false)
    }

    function sendRating() {
        if (limit < 3) setCheckFeel(true)
        if (!name) setCheckName(true)

        if (name && limit >= 3 && starRef.current !== -1) {
            const star = `${5 - starRef.current}star`

            setProduct({
                ...product,
                rating: {...product.rating, [star]: product.rating[star] + 1},
                'rating-comment': [...product['rating-comment'], {
                    name: name,
                    phone: phone,
                    star: 5 - starRef.current,
                    when: Date.now(),
                    comment: feel
                }]
            })
            setName('')
            setFeel('')
            setLimit(0)
            closeModal()
        }
    }

    return (
        <div className="rating-modal" onClick={closeModal}>
            <div className="rating-modal-content" onClick={(e) => e.stopPropagation()}>
                <div>
                    <span>Đánh giá</span>
                    <span onClick={closeModal}><i className="fa fa-x"></i></span>
                </div>
                <div>
                    <div>
                        SALE - full source code webiste bán hàng laptop - Sử dụng PHP Framework
                        CodeIgniter
                    </div>
                    <div className="rating-modal-stars my-4">
                        {ratingCriteria.map((value, index) => (
                            <div aria-valuenow={index} className={starIndex === index && 'bg-active'} key={index}
                                 onClick={() => onStarClicked(index)}>
                                <div className={`s${index}`}></div>
                                <div>{ratingCriteria[4 - index]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="rating-content">
                        <span style={{display: checkFeel ? 'inline-block' : 'none'}}>Nội dung tối thiểu 3 ký tự</span>
                        <span style={{display: limit < 3 ? 'inline-block' : 'none'}}>{limit}/3</span>
                        <textarea style={{borderColor: checkFeel ? '#e70a0a' : 'var(--color-border)'}}
                                  value={feel} onChange={handleFeel} placeholder="Mời bạn chia sẻ một số cảm nhận về sản phẩm..."/>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="input-container">
                            <span style={{display: checkName ? 'block' : 'none'}}><i className="fa fa-warning"></i> Vui lòng nhập Họ và tên</span>
                            <input style={{borderColor: checkName ? '#e70a0a' : 'var(--color-border)'}}
                                   value={name} onChange={handleName} type="text" placeholder="Họ và tên (bắt buộc)"/>
                        </div>
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Số điện thoại"/>
                    </div>
                    <div style={{marginTop: '30px'}} className="mb-3 rating-guarantee"><i className="fa fa-check-square-o"></i> Chúng tôi cam kết bảo
                        mật số điện thoại của bạn
                    </div>
                    <div className="text-center mt-3 mb-1">
                        <button onClick={sendRating}>Gửi đánh giá ngay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Rating({product, setProduct}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <DetailDivider title={'ĐÁNH GIÁ'}/>
            <div className="detail-rating">
                <div className="row mt-5 mb-3">
                    <div className="col-lg-4 text-center">
                        <div className="rating-average">{formatRating(product.rating).average}<span>/5</span></div>
                        <div className="product-item-stars">
                            <StarRate stars={formatRating(product.rating).average} type={"fa fa-star"}/>
                        </div>
                        <div className="rating-count">{formatNumber(formatRating(product.rating).total, ',')} đánh giá</div>
                        <div className="rating-action mt-3 text-center">
                            <button onClick={() => setShowModal(true)}><i className="bi bi-star-fill mr-1"></i> Viết đánh giá</button>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="rating-chart">
                            {Array(5).fill(1).map((value, index) => (
                                <div key={index}>
                                    <div>{5 - index} <i className="bi bi-star-fill"></i></div>
                                    <div>
                                        <div style={{width: `${formatRating(product.rating)['avg' + (5 - index)]}%`}}></div>
                                    </div>
                                    <div>{product.rating[(5 - index) + 'star']}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="detail-rating-comment">
                    {[...product['rating-comment']].sort((a, b) => a.when - b.when > 0 ? -1 : 1).map((rating, index) => (
                        <div key={index}>
                            <div>{rating.name} <span><i className="fa fa-check-circle"></i> Đã mua hàng</span>
                                <span>{getPassedTimeInText(rating.when)}</span></div>
                            <div className="product-item-stars">
                                <StarRate stars={rating.star} type={"bi bi-star-fill"}/>
                            </div>
                            <div>{rating.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && <RatingModal product={product} setProduct={setProduct} closeModal={() => setShowModal(false)}/>}
        </>
    )
}

function Comment({product, setProduct}) {
    const [limit, setLimit] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [content, setContent] = useState('')
    const [checkName, setCheckName] = useState(false)
    const [checkContent, setCheckContent] = useState(false)
    const chars = 3

    function sendComment() {
        if (!name) setCheckName(true)
        if (limit < chars) setCheckContent(true)

        if (name && limit >= chars) {
            setProduct({
                ...product, comments: [...product.comments, {
                    name: name,
                    email: email,
                    when: Date.now(),
                    content: content
                }]
            })
            setName('')
            setContent('')
            setEmail('')
            setLimit(0)
        }
    }

    function handleCommentChange(e) {
        const text = e.target.value
        setContent(text)
        setLimit(text.length)
        if (text.length >= chars) setCheckContent(false)
    }

    function handleNameChange(e) {
        const text = e.target.value
        setName(text)
        setCheckName(false)
    }

    return (
        <>
            <DetailDivider title={'BÌNH LUẬN'}/>
            <div className="detail-comment clearfix">
                <div>
                    <span style={{display: checkContent ? 'inline-block' : 'none'}}>Nội dung tối thiểu {chars} ký tự</span>
                    <span style={{display: limit < chars ? 'inline-block' : 'none'}}>{limit}/{chars}</span>
                    <textarea style={{borderColor: checkContent ? '#e70a0a' : 'var(--color-border)'}}
                              value={content} onChange={handleCommentChange} placeholder="Vui lòng để lại bình luận..."/>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="input-box">
                            <label htmlFor="input-name">Họ và tên <span>*</span></label>
                            <input style={{borderColor: checkName ? '#e70a0a' : 'var(--color-border)'}}
                                   value={name} onChange={handleNameChange} name="input-name" type="text"/>
                            <div style={{display: checkName ? 'block' : 'none'}}><i className="fa fa-warning"></i> Vui lòng nhập Họ và tên</div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="input-name">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} name="input-name" type="text"/>
                        </div>
                    </div>
                    <button onClick={sendComment}>GỬI</button>
                </div>
            </div>
            <div className="mt-5">
                <div style={{fontSize: '17px', fontFamily: 'Roboto', fontWeight: '500', color: '#333333'}}>
                    {product.comments.length} comments
                </div>
                {[...product.comments].sort((a, b) => a.when - b.when > 0 ? -1 : 1).map((value, index) => (
                    <div className="comment-item" key={index}>
                        <div className="comment-avatar mr-3">
                            <div>{getFirstLetter(value.name)}</div>
                        </div>
                        <div className="comment-detail">
                            <div>
                                <div>{value.name}</div>
                                <div>{getPassedTimeInText(value.when)}</div>
                            </div>
                            <div>{value.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

function DetailContent({product, setProduct}) {
    const ref = useRef(null)
    const goToInstallation = () => ref.current.scrollIntoView({behavior: "auto"})
    return (
        <>
            <DetailDescription product={product} goTo={goToInstallation}/>
            <DemoImage product={product}/>
            <Installation product={product} refData={ref}/>
            <Rating product={product} setProduct={setProduct}/>
            <Comment product={product} setProduct={setProduct}/>
        </>
    )
}

export default function ProductDetails() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useMemo(() => {
        fetchCodes(`https://server-share-code.onrender.com/products/${id}`).then(json => {
            setProduct(json)
            setProduct(product => ({...product, viewed: product.viewed + 1}))
            setLoading(false)
        })
    }, [id])

    useEffect(() => {
        putCodes(`https://server-share-code.onrender.com/products/${product.id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }).then()
    }, [product])

    if (loading) return <div>Loading...</div>

    function breadcrumbs() {
        return [{name: 'Trang chủ', link: '/'}, {name: 'Danh sách codes', link: `/products`}, {
            name: 'Chi tiết sản phẩm',
            link: `/products/product/${product.id}`
        }, {name: `Mã code ${product.id}`, link: `/products/product/${product.id}`}]
    }

    return (
        <>
            <SectionBreadcrumb breadcrumbs={breadcrumbs()}/>
            <section className="product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-5">
                                    <DetailLeft product={product}/>
                                </div>
                                <div className="col-lg-7">
                                    <DetailCenter product={product}/>
                                </div>
                            </div>
                            <DetailContent product={product} setProduct={setProduct}/>
                        </div>
                        <div className="col-lg-3">
                            <DetailRight product={product}/>
                            <PopularCode/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}