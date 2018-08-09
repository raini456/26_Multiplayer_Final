<?php
require_once('config.php');
  
if (isset($_GET['flag'])) { 
    $dbHost = sprintf('mysql:host=%s;dbname=%s;charset=%s', HOST, DB, CHAR);
    $db = new PDO($dbHost, USER, PASS);

    if ($_GET['flag'] == '0' && isset($_POST['user'])) {
        $sql = "SELECT * FROM user WHERE user='".$_POST['user']."'";        
        $statement = $db->query($sql);
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }        
    
    if ($_GET['flag'] == '1' && isset($_POST['user'])) {            
        $sql = "INSERT INTO user(user, pass, email) VALUES(:u,:p,:e)";        
        $statement = $db->prepare($sql);        
        $statement->bindValue(':u',$_POST['user']);
        $statement->bindValue(':p',$_POST['pass']);
        $statement->bindValue(':e',$_POST['email']);
        $statement ->execute();
        /*         * *********USERLINK PER EMAIL SENDEN*********** */
        $msg = "Hallo " . $_POST['user'] . ", ";
        $msg .= "Schön das Sie sich regestriet haben."
                . "Um diesen Prozess abzuschliessen "
                . "klicken Sie bitten auf diesen Link:\n\r";
        $msg .= "http://localhost/26_Multiplayer_Final/db.php?flag=2&u=" . $_POST['user'];
        $msg .= "\n\r" . "\n\r" . "Vielen Dank und alles Gute Ihr MPG-TEam";

        $empfaenger = $_POST['email'];
        $betreff = 'Finale Regestrierung für MPG-Online';

        $header = 'From: eureemail@euredomain.com' . "\r\n" .
                'Reply-To: eureemail@euredomain.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
        //sende email ab 
        // mail($empfaenger, $betreff, $msg, $header);        


        $file = fopen("data/reg_" . $_POST['user'] . "_.txt", "w+");
        fputs($file, $msg);
        fclose($file);
        echo json_encode($statement);
    }
    if ($_GET['flag'] == '3') {
        $sql = "SELECT * FROM room1";        
        $statement = $db->query($sql);
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }  
    if ($_GET['flag'] == '4') {
        
      $sql = "UPDATE room1 SET xpos = '200', ypos='200' WHERE id='1'";                 
//        $sql = "UPDATE room1 SET xpos =:x,ypos=:y WHERE id=:i"; 
        $statement = $db->query($sql);       
//        $statement->bindValue(':x',$_POST['xp']);
//        $statement->bindValue(':y',$_POST['yp']);
//        $statement->bindValue(':i',$_POST['id']);
        $statement ->execute();
        
    }
}