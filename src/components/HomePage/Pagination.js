import React from 'react';
import '../../css/pagination.css'

function Pagination({pagination, onPageChange, currentPage}) {

    // Trích xuất các giá trị từ object pagination và gán chúng vào các biến tương ứng
    const {limit, total, totalPages} = pagination;

    console.log("Day la component Pagination :", pagination)

    // Hàm xử lý thay đổi trang
    function handlePageChange(newPage) {

        // Kiểm tra nếu onPageChange đã được định nghĩa (nhận từ thành phần cha)
        if (onPageChange) {
            // Gọi hàm onPageChange với trang mới
            onPageChange(newPage);
        }
    }

    return (
        <div>
            <button className="bt-panigation" disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}>Trước
            </button>
            <button className="bt-panigation" disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>Sau
            </button>
        </div>
    );
}

export default Pagination;