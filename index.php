<?php
// Punto de entrada principal de la aplicación
session_start();

// Configuración básica
$base_url = '/';

// Enrutamiento simple
$route = $_GET['route'] ?? 'home';

// Incluir funciones de utilidad
require_once 'includes/functions.php';
require_once 'includes/data.php';

// Incluir el encabezado
include 'includes/header.php';

// Enrutar a la página correcta
switch ($route) {
    case 'home':
        include 'pages/home.php';
        break;
    case 'cargar-datos':
        include 'pages/cargar-datos.php';
        break;
    case 'explorar-datos':
        include 'pages/explorar-datos.php';
        break;
    case 'crear-grafica':
        include 'pages/crear-grafica.php';
        break;
    case 'mis-graficas':
        include 'pages/mis-graficas.php';
        break;
    case 'ver-grafica':
        include 'pages/ver-grafica.php';
        break;
    case 'indices':
        include 'pages/indices.php';
        break;
    case 'censos-encuestas':
        include 'pages/censos-encuestas.php';
        break;
    default:
        include 'pages/404.php';
        break;
}

// Incluir el pie de página
include 'includes/footer.php';
?>

