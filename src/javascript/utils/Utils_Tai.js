import { SHA256 } from 'crypto-js';
export const isEmpty = (text) => {
    return !text || text.trim().length < 1;
}
export const isEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
};
export const hashText = (text) =>{
    const hash = SHA256(text).toString();
    return hash;
}
export const isPhoneNumber = (text) =>{
    const phoneNumberRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-689]|09[0-9])\d{7}$/;
    return phoneNumberRegex.test(text);
}
