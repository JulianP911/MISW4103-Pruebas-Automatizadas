# Pruebas Automatizadas

## Semana 5

A continuación, se adjunta los enlaces a los entregables de la wiki:

[Funcionalidades bajo pruebas](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Funcionalidades-bajo-pruebas)

[Escenarios de pruebas](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Escenarios-de-pruebas)

[Pros - Contras de Kraken y Puppeteer](https://github.com/JulianP911/Pruebas-Automatizadas/wiki/Pros-%E2%80%90-Contras-de-Kraken-Puppeteer)

### Kraken

**Importante:** Para corre los ecenarios de pruebas con Kraken se necesita correr la aplicación de Ghost en el puerto <code>2368</code>, asimismo, se requiere que la base de datos de ghost este vacía, es decir, que no haya posts, pages, tags y members creados previmente.

A continuación, se detalla los pasos a seguir para ejecutar los escenarios de pruebas creados con Kraken:

**Pasos requeridos previamente:**
* Tener instaldo Kraken y Appium en el computador donde se va ejecutar las pruebas. Los comandos para la instalación son: <code>npm install kraken-node -g</code> y <code>npm install -g appium</code>.
* Desplegar la aplicación de Ghost de forma local. El comando para ejecutar es: <code>sudo ghost start</code> o <code>ghost start</code> dependiendo de la configuración determinada.
* Clonar el repositorio en el directorio de preferencia en el computador.
* Por medio de la terminal ir a la carpeta ubicada en la dirección <code>Semana 5 > KrakenTester</code>.

**Pasos de ejecución:**

Dentro de la carpeta KrakenTester: 
* En el archivo pproperties.json configurar el USERNAME y PASSWORD con el cual se realizará el incio de sesión dentro de la aplicación de Ghost (Por defecto, tiene unas credenciales establecidas con las cuales se realizaron las pruebas).
* Ingresar el comando <code>npm install</code> para descargar las dependencias necesarias para la ejecución de los escenarios de pruebas.
* Ingresar el comando <code>kraken-node run</code> o <code>npx kraken-node run</code> para correr los escenarios de pruebas definidos secuencialmente.

**Pasos post ejecución:**
Dentro de la carpeta KrakenTester en la subcarpeta reports:
* Se encontrará un carpeta con identificador único que contendrá la ejecución de cada escenario de pruebas con sus respectivos resultados: screnshots y reporte index.html (Por defecto, ya se incluye los resultados de los escenarios ejecutados cuando se realizaron las pruebas).

**Patrones implentados:**
En los escenarios de pruebas desarrollados se utilizaron los patrones:
* Given - When - Then: Definiendo el flujo de ejecución de los escenarios de pruebas en tres etapas precondiciones, condiciones y postcondiciones para validar las funcionalidades.
* PageObject: Se separa la definción de los escenarios explitos en lenguaje natural por medio de los feature y en lenguaje de programación JavaScript por medio de los steps.

### Puppeteer
