const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const LoginPage = require("./loginPage");
const PostsPage = require("./postsPage");
const PagesPage = require("./pagesPage");
let config = require("./config.json");
const ValueGenerator = require("./valueGenerator");
const SettingsPage = require("./settingsPage");
const ghostUrl = config.ghostUrl;
const userEmail = config.userEmail;
const userPassword = config.userPassword;
const valueGenerator = new ValueGenerator();
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
};

/**
 * Escenario 1: Como usuario administrador actualizo el facebook asociado a ghost
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en editar social accounts
 * And Se escribe la url de la cuenta que se desea asociar en el campo de facebook
 * And Se da click en save
 * Then Se verifica que la url de la cuenta sea la que se escribio
 */
const runScenario1 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario1/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en editar social accounts
     * And Se escribe la url de la cuenta que se desea asociar
     * And Se da click en save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseUpdateFacebookURL = await Promise.resolve(settingsPage.updateFacebookURL(valueGenerator.generateWord()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que la url de la cuenta de Facebook sea la que se escribio
    if (responseUpdateFacebookURL.status) {
      console.log("E1-Test Passed ");
    } else {
      console.log("E1-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E1-Test Failed ");
  }
};

/**
 * Escenario 2: Como usuario administrador actualizo el X asociado a ghost
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en editar social accounts
 * And Se escribe la url de la cuenta que se desea asociar en el campo de X
 * And Se da click en save
 * Then Se verifica que la url de la cuenta sea la que se escribio
 */
const runScenario2 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario2/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en editar social accounts
     * And Se escribe la url de la cuenta que se desea asociar
     * And Se da click en save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseUpdateXURL = await Promise.resolve(settingsPage.updateXURL(valueGenerator.generateWord()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que la url de la cuenta de X sea la que se escribio
    if (responseUpdateXURL.status) {
      console.log("E2-Test Passed ");
    } else {
      console.log("E2-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E2-Test Failed ");
  }
};

/**
 * Escenario 3: Como usuario administrador actualizo X card
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en editar X card
 * And Se escribe el titulo y descripcion deseados
 * And Se da click en save
 * Then Se verifica que la X card tenga las informacion suministrada
 */
const runScenario3 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario3/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en editar X card
     * And Se escribe el titulo y descripcion deseados
     * And Se da click en save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseUpdateXCard = await Promise.resolve(settingsPage.updateXCard(valueGenerator.generateWord(),valueGenerator.generateWord()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que la X card tenga las informacion suministrada
    if (responseUpdateXCard.status) {
      console.log("E3-Test Passed ");
    } else {
      console.log("E3-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E3-Test Failed ");
  }
};

/**
 * Escenario 4: Como usuario administrador actualizo Facebook card
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en editar Facebook card
 * And Se escribe el titulo y descripcion deseados
 * And Se da click en save
 * Then Se verifica que la Facebook card tenga las informacion suministrada
 */
const runScenario4 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario4/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en editar Facebook card
     * And Se escribe el titulo y descripcion deseados
     * And Se da click en save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseUpdateFacebookCard = await Promise.resolve(settingsPage.updateFacebookCard(valueGenerator.generateWord(),valueGenerator.generateWord()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que la Facebook card tenga las informacion suministrada
    if (responseUpdateFacebookCard.status) {
      console.log("E4-Test Passed ");
    } else {
      console.log("E4-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E4-Test Failed ");
  }
};

/**
 * Escenario 5: Como usuario administrador actualizo el Site Timezone
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en editar Site timezone
 * And Se selecciona la timezone deseada
 * And Se da click en save
 * Then Se verifica que la timezone sea la suministrada
 */
const runScenario5 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario5/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en editar Site timezone
     * And Se selecciona la timezone deseada
     * And Se da click en save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseUpdateTimezone = await Promise.resolve(settingsPage.updateTimeZone(valueGenerator.generateWord()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que la timezone sea la suministrada
    if (responseUpdateTimezone.status) {
      console.log("E5-Test Passed ");
    } else {
      console.log("E5-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E5-Test Failed ");
  }
};

/**
 * Escenario 6: Como usuario administrador agrego una recomendación
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en add recommendation
 * And Se digital la url de la recomendación
 * And Se da click en next
 * And Se da click en add
 * Then Se verifica que recomendación agregada este en el listado
 */
const runScenario6 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario6/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();
    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en add recommendation
     * And Se digital la url de la recomendación
     * And Se da click en next
     * And Se da click en add */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const responseAddRecommendation = await Promise.resolve(settingsPage.addRecommendation(valueGenerator.getURLYoutube()));

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que recomendación agregada este en el listado
    if (responseAddRecommendation.status) {
      console.log("E6-Test Passed ");
    } else {
      console.log("E6-Test Failed ");
    }
  } catch (e) {
    console.log(e);
    console.log("E6-Test Failed ");
  }
};

/**
 * Escenario 7: Como usuario administrador creo un Newsletter para el site en Ghost
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en Newsletter
 * And Se da click en add Newsletter
 * And Se ingresa un titulo y descripción válidos
 * And Se da click en crear
 * Then Se verifica que se encuentre el Newsletter creado en la lista
 */
const runScenario7 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario7/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se da click en Newsletter
     * And Se da click en add Newsletter
     * And Se ingresa un titulo y descripción válidos
     * And Se da click en crear */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const nameNewsletter = valueGenerator.generateString();
    const responseCreateNewsletter = await Promise.resolve(
      settingsPage.createNewsletter(nameNewsletter)
    );

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que se encuentre el Newsletter creado en la lista
    if (responseCreateNewsletter.status) {
      console.log("E7-Test Passed ");
    } else {
      console.log("E7-Test Failed ");
    }
  } catch (e) {
    console.log(e);

    console.log("E7-Test Failed ");
  }
};

/**
 * Escenario 8: Como usuario administrador edito un Newsletter para el site en Ghost
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se crea un Newsletter
 * And Se da click en el Newsletter creado
 * And Se ingresa una descripción válida
 * And Se da click en Save
 * Then Se verifica que se encuentre el Newsletter editado en la lista
 */
const runScenario8 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario8/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /* When Se ingresa a settings
     * And Se crea un Newsletter
     * And Se da click en el Newsletter creado
     * And Se ingresa una descripción válida
     * And Se da click en Save */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const nameNewsletter = valueGenerator.generateWord();
    const newDescriptionNewsletter = valueGenerator.generateWord();
    await Promise.resolve(settingsPage.createNewsletter(nameNewsletter));

    const responseEditNewsletter = await Promise.resolve(
      settingsPage.editNewsletter(nameNewsletter, newDescriptionNewsletter)
    );

    // Close the browser after completing the tests
    await browser.close();
    // Then Se verifica que se encuentre el Newsletter editado en la lista
    if (responseEditNewsletter.status) {
      console.log("E8-Test Passed ");
    } else {
      console.log("E8-Test Failed ");
    }
  } catch (e) {
    console.log(e);

    console.log("E8-Test Failed ");
  }
};

/**
 * Escenario 9: Como usuario administrador agrego una integracion
 *
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en Add custom integration
 * And Se ingresa un nombre válido
 * And Se da click en Add
 * And Se da click en save and close
 * Then Se verifica que se encuentre la integracion creada en la lista
 */
const runScenario9 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario9/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login
    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    /*  When Se ingresa a settings
     * And Se da click en Add custom integration
     * And Se ingresa un nombre válido
     * And Se da click en Add
     * And Se da click en save and close */
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const integrationName = valueGenerator.generateWord();
    // await Promise.resolve(settingsPage.createNewsletter(nameNewsletter));

    const responseAddIntegration = await Promise.resolve(
      settingsPage.addIntegration(integrationName)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then Se verifica que se encuentre la integracion creada en la lista
    if (responseAddIntegration.status) {
      console.log("E9-Test Passed ");
    } else {
      console.log("E9-Test Failed ");
    }
  } catch (e) {
    console.log(e);

    console.log("E9-Test Failed ");
  }
};
/**
 * Escenario 10: Como usuario administrador reviso la historia
 * Given Se ingresa a la página correspondiente a login y se crea un post
 * When Se ingresa a settings
 * And Se da click en view history
 * Then Se verifica que la primera en la lista sea la creación del post
 */
const runScenario10 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario10/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login y se crea un post
    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    //Generación de datos- dinámico
    const data = await valueGenerator.getTitleDescription();
    const titlePost = data.title;
    const descriptionPost = data.description;

    const postPage = new PostsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(postPage.visit());

    await Promise.resolve(postPage.createPost(titlePost, descriptionPost));
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());

    const responseReviewHistory = await Promise.resolve(
      settingsPage.reviewHistory()
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then Se verifica que la primera en la lista sea la creación del post
    if (responseReviewHistory.status) {
      console.log("E10-Test Passed ");
    } else {
      console.log("E10-Test Failed ");
    }
  } catch (e) {
    console.log(e);

    console.log("E10-Test Failed ");
  }
};

/**
 * Escenario 11: Como usuario administrador administro la navegación
 * Given Se ingresa a la página correspondiente a login
 * When Se ingresa a settings
 * And Se da click en el butón de Custom en la sección de navigation
 * And Se ingresa un label al nuevo link de navegación
 * And Se da click en +
 * Then Se verifica que el label esté en la lista de links creados
 */
const runScenario11 = async () => {
  try {
    const screenshotDirectoryEscenario = `./screenshots/${timestamp}/Escenario11/`;
    ensureDirectoryExists(screenshotDirectoryEscenario);
    const browser = await puppeteer.launch({
      headless: false,
    });
    /*When Se ingresa a settings
    * And Se da click en el butón de Custom en la sección de navigation
    * And Se ingresa un label al nuevo link de navegación
    * And Se da click en +
    * */
    const page = await browser.newPage();
    const loginPage = new LoginPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    //Given Se ingresa a la página correspondiente a login y se crea un post
    await loginPage.visit();

    await loginPage.login(userEmail, userPassword);
    const settingsPage = new SettingsPage(
      page,
      ghostUrl,
      screenshotDirectoryEscenario
    );
    await Promise.resolve(settingsPage.visit());
    const newNav = valueGenerator.generateWord();
    const responseCustomizeNavigation = await Promise.resolve(
      settingsPage.customizeNavigation(newNav)
    );

    // Close the browser after completing the tests
    await browser.close();
    //Then Se verifica que el label esté en la lista de links creados
    if (responseCustomizeNavigation.status) {
      console.log("E11-Test Passed ");
    } else {
      console.log("E11-Test Failed ");
    }
  } catch (e) {
    console.log(e);

    console.log("E11-Test Failed ");
  }
};

runScenarios();
