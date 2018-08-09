
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
var email="";
var regUser="";
var pass1;
var pass2;
var pass;
var canvas;
var context;
$(document).ready(function(){
    canvas = document.getElementById('canvasGame');
    context = canvas.getContext('2d');
//    console.log("READY !!!");
    // Globale Variablen Startwere setzen
    checkRegister();
    $('.registerBtn').click(function(){
        $('.moveBox').animate({
            left:'-900px'
        });
    });
    $('.loginBtn').click(function(){checkLogin()}); 
    $('.backBtn').click(function(){
        $('.moveBox').animate({
            left:'0px'
        });
    });
    
    $('.saveRegisterBtn').click(function(){
        if((pass1!="" && pass2!="") && pass1==pass2){ 
            alert("Die beiden Passwörter stimmen überein!");
            pass=pass1;
            registerUser();
        }
        else{
           alert("Leider stimmen die Passwörter nicht überein!");
        }
    });
    
});//ready End
function registerUser(){
      $.post("db.php?flag=0",{
        user:regUser,
        pass:pass,
        email:email
    },
      function (data, status) {
           
        var tmp = JSON.parse(data);
            if (tmp.length == 0) {                
                $.post("db.php?flag=1", {                    
                    user: regUser,
                    pass: pass1,
                    email: email
                },
                    function (data, status) {                      
                      if(status=="success"){
                        $('.moveBox').animate({
                            left:'0px'
                        });
                      }                        
                });
            } else {
                alert("User ist schon vorhanden");
                }
            });      
}
function checkRegister(){
    $('#regUser').change(function(){        
        if($(this).val().length<3){
            eingabeLaenge(); 
        }
        else{
            regUser=$(this).value;
            alert(regUser);
        }
    });
    $('#pass1').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }else{
            pass1 = $(this).value;
        }
        
    });
    $('#pass2').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }else{
            pass2 = $(this).value;
        }        
    });             
    
    $('#email').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }
        else{
        var i=$(this).val().indexOf('@');
        if(i==-1){
            alert("Kein @ in der Email vorhanden");
        }
         else{
             email=$(this).val();            
         }
      }
    });
    
}
function eingabeLaenge(){    
      alert("Die Eingabe muss länger als 3 Zeichen sein");    
}
function checkLogin(){
    var formData =$('#loginForm').serializeArray();//holt Daten aus dem Array
    getUserDataFromUserName(formData[0].value);
}
function getUserDataFromUserName(username){
    $.post("db.php?flag=0", {user:username}, function(data, status){
        var allUserData = JSON.parse(data);
        var password = $('#pass').val();
        console.log(password);
        if(allUserData.length==0){
            alert("Der User ist nicht vorhanden, bitte registieren");
            $('.moveBox').animate({
                left:'-900px'
            });
        }
        else{
        if(allUserData[0].register==='0'){
            alert("Ihre Registrierung ist unvollständig, bitte überprüfen Sie Ihre Emails");
        }        
        if(password==allUserData[0]['pass']){
            $('.moveBox').animate({
                left:"-300px"
            },400);   
            $('#wrapper').animate({
                width:"600px"
            });
        }
        else{
         alert("Username und Passwort stimmen nicht überein");   
        }
        }
        
    });
}
