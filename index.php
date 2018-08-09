<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
         <!-- JQUERY -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
         <!-- JS -->       
        <script src="assets/js/custom.js"></script>
    </head>
    <body>
        <div id="wrapper">
            <div class="moveBox">
                <div class="startView siteView"> 
                    <div class="loginBox">
                        <form id="loginForm">
                            <input type="text" name="user" placeholder="Username">
                            <input type="password" name="pass" id="pass" placeholder="Passwort">
                        </form>
                        <div class="registerBtn">register</div>
                        <div class="loginBtn">login</div>
                    </div>
                </div>
                <div class="gameView siteView">
                    <canvas id="canvasGame" width="550" height="440"></canvas>
                </div>
                <div class="registerView siteView">
                    <h3>Registierung</h3>
                    <div class="registerBox">
                        <div class="backBtn"><<</div>
                        <form id="registerForm">
                            <input type="text" name="regUser" id="regUser" placeholder="Username">                            
                            <input type="password" name="pass1" id="pass1" placeholder="Passwort">
                            <input type="password" name="pass2" id="pass2" placeholder="Passwort wiederholen">
                            <input type="email" name="email" id="email" placeholder="Emailadresse">
                            <div class="saveRegisterBtn">jetzt registrieren</div>                             
                        </form>
                    </div>
                    
                </div>             
                
            </div>           
        </div>
        
        
        
        <?php
        // put your code here
        
        //header('Location:db.php?flag=2') ;
        //header('Location:http://www.google.de') ;
        ?>
    </body>
</html>
