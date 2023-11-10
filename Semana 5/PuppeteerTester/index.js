const assert = require("assert");
const puppeteer = require("puppeteer");
const faker = require("faker");

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
  await page.goto("http://localhost:2368/ghost/#/signin");
  await new Promise((r) => setTimeout(r, 5000));
  const idField = await page.$("#identification");
  await idField.type("pepe@grillo.com");
  const passwordField = await page.$("#password");
  await passwordField.type("pepegrillo");
  page.click("#ember5");
  await new Promise((r) => setTimeout(r, 5000));
  const url = await page.url();
  await browser.close();
  assert.equal(url, "http://localhost:2368/ghost/#/dashboard");
})().catch((e) => console.log(e));

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
    await page.goto("http://localhost:2368/ghost/#/signin");
    await new Promise((r) => setTimeout(r, 5000));
    const testData = [
        { email: '', password: '', error: 'Please fill out the form to sign in.' },
        { email: faker.email, password: faker.password, error: 'There is no user with that email address.' }
      ];
      for (const data of testData) {
        // Fill in the email and password
        await page.type('#identification', data.email);
        await page.type('#password', data.password);
        // Click the login button
        await page.click('#ember5');
        // Wait for the error message to appear
        await page.waitForSelector('.main-error');
        // Get the actual error message text
        const actualErrorMessage = await page.$eval('.main-error', el => el.textContent.trim());
        // Compare with the expected error message
        if (actualErrorMessage === data.error) {
          console.log(`Test Passed - Expected: "${data.error}", Actual: "${actualErrorMessage}"`);
        } else {
          console.error(`Test Failed - Expected: "${data.error}", Actual: "${actualErrorMessage}"`);
        }
      }

    await new Promise((r) => setTimeout(r, 5000));
    const url = await page.url();
    await browser.close();

  })().catch((e) => console.log(e));