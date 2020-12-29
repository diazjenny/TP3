//refreshTable();

const btnAdd = document.getElementById('submit');
const form = document.getElementById('formAddUser');
const spinner = document.getElementById('spinner');
const buttonUpdate = document.getElementById('submitUpdate');
const buttonIconUpdate = document.getElementById('update');
const buttonDelete = document.getElementById('delete');
const url = new URL(window.location);
const id = url.searchParams.get('name');

//Add user
const newUser = (e) => {
    e.preventDefault();
    spinner.classList.add('d-inline-block');
    spinner.classList.remove('d-none');
    fetch(urlBase + '/users', {
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
        .then(data => console.log(data))
        .catch(error => console.log(error))
    //refreshTable();
}
btnAdd.addEventListener('click', newUser);

//filter
const getUser = () => {
    fetch(urlBase + '/users/' + idAModificar + '.json')
        .then(response => {
            return response.json()

        })
        .then(data => {
            document.getElementById('user').value = data.user;
            document.getElementById('email').value = data.email;
            document.getElementById('password').value = data.password;
        })
        .catch(error => console.log(error))
}
getUser()

//update user
const updateUser = (e) => {
    e.preventDefault()
    const idUpdate = buttonIconUpdate.getAttribute('value')
    //const idUpdate = submitUpdate.getAttribute('valor');
    console.log(idUpdate);
    fetch(urlBase + '/users/' + id + '.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(updateObject())
    })
        .then(response => {
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
buttonUpdate.addEventListener('click', updateUser);

//delete user
const deleteUser = (e) => {
    e.preventDefault()
    fetch(urlBase + '/users/' + idAModificar + '.json', {
        method: 'DELETE',
    })
        .then(response => {
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
buttonDelete.addEventListener('click', deleteUser)