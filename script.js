const database = firebase.database();
const textsRef = database.ref('entries');

// Hàm lưu dữ liệu
function saveText() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value.trim();

    if (text) {
        // Sử dụng .push() để thêm một bản ghi mới với ID duy nhất
        textsRef.push({
            content: text
        });
        textInput.value = ''; // Xóa nội dung ô nhập
    }
}

// Lắng nghe thay đổi trên cơ sở dữ liệu
// Sẽ tự động chạy khi trang web tải lần đầu và mỗi khi có dữ liệu mới được thêm vào
textsRef.limitToLast(5).on('value', (snapshot) => {
    const textList = document.getElementById('textList');
    textList.innerHTML = ''; // Xóa danh sách cũ

    const data = snapshot.val();
    if (data) {
        // Lặp qua dữ liệu nhận được và thêm vào danh sách
        const entries = Object.values(data);
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry.content;
            textList.appendChild(li);
        });
    }
});
