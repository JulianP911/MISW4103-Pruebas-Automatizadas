# Pruebas Automatizadas

## Integrantes

|Nombre                   |Correo                      |
|-------------------------|----------------------------|
|Julian Padilla Molina    |j.padilla@uniandes.edu.co   |
|Santiago Fajardo Tellez  |s.fajardot@uniandes.edu.co  |
|Laura Helena Cabra       |lh.cabra@uniandes.edu.co   |
|Daniel Hernandez         |df.hernandezp12@uniandes.edu.co  |

## Semana 6

A continuación, se adjunta los enlaces a los entregables de la wiki:

[**Funcionalidades bajo pruebas**](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Funcionalidades-bajo-pruebas-vrt)

[**Pros - Contras de Backstop y Resemble**](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Pros-%E2%80%90-Contras-de-Backstrop-Resemble)

[**Escenarios de pruebas**](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Escenarios-de-pruebas-s6)

[**Vídeo**](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Video)

## Consumo de Ghost (Bono)
Para tener Ghost en un host se opto por usar la plataforma Render, sin embargo al estar en un host gratuito se desactiva despues de 15 min (aprox) de inactividad, es por esto que para poder hacer consumo de este servicio se debe seguir estos pasos:
- Acceder al host para que inicie la activación:

  v5.71: https://ghost5-71-oxma.onrender.com/ghost/

  v4.44.0: https://docker4-44-0.onrender.com/ghost/
  
- Esperar 5 minutos a que la instacia inicie por completo y cree la base de datos
- Crear un usuario administrador de la aplicación Ghost (recomendamos usar la información que esta en el archivo config.js para no tener que modificar la configuración)
  
**NOTA: Se recomienda hacer la activación justo antes de lanzar la prueba correspondiente, ya que al pasar 15 min inactivo debe realizarse todo el proceso de nuevo

## Kraken

## Puppeteer
### Ejecución pruebas v5.71
### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v5.71.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos abajo para el uso de Ghost en Render
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

### Pasos de ejecución
- Iniciar Ghost
`ghost start`
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra)
- En la carpeta del proyecto se creara una carpeta screenshots en donde se encuentra una carpeta por fecha y por cada uno de los escenarios, alli se encontrara las imagenes de las principales pantallas recorridas
- 
### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

### Ejecución pruebas v4.44.0

### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v4.44.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos abajo para el uso de Ghost en Render
- Clonar el repositorio de PuppeteerTester
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada
`Node v18.18.2`

### Configuración del Aplicativo
#### Atributos
- ghostUrl: url en el que esta escuchando ghost (ej:  https://docker4-44-0.onrender.com/ghost/)
- userEmail: correo de usuario de ghost previamente creado (ej: prueba@prueba.com)
- userPassword: contraseña de usuario de ghost previamente creado (ej: prueba12345)
- timeout: tiempo de espera entre tareas para la correcta renderización de los componentes, este valor varia dependiendo de las características del equipo en el que se ejecute el aplicativo (ej. 10000)

### Pasos de ejecución
- Iniciar Ghost
`ghost start`
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeteerGhost4-44-0\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra)
- En la carpeta del proyecto se creara una carpeta screenshots en donde se encuentra una carpeta por fecha y por cada uno de los escenarios, alli se encontrara las imagenes de las principales pantallas recorridas

### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeteerGhost4-44-0\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

## Reporte

### Prerequisitos
- Clonar el repositorio
- Haber ejecutado las pruebas para [Ghost v4.44.0](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%206/PuppeteerGhost4-44-0/PuppeteerTester) y para [Ghost v5.71](https://github.com/JulianP911/Pruebas-Automatizadas/tree/main/Semana%206/PuppeteerGhost5-71/PuppeteerTester)
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

**Nota: En el repositorio se deja una ejecución exitosa de las pruebas para cada una de las versiones, en caso de que no se desee hacer la ejecución.

### Versión de node recomendada
`Node v18.18.2`

### Configuración del Aplicativo
#### Atributos
Estos atributos deben ser cambiados en las líneas 7 y 8 del archivo index.js del archivo */Semana 6/Resemble_Test si se decide reproducir las pruebas. Por defecto se encuentran apuntando a las carpetas con las ejecuciones exitosas realizadas previamente por el equipo.
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
- Abrir el archivo */Semana 6/Reporte/index.html preferiblemente con chrome.
- Explorar los resultados, el reporte muestra resuoltados para VRT con Backstop y con Resemble
  - Parte de Backstop (Escenarios 1-5)
  - Parte de Resemble (Escenarios 6-10)
    - Filtrar por el escenario deseado o por todos los escenarios.
    
    Allí se encontrará por cada uno de los pasos:
      - Porcentajes de diferencia arrojados por la herramienta
      - Imágen del paso para la versión 4.44
      - Imágen del paso para la versión 5.71
      - Imagen sobrepuesta de las dos versiones resaltando las diferencias.



