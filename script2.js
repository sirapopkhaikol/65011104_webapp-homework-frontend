// script.js
const DRONE_LOG_URL = 'https://app-tracking.pockethost.io/api/collections/drone_logs/records?filter=(drone_id=65011104)';

// ดึง container ที่จะใช้แสดงข้อมูล
const container = document.querySelector(".container");

const displayDrones = (data) => {
    // วนลูปผ่านแต่ละ drone ใน "items" ของ JSON
    data.items.forEach(item => {
        // สร้าง div ที่จะเก็บข้อมูล drone แต่ละรายการ
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        // สร้างแต่ละ <p> และเพิ่มข้อมูล
        cardDiv.innerHTML = `
            <p class="data Drone_ID">Drone ID: ${item.drone_id}</p>
            <p class="data Drone_Name">Drone Name: ${item.drone_name}</p>
            <p class="data create">Created: ${item.created}</p>
            <p class="data celsius">Celsius: ${item.celsius}</p>
            <p class="data country">Country: ${item.country}</p>
            <p class="data id">ID: ${item.id}</p>
        `;

        // เพิ่ม cardDiv เข้าไปใน container
        container.appendChild(cardDiv);
    });
};

// ดึงข้อมูลจาก API
fetch(DRONE_LOG_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data); // ตรวจสอบข้อมูล JSON ใน console
        displayDrones(data);
    })
    .catch(error => console.error('Error fetching data:', error));
