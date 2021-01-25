refreshTable();

const btnAdd = document.getElementById('submit');
const form = document.getElementById('formAddUser');
const spinner = document.getElementById('spinner');
const buttonUpdate = document.getElementById('submitUpdate');
const buttonDelete = document.getElementById('submitDelete');
const buttonFilter = document.getElementById('filter');

//4. Add user 
const newUser = (e) => {
    e.preventDefault();
    spinner.classList.add('d-inline-block');
    spinner.classList.remove('d-none');
    fetch(`${urlBase}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(creatObject())
    })
        .then(response => {
            console.log(response);
            if (response.ok) {
                spinner.classList.add('d-none');
                spinner.classList.remove('d-inline-block');
            }
            return response.json()
        })
        .then(data => refreshTable())
        .catch(error => console.log(error))
}
btnAdd.addEventListener('click', newUser);

//5. filter
const filterUsers = () => {
    const criteria = document.getElementById('search').value;
    fetch(`${urlBase}/users?filter=${criteria}`)
        .then(response => response.json())
        .then(data => drawTable(data))
        .catch(error => console.log(error))
}
buttonFilter.addEventListener('click', filterUsers);

//6. delete user
const deleteUser = (e) => { 
    e.preventDefault()
    fetch(`${urlBase}/users/${idToModify}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => refreshTable())
        .catch(error => console.log(error))
}
buttonDelete.addEventListener('click', deleteUser)

//7. update user
const updateUser = (e) => {
    e.preventDefault()
    fetch(`${urlBase}/users/${idToModify}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(updateObject())
    })
        .then(response => {
            return response.json()
        })
        .then(data => refreshTable())
        .catch(error => console.log(error))
        
}
buttonUpdate.addEventListener('click', updateUser);

