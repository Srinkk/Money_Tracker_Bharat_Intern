const resName = document.getElementById('user_name')
const fName = localStorage.getItem('f_name');
const email = localStorage.getItem('email')
let rescode = 0;
if(fName)
{
    resName.textContent = fName
}
else{
    resName.textContent = 'User'
}
document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
    });


    
   const budgetBox = document.getElementById('monthly_budget');
   const amountBox = document.getElementById('response_box');

   const close = document.getElementById('close_icon')
    close.addEventListener('click',(e)=>{
        e.preventDefault()
        budgetBox.parentElement.style.display = 'none'
        
    })

   const prev = budgetBox;

   document.getElementById('submit_budget').addEventListener('click',function(event){
        console.log('submit_budget triggered')
        event.preventDefault();

        const type = document.getElementById('dropdown').value
        console.log(type)
        const amount = document.getElementById('budget_value').value
        console.log(amount)

        if(!type)
        {
            type = 'RS';
        }
        else if(amount == 0){
            amountBox.textContent = "Please provide an amount";
        }
        else{
            localStorage.setItem =('monthly_budget',amount)
            const reqbody = {email, amount}
            fetch('http://127.0.0.1:80/user/setBudget',{
                method: 'POST',
                body: reqbody,
                headers : {
                    'Content - Type' : 'application/json'
                }
            })
            .then(response=>{
                rescode = response.status
                if(rescode=== 200)
                {
                    budgetBox.textContent = `Your monthly budget is ${type} ${amount}`;
                }
            })
            .then(data=>{
                console.log(data)
            })
            
        }
   })

   document.getElementById('dropdown').addEventListener('input', function(event){
    event.preventDefault();
    amountBox.textContent ="";
   })
   document.getElementById('budget_value').addEventListener('input', function(event){
    event.preventDefault();
    amountBox.textContent = "";
   })
   const reg_expense =  document.getElementById('regular_expense').value
   document.getElementById('get_total').addEventListener('click',function(event){
        
        event.preventDefault();
        console.log(email)

        const reqbody = {email, reg_expense}

        try{
            fetch('http://127.0.0.1:80/user/getTotal',{
                method : 'POST',
                body : JSON.stringify(reqbody),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            .then((response)=>{
                rescode = response.status;
                console.log(response)
                if(rescode === 200)
                {
                    console.log("Got the total value")
                }
                return response.json()
            })
            .then(data =>{
                console.log(data.expense)
                // localStorage.setItem('total',data.total)
                // document.getElementById('regular_expense').textContent = `${data.total}`;
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        catch(error){
            console.log(error)
        }
   })

   function addItem() {
    const list = document.querySelector('.item_list ul')

    const form = document.createElement('form');
    form.id = 'expenseForm';
  
    const namelabel = document.createElement('label')
    namelabel.id = 'name_label';
    namelabel.textContent = 'Expense Name'
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Expense Name';
    nameInput.required = true;

    const amountlabel = document.createElement('label')
    amountlabel.id = 'amount_label'
    amountlabel.textContent = 'Enter amount'
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.placeholder = 'Amount';
    amountInput.required = true;
  
   
    const saveButton = document.createElement('button');
    saveButton.type = 'button'; // Prevent form submission
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
      
      const expenseName = nameInput.value;
      const expenseAmount = amountInput.value;
      const reqBody =  {expenseName, expenseAmount}
      fetch('http://127.0.0.1:80/user/setexpense',{
        method : 'POST',
        body: reqBody,
        headers : {
            'Content-Type' : 'application/json'
        }
      }).then(response =>{
        rescode = response.status;
        if(rescode === 200)
        {
            localStorage.setItem (['item_name',expenseName])
            localStorage.setItem(['item_amount',expenseAmount])
        }
        return response.json()
      }).then(data=>{
        console.log(data)
      })
        
      alert(`Expense Name: ${expenseName}\nAmount: ${expenseAmount}`);
      if(amountInput.value != 0)
      {
        if(nameInput.value == " ")
      {
        nameInput.textContent = "Others"
      }
        const myLi = document.createElement('li')
        myLi.innerHTML = nameInput.value;
        const liamount = document.createElement('div')
        liamount.innerHTML = amountInput.value
        const trash = document.createElement('span')
        trash.className = 'fas fa-trash'

        trash.onclick = function(e){
            e.preventDefault();
            myLi.style.display = 'none';
            myLi.style.transform = 'translateX(-200%)';

        }

        myLi.appendChild(trash)
        myLi.appendChild(liamount);
        list.appendChild(myLi);
        
      }
      document.getElementById('expenseForm').style.display = 'none';

    };
  
    form.appendChild(namelabel)
    form.appendChild(nameInput);// Line break for better separation
    form.appendChild(amountlabel)
    form.appendChild(amountInput);
    form.appendChild(saveButton);
    document.body.appendChild(form);
  
    // document.body.style.overflow = 'hidden'; 
    document.body.style.backgroundColor = 'transparent';
    form.style.display = 'block';
  }



    
