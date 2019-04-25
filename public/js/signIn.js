document.querySelector('#signInForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    // Now you can use formData.get('foo'), for example.
    // Don't forget e.preventDefault() if you want to stop normal form .submission
    const url = "http://localhost:3000/test"
    fetch(url,{
        method:"POST",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded",
        },
        body: formData
    }).then(res => {
        res.json()
        console.log(res)
    })
})