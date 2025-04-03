BASE_URL = 'http://localhost:8000';
let allUsers = [];

window.onload = async () => {
    await loadedData();
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', () => {
        const keyword = searchBox.value.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.id.toString().includes(keyword) ||
            user.firstname.toLowerCase().includes(keyword) ||
            user.lastname.toLowerCase().includes(keyword) ||
            user.tel.includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.type.toLowerCase().includes(keyword)
        );
        renderUserList(filtered);
    });
};
const loadedData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/register`);
    allUsers = response.data;

    renderUserList(allUsers);
};

function renderUserList(users) {
    const userDOM = document.getElementById('user');

    let htmlData = '';
    for (let user of users) {
        htmlData += `
        <div class="user-line">
            <div class="user-info">     
                <span>${user.id}</span>
                <span>${user.firstname}</span>
                <span>${user.lastname}</span>
                <span>${user.tel}</span>
                <span>${user.email}</span>
                <span>${user.type}</span>
                <span>${user.address}</span>
            </div>
            <span class="user-actions">
                <a href="register.html?id=${user.id}">
                <button class='edit'>Edit</button></a>
                <button class='delete' data-id='${user.id}'>Delete</button>
            </span>
        </div>
        `;
    }

    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${BASE_URL}/register/${id}`);
                await loadedData();
            } catch {
                console.log('error', error);
            }
        });
    }
}
function toggleMenu() {
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

//export PDF
document.getElementById('pdf').addEventListener('click', function () {
    fetch('http://localhost:8000/export-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ไม่สามารถสร้าง PDF ได้');
        }
        return response.blob();
    })
    .then(blob => {

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Users.pdf';
        link.click();
    })
    .catch(error => {
        alert(error.message);
    });
});