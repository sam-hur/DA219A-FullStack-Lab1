document.addEventListener('submit', button => {
    button.preventDefault();
    const id = document.querySelector('#id-lookup')
    window.location.href = `/api/user/lookup/${id.value}`
})
