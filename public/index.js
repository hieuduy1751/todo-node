let editID;
let inputField = document.getElementById('taskContent');

function changeStatus(id) {
    window.location.replace(`http://localhost:3000/task/status/${id}`);
}

function showEditModal(id) {
    editID = id;
}

function editTask() {
    window.location.replace(`http://localhost:3000/task/edit/${editID}?content=${inputField.value}`) 
}