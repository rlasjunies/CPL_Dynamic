<?PHP

function getPaints() {
    $sql = "select * FROM paints ORDER BY name";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $paints = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        //echo '{"paint": ' . json_encode($paints) . '}';
        echo '{"status":"success", "value":'.json_encode($paints).'}';
        //echo json_encode($paints);
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
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
        echo '{"status":"success", "value":'.json_encode($paint).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
    }
}

function addPaint() {
    $request = Slim\Slim::getInstance()->request();
    $paint = json_decode($request->getBody());
    $sql = "INSERT INTO paints (name, year, description, Picture) VALUES (:name, :year, :description, :Picture)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $paint->name);
        $stmt->bindParam("year", $paint->year);
        $stmt->bindParam("description", $paint->description);
        $stmt->bindParam("Picture", $paint->Picture);
        $stmt->execute();
        $paint->id = $db->lastInsertId();
        $db = null;
        echo '{"status":"success", "value":'.json_encode($paint).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
    }
}

function updatePaint($id) {
    $request = Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $paint = json_decode($body);
    $sql = "UPDATE paints SET name=:name, year=:year, description=:description, Picture=:Picture  WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $paint->name);
        $stmt->bindParam("year", $paint->year);
        $stmt->bindParam("description", $paint->description);
        $stmt->bindParam("Picture", $paint->Picture);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo '{"status":"success", "value":'.json_encode($paint).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
    }
}
 
function deletePaint($id) {
	/*$sql = "SELECT * FROM paints WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $paint = $stmt->fetchObject();
        $db = null;
        //echo json_encode($paint);
        echo '{"status":"success", "value":'.json_encode($id).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
    }*/
	
    $sql = "DELETE FROM paints WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
		echo '{"status":"success", "value":'.json_encode($id).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
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
        echo '{"status":"success", "value":'.json_encode($paints).'}';
    } catch(PDOException $e) {
        echo '{"status":"failed", "error":{"message:"'. $e->getMessage() .'"}}';
    }
}
?>