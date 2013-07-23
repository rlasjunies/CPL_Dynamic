<?php
 
require 'Slim/Slim.php';
include 'dbconnection.php';
include 'paints.php';
include 'Pictures.php';

Slim\Slim::registerAutoloader();

use Slim\Slim;
 
$app = new \Slim\Slim();
 
/*  PAINTS  */
$app->get('/paints', 'getPaints');
$app->options('/paints', 'getPaints');
$app->get('/paints/:id',  'getPaint');
$app->get('/paints/search/:query', 'findByName');
$app->post('/paints', 'addPaint');
$app->put('/paints/:id', 'updatePaint');
$app->delete('/paints/:id',   'deletePaint');

/* PictureS */
$app->get('/Pictures', 'getPictures');
$app->post('/Pictures', 'addPicture');
$app->delete('/Pictures/:id', 'deletePicture');
  
$app->run();
  
?>