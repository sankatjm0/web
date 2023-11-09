// Function to render the list of users
function renderListUser() {
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (users.length === 0) return false;

    let tableContent = `<tr>
        <td>#</td>
        <td>Họ và Tên</td>
        <td>Email</td>
        <td>Mật Khẩu</td>
        <td>Số điện thoại</td>
        <td>Địa chỉ</td></tr>`;

    users.forEach((user, index) => {
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>`;
    });

    document.getElementById('grid-user').innerHTML = tableContent;
}

// Function to auto-update the list of users
function autoUpdateListUser() {
    renderListUser(); // Update the list of users
}

// Call the autoUpdateListUser function at an interval (e.g., every 5 seconds)
setInterval(autoUpdateListUser, 5000); // Update every 5 seconds
