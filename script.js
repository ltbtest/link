let recentEntries = [];
const MAX_ENTRIES = 5;

function saveText() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value.trim();

    if (text) {
        // Thêm kết quả mới vào đầu mảng
        recentEntries.unshift(text);

        // Giới hạn mảng chỉ còn 5 phần tử
        if (recentEntries.length > MAX_ENTRIES) {
            recentEntries.pop();
        }

        // Lưu dữ liệu vào localStorage để duy trì sau khi tải lại trang
        localStorage.setItem('recentEntries', JSON.stringify(recentEntries));

        // Cập nhật giao diện
        updateList();

        // Xóa nội dung trong ô nhập
        textInput.value = '';
    }
}

function updateList() {
    const textList = document.getElementById('textList');
    textList.innerHTML = ''; // Xóa danh sách cũ

    recentEntries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        textList.appendChild(li);
    });
}

// Tải dữ liệu từ localStorage khi trang được load
document.addEventListener('DOMContentLoaded', () => {
    const storedEntries = localStorage.getItem('recentEntries');
    if (storedEntries) {
        recentEntries = JSON.parse(storedEntries);
        updateList();
    }
});
