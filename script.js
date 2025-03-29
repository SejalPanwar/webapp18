document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let data = {
        sno: document.getElementById('sno').value,
        name: document.getElementById('name').value,
        pno: document.getElementById('pno').value,
        corr_address: document.getElementById('corr_address').value,
        perm_address: document.getElementById('perm_address').value,
        mobile: document.getElementById('mobile').value,
        co_number: document.getElementById('co_number').value
    };

    let storedData = JSON.parse(localStorage.getItem('personalData')) || [];
    storedData.push(data);
    localStorage.setItem('personalData', JSON.stringify(storedData));

    document.getElementById('dataForm').reset();
    displayData();
});

function displayData() {
    let storedData = JSON.parse(localStorage.getItem('personalData')) || [];
    let table = document.getElementById('dataTable');
    table.innerHTML = '<tr><th>S.No</th><th>Name</th><th>P.N.O</th><th>Corr. Address</th><th>Perm. Address</th><th>Mobile</th><th>C.O</th><th>Actions</th></tr>';

    storedData.forEach((entry, index) => {
        let row = table.insertRow();
        
        Object.values(entry).forEach(text => {
            let cell = row.insertCell();
            cell.textContent = text;
        });

        let actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        `;
    });
}

function deleteData(index) {
    let storedData = JSON.parse(localStorage.getItem('personalData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('personalData', JSON.stringify(storedData));
    displayData();
}

function editData(index) {
    let storedData = JSON.parse(localStorage.getItem('personalData')) || [];
    let data = storedData[index];

    document.getElementById('sno').value = data.sno;
    document.getElementById('name').value = data.name;
    document.getElementById('pno').value = data.pno;
    document.getElementById('corr_address').value = data.corr_address;
    document.getElementById('perm_address').value = data.perm_address;
    document.getElementById('mobile').value = data.mobile;
    document.getElementById('co_number').value = data.co_number;

    storedData.splice(index, 1);
    localStorage.setItem('personalData', JSON.stringify(storedData));
    displayData();
}

function searchData() {
    let filter = document.getElementById('search').value.toLowerCase();
    let storedData = JSON.parse(localStorage.getItem('personalData')) || [];
    let table = document.getElementById('dataTable');
    table.innerHTML = '<tr><th>S.No</th><th>Name</th><th>P.N.O</th><th>Corr. Address</th><th>Perm. Address</th><th>Mobile</th><th>C.O</th><th>Actions</th></tr>';

    storedData.filter(entry => entry.name.toLowerCase().includes(filter)).forEach((entry, index) => {
        let row = table.insertRow();
        
        Object.values(entry).forEach(text => {
            let cell = row.insertCell();
            cell.textContent = text;
        });

        let actionCell = row.insertCell();
        actionCell.innerHTML = `
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        `;
    });
}

displayData();
