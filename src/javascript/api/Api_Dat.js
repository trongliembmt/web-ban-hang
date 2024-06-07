export const fetchCodes = async (url) => await (await fetch(url)).json()

export const fetchPopularCodes = async () =>
    await (await fetch('https://server-share-code.onrender.com/products?_sort=downloaded,viewed&_order=desc&_limit=10')).json()

export const fetchProducts = async () => await (await fetch(`https://server-share-code.onrender.com/products`)).json()

export const putCodes = async (url, content) => await fetch(url, content)