const drawTable = async () => await fetch('/api/users/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(users => {
        let table = document.querySelector('#user-table')
        table.innerHTML = ''

        const addUtilityRow = () => {
            btn_add = buttonFactory(`btn-add`, `+ create user`)
            utilityRow = table.insertRow()
            utilityRow.insertCell()
            utilityRow.appendChild(btn_add)
            btn_add.addEventListener('click', event =>{
                event.preventDefault()
                window.location.href = 'http://localhost:3000/api/user/create'
            })
        }
        
        addUtilityRow()

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

            // buttons
            //view
            let btn_view = buttonFactory(`viewbtn-${user.userID}`, `view`)
            let td_view = row.insertCell()
            td_view.className = 'view'
            td_view.appendChild(btn_view)
            btn_view.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = `/api/user/lookup/${user.userID}`
            })
            
            
            //edit -- 
            let btn_edit = buttonFactory(`editbtn-${user.userID}`, `edit`)
            let td_edit = row.insertCell()
            td_edit.className = 'edit'
            td_edit.appendChild(btn_edit)
            btn_edit.addEventListener('click', event => {
                event.preventDefault()
                alert('Edit pressed!')
                // ! -- TODO - do a PUT for updating the user, or redirect to a page where the user may do an edit
                // what do I need for a PUT command? 
                // 1. change name, age? Dropdown/radiobuttons + input next to boxes?
                // 2. read input, make the PUT using this existing user object. Update this on db, not locally.
                // 3. Refresh table (already done below)
                // 
                drawTable() // recursive call for immediate refresh              
            })
            
            // del --
            let btn_del = buttonFactory(`delbtn-${user.userID}`, `del`)
            let td_del = row.insertCell()
            td_del.className = 'del'
            td_del.appendChild(btn_del)
            btn_del.addEventListener('click', event => {
                event.preventDefault()
                alert('Delete pressed!')
                //! -- TODO - do a DELETE HTTP request for deleting this entry from the db
                // what do I need for a DELETE command? 
                // 1. confirmation buttons? Checkmark | X?
                // 2. Send HTTP DELETE request to backend api.
                // 3. Refresh table(already done below)
                drawTable()
            }) 
        })
        addUtilityRow()
    })
    .then(console.log('fetched latest changes!'))

drawTable() // set table at startup
setInterval(function () { drawTable() }, 4500) // refresh every 4.5sec


function buttonFactory(tdClassname, btnInnerHTML ){
    let btn = document.createElement('Button')
    btn.className = tdClassname
    btn.innerHTML = btnInnerHTML //!TODO - replace with image
    return btn
}