<?php

echo "auto_generated.php started\n";
echo " + Recollint dades...\n";

$autor = "Joan Frago";
$titulo_web = "Portafoli JS - ".$autor;
$subtitulo_web = "M04 i M09 - DAM01 - ITB";
$email = "joan.frago.7e9@itb.cat";

function getDirs($path) {
    $dirs = [];
    $items = scandir($path);
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === '.git' || !is_dir($path . '/' . $item)) {
            continue;
        }
        $dirs[] = $item;
    }
    return $dirs;
}

function searchImage($path) {
    $imgs = glob($path . "/*.{jpg,jpeg,png,gif,webp}", GLOB_BRACE);
    if (count($imgs) > 0) {
        return $imgs[0];
    }
    return null;
}

// Search for info.json, if it doesn't exist use dir name
function getMetadata($path, $dirName) {
    $infoFile = $path . '/info.json';
    
	// Default values
    $data = [
        'title' => str_replace(['_', '-'], ' ', $dirName),
        'subtitle' => 'Exercicis i Pràctiques',
        'description' => 'Contingut pràctic desenvolupat en aquest bloc.',
        'tag' => 'JS',
        'tag_class' => 'tag-default'
    ];

    if (file_exists($infoFile)) {
        $json = json_decode(file_get_contents($infoFile), true);
        if ($json) {
            $data = array_merge($data, $json);
        }
    }
    
    if (!file_exists($infoFile)) {
        if (stripos($dirName, 'M04') !== false) {
            $data['tag'] = 'M04';
            $data['tag_class'] = 'tag-m04';
        } elseif (stripos($dirName, 'M09') !== false) {
            $data['tag'] = 'M09';
            $data['tag_class'] = 'tag-m09';
        }
    }

    return $data;
}

echo " - Dades recollides correctament\n";
echo " + Generant index.html...\n";

// --- HTML GENERATION ---
// Output buffering to capture HTML
ob_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo_web; ?></title>
    <link rel="stylesheet" href="./style.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

    <header class="header">
        <div class="header-content">
            <h1 class="header-title">JavaScript</h1>
            <p class="header-subtitle"><?php echo $subtitulo_web; ?></p>
            <p class="header-code-info">Repositori de <strong class="highlight-name"><?php echo $autor; ?></strong></p>
        </div>
    </header>

    <main class="container">
        <?php
        $dirs = getDirs('.');
        
        if (empty($dirs)): ?>
            <div class="empty-state">
                <h2>No s'han trobat directoris</h2>
            </div>
        <?php endif;

        foreach ($dirs as $dir): 
            $dirdirdir = './' . $dir;
            $meta = getMetadata($dirdirdir, $dir);
            $image = searchImage($dirdirdir);
            // If no image, placeholder with dir name
            $imgSrc = $image ? $image : "https://placehold.co/600x400/0056b3/ffffff?text=" . urlencode($meta['title']);
            
			// subdirs
            $subdirs = getDirs($dirdirdir);
        ?>
        
        <article class="project-card">
            <div class="card-image-container">
                <img src="<?php echo $imgSrc; ?>" alt="Imatge de <?php echo $meta['title']; ?>" class="card-image">
                <span class="card-tag <?php echo $meta['tag_class']; ?>"><?php echo $meta['tag']; ?></span>
            </div>
            <div class="card-content">
                <h2 class="card-title"><?php echo $meta['title']; ?></h2>
                <h3 class="card-subtitle"><?php echo $meta['subtitle']; ?></h3>
                <p class="card-description"><?php echo $meta['description']; ?></p>

                <div class="card-exercises">
                    <h4><i class="fas fa-folder-open"></i> Contingut:</h4>
                    <?php if (empty($subdirs)): ?>
                        <p class="no-exercises">Encara no hi han exercicis en aquest directori.</p>
                    <?php else: ?>
                        <ul class="card-links-list">
                            <?php foreach ($subdirs as $subdir): 
								// clean name
                                $subDirName = str_replace(['_', '-'], ' ', $subdir);
                                $link = $dirdirdir . '/' . $subdir . '/index.html';
                                // if no index.html, link to dir
                                if (!file_exists($link)) $link = $dirdirdir . '/' . $subdir;
                            ?>
                            <li>
                                <a href="<?php echo $link; ?>" target="_blank">
                                    <i class="fas fa-code"></i> <?php echo $subDirName; ?>
                                </a>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

                <footer class="card-footer">
                   <span class="folder-path">./<?php echo $dir; ?></span>
                </footer>
            </div>
        </article>
        
        <?php endforeach; ?>
    </main>

    <footer class="site-footer">
        <p>Contacte: <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a></p>
        <p>&copy; <?php echo date("Y"); ?> <?php echo $autor; ?>. Generat automàticament amb PHP.</p>
    </footer>

</body>
</html>
<?php
// capture content and clean buffer
$htmlContent = ob_get_clean();

if (file_put_contents('index.html', $htmlContent)) {
    echo " - index.html generat correctament\n";
    echo " + S'han trobat " . count($dirs) . " directoris de temes\n";
} else {
    echo " #### Error: No s'ha pogut escriure l'arxiu index.html ####\n";
}

echo "auto_generated.php finished\n";
?>
