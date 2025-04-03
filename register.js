BASE_URL = 'http://localhost:8000';
let mode = 'CREATE';
let selectedId = '';
//textarea
const toggleInput = () => {
    let delivery = document.getElementById('show-textarea');
    let show = document.getElementById('input-textarea');

    if (delivery.checked) {
        show.classList.add('active'); 
    } else {
        show.classList.remove('active'); 
    }
}
//menu
const toggleMenu = () => {
    document.getElementById("dropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        let dropdowns = document.getElementsByClassName("menu-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);

    if (id) {
        mode = 'EDIT';
        selectedId = id;
        try {
            const response = await axios.get(`${BASE_URL}/register/${id}`)
            const user = response.data;
            console.log('response', response.data)
            let firstNameDOM = document.querySelector('input[name = firstname]');
            let lastNameDOM = document.querySelector('input[name = lastname]');
            let telDOM = document.querySelector('input[name = tel]');
            let emailDOM = document.querySelector('input[name = email]');
            let typeDOMs = document.querySelectorAll('input[name=type]');
            let addressDOM = document.querySelector('textarea[name=address]');
            
            
            firstNameDOM.value = user.firstname;
            lastNameDOM.value = user.lastname;
            telDOM.value = user.tel;
            emailDOM.value = user.email;
            addressDOM.value = user.address;

            for (let i=0; i<typeDOMs.length; i++) {
                if (typeDOMs[i].value == user.type) {
                    typeDOMs[i].checked = true;
                }
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}
const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname){
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastname){
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.tel){
        errors.push('กรุณากรอกเบอร์โทรศัพท์')
    }
    if (!userData.email){
        errors.push('กรุณากรอกอีเมล')
    }
    if (!userData.type){
        errors.push('กรุณากรอกประเภทการรับส่ง')
    }
    if (userData.type !== 'รับเอง' && !userData.address) {
        errors.push('กรุณากรอกที่อยู่');
    }
    return errors;
}
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name = firstname]');
    let lastNameDOM = document.querySelector('input[name = lastname]');
    let telDOM = document.querySelector('input[name = tel]');
    let emailDOM = document.querySelector('input[name = email]');
    let typeDOMs = document.querySelector('input[name = type]:checked');
    let addressDOM = document.querySelector('textarea[name=address]');

    let messageDOM = document.getElementById('message')

    try {
        let userData = {
            firstname: firstNameDOM.value.trim(),
            lastname: lastNameDOM.value.trim(),
            tel: telDOM.value.trim(),
            email: emailDOM.value.trim(),
            type: typeDOMs ? typeDOMs.value : '',
            address: addressDOM.value.trim(),
        }
        console.log('submitData', userData);

        const errors = validateData(userData);
        if (errors.length > 0){
            throw{
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }

        let message = 'บันทึกข้อมูลเรียบร้อย';

        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/register`, userData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/register/${selectedId}`, userData);
            message = 'เเก้ไขข้อมูลเรียบร้อย';
            console.log('response', response.data);
        }
        messageDOM.innerText = message;
        messageDOM.className = 'message success';

    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);
        if (error.response) {
            console.log(error.response);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }

        let htmlData = '<div>';
        htmlData += '<ul>'
        htmlData += `<div>${error.message}</div>`;
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}
