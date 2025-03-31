<?php
/**
 * Datos de ejemplo para la aplicación
 */

// Departamentos
$departments = [
    [
        'id' => '1',
        'name' => 'Ventas',
        'slug' => 'ventas',
        'description' => 'Visualización de datos de ventas y marketing'
    ],
    [
        'id' => '2',
        'name' => 'Finanzas',
        'slug' => 'finanzas',
        'description' => 'Análisis financiero y contabilidad'
    ],
    [
        'id' => '3',
        'name' => 'Recursos Humanos',
        'slug' => 'rrhh',
        'description' => 'Métricas de recursos humanos'
    ],
    [
        'id' => '4',
        'name' => 'Operaciones',
        'slug' => 'operaciones',
        'description' => 'Indicadores de operaciones'
    ]
];

// Gráficas por departamento
$charts_by_department = [
    'ventas' => [
        [
            'id' => '1',
            'title' => 'Ventas Mensuales',
            'description' => 'Ventas mensuales del año actual',
            'type' => 'bar',
            'data' => [
                ['name' => 'Ene', 'value' => 4200],
                ['name' => 'Feb', 'value' => 3800],
                ['name' => 'Mar', 'value' => 5100],
                ['name' => 'Abr', 'value' => 4800],
                ['name' => 'May', 'value' => 5600],
                ['name' => 'Jun', 'value' => 6200]
            ]
        ],
        [
            'id' => '2',
            'title' => 'Ventas por Categoría',
            'description' => 'Distribución de ventas por categoría de producto',
            'type' => 'pie',
            'data' => [
                ['name' => 'Electrónicos', 'value' => 35],
                ['name' => 'Ropa', 'value' => 25],
                ['name' => 'Hogar', 'value' => 20],
                ['name' => 'Deportes', 'value' => 15],
                ['name' => 'Otros', 'value' => 5]
            ]
        ],
        [
            'id' => '3',
            'title' => 'Tendencia de Ventas',
            'description' => 'Tendencia de ventas de los últimos 12 meses',
            'type' => 'line',
            'data' => [
                ['name' => 'Jul 22', 'value' => 3200],
                ['name' => 'Ago 22', 'value' => 3400],
                ['name' => 'Sep 22', 'value' => 3600],
                ['name' => 'Oct 22', 'value' => 3800],
                ['name' => 'Nov 22', 'value' => 4000],
                ['name' => 'Dic 22', 'value' => 4500],
                ['name' => 'Ene 23', 'value' => 4200],
                ['name' => 'Feb 23', 'value' => 3800],
                ['name' => 'Mar 23', 'value' => 5100],
                ['name' => 'Abr 23', 'value' => 4800],
                ['name' => 'May 23', 'value' => 5600],
                ['name' => 'Jun 23', 'value' => 6200]
            ]
        ]
    ],
    'finanzas' => [
        [
            'id' => '4',
            'title' => 'Ingresos vs Gastos',
            'description' => 'Comparación de ingresos y gastos mensuales',
            'type' => 'bar',
            'data' => [
                ['name' => 'Ene', 'ingresos' => 8500, 'gastos' => 6200],
                ['name' => 'Feb', 'ingresos' => 7900, 'gastos' => 5800],
                ['name' => 'Mar', 'ingresos' => 9200, 'gastos' => 6500],
                ['name' => 'Abr', 'ingresos' => 9800, 'gastos' => 7100],
                ['name' => 'May', 'ingresos' => 10500, 'gastos' => 7300],
                ['name' => 'Jun', 'ingresos' => 11200, 'gastos' => 7800]
            ]
        ]
    ],
    'rrhh' => [
        [
            'id' => '5',
            'title' => 'Distribución de Personal',
            'description' => 'Distribución del personal por departamento',
            'type' => 'pie',
            'data' => [
                ['name' => 'Ventas', 'value' => 30],
                ['name' => 'Desarrollo', 'value' => 25],
                ['name' => 'Soporte', 'value' => 20],
                ['name' => 'Administración', 'value' => 15],
                ['name' => 'Otros', 'value' => 10]
            ]
        ]
    ],
    'operaciones' => []
];

// Datos de ejemplo para la página de ejemplos
$sample_data = [
    'ventas' => [
        ['name' => 'Ene', 'Electrónicos' => 4000, 'Ropa' => 3490],
        ['name' => 'Feb', 'Electrónicos' => 3000, 'Ropa' => 4300],
        ['name' => 'Mar', 'Electrónicos' => 2000, 'Ropa' => 2300],
        ['name' => 'Abr', 'Electrónicos' => 2780, 'Ropa' => 3200],
        ['name' => 'May', 'Electrónicos' => 1890, 'Ropa' => 2500],
        ['name' => 'Jun', 'Electrónicos' => 2390, 'Ropa' => 3100]
    ],
    'productos' => [
        ['name' => 'Smartphones', 'value' => 35],
        ['name' => 'Laptops', 'value' => 25],
        ['name' => 'Accesorios', 'value' => 20],
        ['name' => 'Tablets', 'value' => 15],
        ['name' => 'Otros', 'value' => 5]
    ],
    'tendencia' => [
        ['name' => 'Semana 1', 'value' => 1000],
        ['name' => 'Semana 2', 'value' => 1200],
        ['name' => 'Semana 3', 'value' => 1500],
        ['name' => 'Semana 4', 'value' => 1300],
        ['name' => 'Semana 5', 'value' => 1800],
        ['name' => 'Semana 6', 'value' => 2000],
        ['name' => 'Semana 7', 'value' => 2200],
        ['name' => 'Semana 8', 'value' => 2500]
    ]
];

// Plantillas de datos para cada tipo de gráfica
$chart_templates = [
    'bar' => [
        ['name' => 'Ene', 'value' => 1200],
        ['name' => 'Feb', 'value' => 1900],
        ['name' => 'Mar', 'value' => 1500],
        ['name' => 'Abr', 'value' => 2200],
        ['name' => 'May', 'value' => 2500],
        ['name' => 'Jun', 'value' => 2100]
    ],
    'line' => [
        ['name' => 'Ene', 'value' => 400],
        ['name' => 'Feb', 'value' => 600],
        ['name' => 'Mar', 'value' => 550],
        ['name' => 'Abr', 'value' => 700],
        ['name' => 'May', 'value' => 900],
        ['name' => 'Jun', 'value' => 750],
        ['name' => 'Jul', 'value' => 1000],
        ['name' => 'Ago', 'value' => 850]
    ],
    'pie' => [
        ['name' => 'Producto A', 'value' => 35],
        ['name' => 'Producto B', 'value' => 25],
        ['name' => 'Producto C', 'value' => 20],
        ['name' => 'Producto D', 'value' => 15],
        ['name' => 'Otros', 'value' => 5]
    ]
];
?>

