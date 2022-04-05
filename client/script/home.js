const setTable = async () => await fetch('http://localhost:3000/api/users/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(users => {
        let table = document.querySelector('#user-table')
        table.innerHTML = ''
        row = table.insertRow();
        let header_id = row.insertCell()
        header_id.innerHTML = "ID"
        header_id.className = "header-cell"
        let header_name = row.insertCell()
        header_name.innerHTML = "NAME"
        header_name.className = "header-cell"
        let header_age = row.insertCell()
        header_age.innerHTML = "AGE"
        header_age.className = "header-cell"

        users.forEach(user => {
            row = table.insertRow();
            let id = row.insertCell()
            id.innerHTML = user.userID;
            id.className = 'column-1'
            let name_user = row.insertCell()
            name_user.innerHTML = user.name;
            name_user.className = 'column-2'
            let age = row.insertCell()
            age.innerHTML = user.age;
            age.className = 'column-3'
        })
    })
    .then(console.log('fetched latest changes!'))

setTable() // run on start
setInterval(function () { setTable() }, 4500) // refresh every 4.5sec
