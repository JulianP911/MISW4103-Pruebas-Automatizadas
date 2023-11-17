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
        await this.page.screenshot({
          path: this.screenshotDirectoryEscenario + "visitPage.png",
        });
        await this.page.waitForSelector(
          `div[role='button'].gh-mobile-nav-bar-more`
        );
        await Promise.resolve(
          this.page.click(`div[role='button'].gh-mobile-nav-bar-more`)
        );
        await this.page.waitForTimeout(timeoutConfig);
        await this.page.screenshot({
          path: this.screenshotDirectoryEscenario + "moreNavBar.png",
        });
        await this.page.evaluate(() => {
          document.querySelectorAll('a[href="#/pages/"]')[0].click();
        });
      } catch (error) {
          throw error;
        
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
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/editor/page/"]')[0].click();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPage.png",
      });
      await this.page.waitForSelector("textarea.gh-editor-title.ember-text-area.gh-input.ember-view");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillTitle.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completePage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector("div.gh-publishmenu.ember-view", {
        timeout: timeoutConfig,
      });
      await Promise.resolve(this.page.click("div.gh-publishmenu.ember-view"));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishClick.png",
      });
      await this.page.waitForSelector(
        "button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view",
        {
          timeout: timeoutConfig,
        }
      );
      await Promise.resolve(
        this.page.click(
          "button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view"
        )
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "continuePublish.png",
      });
      const element = await this.page.$x(
        '//div[contains(text(), "published")]'
      );
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "confirmNewPage.png",
      });
      if (element) {
        console.log("Create page successfully");
      } else {
        throw "Create page failed";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPagesPage.png",
      });
      await this.page.waitForSelector(".gh-editor-back-button", {
        timeout: timeoutConfig,
      });
      await Promise.resolve(this.page.click(".gh-editor-back-button"));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backPageForm.png",
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backPages.png",
      });
      return this.page;
    } catch (error) {
      console.error("Create page faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createDraft(titlePage) {
    try {
      // Wait for an element that contains a span with the text "New Page"
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/editor/page/"]')[0].click();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPageDraft.png",
      });
      await this.page.waitForSelector("textarea.gh-editor-title.ember-text-area.gh-input.ember-view");
      await this.page.keyboard.type(titlePage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titleDraft.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completeDraftForm.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector(".gh-editor-back-button", {
        timeout: timeoutConfig,
      });
      await Promise.resolve(this.page.click(".gh-editor-back-button"));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: timeoutConfig,
      });
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
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/editor/page/"]')[0].click();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPageScheduled.png",
      });
      await this.page.waitForSelector("textarea.gh-editor-title.ember-text-area.gh-input.ember-view");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titleScheduled.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completeScehduledForm.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector(".ember-basic-dropdown-trigger", {
        timeout: timeoutConfig,
      });
      await Promise.resolve(this.page.click(".ember-basic-dropdown-trigger"));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishScheduled.png",
      });
      await this.page.evaluate(() => {
        document.querySelectorAll(".gh-publishmenu-radio-label")[1].click();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingScheduled.png",
      });

      await Promise.resolve(
        this.page.click(
          "button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view"
        )
      );
      await this.page.waitForTimeout(timeoutConfig);
    
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "scheduleNewPage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "confirmNewSceduled.png",
      });
      const element = await this.page.$x(
        '//div[contains(text(), "Scheduled")]'
      );
      if (element) {
        console.log("Page creado exitosamente");
      } else {
        throw "No se encontro componente de creacion exitosa";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPageScheduled.png",
      });
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/pages/"]')[0].click();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backScheduled.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backlistScheduled.png",
      });
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
      await this.page.waitForSelector("textarea.gh-editor-title.ember-text-area.gh-input.ember-view");
      await this.page.evaluate(() => {
        const element = document.querySelector(
          "textarea.gh-editor-title.ember-text-area.gh-input.ember-view"
        );
        element.value = "";
        element.focus();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "emptyTitle.png",
      });
      await this.page.keyboard.type(newTitlePage);
      await this.page.keyboard.press("Tab");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editedPage.png",
      });
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/pages/"]')[0].click();
      });
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
