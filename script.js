const urlBase = 'https://5fd39ad7e9cda40016f5b79f.mockapi.io/';


const creatObject = () => {
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    return { fullname, email, address, phone }
}

const updateObject = () => {
    const fullname = document.getElementById('updtname').value;
    const email = document.getElementById('updtemail').value;
    const address = document.getElementById('updtaddress').value;
    const phone = document.getElementById('updtphone').value;
    return { fullname, email, address, phone }
}

const drawTable = (data) => {
    const tbody = users.querySelector('tbody');
    tbody.innerHTML = "";
    for (prop in data) {
        const user = data[prop];
        const tr = document.createElement('tr');
        const checkSpan = document.createElement('span');
        const checkInput = document.createElement('input');
        const tdcheck = document.createElement('td');
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdAddress = document.createElement('td');
        const tdPhone = document.createElement('td');

        checkSpan.setAttribute("class", "custom-checkbox");
        checkInput.setAttribute("type", "checkbox");
        checkInput.setAttribute("id", "select");
        tdName.innerHTML = user.fullname;
        tdEmail.innerHTML = user.email;
        tdAddress.innerHTML = user.address;
        tdPhone.innerHTML = user.phone;

        checkSpan.appendChild(checkInput);
        tdcheck.appendChild(checkSpan);
        tr.appendChild(tdcheck)
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAddress);
        tr.appendChild(tdPhone);

        const btnUpdate = document.createElement('button');
        btnUpdate.classList.add('btn');        
        btnUpdate.setAttribute('id', 'update');
        btnUpdate.setAttribute('type', 'submit');
        btnUpdate.setAttribute('value', user.id);
        btnUpdate.setAttribute('data-toggle', 'modal');
        btnUpdate.setAttribute('data-target', '#updateEmployeeModal');
        btnUpdate.style.color = '#566787';
        btnUpdate.innerHTML = '<span  class="material-icons">refresh</span>';
        btnUpdate.addEventListener('click', () => getId(user.id));
        btnUpdate.addEventListener('click', loadUpdtModal);
        const tdActions = document.createElement('td');
        tdActions.appendChild(btnUpdate);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn');
        btnDelete.setAttribute('id', 'delete');
        btnDelete.setAttribute('value', user.id);
        btnDelete.setAttribute('data-toggle', 'modal');
        btnDelete.setAttribute('data-target', '#deleteEmployeeModal');
        btnDelete.style.color = '#566787';
        btnDelete.innerHTML = '<span  class="material-icons">delete</span>';
        btnDelete.addEventListener('click', () => getId(user.id));
        const tdDelete = document.createElement('td');
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }
}

const users = document.getElementById('usersTable');
const refreshTable = () => {
    fetch(`${urlBase}/users`)
        .then(response => response.json())
        .then(data => {
            drawTable(data);
        })
        .catch(error => console.log(error))
}

var idToModify;
 const getId = (id) => {
    idToModify = id;
}
const loadUpdtModal = (e) => {
    e.preventDefault()
    fetch(`${urlBase}/users/${idToModify}`)
        .then(response => response.json())
        .then(data => {
                const newFullname = document.getElementById('updtname');
                const newEmail = document.getElementById('updtemail');
                const newAddress = document.getElementById('updtaddress');
                const newPhone = document.getElementById('updtphone');

                newFullname.value = data.fullname;
                newEmail.value = data.email;
                newAddress.value = data.address;
                newPhone.value = data.phone;
        })
        .catch(error => console.log(error))
}

