// Khởi tạo các biến kết nối tới Firebase Realtime Database
const database = firebase.database();
const textsRef = database.ref('entries');

// Hàm xử lý khi người dùng nhấn nút "Lưu"
function saveText() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value.trim();

    if (text) {
        // Gửi dữ liệu mới lên Firebase với một ID duy nhất
        textsRef.push({
            content: text,
            timestamp: Date.now() // Thêm dấu thời gian để đảm bảo thứ tự
        });
        
        // Xóa nội dung trong ô nhập sau khi gửi
        textInput.value = '';
    }
}

// Lắng nghe các thay đổi từ Firebase theo thời gian thực
// Lệnh .limitToLast(5) đảm bảo chỉ lấy 5 kết quả mới nhất
textsRef.limitToLast(5).on('value', (snapshot) => {
    const textList = document.getElementById('textList');
    
    // Xóa nội dung danh sách cũ trước khi cập nhật
    textList.innerHTML = ''; 

    const data = snapshot.val();
    if (data) {
        // Chuyển đổi dữ liệu từ object sang array để dễ dàng lặp qua
        const entries = Object.values(data);
        
        // Lặp qua từng bản ghi và thêm vào danh sách
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry.content;
            textList.appendChild(li);
        });
    }
});
