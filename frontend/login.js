const responseBox = document.getElementById('response-box');
let rescode = 0;

document.getElementById('submit-button').addEventListener('click',function(event){
    event.preventDefault();
    console.log('Login triggered')

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if(email?.length === 0)
    {
        responseBox.textContent = "Must provide email"
    }
    else if(password?.length === 0)
    {
        responseBox.textContent = "Must provide password"
    }
    else {
        const reqbody = {email, password}
        try {
        fetch('http://127.0.0.1:80/user/login',{
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
                window.location.href = './dashboard.html'
                
            }
            return response.json()
        })
        .then(data =>{
            localStorage.setItem('f_name',data.userExists.f_name)
            responseBox.textContent = data.userExists.f_name
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
document.getElementById('password').addEventListener('input',function(e){
    e.preventDefault(),
    responseBox.textContent = " "
})



