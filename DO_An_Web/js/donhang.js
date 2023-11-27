let User = JSON.parse(localStorage.getItem("user")) || [];

let donhang = document.getElementById("donhang");
let content = document.getElementById("content");

donhang.addEventListener('click', function() {
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
                <div class="switch-toggle">
                    <label>
                    <input type="checkbox" onclick="updateOrderStatus(${donhang.ID},'${donhang.size}')">

                        <span></span>
                    </label>
                </div>
            </div>`;
            });
    });
});

function updateOrderStatus (ID, size)  {
    console.log("Updating order status for ID:", ID, "and size:", size);
    const orderIndex = User.findIndex((user) => user.cart && user.cart.some((donhang) => donhang.ID === ID && donhang.size === size && donhang.status === "chưa xử lí"));

    if (orderIndex !== -1) {
        const user = User[orderIndex];
        const order = user.cart.find((donhang) => donhang.ID === ID && donhang.size === size && donhang.status === "chưa xử lí");

        // Update order status to "đã xử lí"
        order.status = "đã xử lí";

        localStorage.setItem("user", JSON.stringify(User));
        alert('Đã xử lí đơn hàng!');
    }
};
