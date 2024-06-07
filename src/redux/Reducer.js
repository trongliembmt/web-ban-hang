import {combineReducers} from "redux";
import {cartReducer, discountCodeReducer, modalReducer, paymentReducer} from "./redux_tuyen/Reducer_Tuyen";
import errorReducer from "./redux_tai/ErrorSlice"

export const initialState = {
    layout: 'grid',
    page: 1,
    sort: null,
    type: null
}

const listProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'reset':
            return {...state, ...initialState}
        case 'products/page':
            return {...state, page: action.payload}
        case 'products/sort':
            return {...state, sort: action.payload}
        case 'products/type':
            return {...state, type: action.payload}
        case 'products/layout':
            return {...state, layout: action.payload}
        default:
            return state
    }
}

const initialLiked = {
    liked: localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : []
}

const likedCodesReducer = (state = initialLiked, action) => {
    switch (action.type) {
        case 'liked/add': {
            let likedCodes = undefined
            if (!state.liked.some(c => c.id === action.payload.id)) {
                likedCodes = [...state.liked, action.payload]
            } else {
                const index = state.liked.findIndex(value => value.id === action.payload.id)
                likedCodes = index > -1 ? [...state.liked.slice(0, index), ...state.liked.slice(index + 1)] : undefined
            }
            localStorage.setItem('liked', JSON.stringify(likedCodes))
            return {
                ...state,
                liked: likedCodes !== undefined ? [...likedCodes] : [...state.liked]
            }
        }
        default:
            return state
    }
}

const productReducer = (state = {product: null}, action) => {
    switch (action.type) {
        case 'product/put': {
            return {
                ...state,
                product: action.payload
            }
        }
        case 'product/increaseDownloaded': {
            const data = {
                "downloaded": state.product.downloaded + 1
            }
            fetch(`https://server-share-code.onrender.com/products/${state.product.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then()

            return {
                ...state,
                product: {
                    ...state.product,
                    downloaded: state.product.downloaded + 1
                }
            }
        }
        case 'product/increaseViewed': {
            const data = {
                "viewed": state.product.viewed + 1
            }
            fetch(`https://server-share-code.onrender.com/products/${state.product.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then()

            return {
                ...state,
                product: {
                    ...state.product,
                    ...data
                }
            }
        }
        case 'product/increaseRating': {
            const data = {
                rating: {
                    ...state.product.rating,
                    [action.payload]: state.product.rating[action.payload] + 1
                }
            }
            fetch(`https://server-share-code.onrender.com/products/${state.product.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then()

            return {
                ...state,
                product: {
                    ...state.product,
                    ...data
                }
            }
        }
        case 'product/putRatingComment': {
            const data = {
                'rating-comment': [...state.product['rating-comment'], {...action.payload}]
            }
            fetch(`https://server-share-code.onrender.com/products/${state.product.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then()

            return {
                ...state,
                product: {
                    ...state.product,
                    ...data
                }
            }
        }
        case 'product/postComment': {
            const data = {
                comments: [
                    ...state.product.comments,
                    action.payload
                ]
            }
            fetch(`https://server-share-code.onrender.com/products/${state.product.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then()

            return {
                ...state,
                product: {
                    ...state.product,
                    ...data
                }
            }
        }
        default:
            return state
    }
}
export const reducers = combineReducers({
    cartReducer: cartReducer,
    listProductsReducer: listProductsReducer,
    discountCodeReducer: discountCodeReducer,
    likedCodesReducer: likedCodesReducer,
    errorReducer: errorReducer,
    modalReducer: modalReducer,
    paymentReducer: paymentReducer,
    productReducer
})