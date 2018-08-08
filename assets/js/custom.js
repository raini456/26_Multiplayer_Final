
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
var email;
var regUser;
var pass1;
var pass2;
$(document).ready(function(){
    
    console.log("READY !!!");
    // Globale Variablen Startwere setzen
  
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
    checkRegister();
    $('.saveRegisterBtn').click(function(){
        if((pass1!="" && pass2!="") && pass1==pass2){            
            alert("Die beiden Passwörter stimmen überein!");
        }
        else{
         registerUser();
        }
    });
    
});//ready End
function registerUser(){
    
  if(isset(regUser)&&isset(pass1)&&isset(email)){
      $.post("db.php?flag=0",{
        user:regUser,
        pass:pass1,
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
                        //Meldung ....
                });
            } else {
                alert("User ist schon vorhanden");
                }
            });    
  }
}
function checkRegister(){
    $('#regUser').change(function(){
        var checkUser = $(this).val();
        if($(this).val().length<3){
            eingabeLaenge(); 
        }
        else{
            regUser=checkUser;
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
          
    $('.saveRegisterBtn').click(function(){
        
    });
    $('#email').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }
        var i=$(this).val().indexOf('@');
        if(i==-1){
            alert("Kein @ in der Email vorhanden");
        }
        else{
            email=$(this).val();
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
