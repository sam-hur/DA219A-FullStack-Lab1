var editing = false;
const intervalTimer = 12500;
var interval = setInterval(function () { drawTable() }, intervalTimer) // refresh every 4.5sec;
const stopInterval = () => clearInterval(interval)

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

        const addUtilityRow = (rowClassName) => {
            const div = document.createElement('div')
            btn_add = buttonFactory(`btn-add`)
            utilityRow = table.insertRow()
            utilityRow.className = rowClassName
            utilityRow.appendChild(btn_add)
            btn_add.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = '/api/user/create'
            })
            const lbl = document.createElement("label")
            lbl.textContent = "Create New User"
            lbl.className = "lbl-create"

            div.appendChild(btn_add)
            div.appendChild(lbl)
            div.className = "div-create"
            const cell1 = utilityRow.insertCell()
            cell1.colSpan = "2"
            cell1.appendChild(div)
            utilityRow.insertCell() // dead space
            const viewAll = utilityRow.insertCell()
            const viewAllBtn = document.createElement('button')
            viewAllBtn.className = 'view-all'

            lbl.addEventListener("click", _ => {
                window.location.href = "/api/user/create"
            })
            viewAllBtn.addEventListener("click", _ => {
                window.location.href = "/api/users/"
            })
            viewAll.appendChild(viewAllBtn)


            const editAll = utilityRow.insertCell()
            const editAllBtn = document.createElement('button')
            editAllBtn.className = "edit-all"
            editAllBtn.addEventListener('click', _ => {
                toggleEditingState()
                drawTable()
            })
            editAll.appendChild(editAllBtn)

        }

        addUtilityRow("util-top")

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

        // edit toggle


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
            let btn_view = buttonFactory(`viewbtn-${user.userID}`)
            let td_view = row.insertCell()
            td_view.className = 'view column-4'
            td_view.appendChild(btn_view)
            btn_view.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = `/api/user/lookup/${user.userID}`
            })
            const col5 = row.insertCell() // dead column
            col5.className = 'column-5'
            // del --
            let btn_del = buttonFactory(`delbtn-${user.userID}`)
            let td_del = row.insertCell()
            td_del.className = 'del column-6'
            td_del.appendChild(btn_del)
            let btn_confirmDel = buttonFactory('btn-accept')
            const delCol2 = row.insertCell()
            delCol2.className = 'column-12'
            delCol2.style.visibility = "hidden"
            delCol2.appendChild(btn_confirmDel)

            let btn_declineDel = buttonFactory('btn-decline')
            let delCol3 = row.insertCell()
            delCol3.className = "column-13"
            delCol3.style.visibility = "hidden"
            delCol3.appendChild(btn_declineDel);



            // modification elements
            // radio buttons + labels
            let modName = document.createElement('input')
            modName.setAttribute("type", "radio")
            modName.className = "edit-field"
            modName.checked = true;
            let lblName = document.createElement('label')
            lblName.textContent = 'Name'
            lblName.className = "edit-field"

            let modAge = document.createElement("input")
            modAge.setAttribute("type", "radio")
            modAge.className = "edit-field"
            let lblAge = document.createElement('label')
            lblAge.textContent = 'Age'
            lblAge.className = "edit-field"

            // modAge.innerHTML = "Age"
            const col7 = row.insertCell()
            col7.className = "column-7"
            col7.appendChild(modName)
            const col8 = row.insertCell()
            col8.className = "column-8"
            col8.appendChild(lblName)
            const col9 = row.insertCell()
            col9.className = "column-9"
            col9.appendChild(modAge)
            const col10 = row.insertCell()
            col10.className = "column-10"
            col10.appendChild(lblAge)

            modName.addEventListener('change', _ => {
                modAge.checked = false;
            })
            lblName.addEventListener('click', _ => {
                modName.checked = true;
                modAge.checked = false;
            })
            modAge.addEventListener('change', _ => {
                modName.checked = false;
            })
            lblAge.addEventListener('click', _ => {
                modName.checked = false;
                modAge.checked = true;
            })

            const editTextBox = document.createElement('input')
            editTextBox.setAttribute("type", "text")
            editTextBox.classList.add('text-input', 'edit-field')
            const col11 = row.insertCell()
            col11.className = "column-11"
            col11.appendChild(editTextBox)

            // confirmation buttons
            let btn_accept = buttonFactory('btn-accept')
            btn_accept.classList.add("edit-field")
            const col12 = row.insertCell()
            col12.className = 'column-12'
            col12.appendChild(btn_accept)

            let btn_decline = buttonFactory('btn-decline')
            btn_decline.classList.add("edit-field")
            let col13 = row.insertCell()
            col13.className = "column-13"
            col13.appendChild(btn_decline);


            btn_accept.addEventListener('click', _ => {
                console.log('triggered')
                userDef = undefined
                if (modName.checked) {
                    userDef = {
                        name: editTextBox.value,
                        age: user.age
                    }
                } else if (modAge.checked) {
                    userDef = {
                        name: user.name,
                        age: editTextBox.value
                    }
                }
                fetch(`/api/user/lookup/${user.userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDef)
                })
                window.location.reload()
            })


            // hide all utility buttons when not editing
            var elements = [
                modName,
                lblName,
                modAge,
                lblAge,
                editTextBox,
                btn_accept,
                btn_decline
            ]

            if (!editing || editTextBox.style.visibility == 'visible') {
                elements.forEach(e => {
                    e.style.visibility = "hidden"
                })
            } else { elements.forEach(e => e.style.visibility = "visible") }

            btn_del.addEventListener('click', event => {
                event.preventDefault()
                stopInterval()
                toggleDelConf()
            })

            const toggleDelConf = () => {
                btn_confirmDel.style.visibility = btn_confirmDel.style.visibility == "visible" ? "hidden" : "visible"
                btn_declineDel.style.visibility = btn_declineDel.style.visibility == "visible" ? "hidden" : "visible"
            }

            btn_confirmDel.addEventListener('click', _ => {
                fetch(`/api/users/lookup/${user.userID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                window.location.reload()
            })

            btn_declineDel.addEventListener('click', _ => {
                interval = setInterval(function () { drawTable() }, intervalTimer)
                toggleDelConf()
            })

        })
        addUtilityRow("util-bottom")
    })
    .then(console.log('fetched latest changes!'))

drawTable() // set table at startup

function toggleEditingState() {
    editing = !editing
    if (editing) {
        stopInterval()
    }
    else {
        interval = setInterval(function () { drawTable() }, intervalTimer)
    }
}


function buttonFactory(tdClassname) {
    let btn = document.createElement('Button')
    btn.className = tdClassname
    return btn
}

