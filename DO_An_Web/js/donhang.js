const Order = JSON.parse(localStorage.getItem('order')) || [];

document
.querySelector("#donhang")
.addEventListener("click", function () {
    document.querySelector("#content").innerHTML = `
    <div style="margin: 10px">
    <div class="filter-container">
        <div class="status_classification">
            <span><strong>Lọc theo Trạng thái:</strong></span>
            <div class="status-filter-container">
            <div class="status-filter-dropdown" onclick="toggleStatusOptions()">▼</div>
                <div class="status-options" id="statusOptions">
                    <div class="status-option" data-status="all">Tất cả</div>
                    <div class="status-option" data-status="chuaxacnhan">Chưa xác nhận</div>
                    <div class="status-option" data-status="daxacnhan">Đã xác nhận</div>
                    <div class="status-option" data-status="hoanthanh">Hoàn thành</div>
                </div>
            </div>
        </div>
        <div class="search">
            <input type="text" placeholder="Tìm tài khoản" class="tim_hang" />
            <button class="search-btn" onclick="search()">Tìm</button>
        </div>
    </div>
    <table style="width: 100%; text-align: left; border-collapse: collapse;" id="list-user">
        <tr>
            <th>Mã đơn hàng</th>
            <th>Tài khoản</th>
            <th>Tên khách hàng</th>
            <th>Chi tiết đơn hàng</th>
            <th>Trạng thái</th>
        </tr>
    </table>
</div>
<div id="card" style="display: none;">
    <div class="card2">
        <button class="b" onclick="cancelP()" style="bottom: 10px; right: 10px;">Thoát</button>
    </div>
</div>
    </div>`;
    displayDonHang(Order);
    filter();
});

function product_filtering(status, Order) {
    console.log("Selected Status:", status);

    if (status === 'all') {
        return Order;
    }

    const filteredOrders = Order.filter(dh => dh.status === getStatusValue(status));
    return filteredOrders;
}

function toggleStatusOptions() {
    const statusOptions = document.getElementById("statusOptions");
    const displayStatus = window.getComputedStyle(statusOptions).display;

    // Check if the search input has focus
    const isSearching = document.querySelector('.tim_hang').matches(':focus');

    console.log("Display Status Options:", displayStatus);

    // Show the status dropdown only if not searching
    statusOptions.style.display = (!isSearching && displayStatus === "none") ? "block" : "none";
}


function getStatusValue(status) {
    switch (status) {
        case 'all':
            return 0;
        case 'chuaxacnhan':
            return 1;
        case 'daxacnhan':
            return 2;
        case 'hoanthanh':
            return 4;
        default:
            return -1; // Handle other cases if needed
    }
}



function filter() {
    Ordercopy = [...Order];
    const statusDropdown = document.querySelector('.status-options');

    document.querySelectorAll('.status-option').forEach(statusOption => {
        statusOption.addEventListener('click', function (event) {
            const selectedStatus = event.target.getAttribute('data-status');

            if (selectedStatus === 'all') {
                displayDonHang(Order); // Show all orders
            } else {
                filterAndDisplay(selectedStatus);
            }

            toggleStatusOptions(); // Close dropdown after selecting a status option
        });
    });

    document.querySelector('.search-btn').addEventListener('click', function () {
        Order_username = [];
        let usernameInput = document.querySelector('.tim_hang');
    
        // Save the search value before clearing
        const searchValue = usernameInput.value.trim();
    
        // Clear the input content
        usernameInput.value = '';
    
        // Continue processing the search
        Order.forEach(dh => {
            if (dh.username.toLowerCase() == searchValue.toLowerCase()) {
                Order_username.push(dh);
            }
        });
    
        displayDonHang(Order_username);
    
        // Close dropdown after searching only if not searching by username
        if (!searchValue) {
            toggleStatusOptions();
        }
    });
    
    function filterAndDisplay(selectedStatus) {
        Ordercopy = product_filtering(selectedStatus, Order);
        displayDonHang(Ordercopy);
    }
}



function displayDonHang(Order) {
const listUserTable = document.querySelector("#list-user");
while (listUserTable.firstChild) {
    listUserTable.removeChild(listUserTable.firstChild);
}
listUserTable.innerHTML=`
<tr>
<th>Mã đơn hàng</th>
<th>Tài khoản</th>
<th>Tên khách hàng</th>
<th>Chi tiết đơn hàng</th>
<th>Trạng thái</th>
</tr>
`
Order.forEach((dh, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="border: none;">DH${i + 1}</td>
      <td style="border: none;">${dh.username}</td>
      <td style="border: none;">${dh.name}</td>
      <td style="border: none;" id="xem" onclick="show(${i})">Xem</td>
      <td style="border: none;" id="order" onclick="changeOrderStatus(${i})">${statusDisplay(dh.status)}</td>
    `;
    listUserTable.appendChild(row);
});
}

function showStatus(i) {
const selectedOrder = Order[i];
let statusDetails = `<h1>Trạng thái đơn hàng</h1>`;

selectedOrder.status.forEach((orderStatus, index) => {
    statusDetails += `
        <p>Đơn hàng ${i + 1}: ${orderStatus.name} - Trạng thái hiện tại: ${statusDisplay(orderStatus.status)}</p>
        <label for="newStatus${index}">Thay đổi trạng thái:</label>
        <input type="number" id="newStatus${index}" name="newStatus${index}" min="1" max="5" required>
        <button onclick="changeStatus(${i}, ${index})">Xác nhận</button>
    `;
});

document.querySelector("#card").innerHTML = `
    <div class="card2">
        ${statusDetails}
        <button class="b" onclick="cancelP()" style="bottom: 10px; right: 10px;">Thoát</button>
    </div>
`;

document.querySelector("#card").style.display = `block`;
document.querySelector(".card2").style.display = `block`;
}

function statusDisplay(num) {
    const statusMap = {
        1: "Chưa xác nhận",
        2: "Đã xác nhận",
        3: "Đang giao hàng",
        4: "Hoàn thành",
        5: "Đã hủy"
    };
    return statusMap[num] || "Unknown";
}

function cancelP() {
document.querySelector("#card").style.display = `none`;
}

function changeStatus(i, x) {
let stt = prompt("Chọn trạng thái:\n1. Chưa xác nhận\n2. Đã xác nhận\n3. Đang giao hàng\n4. Hoàn thành\n5. Đã hủy", Order[i].status[x].status);

if (stt === null) {
    // User pressed cancel
    return;
}

stt = parseInt(stt);

if (isNaN(stt) || stt < 1 || stt > 5) {
    alert("Vui lòng nhập số trạng thái hợp lệ.");
    changeStatus(i, x);
} else {
    Order[i].status[x].status = stt;
    localStorage.setItem('order', JSON.stringify(Order));
    checkorder(i);
}
}

function show(i) {
document.querySelector("#card").innerHTML = `
    <div class="card2">
        <h1>Chi tiết đơn hàng</h1>
        <p class="title">@${Order[i].username}</p>
        <div class="thongtin2">
            <p>Ngày xác nhận mua hàng: ${Order[i].time}</p>
        </div>
        <div id="order-products">
            <h2>Sản phẩm đã mua</h2>
            <table id="product-table" style="width: 100%; text-align: left; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: none;">Hình ảnh </th>
                        <th style="border: none;">Hãng </th>
                        <th style="border: none;">Tên sản phẩm</th>
                        <th style="border: none;">Giá</th>
                        <th style="border: none;">Size</th>
                        <th style="border: none;">Số lượng</th>
                    </tr>
                </thead>
                <tbody id="product-list"></tbody>
            </table>
        </div>
        <p>
            <button class="b" onclick="cancel(${i})" style="bottom: 10px; right: 10px;">Thoát</button>
        </p>
    </div>
`;

const productList = document.querySelector("#product-list");

Order[i].products.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td style="border: none;">
            <img src="${product.img}" class="sm-product-img" alt="${product.name}">
        </td>
        <td style="border: none;">${product.brand}</td>
        <td style="border: none;">${product.name}</td>
        <td style="border: none;">${product.price}</td>
        <td style="border: none;">${product.size}</td>
        <td style="border: none;">${product.quantity}</td>
    `;
    productList.appendChild(row);
});

document.querySelector("#card").style.display = `block`;
document.querySelector(".card2").style.display = `block`;
}

function cancel(i) {
document.querySelector(".title").innerHTML = `<h1>Thông tin tài khoản</h1>
<p class="title">@${Order[i].username}</p>`;
document.querySelector(".thongtin2").innerHTML = `
    <p>Ngày xác nhận mua hàng: ${Order[i].time}</p>
`;
document.querySelector("#card").style.display = `none`;
document.querySelector(".card2").style.display = `none`;
}
function changeOrderStatus(i) {
    const selectedOrder = Order[i];

    const newStatus = prompt("Chọn trạng thái đơn hàng:\n1. Chưa xác nhận\n2. Đã xác nhận\n3. Đang giao hàng\n4. Hoàn thành\n5. Đã hủy", selectedOrder.status);

    if (newStatus === null) {
        // User pressed cancel
        return;
    }

    const parsedStatus = parseInt(newStatus);

    if (isNaN(parsedStatus) || parsedStatus < 1 || parsedStatus > 5) {
        alert("Vui lòng nhập số trạng thái hợp lệ.");
        changeOrderStatus(i);
    } else {
        // Update only the status at the specified index
        selectedOrder.status = parsedStatus;
        localStorage.setItem('order', JSON.stringify(Order));
        // Perform any additional actions or UI updates as needed
        updateOrderStatusUI(i, parsedStatus);
    }
}


// Function to update the UI with the new status
function updateOrderStatusUI(index, newStatus) {
    const statusCell = document.querySelector(`#order${index}`);
    statusCell.textContent = statusDisplay(newStatus);
}


