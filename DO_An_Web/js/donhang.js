let User = JSON.parse(localStorage.getItem("user")) || [];

let donhang = document.getElementById("donhang");
let content = document.getElementById("content");

donhang.addEventListener('click', function () {
    content.innerHTML = '';
    content.innerHTML = `
    <div class="donhang">
        <div class="locsp">
            <div class="thanhnav">
                <div class="boloc">bộ lọc</div>
            </div>
            <div class="timsanpham">
                <input type="text" placeholder="ten san pham">
                <input type="text" placeholder="ten khac hang">
                <div>thoigian</div>
            </div>
        </div>

        <div class="thongtin">
            <div class="thongtinsanpham">
                <div class="hinh">IMG</div>
                <div class="sanpham">sản phẩm</div>
                <div class="dongia">đơn giá</div>
                <div class="soluong">số lượng</div>
                <div class="size">Size</div>
                <div class="thoigian">thoigian</div>
                <div class="trangthai">trạng thái</div>
            </div>
        </div>`;

    let thongtin = document.querySelector('.thongtin');
    User.forEach(user => {
        let data = user.cart;
        if (data != null)
            data.forEach(donhang => {
                thongtin.innerHTML += `
            <div class="thongtinsanpham">
                <img src="${donhang.img}" class="sm-product-img" alt="${donhang.name}">
                <div class="sanpham">${donhang.name}</div>
                <div class="dongia">${donhang.price}</div>
                <div class="soluong">${donhang.quantity}</div>
                <div class="size">${donhang.size}</div>
                <div class="thoigian">${donhang.time}</div>
                <div class="trangthai">${donhang.status}</div>
                <div class="switch-toggle">
                    <label>
                        <input type="checkbox" onclick="updateOrderStatus('${user.username}', ${donhang.ID},'${donhang.size}')">
                        <span></span>
                    </label>
                </div>
            </div>`;
            });
    });
});

function updateOrderStatus(username, ID, size) {
    User.forEach((user, userIndex) => {
        if (user.username === username && user.cart) {
            user.cart.forEach((donhang, orderIndex) => {
                if (donhang.ID === ID && donhang.size === size && donhang.status === "Chưa xử lí") {
                    // Update order status to "đã xử lí"
                    User[userIndex].cart[orderIndex].status = "Đã xử lí";
                }
            });
        }
    });

    localStorage.setItem("user", JSON.stringify(User));
    alert('Đã xử lí đơn hàng!');
    // You may want to refresh the UI here or reload the page to reflect the status change.
    // Example: location.reload();
}