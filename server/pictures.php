<?php
 
function getPictures() {
    try {
		echo json_encode(glob("pictures/*.{jpg,png,jpeg}", GLOB_BRACE));
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function deletePicture($id) {
    try {
    	unlink("pictures/".$id);
        echo '{"success":{"text":"Picture:'.$id.' deleted."}}'; 
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addPicture(){
/************************************************************
* Script realise par Emacs
* Crée le 19/12/2004
* Maj : 23/06/2008
* Licence GNU / GPL
* webmaster@apprendre-php.com
* http://www.apprendre-php.com
* http://www.hugohamon.com
*
* Changelog:
*
* 2008-06-24 : suppression d'une boucle foreach() inutile
* qui posait problème. Merci à Clément Robert pour ce bug.
*
*************************************************************/
/************************************************************
* Definition des constantes / tableaux et variables
*************************************************************/
// Constantes
define('TARGET', dirname(__FILE__).'/pictures/'); // Repertoire cible
define('MAX_SIZE', 500000); // Taille max en octets du fichier
define('WIDTH_MAX', 1024); // Largeur max de l'image en pixels
define('HEIGHT_MAX', 1024); // Hauteur max de l'image en pixels
// Tableaux de donnees
$tabExt = array('jpg','png','jpeg'); // Extensions autorisees
$infosImg = array();
// Variables
$extension = '';
$message = '';
$nomImage = '';
/************************************************************
* Creation du repertoire cible si inexistant
*************************************************************/
if( !is_dir(TARGET) ) {
    if( !mkdir(TARGET, 0755) ) {
        exit('Erreur : le répertoire cible ne peut-être créé ! Vérifiez que vous diposiez des droits suffisants pour le faire ou créez le manuellement !');
    }
}

/************************************************************
* Script d'upload
*************************************************************/
//echo "dans PHP<br/>";
if(!empty($_POST)){
    //echo "dans POST<br/>";

    // On verifie si le champ est rempli
    if( !empty($_FILES['fileToUpload']['name']) ){
        //echo $_FILES['fileToUpload']['name'],'<br/>';
        // Recuperation de l'extension du fichier
        $extension = pathinfo($_FILES['fileToUpload']['name'], PATHINFO_EXTENSION);
        
        // On verifie l'extension du fichier
        if(in_array(strtolower($extension),$tabExt)){
            // On recupere les dimensions du fichier
            $infosImg = getimagesize($_FILES['fileToUpload']['tmp_name']);
            
            // On verifie le type de l'image
            if($infosImg[2] >= 1 && $infosImg[2] <= 14){
                // On verifie les dimensions et taille de l'image
                //echo 'Width:', $infosImg[0],'<br/>';
                //echo 'height:', $infosImg[1],'<br/>';
                //echo 'tmp_name:', $_FILES['fileToUpload']['tmp_name'], '<br/>';
                //echo 'fileSize - tmp_name:<br/>', filesize($_FILES['fileToUpload']['tmp_name']), '<br/>';
                if(($infosImg[0] <= WIDTH_MAX) && ($infosImg[1] <= HEIGHT_MAX) && (filesize($_FILES['fileToUpload']['tmp_name']) <= MAX_SIZE)){
                    // Parcours du tableau d'erreurs
                    if(isset($_FILES['fileToUpload']['error']) && UPLOAD_ERR_OK === $_FILES['fileToUpload']['error']){
                        // On renomme le fichier
                        $nomImage = md5(uniqid()) .'.'. $extension;
                        
                        // Si c'est OK, on teste l'upload
                        if(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], TARGET.$nomImage)){
                            //echo "final file name:", TARGET.$nomImage, '<br/>';
                            $message = 'Upload réussi !';
                        } else {
                            // Sinon on affiche une erreur systeme
                            $message = 'Problème lors de l\'upload !';
                        }
                    } else {
                        $message = 'Une erreur interne a empêché l\'uplaod de l\'image';
                    }
                } else {
                    // Sinon erreur sur les dimensions et taille de l'image
                    $message = 'Erreur dans les dimensions de l\'image !';
                }
            } else {
                // Sinon erreur sur le type de l'image
                $message = 'Le fichier à uploader n\'est pas une image !';
            }
        } else {
            // Sinon on affiche une erreur pour l'extension
            $message = 'L\'extension du fichier est incorrecte !';
        }
    } else {
        // Sinon on affiche une erreur pour le champ vide
        $message = 'Veuillez remplir le formulaire svp !';
    }
}else{
    $message = 'No POST message';
}
echo('{"success":{"text":'. $message .'}}');
} 
?>

