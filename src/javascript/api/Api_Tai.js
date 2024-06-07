import {hashText} from "../utils/Utils_Tai";


export async function checkEmailExists(email) {
    try {
        const url = `https://server-share-code.onrender.com/api/accounts?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.length > 0; // true nếu email tồn tại trong mảng accounts, false nếu không tồn tại
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function addAccount(account) {
    try {
        const url = 'https://server-share-code.onrender.com/api/accounts';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data; // Trả về dữ liệu tài khoản đã được thêm
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function checkLogin(email, passwordEnter) {
    try {
        const url = `https://server-share-code.onrender.com/api/accounts?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const datas = await response.json();
        if (datas.length === 1) {
            const hashPass = hashText(passwordEnter);
            const passwordMatch = datas.some((item) => item.hashPass === hashPass);
            return passwordMatch;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function changePassword(email, newPassword) {
    try {
        const hashPass = hashText(newPassword);
        const url = `https://server-share-code.onrender.com/api/accounts/?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const accounts = await response.json();
        const account = accounts.find((acc) => acc.email === email);
        if (!account) {
            throw new Error('Account not found.');
        }
        account.hashPass = hashPass;
        const updateResponse = await fetch(`https://server-share-code.onrender.com/api/accounts/${account.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update password.');
        }
        console.log('Password updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getProvinces() {
    const url = "https://server-share-code.onrender.com/api/provinces";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
export async function loadInfo(email){
    try {
        const url = `https://server-share-code.onrender.com/api/accounts/?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const accounts = await response.json();
        const account = accounts.find((acc) => acc.email === email);
        if (!account) {
            throw new Error('Account not found.');
        }

        const updateResponse = await fetch(`https://server-share-code.onrender.com/api/accounts/${account.id}`);
        if (!updateResponse.ok) {
            throw new Error('Failed to update password.');
        }
        const dataInfo = await updateResponse.json()
        return dataInfo;
        console.log('Password updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function changeProfile(email, data) {
    try {
        const url = `https://server-share-code.onrender.com/api/accounts/?email=${encodeURIComponent(email)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch account data.');
        }
        const accounts = await response.json();
        const account = accounts.find((acc) => acc.email === email);
        if (!account) {
            throw new Error('Account not found.');
        }
        account.fullname = data.fullname;
        account.gender = data.gender;
        account.phone = data.phone;
        account.personal_email = data.personal_email;
        account.address = data.address;
        account.province = data.province;
        const updateResponse = await fetch(`https://server-share-code.onrender.com/api/accounts/${account.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update profile.');
        }
        console.log('Profile updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}



