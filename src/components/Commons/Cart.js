import {useSelector} from "react-redux"
import {Link, useLocation} from "react-router-dom";

function Cart() {

    const cart = useSelector(state => state.cartReducer.cart);
    const liked = useSelector(state => state.likedCodesReducer.liked);

    /**
     useSelector là một hook của React Redux,
     cho phép bạn lấy ra các giá trị từ Redux store.
     Bằng cách truyền một hàm selector,
     bạn có thể lựa chọn các phần của state mà bạn muốn truy xuất từ store.
     */

    const location = useLocation();

    return (
        <div className="header-cart">
            <Link to="/liked-codes" className="position-relative mr-5"><i
                className="bi bi-hand-thumbs-up"></i><span>{liked.length}</span></Link>
            <Link to="/cart-details"
                  className={`position-relative ${location.pathname === "/cart-details" ? "active" : ""}`}><i
                className="bi bi-cart"></i> <span>{cart.length}</span></Link>
        </div>
    )
}

export default Cart;