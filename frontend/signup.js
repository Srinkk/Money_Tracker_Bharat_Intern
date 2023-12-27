const responseBox = document.getElementById('response-box');
let rescode = 0;

document.getElementById('submit-button').addEventListener('click',function(event){
    event.preventDefault();
    console.log('register triggered')

    const email = document.getElementById('email').value
    const f_name = document.getElementById('f_name').value
    const l_name = document.getElementById('l_name').value
    const password = document.getElementById('password').value

    if(email?.length === 0)
    {
        responseBox.textContent = "Must provide email"
    }
    else if(f_name?.length === 0)
    {
        responseBox.textContent = "Must provide first name"
    }
    else if(l_name?.length === 0)
    {
        responseBox.textContent = "Must provide last name"
    }
    else if(password?.length === 0)
    {
        responseBox.textContent = "Must provide password"
    }
    else {
        const reqbody = {email, f_name, l_name, password}
        try {
        fetch('http://127.0.0.1:80/user',{
            method : 'POST',
            body : JSON.stringify(reqbody),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then((response)=>{
            rescode = response.status
            console.log(response)
            if(rescode === 200)
            {
                localStorage.setItem('email',email)
                localStorage.setItem('f_name',f_name)
                window.location.href = './dashboard.html'
            }
            return response.json()
        })
        .then(data =>{
            responseBox.textContent = data.message
        })
        .catch((err)=>{
            console.log(err)
        })     
        
    }catch (error) {
        console.log(error)
    }
        
    }
})
document.getElementById('email').addEventListener('input',function(e){
    e.preventDefault(),
    responseBox.textContent = " "
})
document.getElementById('f_name').addEventListener('input',function(e){
    e.preventDefault(),
    responseBox.textContent = " "
})
document.getElementById('l_name').addEventListener('input',function(e){
    e.preventDefault(),
    responseBox.textContent = " "
})
document.getElementById('password').addEventListener('input',function(e){
    e.preventDefault(),
    responseBox.textContent = " "
})



