const services = [
    { link:'register.html' , icon: '<i class="fa-regular fa-address-card"></i>', name: "Register", desc: "ลงทะเบียนลูกค้า" },
    { link:'user.html' , icon: '<i class="fa-solid fa-user-pen"></i>', name: "User Management", desc: "แก้ไขข้อมูลลูกค้า" },
    { link:'' , icon: '<i class="fa-solid fa-screwdriver-wrench"></i>', name: "coming soon", desc: "เร็วๆนี้..." },
  ];
  
  const searchInput = document.getElementById("searchInput");
  const servicesContainer = document.getElementById("servicesContainer");
  
  function renderServices(list) {
    servicesContainer.innerHTML = "";
  
    if (list.length == 0) {
      servicesContainer.innerHTML = '<div class="notFound">ไม่พบบริการที่คุณค้นหา</div>';
      return;
    }
  
    list.forEach(service => {
      const html = `
      <a href='${service.link}'>
        <div class="service-item">
          <div class="service-icon">${service.icon}</div>
          <h3>${service.name}</h3>
          <p>${service.desc}</p>
        </div>
      `;
      servicesContainer.innerHTML += html;
    });
  }
  
  renderServices(services);
  
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = services.filter(search =>
      search.name.toLowerCase().includes(keyword) ||
      search.desc.toLowerCase().includes(keyword)
    );
    renderServices(filtered);
  });