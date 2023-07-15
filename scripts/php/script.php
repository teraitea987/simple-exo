<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire d'ajout d'image</title>
</head>
<body>
    <form action="script.php" method="post" enctype="multipart/form-data">
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="fileToUpload">Select image to upload:</label>
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload Image" name="submit">
    </form>
</body>
</html>
    <?php
    
    if(isset($_POST["submit"])) {
        // code pour ajouter automatiquement les mots dans le fichiers titles.js dans la variable words
        $title = $_POST['title'];
        $file = '../js/words.js'; 
        $js_code = "words.push('" . addslashes($title) . "');\n";
        file_put_contents($file, $js_code, FILE_APPEND | LOCK_EX);

        // code ppour gérer l'upload
        if ($_FILES["fileToUpload"]["error"] > 0) {
            echo "Error: " . $_FILES["fileToUpload"]["error"] . "<br>";
        } else {
            
            $target_dir = "../../assets/images/uploads/";
            if (is_dir($target_dir)) {
                $files = scandir($target_dir);
                $counter = count($files) - 2; // Subtract 2 for '.' and '..' directories
                $target_file = $target_dir . 'exercice_' . $counter . '.' . pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION);
            }
            $word_per_page = 2;
            $count_word = 1;
            $uploadOk = 1;

            // Get image size and type
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if($check !== false) {
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }

            if($uploadOk)
            {
                if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                    echo "The file has been uploaded.";
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
            }
        }
    }
?>