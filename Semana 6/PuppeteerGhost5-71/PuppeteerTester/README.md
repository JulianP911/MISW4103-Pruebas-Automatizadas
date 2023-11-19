# Puppeteer Tester

Aplicativo para hacer pruebas a Ghost con Puppeteer

### Prerequisitos
- Descargar y crear un usuario administrador en ghost (v5.71.0) (Link de cómo instalar: https://ghost.org/docs/install/)
- Clonar el repositorio de PuppeteerTester
- Tener instalado un IDE para revisar y configurar el proyecto (se recomienda Visual studio code)

### Versión de node recomendada
`Node v18.18.2`

### Configuración del Aplicativo
#### Atributos
- ghostUrl: url en el que esta escuchando ghost (ej: http://localhost:2368/ghost/)
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

## Consumo de Ghost (Bono)
Para tener Ghost en un host se opto por usar la plataforma Render, sin embargo al estar en un host gratuito se desactiva despues de 15 min (aprox) de inactividad, es por esto que para poder hacer consumo de este servicio se debe seguir estos pasos:
- Acceder al host para que inicie la activación: https://ghost5-71-oxma.onrender.com/ghost/
- Esperar 5 minutos a que la instacia inicie por completo y cree la base de datos
- Crear un usuario administrador de la aplicación Ghost (recomendamos usar la información que esta en el archivo config.js para no tener que modificar la configuración)

### Pasos de ejecución con Ghost remoto
- Realizar los pasos previamente descritos para la preparación de Ghost en Render
- Ubicarse en la raiz del proyecto (*\Semana 6\PuppeterGhost5-71\PuppeteerTester) 
- Configurar el archivo config.json de acuerdo a los atributos propios configurados en Ghost
- Instalar las dependencias del proyecto:
`npm install`
- ejecutarlo:
`node index.js`