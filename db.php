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
    if ($_GET['flag'] == '1' && isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['email'])) {
        $sql = "INSERT INTO user(user, pass, email) VALUES(:u,:p,:e)";        
        $statement = $db->prepare();
        $statement->bindValue(':u',$_POST['user']);
        $statement->bindValue(':p',$_POST['pass']);
        $statement->bindValue(':e',$_POST['email']);
        $statement ->execute();
    }

}