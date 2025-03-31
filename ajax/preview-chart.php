<?php
// Este archivo se utiliza para generar una vista previa de la gráfica mediante AJAX

// Iniciar sesión
session_start();

// Incluir funciones de utilidad
require_once '../includes/functions.php';

// Obtener parámetros
$dataset_id = $_GET['dataset_id'] ?? '';
$chart_type = $_GET['chart_type'] ?? 'bar';
$label_field = $_GET['label_field'] ?? '';
$value_fields = explode(',', $_GET['value_fields'] ?? '');
$group_by = $_GET['group_by'] ?? '';
$aggregation = $_GET['aggregation'] ?? 'sum';

// Validar parámetros
if (empty($dataset_id) || empty($label_field) || empty($value_fields)) {
    echo json_encode([]);
    exit;
}

// Obtener el conjunto de datos
$dataset = $_SESSION['datasets'][$dataset_id] ?? null;

// Si no existe el conjunto de datos, devolver un array vacío
if (!$dataset) {
    echo json_encode([]);
    exit;
}

// Configuración de la gráfica
$config = [
    'chart_type' => $chart_type,
    'label_field' => $label_field,
    'value_fields' => $value_fields,
    'group_by' => $group_by,
    'aggregation' => $aggregation
];

// Generar los datos para la gráfica
$chart_data = generate_chart_data($dataset, $config);

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($chart_data);

