import '../../css/footer.css'
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer-about">
                            <div className="mb-3">
                                <Link to="/"><img src={require('../../img/logo/logo.png')} alt=""/></Link>
                            </div>
                            <div>
                                <div className="footer-about-contact-item">
                                    <div className="w-25 float-left font-weight-bolder">Địa chỉ:</div>
                                    <div>Khoa CNTT - ĐH Nông Lâm</div>
                                </div>
                                <div className="footer-about-contact-item">
                                    <div className="w-25 float-left font-weight-bolder">Phone:</div>
                                    <div>0123456789</div>
                                </div>
                                <div className="footer-about-contact-item">
                                    <div className="w-25 float-left font-weight-bolder">Email:</div>
                                    <div>k46-it-nlu@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-6">
                        <div className="row pl-5">
                            <div className="footer-links col-lg-6">
                                <h6>VỀ CHÚNG TÔI</h6>
                                <ul>
                                    <li><Link to="/">Giới thiệu</Link></li>
                                    <li><Link to="/">Quy định chung</Link></li>
                                    <li><Link to="/">Chính sách bán code</Link></li>
                                    <li><Link to="/">Câu hỏi thường gặp</Link></li>
                                    <li><Link to="/">Sự kiện</Link></li>
                                </ul>
                            </div>
                            <div className="footer-links col-lg-6">
                                <h6>HƯỚNG DẪN</h6>
                                <ul>
                                    <li><Link to="/">Tải code miễn phí</Link></li>
                                    <li><Link to="/">Tải code có phí</Link></li>
                                    <li><Link to="/">Hướng dẫn thanh toán</Link></li>
                                    <li><Link to="/">Hướng dẫn cài đặt</Link></li>
                                    <li><Link to="/">Hỗ trợ kĩ thuật</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer-widget">
                            <h6>GỬI HỖ TRỢ - GÓP Ý</h6>
                            <form action="/">
                                <input type="text" placeholder="Nội dung & liên hệ của bạn"/>
                                <button type="submit">SEND</button>
                            </form>
                            <div className="footer-widget-social">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><i className="fa fa-facebook"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://twitter.com"><i className="fa fa-twitter"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://linkedin.com"><i className="fa fa-linkedin"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://youtube.com"><i className="fa fa-youtube-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-copyright">
                            <div className="float-left">
                                <span>Copyright &copy; {new Date().getFullYear()} | Privacy Policy | Nội dung đã được bảo vệ bản quyền</span>
                                <span className="ml-2"><img src={require('../../img/dmca-badge.png')} alt=""/></span>
                            </div>
                            <div className="float-right">
                                <img src={require('../../img/payment/payment-item.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}