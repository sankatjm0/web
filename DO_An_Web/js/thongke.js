
document
    .querySelector("#tk")
    .addEventListener("click", function () {
        document.querySelector("#content").innerHTML = `
        <div style="margin:10px">
        <h2 style="font-size: 38px; text-align: center;">Thống kê doanh thu<br></h2>
        <div>
        <table style="width: 100%; border: 1px solid black; text-align: center" id="full">
        <tr style="border: 1px solid black">
        <th>Ngày</th>
        <th>Số sản phẩm đã bán</th>
        <th>Doanh thu</th>
        </tr>
        </table></div>
        `
        displayDT();
    } )

    function displayDT() {
    
        checkArr = []
        for (let i = 0; i < order.length; i++) {
            let money = 0;
            let len = 0;
            let f = checkArr.find(item => item == order[i].date);
            if (f==null) {
            let dt = order[i].date;
            checkArr.push(dt);
            
            const row = document.createElement("tr");

            for (let y = 0; y<order.length; y++) {
                if (order[y].date == dt) {
                    for (let x=0; x<order[y].products.length; x++) {
                        len += order[y].products[x].quantity;
                    }
                    var num = parseInt((order[y].cost).replace(/^0-9]/g, ""));
                    money += num;
                }

            row.innerHTML = `
              <td>${dt}</td>
              <td>${len}</td>
              <td>${money}</td>
              `;
            document.querySelector("#full").appendChild(row);
           
          }
        }
    }
}