<?php
 
require 'Slim/Slim.php';
include 'dbconnection.php';
Slim\Slim::registerAutoloader();

use Slim\Slim;
 
$app = new \Slim\Slim();
 
$app->get('/paints', 'getPaints');
$app->options('/paints', 'getPaints');
$app->get('/paints/:id',  'getPaint');
$app->get('/paints/search/:query', 'findByName');
$app->post('/paints', 'addPaint');
$app->put('/paints/:id', 'updatePaint');
$app->delete('/paints/:id',   'deletePaint');

 
$app->run();
 
function getPaints() {
    $sql = "select * FROM paints ORDER BY name";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $paints = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        //echo '{"paint": ' . json_encode($paints) . '}';
        echo json_encode($paints);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function getPaint($id) {
    $sql = "SELECT * FROM paints WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $paint = $stmt->fetchObject();
        $db = null;
        echo json_encode($paint);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function addPaint() {
    $request = Slim::getInstance()->request();
    $paint = json_decode($request->getBody());
    $sql = "INSERT INTO paints (name, year, description, picture) VALUES (:name, :year, :description, :picture)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $paint->name);
        $stmt->bindParam("year", $paint->year);
        $stmt->bindParam("description", $paint->description);
        $stmt->bindParam("picture", $paint->picture);
        $stmt->execute();
        $paint->id = $db->lastInsertId();
        $db = null;
        echo json_encode($paint);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function updatePaint($id) {
    $request = Slim::getInstance()->request();
    $body = $request->getBody();
    $paint = json_decode($body);
    $sql = "UPDATE paints SET name=:name, year=:year, description=:description, picture=:picture  WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $paint->name);
        $stmt->bindParam("year", $paint->year);
        $stmt->bindParam("description", $paint->description);
        $stmt->bindParam("picture", $paint->picture);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($paint);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function deletePaint($id) {
	$sql = "SELECT * FROM paints WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $paint = $stmt->fetchObject();
        $db = null;
        //echo json_encode($paint);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	
    $sql = "DELETE FROM paints WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
		echo json_encode($paint);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function findByName($query) {
    $sql = "SELECT * FROM paints WHERE UPPER(name) LIKE :query ORDER BY name";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $query = "%".$query."%";
        $stmt->bindParam("query", $query);
        $stmt->execute();
        $paints = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"paint": ' . json_encode($paints) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
?>