document.addEventListener('submit', button => {
    button.preventDefault();
    const id = document.querySelector('#id-lookup')
    window.location.href = `http://localhost:3000/api/user/lookup/${id.value}`
})
