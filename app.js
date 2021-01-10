document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
    let details = [];
    let id =0;
    let button = document.querySelector('.btn-large');
    let description = document.querySelector('#description'); 
    let valnr = document.querySelector('#editVal');
    let income = document.querySelector('.income-table');
    let expense = document.querySelector('.expenses-table');
    let budget = document.querySelector('.budget');
    let incomeAm = document.querySelector('.incomeamount');
    let expenseAm = document.querySelector('.expenseamount');

    let braza = 0;
  
    document.querySelector('.btn-large').addEventListener('click',function() {
      let incomeExpense = document.querySelector('#income-expense').value; 
      let userInc ={
        id: id,
        name: description.value,
        number: parseInt(valnr.value),
        type:parseInt(incomeExpense),
      };

      if(isNaN(userInc.number)){
        alert("Error: Value field can not be empty.");
        console.log("Is not a number");
      }
      else if((userInc.name==='')){
          alert("Error: Name field can not be empty.")
      }
      else
      {
        details.push(userInc);
      }
        
      console.log(details);
      id++;
      description.value="";
      valnr.value="";
      display(details);
    });
  
    
  
  
    function display(details) {
      
      income.innerHTML=null;
      expense.innerHTML=null;
      for(i=0;i<details.length;i++) {
        if(details[i].type===2){
        income.innerHTML+=`
    <tr id="${details[i].id}">
      <td> ${details[i].name} </td>
      <td>€${details[i].number}.00 </td>
      <td> <a class="btn-floating btn-large orange waves-effect z-depth-3"  onclick="editIncome(${details[i].id})" id="${details[i].id}"><i class="material-icons">edit</i>Edit</a>  </td> 
      <td> <a class="btn-floating btn-large red waves-effect z-depth-3"  onclick="delIncome(${details[i].id})" id="${details[i].id}"><i class="material-icons">delete</i>Delete</a>  </td> 
      
    
    </tr>
        
        
        `;} else if (details[i].type===1) {
          expense.innerHTML+=`
          <tr id="${details[i].id}">
            <td> ${details[i].name} </td>
            <td>€${details[i].number}.00  </td>
            <td> <a class="btn-floating btn-large orange waves-effect z-depth-3"  onclick="editIncome(${details[i].id})" id="${details[i].id}"><i class="material-icons">edit</i></a>  </td> 
            <td> <a class="btn-floating btn-large red waves-effect z-depth-3"  onclick="delIncome(${details[i].id})" id="${details[i].id}"><i class="material-icons">delete</i></a>  </td> 
          </tr>
              `;
        }
    }

    Calcul();
    }
  
    function Calcul() {
      let totalInc = 0;
      let totalEsp= 0;
      for(let i=0;i<details.length;i++) {
        if(details[i].type===2) 
        totalInc = details[i].number+totalInc;
        if(details[i].type===1)
        totalEsp=details[i].number+totalEsp;
    
    }
      
      incomeAm.innerText= "INCOME: €" + totalInc +".00" ;
      expenseAm.innerText= "EXPENSE: €" + totalEsp +".00" ;
      budget.innerText=`€${totalInc-totalEsp}.00`
  
    }
    
  
    function delIncome(id) {
      let index = details.findIndex((item) => item.id === id);
      details.splice(index, 1);
      display(details);
    }
    

    let editat = document.querySelector(".editing");
    function editIncome(id) {
      editat.innerHTML =`
      <div class="row center-align ">
        <div class="col s1 m4 l4"><p class="right-align ">Edit: </p></div>
        <div class="col s12 m2 l2 input field ">
          <textarea id="editNam" class="materialize-textarea center-align editNam validate"></textarea>
            <label for="editNam">Description</label>
        </div>

        <div class="col s12 m2 l2 input field ">
          <input type="number"  id="editVal" class="materialize-textarea center editVal validate"></input>
            <label for="editVal">Value</label>
            <div class="col s1 m1 l1"></div>
            <div class="col s12 m1 l1 right"><a class="btn-floating btn-large waves-effect waves-light green save" style="margin-left: 3rem; margin-top: -3rem; " ><i class="material-icons">save</i></a></div>
        </div>
      `;
      

          

        let save = document.querySelector(".save");
        save.addEventListener('click', function() {
        let editName = document.querySelector('.editNam').value;
        let editNumber = parseInt(document.querySelector('.editVal').value);
        let edited = details.findIndex((item) => item.id === id);
        
        if(isNaN(editNumber))
        {
            alert("Error: Value field can not be empty.");
            console.log("Is not a number");
          }
          else if(editName===''){
              alert("Error: Name field can not be empty.")
          }
          else
          {
            details[edited].name = editName;
            details[edited].number= editNumber;
            editat.innerHTML=null;
          }
          console.log(editNumber, editName)
          Calcul();
          display(details);
          
          
      }) 
    }
