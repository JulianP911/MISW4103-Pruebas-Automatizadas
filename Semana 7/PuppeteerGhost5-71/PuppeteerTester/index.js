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
  /*await runScenario1();
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
  await runScenario20();
  await runScenario21();*/

  await runScenario22();

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
    const titlePost = "";
    const descriptionPost = faker.lorem.sentence(2);

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
 * Escenario 3: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Sin titulo y con descripción
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Posts
 * And: Se da clic en el botón de New Post
 * And:Se ingresa un texto al contenido del post
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
     * And:Se ingresa un texto al contenido del post
     * And: Se da click en el publish
     * */
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = "";
    const descriptionPost = "";

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
    const titlePost = faker.lorem.sentences(50);
    const descriptionPost = faker.lorem.sentences(50);

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
    const titlePost = "!@#$%^&*()_-+=[]{};:,.<>?/|~";
    const descriptionPost = "!@#$%^&*()_-+=[]{};:,.<>?/|~";

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
    console.log(e.message);
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
    const afterlogin = await loginPage.login(userEmail, userPassword);

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
    const afterlogin = await loginPage.login(userEmail, userPassword);

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
    const titlePost = "";
    const descriptionPost = faker.lorem.sentence(2);

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
    const afterlogin = await loginPage.login(userEmail, userPassword);

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
    const titlePost = "";
    const descriptionPost = "";

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
    const afterlogin = await loginPage.login(userEmail, userPassword);

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
    const titlePost = faker.lorem.sentences(50);
    const descriptionPost = faker.lorem.sentences(50);

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
     * And: Se da click en posts*/
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());
    //Generación de datos
    const titlePost = "!@#$%^&*()_-+=[]{};:,.<>?/|~";
    const descriptionPost = "!@#$%^&*()_-+=[]{};:,.<>?/|~";

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

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);
    const publishDate = faker.date.future().toISOString().split('T')[0];
  
    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost,publishDate)
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
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);
    const publishDate = faker.date.past().toISOString().split('T')[0];
  
    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost,publishDate)
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

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);
    const publishDate = faker.date.past().toDateString();
  
    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost,publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que el post no se haya podido crear y el mensaje de error

    if (!responseCreateScheduledPost.status && responseCreateScheduledPost.message.includes('Invalid date format')) {
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

    const afterlogin = await loginPage.login(userEmail, userPassword);
    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);
    const publishDate = "2023-45-45"
  
    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost, descriptionPost,publishDate)
    );
    // Close the browser after completing the tests
    await browser.close();
    // Then:Se valida que el post no se haya podido crear y el mensaje de error
    if (!responseCreateScheduledPost.status&& responseCreateScheduledPost.message.includes('Invalid date')) {
      console.log("E14-Test Passed ");
    } else {
      console.log("E14-Test Failed ");
    }
  } catch (e) {
    console.log("E14-Test Failed ");
  }
};

/**
 * Escenario 20: Como usuario administrador edito un post creado previamente de mis borradores Título y descripcion correctos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
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
    const newTitlePost = faker.lorem.sentence(2);
    const newDescriptionPost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost,descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost,newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
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
 * Escenario 21: Como usuario administrador edito un post creado previamente de mis borradores Sin Título y con descripcion 
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
 * And: Se da click en posts
 * Then:Se valida que el borrador se haya guardado
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
    const descriptionPost = faker.lorem.sentence(2);
    const titlePost = faker.lorem.sentence(2);
    const newTitlePost = "";
    const newDescriptionPost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.createDraft(titlePost,descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost,newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    // Then:Se valida que el borrador se haya guardado
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
 * Escenario 22: Como usuario administrador edito un post creado previamente de mis borradores Campos vacíos
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un post
 * And:Se selecciona el post que ha sido creado
 * And:Se ingresa una nueva cadena de texto al título del post
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
    const newTitlePost = "";
    const newDescriptionPost = "";
    await Promise.resolve(postPage.createDraft(titlePost,descriptionPost));
    const responseEditPost = await Promise.resolve(
      postPage.editDraft(titlePost, newTitlePost,newDescriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();

    //Then:Se valida que aparezaca en el listado de posts el borrador con el nuevo titulo dado
    if (responseEditPost.status) {
      console.log("E22-Test Passed ");
    } else {
      console.log("E22-Test Failed ");
    }
  } catch (e) {
    console.log("E22-Test Failed ");
  }
};


















//-----------------------VIEJOS-------------------
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
const runScenario120 = async () => {
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
const runScenario130 = async () => {
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
const runScenario141 = async () => {
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

runScenarios();
