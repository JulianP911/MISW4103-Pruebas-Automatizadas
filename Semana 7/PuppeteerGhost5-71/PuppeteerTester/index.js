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
 await runScenario3();*/
   await runScenario4();
   /*await runScenario5();
  await runScenario6();*/
  /*await runScenario7();
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
  await runScenario23();*/
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
      postPage.createPost(titlePost,descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post este creado
    if(responseCreatePost.status){
    console.log("E1-Test Passed ");
  }
  else{
    console.log( "E1-Test Failed ");
  }
    
  } catch (e) {
    console.log( "E1-Test Failed ");
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
    const titlePost = "";
    const descriptionPost = faker.lorem.sentence(2);

    const responseCreatePost = await Promise.resolve(
      postPage.createPost(titlePost,descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post este creado
    if(responseCreatePost.status){
    console.log("E2-Test Passed ");
  }
  else{
    console.log( "E2-Test Failed ");
  }
    
  } catch (e) {
    console.log( "E2-Test Failed ");
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
      postPage.createPost(titlePost,descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post no se haya podido crear
    if(!responseCreatePost.status){
    console.log("E3-Test Passed ");
  }
  else{
    console.log( "E3-Test Failed ");
  }
    
  } catch (e) {
    console.log( "E3-Test Failed ");
  }
};
/**
 * Escenario 4: Como usuario administrador creo un nuevo post para publicarlo en el sitio web Sin titulo y con descripción 
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
      postPage.createPost(titlePost,descriptionPost)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then:Se valida que el post este creado
    if(!responseCreatePost.status){
    console.log("E4-Test Passed ");
  }
  else{
    console.log( "E4-Test Failed ");
  }
    
  } catch (e) {
    console.log( "E4-Test Failed ");
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
    const descriptionPost = faker.lorem.sentence(2);
    const responseCreateDraftPost=await Promise.resolve(postPage.createDraft(titlePost,descriptionPost));

    // Close the browser after completing the tests
    await browser.close();
    if(responseCreateDraftPost.status){
      console.log("E5-Test Passed ");
    }
    else{
      console.log( "E5-Test Failed ");
    }
      
    } catch (e) {
      console.log( "E5-Test Failed ");
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
    const titlePost = faker.lorem.sentence(2);
    const descriptionPost = faker.lorem.sentence(2);
    await Promise.resolve(postPage.visit());
    const responseCreateScheduledPost = await Promise.resolve(
      postPage.createPostScheduled(titlePost,descriptionPost)
    );
    // Close the browser after completing the tests
    await browser.close();
    if(responseCreateScheduledPost.status){
      console.log("E6-Test Passed ");
    }
    else{
      console.log( "E6-Test Failed ");
    }
      
    } catch (e) {
      console.log( "E6-Test Failed ");
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
    const responseEditPost=await Promise.resolve(postPage.editDraft(titlePost, newTitlePost));

    // Close the browser after completing the tests
   //Revisa el then
   if(responseEditPost.status){
    console.log("E15-Test Passed ");
  }
  else{
    console.log( "E15-Test Failed ");
  }
    
  } catch (e) {
    console.log( "E15-Test Failed ");
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
