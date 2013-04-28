<?php
 
require 'Slim/Slim.php';
include 'dbconnection.php';
include 'paints.php';
include 'pictures.php';

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

/* PICTURES */
$app->get('/pictures', 'getPictures');
$app->post('/pictures', 'addPicture');
$app->delete('/pictures/:id', 'deletePicture');
  
$app->run();
  
?>