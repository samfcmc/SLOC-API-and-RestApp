<?php

/*
 * SLOC API
 */

// set time zone
date_default_timezone_set('Europe/Lisbon');

// get the function parameter from URL
$params = $_REQUEST;

switch ($params['func']) {
    case 'createAccount':
        createAccount($params);
        break;
    case 'signUp':
        signUp($params);
        break;
    case 'signUpAndMetaInfo':
        signUpAndMetaInfo($params);
        break;
    case 'metaInfo':
        metaInfo($params);
        break;
    case 'createDataFile':
        createDataInFile($params);
        break;
    case 'checkIn':
        checkIn($params);
        break;
    case 'setLocationData':
        setLocationData($params);
        break;
    case 'updateLocationData':
        updateLocationData($params);
        break;
    case 'getLocationDataDir':
        getLocationDataDir($params);
        break;
    case 'getLocationDataFile':
        getLocationDataFile($params);
        break;
    case 'pushLocationData':
        pushData($params);
        break;
    case 'deleteLocationData':
        deleteContent($params);
        break;
    default :
        echo "func_error";
        break;
}

function createAccount($param) {
    $userId = $param["id"];
    $userPass = $param["pass"];
    $app = $param["app"];
    $path = $param["path"];

    if (file_exists($app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $userId)) {
        echo "0";
    } else {
        file_put_contents($app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $userId, $userPass);
        echo "1";
    }
}

function signUp($param) {
    $userId = $param["id"];
    $userPass = $param["pass"];
    $app = $param["app"];
    $path = $param["path"];

    if (file_exists($app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $userId)) {
        $buffer = file_get_contents($app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $userId);
        if (strcmp($buffer, $userPass) == 0) {
            echo "1";
        } else {
            echo "2";
        }
    } else {
        echo "0";
    }
}

function signUpAndMetaInfo($param) {
    $today = getdate();
    $userId = $param["id"];
    $userPass = $param["pass"];
    $app = $param["app"];
    $path1 = $param["path1"];
    $path2 = $param["path2"];
    $metaInfo = array();

    $loginFile = $app . DIRECTORY_SEPARATOR . $path1 . DIRECTORY_SEPARATOR . $userId;
    $metaFile = $app . DIRECTORY_SEPARATOR . $path2 . DIRECTORY_SEPARATOR . "meta-info";

    if (file_exists($loginFile)) {
        $buffer = file_get_contents($loginFile);
        if (strcmp($buffer, $userPass) == 0) {
            $metaData = file($metaFile);
            $metaInfo["today"] = $today[mday] . ";" . $today[mon] . ";" . $today[year] .
                    ";" . $today[weekday] . ";" . $today[hours] . ";" . $today[minutes];
            $metaInfo["metainfo"] = $metaData;
            unset($today);
            echo json_encode($metaInfo);
        } else {
            echo "2";
        }
    } else {
        echo "0";
    }
}

function createDataInFile($param) {
    $app = $param["app"];
    $path = $param["path"];
    $filename = $param["filename"];
    $data = $param["data"];

    $file = $app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $filename;

    if (file_exists($file)) {
        $content = $data;
    } else {
        $content = ";" . $data;
    }
    file_put_contents($file, $content, FILE_APPEND | LOCK_EX);
    echo "1";
}

function metaInfo($param) {
    $today = getdate();
    $app = $param["app"];
    $path = $param["path"];
    $metaInfo = array();

    $metaData = file($app . DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . "meta-info");

    $metaInfo["today"] = $today[mday] . ";" . $today[mon] . ";" . $today[year] .
            ";" . $today[weekday] . ";" . $today[hours] . ";" . $today[minutes];
    $metaInfo["metainfo"] = $metaData;

    unset($today);
    echo json_encode($metaInfo);
}

function checkIn($param) {
    $today = getdate();
    $app = $param["app"];
    $path = $param["path"];
    $data = $param["data"];
    $hour = $param["hour"];
    $minutes = $param["min"];

    $format = '%s/%d-%d-%d-%d-%d/';
    $folder = sprintf($format, $app . DIRECTORY_SEPARATOR . $path, $today[year], $today[mon], $today[mday], $hour, $minutes);
    //$folder = sprintf($format, $form[3], 2015, 3, 13, $hour, $minutes);
    $file = $folder . 'attendances.dat';

    if (file_exists($file)) {
        $content = ';' . $data;
    } else {
        $content = $data;
    }
    file_put_contents($file, $content, FILE_APPEND | LOCK_EX);

    unset($today);
    echo "1";
}

function setLocationData($param) {
    $app = $param["app"];
    $path = $param["path"];
    $d = $param["data"];

    $file = $app . DIRECTORY_SEPARATOR . $path;

    if (file_exists($file)) {
        file_put_contents($file, "");
    }
    $data = json_decode($d);

    $firstLine = true;
    foreach ($data as $value) {
        if ($firstLine) {
            $content = $value;
            $firstLine = false;
        } else {
            $content = $content . ';' . $value;
        }
    }
    file_put_contents($file, $content, FILE_APPEND | LOCK_EX);

    echo "1";
}

function updateLocationData($param) {
    $app = $param["app"];
    $path = $param["path"];
    $data = $param["data"];

    $file = $app . DIRECTORY_SEPARATOR . $path;

    if (file_exists($file)) {
        $content = ';' . $data;
    } else {
        $content = $data;
    }
    file_put_contents($file, $content, FILE_APPEND | LOCK_EX);

    echo "1";
}

function getLocationDataDir($param) {
    $app = $param["app"];
    $path = $param["path"];

    $locData = array();
    $folders = explode(",", $path);

    foreach ($folders as $value) {
        $dir = $app . DIRECTORY_SEPARATOR . $value;

        $locData[$value] = getDataFromDir($dir, $value);
    }
    echo json_encode($locData);
}

function getLocationDataFile($param) {
    $app = $param["app"];
    $path = $param["path"];
    $filepath = $app . DIRECTORY_SEPARATOR . $path;

    if (file_exists($filepath)) {
        $content = getDataFromFile($filepath);
    } else {
        $content = "0";
    }
    echo json_encode($content);
}

function getDataFromDir($directory) {
    $currentDir = getcwd();
    $dirData = array();

    if ($dh = opendir($directory)) {
        chdir($directory);
        while (false !== ($filename = readdir($dh))) {
            if (is_dir($filename) && $filename != "." && $filename != "..") {
                chdir($currentDir);
                $dirData[$filename] = getData($directory . DIRECTORY_SEPARATOR . $filename);
                chdir($directory);
            } else if ($filename != "." && $filename != ".." && $filename != ".DS_Store") {
                chdir($currentDir);
                $dirData[$filename] = getDataFromFile($directory . DIRECTORY_SEPARATOR . $filename);
                chdir($directory);
            }
        }
    }
    chdir($currentDir);
    closedir($dh);
    return $dirData;
}

function getDataFromFile($filePath) {
    //$file = fopen($filePath, "r") or die("Unable to open file!");
    $fileD = file($filePath);
    //fread($file, filesize($filePath));
    //fclose($file);
    return $fileD;
}

function getData($directory) {

    if (file_exists($directory . DIRECTORY_SEPARATOR . "attendances.dat")) {
        $info = getDataFromFile($directory . DIRECTORY_SEPARATOR . "attendances.dat");
        return $info;
    } elseif (file_exists($directory . DIRECTORY_SEPARATOR . "data.dat")) {
        $info = getDataFromFile($directory . DIRECTORY_SEPARATOR . "data.dat");
        return $info;
    } else {
        return null;
    }
}

function pushData($param) {
    $app = $param["app"];
    $path = $param["path"];
    $directory = $app . DIRECTORY_SEPARATOR . $path;

    if (file_exists($directory)) {
        $dataInfo = file($directory);
        unlink($directory);
        echo json_encode($dataInfo);
    } else {
        echo "2";
    }
}

function deleteContent($param) {
    $app = $param["app"];
    $path = $param["path"];

    $toDelete = $app . DIRECTORY_SEPARATOR . $path;

    if (is_dir($toDelete)) {
        foreach (glob($toDelete . DIRECTORY_SEPARATOR . "*") as $file) {
            unlink($file);
        }
    } else if (file_exists($toDelete)) {
        unlink($toDelete);
    }

    echo "1";
}
