<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php
require_once 'fwk/security.php';
require_once 'fwk/configuration.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Hello World</title>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

        <!-- jQuery library -->
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
         <link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
         <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
        <script src="resources/js/jquery.js"></script>
        <script src="resources/js/jquery-ui.js"></script>
        <link rel="stylesheet" href="resources/my/style.css">
        <!-- Latest compiled JavaScript -->
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>    </head>
    <body id="front">
        <div class="container-fluid">
            <div class="row" >
                <div class="col-lg-12">
                    <div id="mainLogo"><img src="resources/my/images/Logo1.svg" width="200px"/></div>
                </div>
            </div>
            <div class="row" >
                <div class="col-lg-12">
                    <div id="loginContainer">
                        <form>
                            <div class="row"><div class="col-lg-4 label"><label>Gebruikersnaam</label></div><div class="col-lg-2"><input type="text" placeholder="gebruikersnaam" size="34"/></div></div>
                            <div class="row"><div class="col-lg-4 label"><label>Wachtwoord</label></div><div class="col-lg-2"><input type="password" placeholder="wachtwoord" size="34"/></div></div>
                            <div class="row"><div class="col-lg-4"></div><div class="col-sm-4"><button class="btn btn-link" type="submit" class="like" name="aanmelden" value="aanmelden">Aanmelden</button></div><div class="col-sm-1"><button class="btn btn-link" type="submit" class="like" name="registreren" >Registreren</button></div></div>
                            
                        </form>
                    </div>
                </div>
                
            </div>
            <div class="row"></div>
        </div>
        <?php
        // put your code here
        ?>
    </body>
</html>
