document.addEventListener('submit', button => {
    button.preventDefault();
    const htmlName = document.querySelector('#name')
    const htmlAge = document.querySelector('#age')
    const userDetails = {
        name: htmlName.value,
        age: htmlAge.value
    }

    fetch('/api/user/register', {  // furtherlogic available in routes
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)  // send this content to the register route
    })
        .then(res => res.json())
})
