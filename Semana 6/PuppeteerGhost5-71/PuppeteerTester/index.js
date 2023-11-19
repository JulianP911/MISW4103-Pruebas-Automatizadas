const assert = require("assert");
const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const LoginPage = require("./loginPage");
const PostsPage = require("./postsPage");
const TagsPage = require("./tagsPage");
const MembersPage = require("./membersPage");
const PagesPage = require("./pagesPage");
let config = require("./config.json");

const ghostUrl = config.ghostUrl;
const userEmail = config.userEmail;
const userPassword = config.userPassword;

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
const runScenarios = async () => {
  await runScenario1();
  await runScenario2();
  await runScenario3();
  await runScenario4();
  await runScenario5();
  await runScenario6();
  await runScenario7();
  await runScenario8();
  await runScenario9();
  await runScenario10();
  await runScenario11();
  await runScenario12();
  await runScenario13();
  await runScenario14();
  await runScenario15();
  await runScenario16();
  await runScenario17();
  await runScenario18();
  await runScenario19();
  await runScenario20();
  await runScenario21();
  await runScenario22();
  await runScenario23();
};

/**
 * Escenario 1: Como usuario administrador realizo el inicio sesión en Ghost (positivo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo valido
 * And: Se ingresa una contraseña valida
 * And: Se da clic en el botón de iniciar de sesión
 * Then: Se verifica que se encuentre en el dashboard
 */
const runScenario1 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario1/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);

    // Get the URL from the page after login
    const url = afterlogin.url();

    // Close the browser after completing the tests
    await browser.close();

    // Perform the assertion after all the asynchronous operations are complete
    assert.equal(url, ghostUrl+"#/dashboard");
    console.log(
      "E1-Test Passed - Expected: http://localhost:2368/ghost/#/dashboard, Actual: ",
      url,
      "."
    );
  } catch (e) {
    // Close the browser after completing the tests

    console.log(
      "E1-Test Failed - Expected: ",
      e.expected,
      ", Actual: ",
      e.actual,
      "."
    );
  }
};
/**
 * Escenario 2: Como usuario administrador realizo el inicio sesión en Ghost (negativo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo vacío - correo invalido
 * And: Se ingresa una contraseña vacía - contraseña invalida
 * And: Se da clic en el botón de iniciar de sesión
 * Then: Se valida el mensaje de error
 */
const runScenario2 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario2/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    // Use await to ensure that visit completes before moving to login
    await loginPage.visit();

    const testData = [
      {
        email: "",
        password: "",
        error: "Please fill out the form to sign in.",
      },
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
  } catch (e) {
    // Close the browser after completing the tests
    console.log(e);
  }
};

/**
 * Escenario 3: Como usuario administrador realizo el inicio sesión en Ghost (negativo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se ingresa un correo no existente- correo de usuario base de datos pero no existente
 * And: Se da clic en el botón de olvide contraseña
 * Then: Se valida el mensaje de error
 */
const runScenario3 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario3/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
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
  } catch (e) {
    // Close the browser after completing the tests
    console.log(e);
  }
};

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
 */ const runScenario4 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario4/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const titlePost = faker.lorem.sentence(2);
    const afterPostVisit = await Promise.resolve(
      postPage.createPost(titlePost)
    );

    // Close the browser after completing the tests
    await browser.close();

    console.log("E4-Test Passed ");
  } catch (e) {
    console.log(
      e,
      "E4-Test Failed - Expected: ",
      e.expected,
      ", Actual: ",
      e.actual,
      "."
    );
  }
};
/**
 * Escenario 5: Como usuario administrador creo un nuevo borrador de post para el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa una cadena de texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear
 */
const runScenario5 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario5/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const titlePost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost));

    // Close the browser after completing the tests
    await browser.close();

    console.log("E5-Test Passed");
  } catch (e) {
    console.log(e, "E5-Test Failed");
  }
};

/**
 * Escenario 6: Como usuario administrador creo un nuevo post con publicación programada
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa una cadena de texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación del post
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish post, right now
 * And: Se da click en posts
 * Then:Se valida que el post este creado
 */
const runScenario6 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario6/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const afterPostVisit = await Promise.resolve(
      postPage.createPostScheduled()
    );

    // Close the browser after completing the tests
    await browser.close();

    console.log("E6-Test Passed ");
  } catch (e) {
    console.log(e, "E6-Test Failed");
  }
};
/**
 * Escenario 7: Como usuario administrador creo un nuevo tag para usarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Tags
 * And: Se da clic en el botón de New Tag
 * And:Se ingresa una cadena de texto al nombre del tag
 * And:Se ingresa un texto a la descripción del tag
 * And: Se da click en Save
 * And: Se da click en Tags
 * And: Se da click en published Tags
 * Then:Se valida que el post este creado
 */
const runScenario7 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario7/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, true));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E7-Test Passed ");
  } catch (e) {
    console.log(e, "E7-Test Failed");
  }
};
/**
 * Escenario 8:  Como usuario administrador creo un nuevo tag (negativo)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Tags
 * And: Se da clic en el botón de New Tag
 * And:Se ingresa un texto a la descripción del tag
 * And: Se da click en Save
 * Then:Debe aparecer un mensaje de error exigiéndome un nombre de tag
 */
const runScenario8 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario8/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTagError());

    // Close the browser after completing the tests
    await browser.close();
    console.log("E8-Test Passed ");
  } catch (e) {
    console.log(e, "E8-Test Failed");
  }
};
/**
 * Escenario 9: Como usuario administrador creo un nuevo internal tag
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Tags
 * And: Se da clic en el botón de New Tag
 * And:Se ingresa una cadena de texto al nombre del tag (con # al inicio del nombre)
 * And:Se ingresa un texto a la descripción del tag
 * And: Se da click en Save
 * And: Se da click en Tags
 * And: Se da click en internal Tags
 * Then:Se valida que el post este creado
 */
const runScenario9 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario9/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = "#" + faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, false));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E9-Test Passed ");
  } catch (e) {
    console.log(e, "E9-Test Failed");
  }
};
/**
 * Escenario 10: Como usuario administrador creo un nuevo post para publicarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa una cadena de texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación del post
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish post, right now
 * And: Se da click en posts
 * Then:Se valida que el post este creado
 */
const runScenario10 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario10/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const membersPage = new MembersPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    ); const nameMember = faker.person.firstName();
    await Promise.resolve(membersPage.visit());
    await Promise.resolve(membersPage.createMember(nameMember));
    // Close the browser after completing the tests
    await browser.close();

    console.log("E10-Test Passed ");
  } catch (e) {
    console.log(e, "E10-Test Failed");
  }
};

/**
 * Escenario 11: Como usuario administrador creo un nuevo member para publicarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de members
 * And: Se da clic en el botón de New member
 * And:Se ingresa una cadena de texto en el campo de nombre del miembro
 * And: Se da click en Guardar
 * Then:Se valida que aparezca error por no ingresar un correo
 */
const runScenario11 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario11/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    const membersPage = new MembersPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(membersPage.visit());
    await Promise.resolve(membersPage.createMemberWithoutMail_Error());
    // Close the browser after completing the tests
    await browser.close();

    console.log("E11-Test Passed ");
  } catch (e) {
    console.log(e, "E11-Test Failed");
  }
};

/**
 * Escenario 12: Como usuario administrador creo una nueva page para publicarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título del page
 * And:Se ingresa un texto al contenido del page
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * Then:Se valida que aparezca el titulo de publicacion exitosa
 */
const runScenario12 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario12/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    const pagesPage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagesPage.visit());
    await Promise.resolve(pagesPage.createPage());
    // Close the browser after completing the tests
    await browser.close();

    console.log("E12-Test Passed ");
  } catch (e) {
    console.log(e, "E12-Test Failed");
  }
};

/**
 * Escenario 13: Como usuario administrador creo una nueva page para publicarlo en el sitio web
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And: Se ingresa una cadena de texto al título del page
 * And: Se ingresa un texto al contenido del page
 * And: Se da click en pages
 * Then: Se valida que aparezaca en el listado de pages el borrador que se acabo de crear
 *
 */
const runScenario13 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario13/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    const pagesPage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = faker.lorem.sentence(2);
    await Promise.resolve(pagesPage.visit());
    await Promise.resolve(pagesPage.createDraft(titlePage));
    // Close the browser after completing the tests
    await browser.close();

    console.log("E13-Test Passed ");
  } catch (e) {
    console.log(e, "E13-Test Failed");
  }
};

/**
 * Escenario 14: Como usuario administrador creo una page con publicación programada
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título del page
 * And:Se ingresa un texto al contenido del page
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación dela page
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * Then:Se valida que aparezca el titulo de publicacion exitosa 
 * 

 */
const runScenario14 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario14/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    const pagesPage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagesPage.visit());
    await Promise.resolve(pagesPage.createPageScheduled());
    // Close the browser after completing the tests
    await browser.close();

    console.log("E14-Test Passed ");
  } catch (e) {
    console.log(e, "E14-Test Failed");
  }
};

/**
 * Escenario 15: Como usuario administrador edito un post creado previamente de mis borradores
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
 */
const runScenario15 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario15/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost));
    await Promise.resolve(postPage.editDraft(titlePost, newTitlePost));

    // Close the browser after completing the tests
    await browser.close();

    console.log("E15-Test Passed");
  } catch (e) {
    console.log(e, "E15-Test Failed");
  }
};

/**
 * Escenario 16: Como usuario administrador edito un tag creado previamente (caso positivo)
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Tags
 * And: Se selecciona el tag que ha sido creado previamente
 * And:Se ingresa una nueva cadena de texto al nombre del tag
 * And: Se da click en Save
 * And: Se da click en Tags
 * Then:Se valida que el tag que ha sido creado previamente se le ha modificado el titulo
 */
const runScenario16 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario16/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = faker.lorem.sentence(2);
    const editTagName = faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, true));
    await Promise.resolve(tagsPage.editTag(editTagName));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E16-Test Passed ");
  } catch (e) {
    console.log(e, "E16-Test Failed");
  }
};
/**
 * Escenario 17: Como usuario administrador edito un member creado previamente
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un member
 * And: Se da clic en el botón de Members
 * And:Se selecciona un member creado
 * And:Se ingresa una nueva cadena de texto al campo del correo del member
 * And: Se da clic en el botón save
 * And: Se da clic en el botón de Members
 * Then:Se verifica que el cambio en el campo de correo realizado al member
 */
const runScenario17 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario17/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const membersPage = new MembersPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    ); const nameMember = faker.person.firstName();
    await Promise.resolve(membersPage.visit());
    await Promise.resolve(membersPage.createMember(nameMember));
    await Promise.resolve(membersPage.editMember());

    // Close the browser after completing the tests
    await browser.close();

    console.log("E17-Test Passed ");
  } catch (e) {
    console.log(e, "E17-Test Failed");
  }
};

/**
 * Escenario 18: Como usuario administrador edito un page creado previamente de mis borradores
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa una nueva cadena de texto al título de la page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario18 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario18/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const pagesPage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagesPage.visit());
    const titlePage = faker.lorem.sentence(2);
    const newTitlePage = faker.lorem.sentence(2);
    await Promise.resolve(pagesPage.createDraft(titlePage));
    await Promise.resolve(pagesPage.editDraft(titlePage, newTitlePage));

    // Close the browser after completing the tests
    await browser.close();

    console.log("E18-Test Passed");
  } catch (e) {
    console.log(e, "E18-Test Failed");
  }
};

/**
 * Escenario 19: Como usuario administrador le asigno un tag a un post ya publicado
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación y publicación de un post
 * And: Se realiza la creación de un tag
 * And:Se da click en el botón de Posts
 * And: Se selecciona el post que ha sido creado
 * And: se da click en el botón de settings
 * And: Se selecciona el tag creado en el dropdown de Tags
 * And: Se da click en el botón update
 * And: Se da clic en el botón de Posts
 * And: Se da click en el filtro all tags
 * And: Se selecciona el tag asignado
 * Then:Se verifica que al filtrar aparezca el post al cual se le asigno el tag
 */
const runScenario19 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario19/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, true));
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const titlePost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createPost(titlePost));
    await Promise.resolve(postPage.addTagPost(titlePost, newTagName));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E19-Test Passed ");
  } catch (e) {
    console.log(e, "E19-Test Failed");
  }
};
/**
 * Escenario 20: Como usuario administrador elimino un post
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación y publicación de un post
 * And:Se da click en el botón de Posts
 * And: Se selecciona el post que ha sido creado
 * And: se da click en el botón de settings
 * And: Se da click en el botón eliminar post
 * And: Se da clic en el botón de Eliminar
 * Then:Se verifica que en la lista de post ya no se encuentra el post eliminado
 */
const runScenario20 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario20/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const titlePost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createPost(titlePost));
    await Promise.resolve(postPage.deletePost(titlePost));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E20-Test Passed ");
  } catch (e) {
    console.log(e, "E20-Test Failed");
  }
};

/**
 * Escenario 21: Como usuario administrador elimino una page
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación y publicación de una page
 * And:Se da click en el botón de Pages
 * And: Se selecciona la page que ha sido creado
 * And: se da click en el botón de settings
 * And: Se da click en el botón eliminar page
 * And: Se da clic en el botón de Eliminar
 * Then:Se verifica que en la lista de pages ya no se encuentra la page eliminada
 */
const runScenario21 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario21/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const pagesPage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagesPage.visit());
    const titlePage = faker.lorem.sentence(2);
    await Promise.resolve(pagesPage.createPage(titlePage));
    await Promise.resolve(pagesPage.deletePage(titlePage));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E21-Test Passed ");
  } catch (e) {
    console.log(e, "E21-Test Failed");
  }
  
};

/**
* Escenario 22: Como usuario administrador elimino un tag
* Given: Se ingresa a la página correspondiente a login
* When: Se realiza la creación de un tag
* And:Se da click en el botón de Tags
* And: Se selecciona el tag que ha sido creado
* And: Se da click en el botón eliminar tag
* And: Se da clic en el botón de Eliminar 
* Then:Se verifica que en la lista de tags ya no se encuentra el tag eliminado
*/
const runScenario22 = async () => {
 try {
   const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario22/`;
   ensureDirectoryExists(screenshotDirectoryEscenario);
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();
   const loginPage = new LoginPage(
     page,
     ghostUrl,
     screenshotDirectoryEscenario
   );

   await loginPage.visit();

   await loginPage.login(userEmail, userPassword);
   const tagsPage = new TagsPage(
     page,
     ghostUrl,
     screenshotDirectoryEscenario
   );
   await Promise.resolve(tagsPage.visit());
   const nameTag = faker.lorem.sentence(1);
   await Promise.resolve(tagsPage.createTag(nameTag,true));
   await Promise.resolve(tagsPage.deleteTag(nameTag));
   // Close the browser after completing the tests
   await browser.close();

   console.log("E22-Test Passed ");
 } catch (e) {
   console.log(e, "E22-Test Failed");
 }
};

/**
 * Escenario 23: Como usuario administrador elimino un member
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un member
 * And:Se da click en el botón de Members
 * And: Se selecciona el member que ha sido creado
 * And: se da click en el botón de settings
 * And: Se da click en el botón eliminar member
 * And: Se da clic en el botón de Eliminar 
 * Then:Se verifica que en la lista de member ya no se encuentra el member eliminado
 */
const runScenario23 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario23/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const membersPage = new MembersPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(membersPage.visit());
    const nameMember = faker.person.firstName();
    await Promise.resolve(membersPage.createMember(nameMember));
    await Promise.resolve(membersPage.deleteMember(nameMember));
    // Close the browser after completing the tests
    await browser.close();

    console.log("E23-Test Passed ");
  } catch (e) {
    console.log(e, "E23-Test Failed");
  }
};
runScenarios();
