const urlBase = 'https://5fd39ad7e9cda40016f5b79f.mockapi.io/'

//create object
const creatObject = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    return { name, email, address, phone }
}
//update object
const updateObject = () => {
    const name = document.getElementById('updtname').value;
    const email = document.getElementById('updtemail').value;
    const address = document.getElementById('updtaddress').value;
    const phone = document.getElementById('updtphone').value;
    return { name, email, address, phone }
}
//refrescar tabla
const users = document.getElementById('usersTable');
const refreshTable = () => {
    fetch(urlBase + '/users.json')
        .then(response => response.json())
        .then(data => {
            const tbody = users.querySelector('tbody');
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
                tdName.innerHTML = user.name;
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
                btnUpdate.setAttribute('value', prop);
                btnUpdate.setAttribute('data-toggle', 'modal');
                btnUpdate.setAttribute('data-target', '#updateEmployeeModal');
                btnUpdate.style.color = '#566787';
                btnUpdate.innerHTML = '<span  class="material-icons">refresh</span>';
                const tdActions = document.createElement('td');
                tdActions.appendChild(btnUpdate);

                const btnDelete = document.createElement('button');
                btnDelete.classList.add('btn');
                btnDelete.setAttribute('id', 'delete');
                btnDelete.style.color = '#566787';
                btnDelete.innerHTML = '<span  class="material-icons">delete</span>';
                const tdDelete = document.createElement('td');
                tdActions.appendChild(btnDelete);
                tr.appendChild(tdActions);

                tbody.appendChild(tr);
            }

        })
        .catch(error => console.log(error))

}
refreshTable();
