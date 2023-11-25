const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const LoginPage = require("./loginPage");
const PostsPage = require("./postsPage");
const PagesPage = require("./pagesPage");
let config = require("./config.json");
const ValueGenerator = require("./valueGenerator");

const ghostUrl = config.ghostUrl;
const userEmail = config.userEmail;
const userPassword = config.userPassword;
const valueGenerator=new ValueGenerator();
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
  await runScenario24();
  await runScenario25();
  await runScenario26();
  await runScenario27();
  await runScenario28();
  await runScenario29();
  await runScenario30();
  await runScenario31();
  await runScenario32();
  await runScenario33();
  await runScenario34();
  await runScenario35();
  await runScenario36();
  await runScenario37();
  await runScenario38();
  await runScenario39();
  await runScenario40();
  await runScenario41();
  await runScenario42();
  await runScenario43();
  await runScenario44();
  await runScenario45();
  await runScenario46();
  await runScenario47();
  await runScenario48();
  await runScenario49();
  await runScenario50();
  await runScenario51();
  await runScenario52();
  await runScenario53();
  await runScenario54();
  await runScenario55();
  await runScenario56();
  await runScenario57();
  await runScenario58();
  await runScenario59();
  await runScenario60();
  await runScenario61();
  await runScenario62();
  await runScenario63();
  await runScenario64();
};

/**
 * Escenario 1: Como usuario administrador creo un nuevo post para publicarlo en el sitio web con título y descripcion correctos
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
 */ const runScenario1 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario1/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    const afterlogin = await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa una cadena de texto al título del post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish post, right now
     * And: Se da click en posts
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post este creado
    if (responseCreatePost.status) {
      console.log("E1-Test Passed ");
    } else {
      console.log("E1-Test Failed ");
    }
  } catch (e) {
    console.log("E1-Test Failed ");
  }
};
/**
 * Escenario 2: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Sin titulo y con descripción
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish post, right now
 * And: Se da click en posts
 * Then:Se valida que el post se haya creado
 */ const runScenario2 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario2/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish post, right now
     * And: Se da click en posts
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.getEmptyString();
    const descriptionPost = valueGenerator.generateString();

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post este creado
    if (responseCreatePost.status) {
      console.log("E2-Test Passed ");
    } else {
      console.log("E2-Test Failed ");
    }
  } catch (e) {
    console.log("E2-Test Failed ");
  }
};
/**
 * Escenario 3: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Sin titulo y sin descripción
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And: Se espera a que aparezca el botón de publish
 * Then:Se valida que el post no se haya podido crear
 */ const runScenario3 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario3/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And: Se da click en el publish
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.getEmptyString();
    const descriptionPost = valueGenerator.getEmptyString();

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post no se haya podido crear
    if (!responseCreatePost.status) {
      console.log("E3-Test Passed ");
    } else {
      console.log("E3-Test Failed ");
    }
  } catch (e) {
    console.log("E3-Test Failed ");
  }
};
/**
 * Escenario 4: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Campos muy largos (15000 caracteres)
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * Then:Se valida que el post no se haya podido crear
 */ const runScenario4 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario4/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish post, right now
     * And: Se da click en posts
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.generateLongString();
    const descriptionPost = valueGenerator.generateLongString();

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post no se haya podido crear
    if (!responseCreatePost.status) {
      console.log("E4-Test Passed ");
    } else {
      console.log("E4-Test Failed ");
    }
  } catch (e) {
    console.log("E4-Test Failed ");
  }
};
/**
 * Escenario 5: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Campos solo con caracteres especiales
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish post, right now
 * And: Se da click en posts
 * Then:Se valida que el post se haya creado
 */ const runScenario5 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario5/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish post, right now
     * And: Se da click en posts
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.generateSpecialCharacters();
    const descriptionPost = valueGenerator.generateSpecialCharacters();

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post se haya creado
    if (responseCreatePost.status) {
      console.log("E5-Test Passed ");
    } else {
      console.log("E5-Test Failed ");
    }
  } catch (e) {
    console.log("E5-Test Failed ");
  }
};
/**
 * Escenario 6: Como usuario administrador creo un nuevo borrador de post para el sitio web Título y descripcion correctos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa una cadena de texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear
 */
const runScenario6 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario6/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa una cadena de texto al título del post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);

    const responseCreatePost = await Promise.resolve(
      postPage.createDraft(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear

    if (responseCreatePost.status) {
      console.log("E6-Test Passed ");
    } else {
      console.log("E6-Test Failed ");
    }
  } catch (e) {
    console.log("E6-Test Failed ");
  }
};
/**
 * Escenario 7: Como usuario administrador creo un nuevo borrador de post para el sitio web Sin titulo y con descripción
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear
 */
const runScenario7 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario7/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.getEmptyString();
    const descriptionPost = valueGenerator.generateString();

    const responseCreatePost = await Promise.resolve(
      postPage.createDraft(titlePost, descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear

    if (responseCreatePost.status) {
      console.log("E7-Test Passed ");
    } else {
      console.log("E7-Test Failed ");
    }
  } catch (e) {
    console.log("E7-Test Failed ");
  }
};
/**
 * Escenario 8: Como usuario administrador creo un nuevo borrador de post para el sitio web Sin titulo y sin descripción
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And: Se da click en posts
 * Then:Se valida que no se haya podido crear el borrador
 */
const runScenario8 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario8/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.getEmptyString();
    const descriptionPost = valueGenerator.getEmptyString();

    const responseCreatePost = await Promise.resolve(
      postPage.createDraft(titlePost, descriptionPost)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post no se haya podido crear
    if (!responseCreatePost.status) {
      console.log("E8-Test Passed ");
    } else {
      console.log("E8-Test Failed ");
    }
  } catch (e) {
    console.log("E8-Test Failed ");
  }
};
/**
 * Escenario 9: Como usuario administrador creo un nuevo borrador de post para el sitio web Campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que no se haya podido crear el borrador
 */
const runScenario9 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario9/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Posts
     * And: Se da clic en el botón de New Post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.generateLongString();
    const descriptionPost = valueGenerator.generateLongString();

    const responseCreatePost = await Promise.resolve(
      postPage.createDraft(titlePost, descriptionPost)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post no se haya podido crear
    if (!responseCreatePost.status) {
      console.log("E9-Test Passed ");
    } else {
      console.log("E9-Test Failed ");
    }
  } catch (e) {
    console.log("E9-Test Failed ");
  }
};
/**
 * Escenario 10: Como usuario administrador creo un nuevo borrador de post para el sitio web Campos solo con caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que se haya podido crear el borrador
 */
const runScenario10 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario10/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    const afterlogin = await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al título del post
 * And:Se ingresa un texto al contenido del post
 * And: Se da click en posts
 * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = valueGenerator.generateSpecialCharacters();
    const descriptionPost = valueGenerator.generateSpecialCharacters();

    const responseCreatePost = await Promise.resolve(
      postPage.createDraft(titlePost, descriptionPost)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezaca en el listado de posts el borrador que se acabo de crear
    if (responseCreatePost.status) {
      console.log("E10-Test Passed ");
    } else {
      console.log("E10-Test Failed ");
    }
  } catch (e) {
    console.log("E10-Test Failed ");
  }
};
/**
 * Escenario 11: Como usuario administrador creo un nuevo post con publicación programada Con fecha futura
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
const runScenario11 = async () => {
  try {
    //Create directory to save screenshots
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
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const publishDate = valueGenerator.generateFutureDate();

    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    if (responseCreateScheduledPost.status) {
      console.log("E11-Test Passed ");
    } else {
      console.log("E11-Test Failed ");
    }
  } catch (e) {
    console.log("E11-Test Failed ");
  }
};
/**
 * Escenario 12: Como usuario administrador creo un nuevo post con publicación programada Con fecha pasada
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
const runScenario12 = async () => {
  try {
    //Create directory to save screenshots
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

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const publishDate = valueGenerator.generatePastDate();

    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    if (!responseCreateScheduledPost.status) {
      console.log("E12-Test Passed ");
    } else {
      console.log("E12-Test Failed ");
    }
  } catch (e) {
    console.log("E12-Test Failed ");
  }
};
/**
 * Escenario 13: Como usuario administrador creo un nuevo post con publicación programada Con formato incorrecto
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
const runScenario13 = async () => {
  try {
    //Create directory to save screenshots
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
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const publishDate = valueGenerator.generateStringDate();

    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que el post no se haya podido crear y el mensaje de error

    if (
      !responseCreateScheduledPost.status &&
      responseCreateScheduledPost.message.includes("Invalid date format")
    ) {
      console.log("E13-Test Passed ");
    } else {
      console.log("E13-Test Failed ");
    }
  } catch (e) {
    console.log("E13-Test Failed ");
  }
};
/**
 * Escenario 14: Como usuario administrador creo un nuevo post con publicación programada Con fecha incorrecta (ej. mes >12)
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
 * Then:Se valida que el post no se haya podido crear y el mensaje de error
 */
const runScenario14 = async () => {
  try {
    //Create directory to save screenshots
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
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const publishDate = valueGenerator.generateDateWrongMonth();

    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que el post no se haya podido crear y el mensaje de error
    if (
      !responseCreateScheduledPost.status &&
      responseCreateScheduledPost.message.includes("Invalid date")
    ) {
      console.log("E14-Test Passed ");
    } else {
      console.log("E14-Test Failed ");
    }
  } catch (e) {
    console.log("E14-Test Failed ");
  }
};

/**
 * Escenario 15: Como administrador le cambio la fecha a un post ya publicado Con fecha futura
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se crea un post y se pública
 * And: Se elige el post creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que no permite actualizar y muestra un mensaje de error
 */
const runScenario15 = async () => {
  try {
    //Create directory to save screenshots
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

    await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generateFutureDate();

    await Promise.resolve(postPage.visit());
    await Promise.resolve(postPage.createPost(titlePost, descriptionPost));
    const responseCreatePost = await Promise.resolve(
      postPage.editDate(titlePost, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que el post no se haya podido crear y el mensaje de error
    if (!responseCreatePost.status) {
      console.log("E15-Test Passed ");
    } else {
      console.log("E15-Test Failed ");
    }
  } catch (e) {
    console.log("E15-Test Failed ");
  }
};
/**
 * Escenario 16: Como administrador le cambio la fecha a un post ya publicado Con fecha pasada
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se crea un post y se pública
 * And: Se elige el post creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario16 = async () => {
  try {
    //Create directory to save screenshots
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

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generatePastDate();

    await Promise.resolve(postPage.visit());
    await Promise.resolve(postPage.createPost(titlePost, descriptionPost));
    const responseCreatePost = await Promise.resolve(
      postPage.editDate(titlePost, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha se haya podido cambiar
    if (responseCreatePost.status) {
      console.log("E16-Test Passed ");
    } else {
      console.log("E16-Test Failed ");
    }
  } catch (e) {
    console.log("E16-Test Failed ");
  }
};

/**
 * Escenario 17: Como administrador le cambio la fecha a un post ya publicado con formato incorrecto
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se crea un post y se pública
 * And: Se elige el post creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario17 = async () => {
  try {
    //Create directory to save screenshots
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
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generateStringDate();

    await Promise.resolve(postPage.visit());
    await Promise.resolve(postPage.createPost(titlePost, descriptionPost));
    const responseCreatePost = await Promise.resolve(
      postPage.editDate(titlePost, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha no se haya podido cambiar
    if (!responseCreatePost.status) {
      console.log("E17-Test Passed ");
    } else {
      console.log("E17-Test Failed ");
    }
  } catch (e) {
    console.log("E17-Test Failed ");
  }
};

/**
 * Escenario 18: Como administrador le cambio la fecha a un post ya publicado con fecha incorrecta (ej. mes>12)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se crea un post y se pública
 * And: Se elige el post creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario18 = async () => {
  try {
    //Create directory to save screenshots
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
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = valueGenerator.generateString();
    const descriptionPost = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generateDateWrongMonth();

    await Promise.resolve(postPage.visit());
    await Promise.resolve(postPage.createPost(titlePost, descriptionPost));
    const responseCreatePost = await Promise.resolve(
      postPage.editDate(titlePost, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha no se haya podido cambiar
    if (!responseCreatePost.status) {
      console.log("E18-Test Passed ");
    } else {
      console.log("E18-Test Failed ");
    }
  } catch (e) {
    console.log("E18-Test Failed ");
  }
};

/**
 * Escenario 19: Como usuario administrador edito un post creado previamente de mis borradores Título y descripcion correctos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
 */
const runScenario19 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario19/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = faker.lorem.sentence(2);
    const newDescriptionPost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost, newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (responseEditPost.status) {
      console.log("E19-Test Passed ");
    } else {
      console.log("E19-Test Failed ");
    }
  } catch (e) {
    console.log("E19-Test Failed ");
  }
};
/**
 * Escenario 20: Como usuario administrador edito un post creado previamente de mis borradores Sin Título y con descripcion
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que el borrador se haya guardado
 */
const runScenario20 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario20/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = valueGenerator.getEmptyString();
    const newDescriptionPost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost, newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    // Then:Se valida que el borrador se haya guardado
    if (responseEditPost.status) {
      console.log("E20-Test Passed ");
    } else {
      console.log("E20-Test Failed ");
    }
  } catch (e) {
    console.log("E20-Test Failed ");
  }
};

/**
 * Escenario 21: Como usuario administrador edito un post creado previamente de mis borradores Campos vacíos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
 */
const runScenario21 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario21/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = valueGenerator.generateString();
    const titlePost = valueGenerator.generateString();
    const newTitlePost = valueGenerator.getEmptyString();
    const newDescriptionPost = valueGenerator.getEmptyString();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost, newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (responseEditPost.status) {
      console.log("E21-Test Passed ");
    } else {
      console.log("E21-Test Failed ");
    }
  } catch (e) {
    console.log("E21-Test Failed ");
  }
};

/**
 * Escenario 22: Como usuario administrador edito un post creado previamente de mis borradores Campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * * And:Se ingresa una nueva cadena de texto al contenido del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
 */
const runScenario22 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario22/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = faker.lorem.sentences(50);
    const newDescriptionPost = faker.lorem.sentences(50);
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost, newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (!responseEditPost.status) {
      console.log("E22-Test Passed ");
    } else {
      console.log("E22-Test Failed ");
    }
  } catch (e) {
    console.log("E22-Test Failed ");
  }
};

/**
 * Escenario 23: Como usuario administrador edito un post creado previamente de mis borradores Campos solo con caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
 */
const runScenario23 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario23/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = valueGenerator.generateSpecialCharacters();
    const newDescriptionPost = valueGenerator.generateSpecialCharacters();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost, newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (responseEditPost.status) {
      console.log("E23-Test Passed ");
    } else {
      console.log("E23-Test Failed ");
    }
  } catch (e) {
    console.log("E23-Test Failed ");
  }
};

/**
 * Escenario 24: Como administrador le cambio la url a un post Campo vacio
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario24 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario24/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newUrl = valueGenerator.getEmptyString();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (!responseEditPost.status) {
      console.log("E24-Test Passed ");
    } else {
      console.log("E24-Test Failed ");
    }
  } catch (e) {
    console.log("E24-Test Failed ");
  }
};

/**
 * Escenario 25: Como administrador le cambio la url a un post Caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario25 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario25/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newUrl = valueGenerator.generateSpecialCharacters();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (!responseEditPost.status) {
      console.log("E25-Test Passed ");
    } else {
      console.log("E25-Test Failed ");
    }
  } catch (e) {
    console.log("E25-Test Failed ");
  }
};

/**
 * Escenario 26: Como administrador le cambio la url a un post Campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario26 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario26/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newUrl = faker.lorem.sentences(50).replace(" ", "-");
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (!responseEditPost.status) {
      console.log("E26-Test Passed ");
    } else {
      console.log("E26-Test Failed ");
    }
  } catch (e) {
    console.log("E26-Test Failed ");
  }
};

/**
 * Escenario 27: Como administrador le cambio la url a un post Campo correcto
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario27 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario27/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = valueGenerator.generateString();
    const titlePost = valueGenerator.generateString();
    const newUrl = valueGenerator.generateWord();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (responseEditPost.status) {
      console.log("E27-Test Passed ");
    } else {
      console.log("E27-Test Failed ");
    }
  } catch (e) {
    console.log("E27-Test Failed ");
  }
};

/**
 * Escenario 28: Como administrador le asigno a dos post la misma url
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * And: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 * Then:Se valida que en el segundo post no se cambia exitosamente por la url ingresada y el primero si
 */
const runScenario28 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario28/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle del post
     * And: Se da click en settings de nuevo
     * And: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle del post
     * And: Se da click en settings de nuevo*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = valueGenerator.generateString();
    const titlePost = valueGenerator.generateString();
    const newUrl = valueGenerator.generateWord();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    const descriptionPost2 = valueGenerator.generateString();
    const titlePost2 = valueGenerator.generateString();
    await Promise.resolve(postPage.createDraft(titlePost2, descriptionPost2));
    const responseEditPost2 = await Promise.resolve(
      postPage.changeURL(titlePost2, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que en el segundo post no se cambia exitosamente por la url ingresada y el primero si
    if (!responseEditPost2.status && responseEditPost.status) {
      console.log("E28-Test Passed ");
    } else {
      console.log("E28-Test Failed ");
    }
  } catch (e) {
    console.log("E28-Test Failed ");
  }
};

/**
 * Escenario 29: Como administrador le cambio la url a un post por Ghost (Palabra protegida)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle del post
 * And: Se da click en settings de nuevo
 *Then:Se valida que la url no sea Ghost es decir no se haya hecho la edición correctamente
 */
const runScenario29 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario29/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newUrl = valueGenerator.getRestrictedWord();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.changeURL(titlePost, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea Ghost es decir no se haya hecho la edición correctamente
    if (!responseEditPost.status) {
      console.log("E29-Test Passed ");
    } else {
      console.log("E29-Test Failed ");
    }
  } catch (e) {
    console.log("E29-Test Failed ");
  }
};

/**
 * Escenario 30: Como administrador le agrego una url de youtube a un post aleatorio iniciando por 'www.youtube.com/'
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario30 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario30/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = "";
    const titlePost = faker.lorem.sentence(2);
    const youtubeUrl = valueGenerator.generateYoutubeUrlInvalid();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.addYoutubeUrl(titlePost, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea aceptada
    if (!responseEditPost.status) {
      console.log("E30-Test Passed ");
    } else {
      console.log("E30-Test Failed ");
    }
  } catch (e) {
    console.log("E30-Test Failed ");
  }
};
/**
 * Escenario 31: Como administrador le agrego una cadena aleatoria a un post en el campo url
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario31 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario31/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = valueGenerator.getEmptyString();
    const titlePost = valueGenerator.generateString();
    const youtubeUrl = valueGenerator.generateWord();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.addYoutubeUrl(titlePost, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea aceptada
    if (!responseEditPost.status) {
      console.log("E31-Test Passed ");
    } else {
      console.log("E31-Test Failed ");
    }
  } catch (e) {
    console.log("E31-Test Failed ");
  }
};
/**
 * Escenario 32: Como administrador le agrego una url de youtube a un post url real
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario32 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario32/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un post
     * And:Se selecciona el post que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del post
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    const descriptionPost = valueGenerator.getEmptyString();
    const titlePost = faker.lorem.sentence(2);
    const youtubeUrl = valueGenerator.getURLYoutube();
    await Promise.resolve(postPage.createDraft(titlePost, descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.addYoutubeUrl(titlePost, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea aceptada
    if (responseEditPost.status) {
      console.log("E32-Test Passed ");
    } else {
      console.log("E32-Test Failed ");
    }
  } catch (e) {
    console.log("E32-Test Failed ");
  }
};

/**
 * Escenario 33: Como usuario administrador creo una nueva page para publicarla en el sitio web con título y descripcion correctos
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que la page este creada
 */
const runScenario33 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario33/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa una cadena de texto al título
     * And:Se ingresa un texto al contenido
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish page, right now
     * And: Se da click en pages
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = faker.lorem.sentence(2);
    const descriptionPage = faker.lorem.sentence(2);

    const responseCreatePage = await Promise.resolve(
      pagePage.createPage(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que la page este creada
    if (responseCreatePage.status) {
      console.log("E33-Test Passed ");
    } else {
      console.log("E33-Test Failed ");
    }
  } catch (e) {
    console.log("E33-Test Failed ");
  }
};
/**
 * Escenario 34: Como usuario administrador creo una nueva page para publicarla en el sitio web Sin titulo y con descripción
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al contenido del page
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que la page se haya creado
 */
const runScenario34 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario34/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa un texto al contenido
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish page, right now
     * And: Se da click en pages
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.getEmptyString();
    const descriptionPage = valueGenerator.generateString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createPage(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que la page este creada
    if (responseCreatePage.status) {
      console.log("E34-Test Passed ");
    } else {
      console.log("E34-Test Failed ");
    }
  } catch (e) {
    console.log("E34-Test Failed ");
  }
};
/**
 * Escenario 35: Como usuario administrador creo una nueva page para publicarla en el sitio web Sin titulo y sin descripción
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al contenido
 * And: Se espera a que aparezca el botón de publish
 * Then:Se valida que el page no se haya podido crear
 */
const runScenario35 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario35/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa un texto al contenido
     * And: Se da click en el publish
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.getEmptyString();
    const descriptionPage = valueGenerator.getEmptyString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createPage(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que la page no se haya podido crear
    if (!responseCreatePage.status) {
      console.log("E35-Test Passed ");
    } else {
      console.log("E35-Test Failed ");
    }
  } catch (e) {
    console.log("E35-Test Failed ");
  }
};
/**
 * Escenario 36: Como usuario administrador creo una nueva page para publicarla en el sitio web con campos muy largos (15000 caracteres)
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al titulo
 * And:Se ingresa un texto al contenido
 * Then:Se valida que el page no se haya podido crear
 */
const runScenario36 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario36/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa un texto al titulo
     * And:Se ingresa un texto al contenido
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.generateLongString();
    const descriptionPage = valueGenerator.generateLongString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createPage(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que la page no se haya podido publicar
    if (!responseCreatePage.status) {
      console.log("E36-Test Passed ");
    } else {
      console.log("E436-Test Failed ");
    }
  } catch (e) {
    console.log("E36-Test Failed ");
  }
};
/**
 * Escenario 37: Como usuario administrador creo una nueva page para publicarlo en el sitio web llenando sus campos con caracteres especiales
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Pages
 * And:Se ingresa un texto en el titulo de la page
 * And:Se ingresa un texto al contenido de la page
 * And: Se da click en el publish
 * And: Se da click en Continue, final review
 * And: Se da click en Publish pages, right now
 * And: Se da click en pages
 * Then:Se valida que la page se haya creado
 */ const runScenario37 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario37/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /*When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Pages
     * And:Se ingresa un texto al titulo
     * And:Se ingresa un texto al contenido
     * And: Se da click en el publish
     * And: Se da click en Continue, final review
     * And: Se da click en Publish page, right now
     * And: Se da click en pages
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.generateSpecialCharacters();
    const descriptionPage = valueGenerator.generateSpecialCharacters();

    const responseCreatePage = await Promise.resolve(
      pagePage.createPage(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que la page se haya creado
    if (responseCreatePage.status) {
      console.log("E37-Test Passed ");
    } else {
      console.log("E37-Test Failed ");
    }
  } catch (e) {
    console.log(e.message);
    console.log("E37-Test Failed ");
  }
};
/**
 * Escenario 38: Como usuario administrador creo un nuevo borrador de page para el sitio web con título y descripcion correctos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en pages
 * Then:Se valida que aparezca en el listado de pages el borrador que se acabo de crear
 */
const runScenario38 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario38/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa una cadena de texto al título
     * And:Se ingresa un texto al contenido
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = faker.lorem.sentence(2);
    const descriptionPage = faker.lorem.sentence(2);

    const responseCreatePage = await Promise.resolve(
      pagePage.createDraft(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezca en el listado de pages el borrador que se acabo de crear

    if (responseCreatePage.status) {
      console.log("E38-Test Passed ");
    } else {
      console.log("E38-Test Failed ");
    }
  } catch (e) {
    console.log("E38-Test Failed ");
  }
};
/**
 * Escenario 39: Como usuario administrador creo un nuevo borrador de page para el sitio web Sin titulo y con descripción
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al contenido
 * And: Se da click en pages
 * Then:Se valida que aparezca en el listado de pages el borrador que se acabo de crear
 */
const runScenario39 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario39/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa un texto al contenido
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.getEmptyString();
    const descriptionPage = valueGenerator.generateString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createDraft(titlePage, descriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezca en el listado de pages el borrador que se acabo de crear

    if (responseCreatePage.status) {
      console.log("E39-Test Passed ");
    } else {
      console.log("E39-Test Failed ");
    }
  } catch (e) {
    console.log("E39-Test Failed ");
  }
};
/**
 * Escenario 40: Como usuario administrador creo un nuevo borrador de page para el sitio web sin titulo y sin descripción
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de pages
 * And: Se da clic en el botón de New Page
 * And: Se da click en pages
 * Then:Se valida que no se haya podido crear el borrador
 */
const runScenario40 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario40/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.getEmptyString();
    const descriptionPage = valueGenerator.getEmptyString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createDraft(titlePage, descriptionPage)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el page no se haya podido crear
    if (!responseCreatePage.status) {
      console.log("E40-Test Passed ");
    } else {
      console.log("E40-Test Failed ");
    }
  } catch (e) {
    console.log("E40-Test Failed ");
  }
};
/**
 * Escenario 41: Como usuario administrador creo un nuevo borrador de page para el sitio web Campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en pages
 * Then:Se valida que no se haya podido crear el borrador
 */
const runScenario41 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario41/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.generateLongString();
    const descriptionPage = valueGenerator.generateLongString();

    const responseCreatePage = await Promise.resolve(
      pagePage.createDraft(titlePage, descriptionPage)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el page no se haya podido crear
    if (!responseCreatePage.status) {
      console.log("E41-Test Passed ");
    } else {
      console.log("E41-Test Failed ");
    }
  } catch (e) {
    console.log("E41-Test Failed ");
  }
};
/**
 * Escenario 42: Como usuario administrador creo un nuevo borrador de page para el sitio web llenando los campos con caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa un texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en pages
 * Then:Se valida que se haya podido crear el borrador
 */
const runScenario42 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario42/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Given: Se ingresa a la página correspondiente a login
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);

    /* When: Se da clic en el botón de Pages
     * And: Se da clic en el botón de New Page
     * And:Se ingresa un texto al título
     * And:Se ingresa un texto al contenido
     * And: Se da click en pages
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    //Generación de datos
    const titlePage = valueGenerator.generateSpecialCharacters();
    const descriptionPage = valueGenerator.generateSpecialCharacters();

    const responseCreatePage = await Promise.resolve(
      pagePage.createDraft(titlePage, descriptionPage)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que aparezca en el listado de pages el borrador que se acabo de crear
    if (responseCreatePage.status) {
      console.log("E10-Test Passed ");
    } else {
      console.log("E10-Test Failed ");
    }
  } catch (e) {
    console.log("E10-Test Failed ");
  }
};

/**
 * Escenario 43: Como usuario administrador creo una nueva page con publicación programada Con fecha futura
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación de la page
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que el page este creado
 */
const runScenario43 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario43/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const publishDate = valueGenerator.generateFutureDate();

    await Promise.resolve(pagePage.visit());
    const responseCreateScheduledPage = await Promise.resolve(
      pagePage.createPageScheduled(titlePage, descriptionPage, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    if (responseCreateScheduledPage.status) {
      console.log("E43-Test Passed ");
    } else {
      console.log("E43-Test Failed ");
    }
  } catch (e) {
    console.log("E43-Test Failed ");
  }
};
/**
 * Escenario 44: Como usuario administrador creo una nueva page con publicación programada Con fecha pasada
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación de la page
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que la page este creada
 */
const runScenario44 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario44/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const publishDate = valueGenerator.generatePastDate();

    await Promise.resolve(pagePage.visit());
    const responseCreateScheduledPage = await Promise.resolve(
      pagePage.createPageScheduled(titlePage, descriptionPage, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    if (!responseCreateScheduledPage.status) {
      console.log("E44-Test Passed ");
    } else {
      console.log("E44-Test Failed ");
    }
  } catch (e) {
    console.log("E44-Test Failed ");
  }
};
/**
 * Escenario 45: Como usuario administrador creo una nueva page con publicación programada Con formato incorrecto
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título
 * And:Se ingresa un texto al contenido
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación del page
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que la page este creada
 */
const runScenario45 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario45/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const publishDate = valueGenerator.generateStringDate();

    await Promise.resolve(pagePage.visit());
    const responseCreateScheduledPage = await Promise.resolve(
      pagePage.createPageScheduled(titlePage, descriptionPage, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la page no se haya podido crear y el mensaje de error

    if (
      !responseCreateScheduledPage.status &&
      responseCreateScheduledPage.message.includes("Invalid date format")
    ) {
      console.log("E45-Test Passed ");
    } else {
      console.log("E45-Test Failed ");
    }
  } catch (e) {
    console.log("E45-Test Failed ");
  }
};
/**
 * Escenario 46: Como usuario administrador creo una nueva page con publicación programada Con fecha incorrecta (ej. mes >12)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se da clic en el botón de New Page
 * And:Se ingresa una cadena de texto al título del page
 * And:Se ingresa un texto al contenido del page
 * And: Se da click en el publish
 * And: Se da click en el dropdown de configuración de publicación del page
 * And: Se da click en la opcion de publicar luego
 * And: Se da click en Continue, final review
 * And: Se da click en Publish page, right now
 * And: Se da click en pages
 * Then:Se valida que la page no se haya podido crear y el mensaje de error
 */
const runScenario46 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario46/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = faker.lorem.sentence(2);
    const descriptionPage = faker.lorem.sentence(2);
    const publishDate = valueGenerator.generateDateWrongMonth();

    await Promise.resolve(pagePage.visit());
    const responseCreateScheduledPage = await Promise.resolve(
      pagePage.createPageScheduled(titlePage, descriptionPage, publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la page no se haya podido crear y el mensaje de error
    if (
      !responseCreateScheduledPage.status &&
      responseCreateScheduledPage.message.includes("Invalid date")
    ) {
      console.log("E46-Test Passed ");
    } else {
      console.log("E46-Test Failed ");
    }
  } catch (e) {
    console.log("E46-Test Failed ");
  }
};

/**
 * Escenario 47: Como usuario administrador edito un page creado previamente de mis borradores Título y descripcion correctos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del page
 * And:Se ingresa una nueva cadena de texto en el contenido de la page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario47 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario47/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del page
     * And:Se ingresa una nueva cadena de texto en el contenido de la page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newTitlePage = faker.lorem.sentence(2);
    const newDescriptionPage = faker.lorem.sentence(2);
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.editDraft(titlePage, newTitlePage, newDescriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (responseEditPage.status) {
      console.log("E47-Test Passed ");
    } else {
      console.log("E47-Test Failed ");
    }
  } catch (e) {
    console.log("E47-Test Failed ");
  }
};

/**
 * Escenario 48: Como usuario administrador edito un page creado previamente de mis borradores sin título y con descripcion
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Elimino el título de la page
 * And:Se ingresa una nueva cadena de texto el contenido de la page
 * And: Se da click en pages
 * Then:Se valida que el borrador se haya guardado
 */
const runScenario48 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario48/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newTitlePage = valueGenerator.getEmptyString();
    const newDescriptionPage = faker.lorem.sentence(2);
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.editDraft(titlePage, newTitlePage, newDescriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();

    // Then:Se valida que el borrador se haya guardado
    if (responseEditPage.status) {
      console.log("E48-Test Passed ");
    } else {
      console.log("E48-Test Failed ");
    }
  } catch (e) {
    console.log("E48-Test Failed ");
  }
};

/**
 * Escenario 49: Como usuario administrador edito una page creada previamente de mis borradores con campos vacíos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Elimino el título de la page
 * And:Elimino el contenido de la page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario49 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario49/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newTitlePage = valueGenerator.getEmptyString();
    const newDescriptionPage = valueGenerator.getEmptyString();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.editDraft(titlePage, newTitlePage, newDescriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (responseEditPage.status) {
      console.log("E49-Test Passed ");
    } else {
      console.log("E49-Test Failed ");
    }
  } catch (e) {
    console.log("E49-Test Failed ");
  }
};

/**
 * Escenario 50: Como usuario administrador edito una page creada previamente de mis borradores con campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario50 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario50/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título del page
     * And: Se da click en pages*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.generateString();
    const titlePage =valueGenerator.generateString();
    const newTitlePage = valueGenerator.generateLongString();
    const newDescriptionPage =  valueGenerator.generateLongString();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.editDraft(titlePage, newTitlePage, newDescriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (!responseEditPage.status) {
      console.log("E50-Test Passed ");
    } else {
      console.log("E50-Test Failed ");
    }
  } catch (e) {
    console.log("E50-Test Failed ");
  }
};

/**
 * Escenario 51: Como usuario administrador edito una page creada previamente de mis borradores con campos con caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título de la page
 * And:Se ingresa una nueva cadena de texto en el contenido de la page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario51 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario51/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa una nueva cadena de texto al título de la page
     * And:Se ingresa una nueva cadena de texto en el contenido de la page
     * And: Se da click en pages
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newTitlePage = valueGenerator.generateSpecialCharacters();
    const newDescriptionPage = valueGenerator.generateSpecialCharacters();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.editDraft(titlePage, newTitlePage, newDescriptionPage)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (responseEditPage.status) {
      console.log("E51-Test Passed ");
    } else {
      console.log("E51-Test Failed ");
    }
  } catch (e) {
    console.log("E51-Test Failed ");
  }
};

/**
 * Escenario 52: Como administrador le cambio la url a una page Campo vacio
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario52 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario52/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de una page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newUrl = valueGenerator.getEmptyString();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (!responseEditPage.status) {
      console.log("E52-Test Passed ");
    } else {
      console.log("E52-Test Failed ");
    }
  } catch (e) {
    console.log("E52-Test Failed ");
  }
};

/**
 * Escenario 53: Como administrador le cambio la url a un page Caracteres especiales
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario53 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario53/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newUrl = valueGenerator.generateSpecialCharacters();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url sea la que se ingresó como nueva
    if (!responseEditPage.status) {
      console.log("E53-Test Passed ");
    } else {
      console.log("E53-Test Failed ");
    }
  } catch (e) {
    console.log("E53-Test Failed ");
  }
};

/**
 * Escenario 54: Como administrador le cambio la url a una page Campos muy largos (15000 caracteres)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona la page que ha sido creado
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario54 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario54/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newUrl = valueGenerator.generateLongString();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url sea la que se ingresó como nueva
    if (!responseEditPage.status) {
      console.log("E54-Test Passed ");
    } else {
      console.log("E54-Test Failed ");
    }
  } catch (e) {
    console.log("E54-Test Failed ");
  }
};

/**
 * Escenario 55: Como administrador le cambio la url a un page Campo correcto
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * Then:Se valida que la url sea la que se ingresó como nueva
 */
const runScenario55 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario55/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de una page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.generateString();
    const titlePage = valueGenerator.generateString();
    const newUrl = faker.lorem.word();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
    if (responseEditPage.status) {
      console.log("E55-Test Passed ");
    } else {
      console.log("E55-Test Failed ");
    }
  } catch (e) {
    console.log("E55-Test Failed ");
  }
};

/**
 * Escenario 56: Como administrador le asigno a dos pages la misma url
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * And: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 * Then:Se valida que en el segundo page no se cambia exitosamente por la url ingresada y el primero si
 */
const runScenario56 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario28/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de una page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo
     * And: Se realiza la creación de una page
     * And:Se selecciona la page que ha sido creada
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle de la page
     * And: Se da click en settings de nuevo*/
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.generateString();
    const titlePage = valueGenerator.generateString();
    const newUrl = valueGenerator.generateWord();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    const descriptionPage2 = valueGenerator.generateString();
    const titlePage2 = valueGenerator.generateString();
    await Promise.resolve(pagePage.createDraft(titlePage2, descriptionPage2));
    const responseEditPage2 = await Promise.resolve(
      pagePage.changeURL(titlePage2, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que en el segundo page no se cambia exitosamente por la url ingresada y el primero si
    if (!responseEditPage2.status && responseEditPage.status) {
      console.log("E56-Test Passed ");
    } else {
      console.log("E56-Test Failed ");
    }
  } catch (e) {
    console.log("E56-Test Failed ");
  }
};

/**
 * Escenario 57: Como administrador le cambio la url a un page por Ghost (Palabra protegida)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa a settings
 * And: Se borra la url por defecto
 * And: Se ingresa una nueva url
 * And: Se devuelve al detalle de la page
 * And: Se da click en settings de nuevo
 *Then:Se valida que la url no sea Ghost es decir no se haya hecho la edición correctamente
 */
const runScenario57 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario29/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa a settings
     * And: Se borra la url por defecto
     * And: Se ingresa una nueva url
     * And: Se devuelve al detalle del page
     * And: Se da click en settings de nuevo
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = faker.lorem.sentence(2);
    const titlePage = faker.lorem.sentence(2);
    const newUrl = valueGenerator.getRestrictedWord();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.changeURL(titlePage, newUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea Ghost es decir no se haya hecho la edición correctamente
    if (!responseEditPage.status) {
      console.log("E57-Test Passed ");
    } else {
      console.log("E57-Test Failed ");
    }
  } catch (e) {
    console.log("E57-Test Failed ");
  }
};

/**
 * Escenario 58: Como administrador le cambio la fecha a una page ya publicado Con fecha futura
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se crea un page y se pública
 * And: Se elige la page creada
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que no permite actualizar y muestra un mensaje de error
 */
const runScenario58 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario58/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generateFutureDate();

    await Promise.resolve(pagePage.visit());
    await Promise.resolve(pagePage.createPage(titlePage, descriptionPage));
    const responseCreatePage = await Promise.resolve(
      pagePage.editDate(titlePage, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que no permite actualizar y muestra un mensaje de error
    if (!responseCreatePage.status) {
      console.log("E58-Test Passed ");
    } else {
      console.log("E58-Test Failed ");
    }
  } catch (e) {
    console.log("E58-Test Failed ");
  }
};

/**
 * Escenario 59: Como administrador le cambio la fecha a una page ya publicado Con fecha pasada
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se crea un page y se pública
 * And: Se elige el page creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario59 = async () => {
  try {
    //Create directory to save screenshots
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generatePastDate();

    await Promise.resolve(pagePage.visit());
    await Promise.resolve(pagePage.createPage(titlePage, descriptionPage));
    const responseCreatePage = await Promise.resolve(
      pagePage.editDate(titlePage, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha se haya podido cambiar
    if (responseCreatePage.status) {
      console.log("E59-Test Passed ");
    } else {
      console.log("E59-Test Failed ");
    }
  } catch (e) {
    console.log("E59-Test Failed ");
  }
};

/**
 * Escenario 60: Como administrador le cambio la fecha a una page ya publicado con formato incorrecto
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se crea un page y se pública
 * And: Se elige el page creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario60 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario60/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = valueGenerator.generateString();
    const descriptionPage = valueGenerator.generateString();
    const newPublishDate = valueGenerator.generateStringDate();

    await Promise.resolve(pagePage.visit());
    await Promise.resolve(pagePage.createPage(titlePage, descriptionPage));
    const responseCreatePage = await Promise.resolve(
      pagePage.editDate(titlePage, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha no se haya podido cambiar
    if (!responseCreatePage.status) {
      console.log("E60-Test Passed ");
    } else {
      console.log("E60-Test Failed ");
    }
  } catch (e) {
    console.log("E60-Test Failed ");
  }
};

/**
 * Escenario 61: Como administrador le cambio la fecha a un page ya publicada con fecha incorrecta (ej. mes>12)
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Pages
 * And: Se crea un page y se pública
 * And: Se elige el page creado
 * And: Se hace click en settings
 * And: Se cambia la fecha de publicación
 * And: Se da click en actualizar
 * Then:Se valida que la fecha se haya podido cambiar
 */
const runScenario61 = async () => {
  try {
    //Create directory to save screenshots
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario61/`;
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
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePage = faker.lorem.sentence(2);
    const descriptionPage = faker.lorem.sentence(2);
    const newPublishDate = valueGenerator.generateDateWrongMonth();

    await Promise.resolve(pagePage.visit());
    await Promise.resolve(pagePage.createPage(titlePage, descriptionPage));
    const responseCreatePage = await Promise.resolve(
      pagePage.editDate(titlePage, newPublishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que la fecha no se haya podido cambiar
    if (!responseCreatePage.status) {
      console.log("E61-Test Passed ");
    } else {
      console.log("E61-Test Failed ");
    }
  } catch (e) {
    console.log("E61-Test Failed ");
  }
};

/**
 * Escenario 62: Como administrador le agrego una url de youtube a una page aleatorio iniciando por 'www.youtube.com/'
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario62 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario62/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);
    /* Given: Se ingresa a la página correspondiente a login
     * When: Se realiza la creación de una page
     * And:Se selecciona la page que ha sido creado
     * And:Se ingresa adiciona campo de url youtube
     * And: Se escribe la url ingresada por parámetro
     * */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.getEmptyString();
    const titlePage = valueGenerator.generateString();
    const youtubeUrl = valueGenerator.generateYoutubeUrlInvalid();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.addYoutubeUrl(titlePage, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea aceptada
    if (!responseEditPage.status) {
      console.log("E62-Test Passed ");
    } else {
      console.log("E62-Test Failed ");
    }
  } catch (e) {
    console.log("E62-Test Failed ");
  }
};
/**
 * Escenario 63: Como administrador le agrego una url de youtube a una page aleatorio iniciando
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario63 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario31/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    const afterlogin = await loginPage.login(userEmail, userPassword);

    /* Given: Se ingresa a la página correspondiente a login
     * When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa adiciona campo de url youtube
     * And: Se escribe la url ingresada por parámetro
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.getEmptyString();
    const titlePage = valueGenerator.generateString();
    const youtubeUrl = valueGenerator.generateWord();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.addYoutubeUrl(titlePage, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url no sea aceptada
    if (!responseEditPage.status) {
      console.log("E63-Test Passed ");
    } else {
      console.log("E63-Test Failed ");
    }
  } catch (e) {
    console.log("E63-Test Failed ");
  }
};
/**
 * Escenario 64: Como administrador le agrego una url de youtube a un page url real
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un page
 * And:Se selecciona el page que ha sido creado
 * And:Se ingresa adiciona campo de url youtube
 * And: Se escribe la url ingresada por parámetro
 *Then:Se valida que la url no sea aceptada
 */
const runScenario64 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario64/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Given: Se ingresa a la página correspondiente a login

    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );

    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* Given: Se ingresa a la página correspondiente a login
     * When: Se realiza la creación de un page
     * And:Se selecciona el page que ha sido creado
     * And:Se ingresa adiciona campo de url youtube
     * And: Se escribe la url ingresada por parámetro
     */
    const pagePage = new PagesPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(pagePage.visit());
    const descriptionPage = valueGenerator.getEmptyString();
    const titlePage = faker.lorem.sentence(2);
    const youtubeUrl = valueGenerator.getURLYoutube();
    await Promise.resolve(pagePage.createDraft(titlePage, descriptionPage));
    const responseEditPage = await Promise.resolve(
      pagePage.addYoutubeUrl(titlePage, youtubeUrl)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que la url sea aceptada
    if (responseEditPage.status) {
      console.log("E64-Test Passed ");
    } else {
      console.log("E64-Test Failed ");
    }
  } catch (e) {
    console.log("E64-Test Failed ");
  }
};

runScenarios();
