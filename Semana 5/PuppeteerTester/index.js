const assert = require("assert");
const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const ghostUrl = "http://localhost:2369/ghost/";
const userEmail = "prueba@prueba.com";
const userPassword = "prueba12345";

// Create a directory with a timestamp
const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
const screenshotDirectory = `./screenshots/${timestamp}/`;
/**
 * Ensure the directory exists
 * @param {string} directoryPath - The directory path
 */
const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};
ensureDirectoryExists(screenshotDirectory);
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
  const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario1/`;
  ensureDirectoryExists(screenshotDirectoryEscenario);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(ghostUrl);
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({
    path: screenshotDirectoryEscenario + "signInPage.png",
  });
  const idField = await page.$("#identification");
  await idField.type(userEmail);
  const passwordField = await page.$("#password");
  await passwordField.type(userPassword);
  await page.screenshot({
    path: screenshotDirectoryEscenario + "fillInputs.png",
  });
  page.click("#ember5");
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({
    path: screenshotDirectoryEscenario + "afterSignIn.png",
  });
  const url = await page.url();
  await browser.close();
  assert.equal(url, "http://localhost:2369/ghost/#/dashboard");
  console.log(
    "E1-Test Passed - Expected: http://localhost:2369/ghost/#/dashboard, Actual: ",
    url,
    "."
  );
})().catch((e) =>
  console.log(
    "Test Failed - Expected: ",
    e.expected,
    ", Actual: ",
    e.actual,
    "."
  )
);

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
  const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario2/`;
  ensureDirectoryExists(screenshotDirectoryEscenario);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(ghostUrl);
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({
    path: screenshotDirectoryEscenario + "signInPage.png",
  });
  const testData = [
    { email: "", password: "", error: "Please fill out the form to sign in." },
    {
      email: faker.internet.email(),
      password: faker.internet.password(),
      error: "There is no user with that email address.",
    },
  ];

  for (const data of testData) {
    // Fill in the email and password
    await page.type("#identification", data.email);
    await page.type("#password", data.password);
    await page.screenshot({
      path: screenshotDirectoryEscenario + "fillInputs.png",
    });

    // Click the login button
    await page.click("#ember5");
    // Wait for the error message to appear
    await page.waitForSelector(".main-error");
    await new Promise((r) => setTimeout(r, 5000));
    await page.screenshot({
      path: screenshotDirectoryEscenario + "afterSignIn.png",
    });

    // Get the actual error message text
    const actualErrorMessage = await page.$eval(".main-error", (el) =>
      el.textContent.trim()
    );
    // Compare with the expected error message
    try {
      assert.equal(actualErrorMessage, data.error);
      console.log(
        "E2-Test Passed - Expected:",
        data.error,
        ", Actual:",
        actualErrorMessage
      );
    } catch (e) {
      console.error(
        "E2-Test Failed - Expected:",
        data.error,
        ", Actual:",
        actualErrorMessage
      );
    }
  }

  const url = await page.url();
  await browser.close();
})().catch((e) => console.log(e));


/**
 * Escenario 3: Como usuario administrador realizo el inicio sesión en Ghost (negativo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo no existente- correo de usuario base de datos pero no existente
 * And: Se da clic en el botón de olvide contraseña
 * Then: Se valida el mensaje de error
 */
(async () => {
  const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario3/`;
  ensureDirectoryExists(screenshotDirectoryEscenario);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(ghostUrl);
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({
    path: screenshotDirectoryEscenario + "signInPage.png",
  });
  const testData = [
    { email: userEmail, error: "Failed to send email. Reason: Email has been temporarily rejected. ", error2: "Too many attempts try again"},
    {
      email: faker.internet.email(),
      error: "User not found. ", error2: "Too many attempts try again"
    },
  ];

  for (const data of testData) {
    // Fill in the email and password
    await page.type("#identification", data.email);
    await page.screenshot({
      path: screenshotDirectoryEscenario + "fillInputs.png",
    });

    // Click the forgot button
    await page.click("#ember4");
    // Wait until .main-error has visible content
    await page.waitForFunction(
      'document.querySelector(".main-error") && document.querySelector(".main-error").offsetHeight > 0'
    );
    await page.waitForFunction(() => {
      const button = document.querySelector('#ember4 span');
      return button && button.innerText.toLowerCase().includes('forgot');
    });
    await new Promise((r) => setTimeout(r, 5000));
    await page.screenshot({
      path: screenshotDirectoryEscenario + "afterForgot.png",
    });

    // Get the actual error message text
    const actualErrorMessage = await page.$eval(".main-error", (el) =>
      el.textContent.trim()
    );
    // Compare with the expected error message
    try {
      assert.ok(
        actualErrorMessage === data.error || actualErrorMessage.includes(data.error2));
        
      console.log(
        "E3-Test Passed - Expected: '",
        data.error, "' OR '",data.error2,
        ", Actual:",
        actualErrorMessage
      );
    } catch (e) {
      console.error(
        "E3-Test Failed - Expected:",
        data.error, "' OR '",data.error2,
        ", Actual:",
        actualErrorMessage
      );
      // Reset input fields
    await page.evaluate(() => {
      document.querySelector('#identification').value = '';
    });
    }
    // Reset input fields
    await page.evaluate(() => {
      document.querySelector('#identification').value = '';
    });
  }

  const url = await page.url();
  await browser.close();
})().catch((e) => console.log(e));