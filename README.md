# Pruebas Automatizadas

## Integrantes

|Nombre                   |Correo                      |
|-------------------------|----------------------------|
|Julian Padilla Molina    |j.padilla@uniandes.edu.co   |
|Santiago Fajardo Tellez  |s.fajardot@uniandes.edu.co  |
|Laura Helena Cabra       |lh.cabra@uniandes.edu.co   |
|Daniel Hernandez         |df.hernandezp12@uniandes.edu.co  |

## Semana 8

El documento de la estrategia de pruebas se encuentra en: [Documento estrategia final](https://github.com/JulianP911/Pruebas-Automatizadas/blob/main/Semana%208/Estrategia%20final%20de%20pruebas/Estrategia%20final%20de%20pruebas.pdf)

El documento de las pruebas exploratorias se encuentra en: [Reporte pruebas manuales](https://github.com/JulianP911/Pruebas-Automatizadas/blob/main/Semana%208/Pruebas%20manuales/Inventario%20-%20Pruebas%20exploratorias.xlsx)

El video de resultados y análisis se encuentra en: [Video análisis]([https://uniandes-my.sharepoint.com/personal/j_padilla_uniandes_edu_co/_layouts/15/stream.aspx?id=%2Fpersonal%2Fj%5Fpadilla%5Funiandes%5Fedu%5Fco%2FDocuments%2FMISO%2FPruebas%20automatizadas%2FEntrega%208%2FVideo%20%2D%20Versi%C3%B3n%20final%20estrategia%20de%20pruebas%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview](https://uniandes-my.sharepoint.com/:v:/g/personal/j_padilla_uniandes_edu_co/EYK-1AHKtKFAoHv717VcZUABPh0ljodllGJ-fubRK4FeWw?e=UsCQqB&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D))

Los issues reportados corresponden del #42 al #61 completando 20 en total.

** En el documento de estrategía de pruebas se encuentran los modelos y links correspondientes para su correcta visualización.

## Consumo de Ghost 
Para tener Ghost en un host se opto por usar la plataforma Render, sin embargo al estar en un host gratuito se desactiva despues de 15 min (aprox) de inactividad, es por esto que para poder hacer consumo de este servicio se debe seguir estos pasos:

- Acceder al host para que inicie la activación:

  v5.71: https://ghost5-71-oxma.onrender.com/ghost/
  
- Esperar 5 minutos a que la instacia inicie por completo y cree la base de datos
- Crear un usuario administrador de la aplicación Ghost (recomendamos usar la información que esta en el archivo [config.js](https://github.com/JulianP911/Pruebas-Automatizadas/blob/main/Semana%206/PuppeteerGhost5-71/PuppeteerTester/config.json) para no tener que modificar la configuración)
  
**NOTA:** Se recomienda hacer la activación justo antes de lanzar la prueba correspondiente, ya que al pasar 15 min inactivo debe realizarse todo el proceso de nuevo.

## Puppeteer

### Ejecución pruebas E2E

### Prerequisitos

- Descargar y crear un usuario administrador en ghost (v5.71.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos arriba para el uso de Ghost en Render
- Clonar el repositorio de PuppeteerTester
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada

`Node v18.18.2`

### Configuración del Aplicativo

#### Atributos
- ghostUrl: url en el que esta escuchando ghost (ej: https://ghost5-71-oxma.onrender.com/ghost/)
- userEmail: correo de usuario de ghost previamente creado (ej: prueba@prueba.com)
- userPassword: contraseña de usuario de ghost previamente creado (ej: prueba12345)
- timeout: tiempo de espera entre tareas para la correcta renderización de los componentes, este valor varia dependiendo de las características del equipo en el que se ejecute el aplicativo (ej. 10000)

### Pasos de ejecución local
- Iniciar Ghost
`ghost start`
- Ubicarse en la raiz del proyecto (*\Semana 8\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- Ejecutarlo:
`node index.js`
  
### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 8\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra).
- En la carpeta del proyecto se creara una carpeta screenshots en donde se encuentra una carpeta por fecha y por cada uno de los escenarios, alli se encontrara las imagenes de las principales pantallas recorridas.


## Reporte Resemble VRT

Regresión visual entre version 4.44.0 y 5.71 de Ghost

### Prerequisitos
- Clonar el repositorio
- Haber ejecutado las pruebas para [Ghost v4.44.0](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%208/VRT/PuppeteerGhost4-44-0/PuppeteerTester) y para [Ghost v5.71](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%208/VRT/PuppeteerGhost5-71/PuppeteerTester)
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
- Ubicarse en la carpeta *\Semana 8\VRT\Resemble_Test 
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

## Monkey tests

### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v5.71.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos arriba para el uso de
 Ghost en Render
- Clonar el repositorio de Monkey-cypress
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada
`Node v16.20.2`
### Pasos de ejecución
- Ubicarse en la carpeta *\Semana 8\Monkey-cypress
- Instalar las dependencias del proyecto:
`npm install`
- Ejecutar las pruebas monkey
  
`npm run monkey`

- Ejecutar las pruebas smart monkey
  
`npm run monkey-smart`

### Lectura de resultado
- Ingresar a la carpeta /Semana8/Monkey-cypress/results para verlos en el repositorio.
- En caso de no poderlos visualizar correctamente ingresar a : [Monkey results](https://uniandes-my.sharepoint.com/personal/j_padilla_uniandes_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fj%5Fpadilla%5Funiandes%5Fedu%5Fco%2FDocuments%2FMISO%2FPruebas%20automatizadas%2FEntrega%208%2FMonkey&ga=1)
