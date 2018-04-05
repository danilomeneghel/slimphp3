<?php

//__ gestion des erreurs
ini_set('display_errors','on');
error_reporting(E_ALL);

require __DIR__ . '/../config/app.php';

$app->run();
