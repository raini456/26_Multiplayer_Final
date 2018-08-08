<?php

if(isset($_GET['flag'])){
    
        define('HOST', 'localhost');
        define('DB', 'multiplayer_db');
        define('USER', 'root');
        define('PASS', '');
        define('CHAR', 'utf8mb4');

        $dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s', HOST, DB, CHAR);
        $db = new PDO($dbHost, USER, PASS);

      if($_GET['flag'] == '0' && isset($_POST['user'])){
            $sql = "SELECT * FROM user WHERE user = '".$_POST['user']."'";            
            $statement = $db->query($sql);
            $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
      }
      
      if($_GET['flag'] == '1' && isset($_POST['user']) ){
        $sql = "INSERT INTO user (user,pass,email)"
        . "VALUES (:u,:p,:e)";
               $statement = $db->prepare($sql);
               $statement->bindValue(':u', $_POST['user']);
               $statement->bindValue(':p', $_POST['pass']);
               $statement->bindValue(':e', $_POST['email']);                   
           $statement->execute();
                           
                        
           /* $file = fopen("output.txt","w+");
                    fputs($file,$msg);
                    fclose($file);*/
            
            echo json_encode($statement);
        }
      
      
      
      
      
      
      

}else{
    echo "ES IST EIN FEHLER AUFGETRETEN, .... !!!";
}
















/*
 INSERT INTO `termine` (`id`, `titel`, `datum`, `zeit`, `bemerkung`, `kategorie`) VALUES
(2, 'Tennis mit Sergio ', '2018-08-28', '19:00:00', 'Der hat doch keine Chance :-)', 3),
(3, 'Bella Birthday', '2018-08-10', '12:00:00', 'Einfach mal tach sagen', 1),
(4, 'Zahnarzt im Storkower Bogen', '2018-08-28', '09:00:00', 'Wie Urlaub', 1);
*/
