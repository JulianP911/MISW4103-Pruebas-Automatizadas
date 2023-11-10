const assert = require("assert");
const puppeteer = require("puppeteer");
const { faker } = require('@faker-js/faker');

const ghostUrl="http://localhost:2369/ghost/";
const userEmail="prueba@prueba.com";
const userPassword="prueba12345";
const fechaHoraActual = new Date();

/**
 * Escenario 1: Como usuario administrador realizo el inicio sesión en Ghost (positivo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo valido
 * And: Se ingresa una contraseña valida
 * And: Se da clic en el botón de iniciar de sesión
 * Then: Se verifica que se encuentre en el dashboard
 */
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(ghostUrl);
  await new Promise((r) => setTimeout(r, 5000));
  const idField = await page.$("#identification");
  await idField.type(userEmail);
  const passwordField = await page.$("#password");
  await passwordField.type(userPassword);
  page.click("#ember5");
  await new Promise((r) => setTimeout(r, 5000));
  const url = await page.url();
  await browser.close();
  assert.equal(url, "http://localhost:2369/ghost/#/dashboard");
  console.log("E1-Test Passed - Expected: http://localhost:2369/ghost/#/dashboard, Actual: ",url,".");
})().catch((e) => console.log("Test Failed - Expected: ",e.expected,", Actual: ",e.actual,"."));

/**
 * Escenario 2: Como usuario administrador realizo el inicio sesión en Ghost (negativo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo vacío - correo invalido
 * And: Se ingresa una contraseña vacía - contraseña invalida
 * And: Se da clic en el botón de iniciar de sesión
 * Then: Se valida el mensaje de error
 */
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(ghostUrl);
    await new Promise((r) => setTimeout(r, 5000));
    const testData = [
      { email: '', password: '', error: 'Please fill out the form to sign in.' },
      { email: faker.internet.email(), password: faker.internet.password(), error: 'There is no user with that email address.' }
    ];
    
      for (const data of testData) {
        // Fill in the email and password
        await page.type('#identification', data.email);
        await page.type('#password', data.password);
        // Click the login button
        await page.click('#ember5');
        // Wait for the error message to appear
        await page.waitForSelector('.main-error');
        await new Promise((r) => setTimeout(r, 5000));
        // Get the actual error message text
        const actualErrorMessage = await page.$eval('.main-error', el => el.textContent.trim());
        // Compare with the expected error message
        try {
          assert.equal(actualErrorMessage, data.error);
          console.log("E2-Test Passed - Expected:", data.error, ", Actual:", actualErrorMessage);
        } catch (e) {
          console.error("E2-Test Failed - Expected:", data.error, ", Actual:", actualErrorMessage);
        }
       
      }

    const url = await page.url();
    await browser.close();

  })().catch((e) => console.log(e));