
function openForm(){
               
    document.getElementById("myOverlay").style.display="block";
}

function closeform(){
                   
    document.getElementById("myOverlay").style.display="none";
}

function validation(){

    var password1=document.getElementById("password01").value;
    var password2=document.getElementById("password02").value;

    if(password1!==password2){
           alert("passwords do not match");
                }
     else{
         alert("all complete");
     }
     }

function numericalValidation(){
      var Telephone=document.getElementById("telenum").value;
      var patt = /^\d{3}-\d{7}$/;

      if(patt.test(Telephone)){
            confirm("correct");
      }
      else{
         alert("Wrong")
      }
      }
