const assert = require("assert");
const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const LoginPage = require("./LoginPage");
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
};
/**
 * Escenario 1: Como usuario administrador creo un nuevo internal tag
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

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = "#" + faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, false));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E1-Test Passed ");
  } catch (e) {
    console.log(e, "E1-Test Failed");
  }
};
/**
 * Escenario 2:  Como usuario administrador creo un nuevo borrador de page para el sitio web
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

    console.log("E2-Test Passed ");
  } catch (e) {
    console.log(e, "E2-Test Failed");
  }
};

/**
 * Escenario 3: Como usuario administrador creo una page con publicación programada
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

    console.log("E3-Test Passed ");
  } catch (e) {
    console.log(e, "E3-Test Failed");
  }
};
/**
 * Escenario 4: Como usuario administrador edito un tag creado previamente (caso positivo)
 * Given: Se ingresa a la página correspondiente a login
 * When: Se da clic en el botón de Tags
 * And: Se selecciona el tag que ha sido creado previamente
 * And:Se ingresa una nueva cadena de texto al nombre del tag
 * And: Se da click en Save
 * And: Se da click en Tags
 * Then:Se valida que el tag que ha sido creado previamente se le ha modificado el titulo
 */
const runScenario4 = async () => {
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

    await loginPage.login(userEmail, userPassword);
    const tagsPage = new TagsPage(page, ghostUrl, screenshotDirectoryEscenario);

    const newTagName = faker.lorem.sentence(2);
    const editTagName = faker.lorem.sentence(2);
    await Promise.resolve(tagsPage.visit());
    await Promise.resolve(tagsPage.createTag(newTagName, true));
    await Promise.resolve(tagsPage.editTag(editTagName));

    // Close the browser after completing the tests
    await browser.close();
    console.log("E4-Test Passed ");
  } catch (e) {
    console.log(e, "E4-Test Failed");
  }
};
/**
 * Escenario 5: Como usuario administrador edito un member creado previamente
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un member
 * And: Se da clic en el botón de Members
 * And:Se selecciona un member creado
 * And:Se ingresa una nueva cadena de texto al campo del correo del member
 * And: Se da clic en el botón save
 * And: Se da clic en el botón de Members
 * Then:Se verifica que el cambio en el campo de correo realizado al member
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

    await loginPage.login(userEmail, userPassword);
    const membersPage = new MembersPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    const nameMember = faker.person.firstName();
    await Promise.resolve(membersPage.visit());
    await Promise.resolve(membersPage.createMember(nameMember));
    await Promise.resolve(membersPage.editMember());

    // Close the browser after completing the tests
    await browser.close();

    console.log("E5-Test Passed ");
  } catch (e) {
    console.log(e, "E5-Test Failed");
  }
};

/**
 * Escenario 6: Como usuario administrador edito un page creado previamente de mis borradores
 *
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de una page
 * And:Se selecciona la page que ha sido creada
 * And:Se ingresa una nueva cadena de texto al título de la page
 * And: Se da click en pages
 * Then:Se valida que aparezaca en el listado de pages el borrador con el nuevo titulo dado
 */
const runScenario6 = async () => {
  try {
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

    console.log("E6-Test Passed");
  } catch (e) {
    console.log(e, "E6-Test Failed");
  }
};

/**
 * Escenario 7: Como usuario administrador le asigno un tag a un post ya publicado
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
    console.log("E7-Test Passed ");
  } catch (e) {
    console.log(e, "E7-Test Failed");
  }
};
/**
 * Escenario 8: Como usuario administrador elimino una page
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación y publicación de una page
 * And:Se da click en el botón de Pages
 * And: Se selecciona la page que ha sido creado
 * And: se da click en el botón de settings
 * And: Se da click en el botón eliminar page
 * And: Se da clic en el botón de Eliminar
 * Then:Se verifica que en la lista de pages ya no se encuentra la page eliminada
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
    console.log("E8-Test Passed ");
  } catch (e) {
    console.log(e, "E8-Test Failed");
  }
  
};/**
* Escenario 9: Como usuario administrador elimino un tag
* Given: Se ingresa a la página correspondiente a login
* When: Se realiza la creación de un tag
* And:Se da click en el botón de Tags
* And: Se selecciona el tag que ha sido creado
* And: Se da click en el botón eliminar tag
* And: Se da clic en el botón de Eliminar 
* Then:Se verifica que en la lista de tags ya no se encuentra el tag eliminado
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

   console.log("E9-Test Passed ");
 } catch (e) {
   console.log(e, "E9-Test Failed");
 }
};

/**
 * Escenario 10: Como usuario administrador elimino un member
 * Given: Se ingresa a la página correspondiente a login
 * When: Se realiza la creación de un member
 * And:Se da click en el botón de Members
 * And: Se selecciona el member que ha sido creado
 * And: se da click en el botón de settings
 * And: Se da click en el botón eliminar member
 * And: Se da clic en el botón de Eliminar 
 * Then:Se verifica que en la lista de member ya no se encuentra el member eliminado
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
    );
    await Promise.resolve(membersPage.visit());
    const nameMember = faker.person.firstName();
    await Promise.resolve(membersPage.createMember(nameMember));
    await Promise.resolve(membersPage.deleteMember(nameMember));
    // Close the browser after completing the tests
    await browser.close();

    console.log("E10-Test Passed ");
  } catch (e) {
    console.log(e, "E10-Test Failed");
  }
};
runScenarios();
