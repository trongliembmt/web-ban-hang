export const addItemToCart = (product) => {
    return {
        type: 'cart/add-item', // => một chuỗi (string) đại diện cho tên hành động và thường được định nghĩa như một hằng số.
        payload: product
        /*
           Mang dữ liệu hoặc thông tin liên quan đến hành động được thực hiện.
           Payload có thể là bất kỳ kiểu dữ liệu nào, bao gồm cả chuỗi, số, đối tượng, mảng
           hoặc bất kỳ kiểu dữ liệu phức tạp nào khác.
         */
    }
}

export const removeItemFromCart = (product) => {
    return {
        type: 'cart/remove-item',
        payload: product
    }
}

export const resetCart = () => {
    return {
        type: 'cart/reset'
    }
}

export const updateDiscountPercent = (discount_percent) => {
    return {
        type: 'cart/update-discount-percent',
        payload: discount_percent
    }
}

export const updateDiscountCode = (code) => {
    return {
        type: 'discountCode/update-code',
        payload: code
    }
}

export const showModalPayment = (checkShow) => {

    if (checkShow === true) {
        return {
            type: 'modal/show-modal-payment',
            payload: checkShow
        }
    }

    return {
        type: 'modal/close-modal-payment',
        payload: checkShow
    }

}

export const updateStatePayment = (name_payment) => {
    switch (name_payment) {

        case 'paypal': {
            return {
                type: 'payment/paypal',
                payload: name_payment
            }
        }

        case 'momo': {
            return {
                type: 'payment/momo',
                payload: name_payment
            }
        }
        case 'viettelpay': {
            return {
                type: 'payment/viettelpay',
                payload: name_payment

            }
        }
        case 'nganluong': {
            return {
                type: 'payment/nganluong',
                payload: name_payment
            }
        }

        default:
            return {
                type: 'payment/reset',
                payload: name_payment
            }
    }
}

export const showModalPayPal = (checkShow) => {

    if (checkShow === true) {
        return {
            type: 'modal/show-modal-paypal',
            payload: checkShow
        }
    }

    return {
        type: 'modal/close-modal-paypal',
        payload: checkShow
    }


}
