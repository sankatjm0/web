

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
                    <div class="status-option" data-status="danggiaohang">Đang Giao Hàng</div>
                    <div class="status-option" data-status="hoanthanh">Hoàn thành</div>
                    <div class="status-option" data-status="dahuy">Đã Hủy</div>
                </div>
            </div>
        </div>
        <div class="search">
            <input type="text" placeholder="Tìm tài khoản" class="tim_hang" />
            <button class="search-btn">Tìm</button>
        </div>
    </div>
    <table style=" width: 100%; text-align: left; border-collapse: collapse;" id="list-user">
        <tr>
            <th>Mã đơn hàng</th>
            <th>Tài khoản</th>
            <th>Tên khách hàng</th>
            <th>Chi tiết đơn hàng</th>
            <th>Trạng thái</th>
        </tr>
    </table>
</div>
<div id="card3" style="display: none;">
    <div class="card4">
        <button class="b3" onclick="cancelP2()" style="bottom: 10px; right: 10px;">Thoát</button>
    </div>
</div>
    </div>`;
    displayDonHang(Order);
    filter();
});

function product_filtering(status, Order,filteredOrders,id) {
    console.log("Selected Status:", status);

    if (status === 'all') {
        return Order;
    }

    Order.filter((dh,index) => {
        if(dh.status === getStatusValue(status)){
            filteredOrders.push(dh);
            id.push(index);
        }
    });
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
        case 'danggiaohang':
            return 3;
        case 'hoanthanh':
            return 4;
        case 'dahuy':
            return 5;
        default:
            return -1; // Handle other cases if needed
    }
}



function filter() {
    Ordercopy = [...Order];
    const statusDropdown = document.querySelector('.status-options');
    let filteredOrders;
    document.querySelectorAll('.status-option').forEach(statusOption => {
        statusOption.addEventListener('click', function (event) {
            Ordercopy = [...Order];
            filteredOrders=[];
            id=[];
            console.log(id);
            const selectedStatus = event.target.getAttribute('data-status');

            if (selectedStatus === 'all') {
                displayDonHang(Ordercopy); // Show all orders
            } else {
                product_filtering(selectedStatus, Ordercopy,filteredOrders,id);
                displayDonHang(filteredOrders);
                const user_clear = document.querySelector("#list-user");
                var rows = user_clear.getElementsByTagName("tr");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].getElementsByTagName("td");
                    if(cells[0]) {
                        cells[0].innerHTML = "DH" + (id[i-1]+1);
                    }
                }
            }
            toggleStatusOptions(); // Close dropdown after selecting a status option
            
        });
    });

    document.querySelector('.search-btn')?.addEventListener('click', function () {
        let usernameInput = document.querySelector('.tim_hang');
        Order_name=[];
        id2=[];
        let check_filter = false;
        if(filteredOrders?.length!=0 && filteredOrders != undefined){
            Ordercopy=filteredOrders;
            check_filter=true;
        }
        // Save the search value before clearing
        const searchValue = usernameInput.value.trim();
    
        // Clear the input content
        usernameInput.value = '';
    
        // Continue processing the search
        Ordercopy.forEach((dh,index) => {
            if (dh.username.toLowerCase() == searchValue.toLowerCase()) {
                Order_name.push(dh);
                if(check_filter === false){
                    id2.push(index);
                }
                if(check_filter === true){
                    id2.push(id(index));
                }
            }
        });
    
        displayDonHang(Order_name);
        const user_clear = document.querySelector("#list-user");
        var rows = user_clear.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");
            if(cells[0]) {
                cells[0].innerHTML = "DH" + (id2[i-1]+1);
            }
        }
    
        // Close dropdown after searching only if not searching by username
        if (!searchValue) {
            toggleStatusOptions();
        }
    });
    

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
  <td style="border: none;" data-index="${i}">DH${i + 1}</td>
  <td style="border: none;">${dh.username}</td>
  <td style="border: none;">${dh.name}</td>
  <td style="border: none;" id="xem" onclick="show2(${i})">Xem</td>
  <td style="border: none;" class="order-status" data-index="${i}" onclick="changeOrderStatus(${i})">${statusDisplay(dh.status)}</td>
`;
document.querySelectorAll('.status-option').forEach(statusOption => {
    statusOption.classList.add('status-option');
  });

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
        <button onclick="changeStatus2(${i}, ${index})">Xác nhận</button>
    `;
});

document.querySelector("#card3").innerHTML = `
    <div class="card4">
        ${statusDetails}
        <button class="b3" onclick="cancelP2()" style="bottom: 10px; right: 10px;">Thoát</button>
    </div>
`;

document.querySelector("#card3").style.display = `block`;
document.querySelector(".card4").style.display = `block`;
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

function cancelP2() {
document.querySelector("#card3").style.display = `none`;
}

function changeStatus2(i, x) {
    let stt = prompt("Chọn trạng thái:\n1. Chưa xác nhận\n2. Đã xác nhận\n3. Đang giao hàng\n4. Hoàn thành\n5. Đã hủy", Order[i].status[x].status);

    if (stt === null) {
        // User pressed cancel
        return;
    }

    stt = parseInt(stt);

    if (isNaN(stt) || stt < 1 || stt > 5) {
        alert("Vui lòng nhập số trạng thái hợp lệ.");
        changeStatus2(i, x);
    } else {
        Order[i].status[x].status = stt;
        localStorage.setItem('order', JSON.stringify(Order));
        checkorder(i);
    }
}



function show2(i) {
document.querySelector("#card3").innerHTML = `
    <div class="card4">
        <h1>Chi tiết đơn hàng</h1>
        <div class="thongtin3">
            <p style="text-align: center;">${Order[i].time}</p>
            <p>Người nhận: ${Order[i].name}</p>
            <p>Địa chỉ giao hàng: ${Order[i].address}</p>
            <p>Số điện thoại nhận hàng: ${Order[i].phone}</p>
            <p>Tổng: ${Order[i].cost}</p>

        </div>
        <div id="order-products3">
            <h3>Sản phẩm đã mua</h3>
            <div id="flow">
            <table id="product-table3" style="width: 100%; text-align: left; border-collapse: collapse;">
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
                <tbody id="product-list3"></tbody>
            </table>
        </div>
        </div>
        <p>
            <button class="b3" onclick="cancel2(${i})" style="bottom: 10px; right: 10px;">Thoát</button>
        </p>
    </div>
`;

const productList = document.querySelector("#product-list3");

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

document.querySelector("#card3").style.display = `block`;
document.querySelector(".card4").style.display = `block`;
}

function cancel2(i) {
document.querySelector(".thongtin3").innerHTML = `
    <p style="text-align: center;">${Order[i].time}</p>
`;
document.querySelector("#card3").style.display = `none`;
document.querySelector(".card4").style.display = `none`;
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


function updateOrderStatusUI(index, newStatus) {
    console.log("Updating status for index", index, "to", newStatus);
    const statusCell = document.querySelector(`.order-status[data-index="${index}"]`);
    
    if (statusCell) {
        statusCell.textContent = statusDisplay(newStatus);
        console.log("Status updated successfully.");
    } else {
        console.error("Error: Status cell not found for index", index);
    }

    // Update the Order array with the new status
    Order[index].status = newStatus;
    localStorage.setItem('order', JSON.stringify(Order));
}

