# Pruebas Automatizadas

## Integrantes

|Nombre                   |Correo                      |
|-------------------------|----------------------------|
|Julian Padilla Molina    |j.padilla@uniandes.edu.co   |
|Santiago Fajardo Tellez  |s.fajardot@uniandes.edu.co  |
|Laura Helena Cabra       |lh.cabra@uniandes.edu.co   |
|Daniel Hernandez         |df.hernandezp12@uniandes.edu.co  |

## Semana 7

A continuación, se adjunta los enlaces a los entregables de la wiki:

[**Generación de escenarios**](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Generaci%C3%B3n-124-escenarios)

## Consumo de Ghost 
Para tener Ghost en un host se opto por usar la plataforma Render, sin embargo al estar en un host gratuito se desactiva despues de 15 min (aprox) de inactividad, es por esto que para poder hacer consumo de este servicio se debe seguir estos pasos:

- Acceder al host para que inicie la activación:

  v5.71: https://ghost5-71-oxma.onrender.com/ghost/
  
- Esperar 5 minutos a que la instacia inicie por completo y cree la base de datos
- Crear un usuario administrador de la aplicación Ghost (recomendamos usar la información que esta en el archivo [config.js](https://github.com/JulianP911/Pruebas-Automatizadas/blob/main/Semana%206/PuppeteerGhost5-71/PuppeteerTester/config.json) para no tener que modificar la configuración)
  
**NOTA:** Se recomienda hacer la activación justo antes de lanzar la prueba correspondiente, ya que al pasar 15 min inactivo debe realizarse todo el proceso de nuevo
## Puppeteer

### Ejecución pruebas  (1 a 64)

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
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- Ejecutarlo:
`node index.js`
  
### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra)
- En la carpeta del proyecto se creara una carpeta screenshots en donde se encuentra una carpeta por fecha y por cada uno de los escenarios, alli se encontrara las imagenes de las principales pantallas recorridas

## Kraken

### Ejecución pruebas v5.71

### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v5.71.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos arriba para el uso de Ghost en Render.
- Clonar el repositorio y acceder a la carpeta KrakenGhost5-71
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada

`Node v16.20.2`

### Configuración del Aplicativo

#### Atributos

En el archivo de properties.json configurar los siguientes atributos:
- URL: url en el que esta escuchando ghost (ej: https://ghost5-71-oxma.onrender.com/ghost/)
- USERNAME: correo de usuario de ghost previamente creado (ej: prueba@prueba.com)
- PASSWORD: contraseña de usuario de ghost previamente creado (ej: prueba12345)

### Pasos de ejecución local
- Iniciar Ghost
`ghost start`
- Ubicarse en la raiz del proyecto (*\Semana 6\KrakenGhost5-71) 
- Configurar el archivo properties.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install` o `sudo npm install`
- Ejecutarlo:
`npx kraken-node run`

### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\KrakenGhost5-71) 
- Configurar el archivo properties.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install` o `sudo npm install`
- Ejecutarlo:
`npx kraken-node run`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra).
- En la carpeta del proyecto se creará una carpeta screenshots en donde se encuentra múltiples carpetas con fecha correspondiente a los diferentes escenarios ejecutados, allí se encontrara las imagenes de las principales pantallas recorridas definidos en los pasos.

### Ejecución pruebas v4.44

### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v4.44.0) (Link de cómo instalar: https://ghost.org/docs/install/) o seguir los pasos descritos abajo para el uso de Ghost en Render
- Clonar el repositorio y acceder a la carpeta KrakenGhost4-44-0
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada

`Node v16.20.2`

### Configuración del Aplicativo

#### Atributos

En el archivo de properties.json configurar los siguientes atributos:
- URL: url en el que esta escuchando ghost (ej:  https://docker4-44-0.onrender.com/ghost/)
- USERNAME: correo de usuario de ghost previamente creado (ej: prueba@prueba.com)
- PASSWORD: contraseña de usuario de ghost previamente creado (ej: prueba12345)

### Pasos de ejecución local
- Iniciar Ghost
`ghost start`
- Ubicarse en la raiz del proyecto (*\Semana 6\KrakenGhost4-44-0) 
- Configurar el archivo properties.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install` o `sudo npm install`
- Ejecutarlo:
`npx kraken-node run`

### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\KrakenGhost4-44-0) 
- Configurar el archivo properties.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install` o `sudo npm install`
- Ejecutarlo:
`npx kraken-node run`

### Lectura de resultado
- En el momento en el que se ejecuten las pruebas se vera en el terminal el estado en el que termina cada una de ellas (las pruebas se ejecutan secuencial, una tras otra).
- En la carpeta del proyecto se creará una carpeta screenshots en donde se encuentra múltiples carpetas con fecha correspondiente a los diferentes escenarios ejecutados, allí se encontrara las imagenes de las principales pantallas recorridas definidos en los pasos.




