
//$( selector(htmlelement,cssclass,id) ).methode -> .css(),.attr(),.hide(),.show()
//$( selector(htmlelement,cssclass,id) ).event(fn(){...})   -> .click(),.ready(),.on() 
var email="";
var regUser="";
var pass1;
var pass2;
var pass;
var canvas;
var context;
var inter;
var allDdata;
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
            registerUser();
        }
        else{
           alert("Leider stimmen die Passwörter nicht überein!");
        }
    });
    
    $(document).keyup(function(event){
        console.log(allData);
        var xp = parseInt(allData[0].xpos);
        var yp = parseInt(allData[0].ypos);
        if(event.keyCode==37){
            xp -= 15; console.log("left", xp);
        };
        if(event.keyCode==38){
            yp -= 15;console.log("up", yp);
        };
        if(event.keyCode==39){
           xp += 15; console.log("right", xp); 
        };
        if(event.keyCode==40){
           yp += 15; console.log("down", yp); 
        };
        $.post('db.php?flag=4',{
            xp:xp,
            yp:yp,
            id:1
        }, function(data, status){});
    });
    inter = setInterval(loop, 1000);
});//ready End
function loop(){
    updateScreen();
}


function drawRectInCanvas(xp, yp, color){
    context.beginPath();
    context.rect(xp,yp,50,50);
    context.fillStyle=color;
    context.fill();
}
function checkRegister(){    
    $('#regUser').change(function(){        
        if($(this).val().length<3){
            eingabeLaenge(); 
        }
        else{
            regUser=$(this).val();            
        }
    });
    $('#pass1').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }else{
            pass1 = $(this).val();            
        }
        
    });
    $('#pass2').change(function(){
        if($(this).val().length<3){
            eingabeLaenge();
        }else{
            pass2 = $(this).val();
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
