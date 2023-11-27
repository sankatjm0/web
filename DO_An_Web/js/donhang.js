let User = JSON.parse(localStorage.getItem("user")) || [];


let donhang = document.getElementById("donhang")
let content = document.getElementById("content");

donhang.addEventListener('click', function() {
    content.innerHTML = '';
    content.innerHTML=` 
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
            <div class="sanpham">sản phẩm</div>
            <div class="dongia">đơn giá</div>
            <div class="soluong">số lượng</div>
            <div class="thoigian">thoigian</div>
            <div class="trangthai">trạng thái</div>
        </div>
    </div>`

    let thongtin = document.querySelector('.thongtin');
    User.forEach( user =>{
        let data = user.cart;
        if(data!=null)
        data.forEach(donhang => {
            thongtin.innerHTML +=`
            <div class="thongtinsanpham">
                <div class="sanpham">${donhang.name}</div>
                <div class="dongia">${donhang.price}</div>
                <div class="soluong">${donhang.quantity}</div>
                <div class="thoigian">${donhang.time}</div>
                <div class="trangthai">
                    <select name="trangthai" id="trangthai-select">
                    <option value="0" selected>chưa xử lý</option>
                    <option value="1">đã xử lý</option>
                    </select>
    
                </div>
            </div>
            `
        });

    });

});

