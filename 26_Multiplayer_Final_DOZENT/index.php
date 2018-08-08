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
                         <input type="text" name="user" placeholder="insert username" />
                         <input type="text" name="pass" placeholder="insert password" />
                        </form>
                        
                        <div class="registerBtn loginBtns">register</div>
                        <div class="loginBtn loginBtns">login</div>                        
                        
                    </div>
                </div>
                <div class="gameView siteView"></div>
                
                <div class="registerView siteView">
                    
                    <div class="backBtn"> << </div>
                     
                    <div class="registerBox">

                           <form id="registerForm">
                            <input type="text" name="user" placeholder="insert username" />
                            <input type="text" name="pass1" placeholder="insert password" />
                            <input type="text" name="pass2" placeholder="retype password" />
                            <input type="email" name="email" placeholder="insert email" />
                           </form>

                           <div class="saveRegisterBtn loginBtns">register</div>
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
