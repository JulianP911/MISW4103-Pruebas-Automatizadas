# Reporte Resemble VRT

Regresión visual entre version 4.44.0 y 5.71 de Ghost

### Prerequisitos
- Clonar el repositorio
- Haber ejecutado las pruebas para [Ghost v4.44.0](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%206/PuppeteerGhost4-44-0/PuppeteerTester) y para [Ghost v5.71](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%206/PuppeteerGhost5-71/PuppeteerTester)
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

**Nota: En el repositorio se deja una ejecución exitosa de las pruebas para cada una de las versiones, en caso de que no se desee hacer la ejecución.

### Versión de node recomendada
`Node v18.18.2`

### Configuración del Aplicativo
#### Atributos
Estos atributos deben ser cambiados en las líneas 7 y 8 del archivo index.js si se decide reproducir las pruebas. Por defecto se encuentran apuntando a las carpetas con las ejecuciones exitosas realizadas previamente por el equipo.
- timestamp4440: Nombre de la carpeta donde se alojan las imagenes tomadas de las pruebas con la versión 4.44.0 (ej: '20231117T125204')
- timestamp5710: Nombre de la carpeta donde se alojan las imagenes tomadas de las pruebas con la versión 5.71 (ej: '20231117T180245')


### Pasos de ejecución
- Ubicarse en la carpeta *\Semana 6\Resemble_Test 
- Si se desea utrilizar imagenes de una nueva ejecución de pruebas, configurar las variables de apuntamiento en el index.js
- Instalar las dependencias del proyecto:
`npm install`
- Ejecutarlo:
`node index.js`

### Lectura de resultado
- Ingresar a la carpeta /results/report_part2
- Abrir el archivo llamado report.html
- Filtrar por el escenario deseado o por todos los escenarios.
- Allí se encontrará por cada uno de los pasos:
  - Porcentajes de diferencia arrojados por la herramienta
  - Imágen del paso para la versión 4.44
  - Imágen del paso para la versión 5.71
  - Imagen sobrepuesta de las dos versiones resaltando las diferencias.

