<?php
/**
 * Funciones de utilidad para la aplicación
 */

// Función para generar URLs amigables
function url($path = '') {
    global $base_url;
    return $base_url . $path;
}

// Función para obtener el ID del conjunto de datos actual
function get_current_dataset_id() {
    return $_GET['id'] ?? '';
}

// Función para obtener el conjunto de datos actual
function get_current_dataset() {
    $id = get_current_dataset_id();
    
    // Obtener los conjuntos de datos de la sesión
    $datasets = $_SESSION['datasets'] ?? [];
    
    return $datasets[$id] ?? null;
}

// Función para guardar un conjunto de datos en la sesión
function save_dataset($data, $filename, $type) {
    // Generar un ID único
    $id = uniqid();
    
    // Obtener los conjuntos de datos existentes
    $datasets = $_SESSION['datasets'] ?? [];
    
    // Guardar el nuevo conjunto de datos
    $datasets[$id] = [
        'id' => $id,
        'name' => pathinfo($filename, PATHINFO_FILENAME),
        'filename' => $filename,
        'type' => $type,
        'data' => $data,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Actualizar la sesión
    $_SESSION['datasets'] = $datasets;
    
    return $id;
}

// Función para guardar una gráfica en la sesión
function save_chart($title, $description, $type, $dataset_id, $config) {
    // Generar un ID único
    $id = uniqid();
    
    // Obtener las gráficas existentes
    $charts = $_SESSION['charts'] ?? [];
    
    // Guardar la nueva gráfica
    $charts[$id] = [
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'type' => $type,
        'dataset_id' => $dataset_id,
        'config' => $config,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Actualizar la sesión
    $_SESSION['charts'] = $charts;
    
    return $id;
}

// Función para obtener todas las gráficas
function get_all_charts() {
    return $_SESSION['charts'] ?? [];
}

// Función para obtener una gráfica por su ID
function get_chart_by_id($id) {
    $charts = $_SESSION['charts'] ?? [];
    return $charts[$id] ?? null;
}

// Función para obtener todos los conjuntos de datos
function get_all_datasets() {
    return $_SESSION['datasets'] ?? [];
}

// Función para analizar un archivo CSV
function parse_csv_file($file) {
    $data = [];
    
    if (($handle = fopen($file, "r")) !== FALSE) {
        // Leer la primera línea como encabezados
        $headers = fgetcsv($handle, 1000, ",");
        
        // Leer los datos
        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $item = [];
            
            // Asociar cada valor con su encabezado
            for ($i = 0; $i < count($headers); $i++) {
                if (isset($row[$i])) {
                    // Intentar convertir a número si es posible
                    if (is_numeric($row[$i])) {
                        $item[$headers[$i]] = floatval($row[$i]);
                    } else {
                        $item[$headers[$i]] = $row[$i];
                    }
                } else {
                    $item[$headers[$i]] = null;
                }
            }
            
            $data[] = $item;
        }
        
        fclose($handle);
    }
    
    return [
        'headers' => $headers,
        'data' => $data
    ];
}

// Función para analizar un archivo Excel
function parse_excel_file($file) {
    $data = [];
    $headers = [];
    
    // Verificar si la extensión PhpSpreadsheet está disponible
    if (!class_exists('PhpOffice\PhpSpreadsheet\IOFactory')) {
        // Simulación de datos para demostración
        $headers = ['Fecha', 'Producto', 'Cantidad', 'Precio', 'Total'];
        
        // Generar datos de ejemplo
        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'Fecha' => date('Y-m-d', strtotime("-$i days")),
                'Producto' => 'Producto ' . ($i % 5 + 1),
                'Cantidad' => rand(1, 10),
                'Precio' => rand(10, 100) / 10,
                'Total' => rand(100, 1000) / 10
            ];
        }
    } else {
        // Usar PhpSpreadsheet para leer el archivo
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        $worksheet = $spreadsheet->getActiveSheet();
        
        // Leer los encabezados (primera fila)
        $headerRow = $worksheet->getRowIterator(1, 1)->current();
        $cellIterator = $headerRow->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(false);
        
        foreach ($cellIterator as $cell) {
            $headers[] = $cell->getValue();
        }
        
        // Leer los datos
        $rows = $worksheet->getRowIterator(2);
        
        foreach ($rows as $row) {
            $rowData = [];
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false);
            
            $i = 0;
            foreach ($cellIterator as $cell) {
                $value = $cell->getValue();
                
                // Intentar convertir a número si es posible
                if (is_numeric($value)) {
                    $rowData[$headers[$i]] = floatval($value);
                } else {
                    $rowData[$headers[$i]] = $value;
                }
                
                $i++;
            }
            
            $data[] = $rowData;
        }
    }
    
    return [
        'headers' => $headers,
        'data' => $data
    ];
}

// Función para analizar la estructura de los datos
function analyze_data_structure($data) {
    $structure = [
        'count' => count($data),
        'fields' => []
    ];
    
    if (empty($data)) {
        return $structure;
    }
    
    // Obtener todos los campos del primer elemento
    $fields = array_keys($data[0]);
    
    foreach ($fields as $field) {
        $values = array_column($data, $field);
        $numeric_values = array_filter($values, 'is_numeric');
        
        $structure['fields'][$field] = [
            'type' => count($numeric_values) === count($values) ? 'numeric' : 'text',
            'unique_values' => count(array_unique($values)),
            'sample_values' => array_slice(array_unique($values), 0, 5)
        ];
    }
    
    return $structure;
}

// Función para generar datos de gráfica a partir de un conjunto de datos
function generate_chart_data($dataset, $config) {
    $data = $dataset['data'];
    $chart_data = [];
    
    // Verificar si hay datos
    if (empty($data)) {
        return $chart_data;
    }
    
    // Obtener los campos configurados
    $label_field = $config['label_field'] ?? '';
    $value_fields = $config['value_fields'] ?? [];
    
    // Verificar si se han configurado los campos necesarios
    if (empty($label_field) || empty($value_fields)) {
        return $chart_data;
    }
    
    // Si se ha configurado una agrupación
    if (!empty($config['group_by'])) {
        $grouped_data = [];
        
        // Agrupar los datos
        foreach ($data as $item) {
            $group_key = $item[$config['group_by']];
            
            if (!isset($grouped_data[$group_key])) {
                $grouped_data[$group_key] = [];
            }
            
            $grouped_data[$group_key][] = $item;
        }
        
        // Procesar cada grupo
        foreach ($grouped_data as $group_key => $group_items) {
            $chart_item = [
                'name' => $group_key
            ];
            
            // Calcular los valores para cada campo
            foreach ($value_fields as $field) {
                $values = array_column($group_items, $field);
                $numeric_values = array_filter($values, 'is_numeric');
                
                // Aplicar la función de agregación
                switch ($config['aggregation'] ?? 'sum') {
                    case 'avg':
                        $chart_item[$field] = !empty($numeric_values) ? array_sum($numeric_values) / count($numeric_values) : 0;
                        break;
                    case 'max':
                        $chart_item[$field] = !empty($numeric_values) ? max($numeric_values) : 0;
                        break;
                    case 'min':
                        $chart_item[$field] = !empty($numeric_values) ? min($numeric_values) : 0;
                        break;
                    case 'count':
                        $chart_item[$field] = count($numeric_values);
                        break;
                    case 'sum':
                    default:
                        $chart_item[$field] = array_sum($numeric_values);
                        break;
                }
            }
            
            $chart_data[] = $chart_item;
        }
    } else {
        // Sin agrupación, usar directamente los datos
        foreach ($data as $item) {
            $chart_item = [
                'name' => $item[$label_field]
            ];
            
            // Para gráficas de tipo pie, solo se usa el primer campo de valor
            if ($config['chart_type'] === 'pie') {
                $value_field = $value_fields[0] ?? '';
                if (!empty($value_field)) {
                    $chart_item['value'] = floatval($item[$value_field]);
                }
            } else {
                // Para otros tipos de gráficas, incluir todos los campos de valor
                foreach ($value_fields as $field) {
                    $chart_item[$field] = floatval($item[$field]);
                }
            }
            
            $chart_data[] = $chart_item;
        }
    }
    
    return $chart_data;
}

// Función para convertir datos a formato JSON seguro
function json_encode_safe($data) {
    return json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

// Función para mostrar mensajes de alerta
function show_alert($message, $type = 'success') {
    $_SESSION['alert'] = [
        'message' => $message,
        'type' => $type
    ];
}

// Función para obtener y limpiar mensajes de alerta
function get_alert() {
    $alert = $_SESSION['alert'] ?? null;
    unset($_SESSION['alert']);
    return $alert;
}
?>

