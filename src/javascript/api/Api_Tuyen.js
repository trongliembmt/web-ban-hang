export async function getListDiscountCode() {
    try {
        const response = await fetch('https://server-share-code.onrender.com/api/discount-code');
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e.getMessage());
    }
    /* lấy ra danh sách mã giảm giá từ server */
}
