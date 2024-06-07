import '@testing-library/jest-dom'

import {getPassedTimeInText} from "../utils";

test('convert milliseconds to passed time in text', () => {
    const now = Date.now()
    expect(getPassedTimeInText(now)).toBe('Vừa xong')

    for (let i = 1; i < 60; i++) {
        const minutes = Date.now() - i * 60 * 1000
        expect(getPassedTimeInText(minutes)).toBe(`${i} phút trước`)
    }

    for (let i = 1; i < 24; i++) {
        const hours = Date.now() - i * 60 * 60 * 1000
        expect(getPassedTimeInText(hours)).toBe(`${i} giờ trước`)
    }

    for (let i = 1; i < 7; i++) {
        const days = Date.now() - i * 24 * 60 * 60 * 1000
        expect(getPassedTimeInText(days)).toBe(`${i} ngày trước`)
    }

    for (let i = 1; i < 4; i++) {
        const weeks = Date.now() - i * 7 * 24 * 60 * 60 * 1000
        expect(getPassedTimeInText(weeks)).toBe(`${i} tuần trước`)
    }

    for (let i = 1; i < 12; i++) {
        const months = Date.now() - i * 4 * 7 * 24 * 60 * 60 * 1000
        expect(getPassedTimeInText(months)).toBe(`${i} tháng trước`)
    }
})