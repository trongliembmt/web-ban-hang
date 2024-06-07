export const formatNumber = (x, char) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, char)

export function formatRating(rating) {
    const total = Object.keys(rating).reduce((previous, key) => previous + rating[key], 0)
    const average = (Object.keys(rating).reduce((previous, key, index) => previous + (rating[key] * (5 - index)), 0) / total).toFixed(1)
    return {
        total: total,
        average: average,
        avg5: rating['5star'] * 100 / total,
        avg4: rating['4star'] * 100 / total,
        avg3: rating['3star'] * 100 / total,
        avg2: rating['2star'] * 100 / total,
        avg1: rating['1star'] * 100 / total
    }
}

export const getTypes = (json) => {
    const types = []
    json.data.forEach(product => {
        const type = types.find(value => value.id === product.type.id)
        if (type) type.quantity = type.quantity + 1
        else types.push({...product.type, quantity: 1})
    })
    return types.sort((a, b) => a.name < b.name ? -1 : 1)
}

export function getTypeName(typeId) {
    if (typeId === 'android') return 'Android'
    if (typeId === 'java_jsp') return 'Java/JSP'
    if (typeId === 'php_mysql') return 'PHP & MySQL'
    if (typeId === 'visual_csharp') return 'Visual C#'
    if (typeId === 'wordpress') return 'WordPress'
    if (typeId === 'ios') return 'iOS'
    if (typeId === 'html') return 'HTML & Template'
    if (typeId === 'c_cpp') return 'C/C++'
    if (typeId === 'unity') return 'Unity'
    return null
}

export const makeURL = (search, from, type, page, sort) => {
    const searchPart = search != null ? `name_like=${search}&` : ''
    const fromPart = from != null ? `type.id=${from}&` : ''
    const typePart = type != null ? `type.id=${type}&` : ''
    const pagePart = page != null ? `_page=${page}&_limit=12&` : ''
    const sortPart = sort != null ? `_sort=${sort}&_order=desc` : ''
    return trim(trim(`https://server-share-code.onrender.com/products?${searchPart}${fromPart}${typePart}${pagePart}${sortPart}`, '&'), '?')
}

export const buildQuery = (ids) => {
    let query = ''
    for (let id of ids) {
        query = query + `id=${id}&`
    }
    return trim(trim(`https://server-share-code.onrender.com/products?${query}`, '&'), '?')
}

function trim(s, c) {
    if (c === "]") c = "\\]";
    if (c === "^") c = "\\^";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

export function getPassedTimeInText(when) {
    const elapseTime = Date.now() - when;

    if (elapseTime < 60 * 1000) {
        return "Vừa xong";
    } else if (elapseTime < 60 * 60 * 1000) {
        return `${Math.floor(elapseTime / (60 * 1000))} phút trước`
    } else if (elapseTime < 24 * 60 * 60 * 1000) {
        return `${Math.floor(elapseTime / (60 * 60 * 1000))} giờ trước`
    } else if (elapseTime < 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(elapseTime / (24 * 60 * 60 * 1000))} ngày trước`
    } else if (elapseTime < 4 * 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(elapseTime / (7 * 24 * 60 * 60 * 1000))} tuần trước`
    } else if (elapseTime < 12 * 4 * 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(elapseTime / (4 * 7 * 24 * 60 * 60 * 1000))} tháng trước`
    }

    return `${Math.floor(elapseTime / (12 * 30 * 24 * 60 * 60 * 1000))} năm trước`
}

export const getFirstLetter = (name) => name.charAt(0).toUpperCase()

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}