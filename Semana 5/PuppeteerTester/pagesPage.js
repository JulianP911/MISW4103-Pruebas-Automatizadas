const { faker } = require("@faker-js/faker");
let config = require("./config.json");

const timeoutConfig = config.timeout;

class PagesPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      try {
        await this.page.waitForSelector(
          `div[role='button'].gh-mobile-nav-bar-more`
        );
        await Promise.resolve(
          this.page.click(`div[role='button'].gh-mobile-nav-bar-more`)
        );
        await this.page.waitForTimeout(timeoutConfig);
        await Promise.resolve(this.page.click('a[data-test-nav="pages"]'));
      } catch (error) {
        try {
          await this.page.waitForSelector('a[data-test-nav="pages"]');

          await Promise.resolve(this.page.click('a[data-test-nav="pages"]'));
        } catch (error) {
          throw error;
        }
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "PagesPage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
    } catch (error) {
      console.error("Visit pages Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createPage() {
    try {
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector('a[data-test-new-page-button]');
      await this.page.click('a[data-test-new-page-button]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPage.png",
      });
      await this.page.waitForSelector('textarea[data-test-editor-title-input]');
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completePage.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="publish-flow"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('button[data-test-button="continue"]');
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('button[data-test-button="confirm-publish"]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "confirmNewPage.png",
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );
      if (element) {
        console.log("Create page successfully");
      } else {
        throw "Create page failed";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPagesPage.png",
      });
      this.page.waitForSelector('button[data-test-button="close-publish-flow"]')

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]')

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Create page faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createDraft(titlePage) {
    try {
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector('a[data-test-new-page-button]');
      await this.page.click('a[data-test-new-page-button]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPage.png",
      });
      await this.page.waitForSelector('textarea[data-test-editor-title-input]');
      await this.page.keyboard.type(titlePage);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completePage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]')

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('h3.gh-content-entry-title', { timeout: timeoutConfig })
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listPages.png",
      });
      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let tituloEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(titlePage)) {
          tituloEncontrado = true;
          return;
        }
      }
      if (!tituloEncontrado) {
        throw "no se encontro el titulo del draft en el listado de pages";
      }
      return this.page;
    } catch (error) {
      console.error("Create draft page faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createPageScheduled() {
    try {
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector('a[data-test-new-page-button]');
      await this.page.click('a[data-test-new-page-button]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPage.png",
      });
      await this.page.waitForSelector('textarea[data-test-editor-title-input]');
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completePage.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="publish-flow"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        document.querySelector('button.gh-publish-setting-title').click();
      });
      await this.page.waitForSelector('div[data-test-radio="schedule"]', { timeout: timeoutConfig })
      await this.page.evaluate(() => {
        document.querySelector('div[data-test-radio="schedule"]').click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "scheduleNewPage.png",
      });
      await this.page.waitForSelector('button[data-test-button="continue"]');
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('button[data-test-button="confirm-publish"]');
    
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );
      if (element) {
        console.log("Page creado exitosamente");
      } else {
        throw "No se encontro componente de creacion exitosa";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPagesPage.png",
      });
      this.page.waitForSelector('button[data-test-button="close-publish-flow"]')

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]')

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Create page faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async editDraft(titlePage, newTitlePage) {
    try {
      await this.page.evaluate(async (titlePage) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePage.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editPage.png",
      });
      await this.page.waitForSelector("textarea[data-test-editor-title-input]");
      await this.page.evaluate(() => {
        const element = document.querySelector("textarea[data-test-editor-title-input]");
        element.value ="";
        element.focus();
      });
      await this.page.keyboard.type(newTitlePage);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editedPage.png",
      });
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="pages"]',
        { timeout: timeoutConfig }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: timeoutConfig,
      });

      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let tituloEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(newTitlePage)) {
          tituloEncontrado = true;
          return;
        }
      }
      if (!tituloEncontrado) {
        throw "no se encontro el titulo del draft en el listado de pages";
      }
      
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "finalEditPage.png",
      });
      return this.page;
    } catch (error) {
      console.error("Edit draft Pages failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

}

module.exports = PagesPage;
