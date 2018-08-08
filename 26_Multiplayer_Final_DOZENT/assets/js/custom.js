
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
  
  $(".registerBtn").click( function(){ 
      $(".moveBox").animate({left:'-600px'}); 
  });
  
  $(".saveRegisterBtn").click( function(){ 
      checkRegister();
  });
  
  $(".backBtn").click( function(){ 
      $(".moveBox").animate({left:'0px'}); 
  });
  
  $(".loginBtn").click( function(){ 
      checkLogin();
  });   
  
    
});//ready End


function checkRegister(){
    var formData = $("#registerForm").serializeArray();
    console.log(formData);
    if(formData[0].value.length < 3 ){
        alert("Der Username ist zu kurz -> min 3 Buchstaben");
    }else{
        if(formData[3].value.length < 5 ){
            alert("Die Email ist zu kurz -> min 5 Buchstaben");
        }else{
            if( formData[3].value.indexOf("@") == -1 ){
                alert("Die Email ist nicht valid.");
            }else{
                if(formData[1].value.length < 4){
                     alert("Die Pass1 ist zu kurz, -> min 4 Buchstaben");
                }else{
                    if(formData[1].value ==  formData[2].value){
                        //registriere USer
                        //alert("Register User")
                        registerUser(formData);
                    }else{
                        alert("Passwörter stimmen nicht überein!!!")
                    }
                }
            }
            
        }
        
    }
    
 }// end checkRegister
 
 function registerUser(formData){
     //sende username aus Formular an DB und versuche Daten zu bekommen
   $.post("db.php?flag=0", {user: formData[0].value},
       function(data, status){
         var tmp = JSON.parse(data);
         //tmp.length == 0 -> User ist nicht vorhanden
         if( tmp.length == 0){
            /*****************************/ 
             $.post(  "db.php?flag=1", 
              {   user: formData[0].value,
                  pass: formData[1].value,
                  email:formData[3].value
              },
              function(data, status){ 
             $(".moveBox").animate({left:'0px'}) ;    
              }
            );             
            /**********************************/ 
         }else{
             alert('User ist schon vorhanden !!!');
         }
     });     
 }


function checkLogin(){
     var formData = $("#loginForm").serializeArray();
     console.log(formData);
     console.log(formData[0].value);
     getUserDataFromUserName(formData[0].value,formData[1].value);    
}
var allUserData = [];
function getUserDataFromUserName(username,password){
 $.post("db.php?flag=0", {user: username}, function(data, status){
        allUserData = JSON.parse(data) ;
        console.log(allUserData);        
        if(allUserData.length == 0){
            alert("Der User ist nicht vorhanden, bitte regestrieren Sie sich!")
        }else{
            if(allUserData[0].register == '0'){
              alert("Ihre Regestrierung ist noch nicht abgeschlossen, schauen Sie in Ihre Mails.")  
            }else{
                if(allUserData[0].pass == password){
                    //versuch ihn  in room1 anzumelden
                     alert("GO TO GAMEROOM");
                }else{
                 alert("Username und Passwort stimmen nicht überein")     
                }
            }
        }
        
  });
}  