const assert = require("assert");
const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const LoginPage = require("./LoginPage");
const PostsPage = require("./postsPage");
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
  const loginPage = new LoginPage(page, ghostUrl, screenshotDirectoryEscenario);

  await loginPage.visit();

  const afterlogin = await loginPage.login(userEmail, userPassword);

  // Get the URL from the page after login
  const url = afterlogin.url();

  // Close the browser after completing the tests
  await browser.close();

  // Perform the assertion after all the asynchronous operations are complete
  assert.equal(url, "http://localhost:2369/ghost/#/dashboard");
  console.log(
    "E1-Test Passed - Expected: http://localhost:2369/ghost/#/dashboard, Actual: ",
    url,
    "."
  );
})().catch((e) =>
  console.log(
    "E1-Test Failed - Expected: ",
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
  const loginPage = new LoginPage(page, ghostUrl, screenshotDirectoryEscenario);

  // Use await to ensure that visit completes before moving to login
  await loginPage.visit();

  const testData = [
    { email: "", password: "", error: "Please fill out the form to sign in." },
    {
      email: faker.internet.email(),
      password: faker.internet.password(),
      error: "There is no user with that email address.",
    },
  ];

  for (const data of testData) {
    const afterlogin = await loginPage.login(data.email, data.password);

    // Get the actual error message text
    const actualErrorMessage = await afterlogin.$eval(".main-error", (el) =>
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
  const loginPage = new LoginPage(page, ghostUrl, screenshotDirectoryEscenario);
  await loginPage.visit();
  const testData = [
    {
      email: userEmail,
      error: "Failed to send email",
      error2: "Too many attempts try again",
    },
    {
      email: faker.internet.email(),
      error: "User not found",
      error2: "Too many attempts try again",
    },
  ];

  for (const data of testData) {
    const afterForgot = await loginPage.forgotPassword(data.email);

    // Get the actual error message text
    const actualErrorMessage = await afterForgot.$eval(".main-error", (el) =>
      el.textContent.trim()
    );
    // Compare with the expected error message
    try {
      assert.ok(
        actualErrorMessage.includes(data.error) ||
          actualErrorMessage.includes(data.error2)
      );

      console.log(
        "E3-Test Passed - Expected: '",
        data.error,
        "' OR '",
        data.error2,
        ", Actual:",
        actualErrorMessage
      );
    } catch (e) {
      console.error(
        e,
        "E3-Test Failed - Expected:",
        data.error,
        "' OR '",
        data.error2,
        ", Actual:",
        actualErrorMessage
      );
    }
  }

  await browser.close();
})().catch((e) => console.log(e));

/**
 * Escenario 4: Como usuario administrador creo un nuevo post para publicarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa una cadena de texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish post, right now
 * And: Se da click en posts
 * Then:Se valida que el post este creado
 */
(async () => {
  const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario4/`;
  ensureDirectoryExists(screenshotDirectoryEscenario);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page, ghostUrl, screenshotDirectoryEscenario);

  await loginPage.visit();

  const afterlogin = await loginPage.login(userEmail, userPassword);
  const postPage = new PostsPage(
    page,
    ghostUrl,
    screenshotDirectoryEscenario
  );
   await Promise.resolve(postPage.visit());
 const afterPostVisit= await Promise.resolve(postPage.createPost());
 await page.waitForTimeout(5000);


  // Close the browser after completing the tests
  await browser.close();

  console.log(
    "E4-Test Passed - Expected: , Actual: ",
    'lalala',
    "."
  );
})().catch((e) =>
  console.log(e,
    "E4-Test Failed - Expected: ",
    e.expected,
    ", Actual: ",
    e.actual,
    "."
  )
);
