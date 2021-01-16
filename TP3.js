//refreshTable();

const btnAdd = document.getElementById('submit');
const form = document.getElementById('formAddUser');
const spinner = document.getElementById('spinner');
const buttonUpdate = document.getElementById('submitUpdate');
const buttonIconUpdate = document.getElementById('update');
const buttonDelete = document.getElementById('submitDelete');
const buttonFilter = document.getElementById('filter');

//4. Add user -----falta validaciones del formulario
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
        .then(data => refreshTable())
        .catch(error => console.log(error))
}
btnAdd.addEventListener('click', newUser);

//5. filter
const filterUsers = () => {
    const criteria = document.getElementById('search').value;
    fetch(urlBase + '/users?filter=' + criteria)//'?title=fullname%20' + criteria // no se si a el 20
        .then(response => response.json())
        .then(data => drawTable(data))
        .catch(error => console.log(error))
}
buttonFilter.addEventListener('click', filterUsers);

//6. delete user
const deleteUser = (e) => {
    const idDelete = document.getElementById('delete').value;
    e.preventDefault()
    fetch(urlBase + '/users/' + idDelete, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
buttonDelete.addEventListener('click', deleteUser)

//7. update user

const updtModal = () => {
    const idUpdate = document.getElementById('update').value;
    console.log(idUpdate);
    fetch(urlBase + '/users/' + idUpdate)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (prop in data) {
                const user = data[prop];
                /* const newFullname = document.getElementById('updtname');
                const newEmail = document.getElementById('updtemail');
                const newAddress = document.getElementById('updtaddress');
                const newPhone = document.getElementById('updtphone'); */

                document.getElementById('updtname').value = user.fullname;
                document.getElementById('updtemail').value = user.email;
                document.getElementById('updtaddress').value = user.address;
                document.getElementById('updtphone').value = user.phone;

                /* newFullname.setAttribute('value') = user.fullname;
                newEmail.setAttribute('value') = user.email;
                newAddress.setAttribute('value') = user.address;
                newPhone.setAttribute('value').value = user.phone; */
            }
        })
        .catch(error => console.log(error))
}
buttonIconUpdate.addEventListener('click', updtModal);


const updateUser = (e) => {
    //const idUpdate = document.getElementById('update').value;
    //console.log(idUpdate);
    e.preventDefault()
    fetch(urlBase + '/users/' + idUpdate, { //cambiarlos todos a este formato `${base}genre/movie/list?api_key=${apiKey}` -----------------------
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

