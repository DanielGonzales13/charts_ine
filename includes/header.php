<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualizador de Datos Estadísticos</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Chart.js - Versión específica para evitar conflictos -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="<?= url('assets/css/styles.css') ?>">
</head>
<body>
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="<?= url() ?>">
                <i class="fas fa-chart-bar me-2"></i>
                Visualizador de Datos Estadísticos
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link <?= $route === 'home' ? 'active' : '' ?>" href="<?= url() ?>">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?= $route === 'cargar-datos' ? 'active' : '' ?>" href="<?= url('?route=cargar-datos') ?>">Cargar Datos</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle <?= in_array($route, ['indices', 'censos-encuestas']) ? 'active' : '' ?>" href="#" role="button" data-bs-toggle="dropdown">
                            Servicios Estadísticos
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item <?= $route === 'indices' ? 'active' : '' ?>" href="<?= url('?route=indices') ?>">
                                    Índices
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item <?= $route === 'censos-encuestas' ? 'active' : '' ?>" href="<?= url('?route=censos-encuestas') ?>">
                                    Censos y Encuestas
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?= $route === 'mis-graficas' ? 'active' : '' ?>" href="<?= url('?route=mis-graficas') ?>">Mis Gráficas</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contenedor principal -->
    <div class="container py-4">
        <?php
        // Mostrar alertas si existen
        $alert = get_alert();
        if ($alert): 
        ?>
        <div class="alert alert-<?= $alert['type'] ?> alert-dismissible fade show" role="alert">
            <?= htmlspecialchars($alert['message']) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php endif; ?>

