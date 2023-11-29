const { faker } = require("@faker-js/faker");
let config = require("./config.json");
const TestResponse = require("./testResponse").default;

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

  async createPage(titlePage, descriptionPage) {
    try {
      let ans=new TestResponse(false,"Page created failes");
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector("a[data-test-new-page-button]");
      await this.page.click("a[data-test-new-page-button]");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPage.png",
      });
      await this.page.waitForSelector("textarea[data-test-editor-title-input]");
      await this.page.keyboard.type(titlePage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillTitle.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(descriptionPage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completePage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishClick.png",
      });
      await this.page.waitForSelector('button[data-test-button="continue"]');
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "continuePublish.png",
      });
      await this.page.waitForSelector(
        'button[data-test-button="confirm-publish"]'
      );
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
        ans=new TestResponse(true,"Page created successfully");
      } else {
        ans=new TestResponse(false,"Page created failed");

      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPagesPage.png",
      });
      this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]'
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backPageForm.png",
      });
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backPages.png",
      });
      return ans;
    } catch (error) {
      console.error("Create page failed:", error.message);
      let ans=new TestResponse(false,"Page created failed");
      return ans; // Rethrow the error to propagate it to the calling code
    }
  }
/**
   * Creates a draft page with the provided title using the Puppeteer page object.
   * This function simulates the process of creating a new draft page, filling in details,
   * and validating its presence in the list of pages.
   * @param {string} titlePage - The title of the draft page to be created.
   * @param {string} descriptionPage - The description of the draft page to be created.
   * @returns {TestResponse} - The result of create a draft.
   * @throws Will throw an error if the draft page creation process fails or if the
   * created draft page is not found in the list of pages.
   */
  async createDraft(titlePage, descriptionPage) {
    try {
      let ans = new TestResponse(false, "Create draft page failed");
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector("a[data-test-new-page-button]");
      await this.page.click("a[data-test-new-page-button]");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPageDraft.png",
      });
      await this.page.waitForSelector("textarea[data-test-editor-title-input]");
      await this.page.keyboard.type(titlePage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titleDraft.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(descriptionPage);
      const saved=await this.page.waitForFunction(
        () => {
          const element = document.querySelector(
            "[data-test-editor-post-status]"
          );
          return element && element.textContent.trim() === "Draft";
        },
        { timeout: timeoutConfig }
      );
      if (saved) {
        ans = new TestResponse(true, "Create Draft Page passed");

        return ans;
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completeDraftForm.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]');

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
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

      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(titlePage)) {
          ans = new TestResponse(true, "Create Draft page passed");
        }
      }

      return ans
    } catch (error) {
      let ans = new TestResponse(false, "Create Draft page failed");
      return ans;
    }
  }

  async createPageScheduled(titlePage, descriptionPage, scheduleDate) {
    try {
      let ans = new TestResponse(false, "Create Scheduled page failed");
      // Wait for an element that contains a span with the text "New Page"
      await this.page.waitForSelector("a[data-test-new-page-button]");
      await this.page.click("a[data-test-new-page-button]");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newPageScheduled.png",
      });
      await this.page.waitForSelector("textarea[data-test-editor-title-input]");
      await this.page.keyboard.type(titlePage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titleScheduled.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(descriptionPage);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "completeScehduledForm.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishScheduled.png",
      });
      await this.page.evaluate(() => {
        document.querySelector("button.gh-publish-setting-title").click();
      });
      await this.page.waitForSelector('div[data-test-radio="schedule"]', {
        timeout: timeoutConfig,
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingScheduled.png",
      });
      await this.page.evaluate(() => {
        document.querySelector('div[data-test-radio="schedule"]').click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate((scheduleDate) => {
        document.querySelector(
          "[data-test-date-time-picker-date-input]"
        ).value = scheduleDate;
        document
          .querySelector("[data-test-date-time-picker-date-input]")
          .focus();
      }, scheduleDate);
      await this.page.keyboard.press("Tab");
      const error = await this.page.evaluate(() => {
        const errorDiv = document.querySelector(
          "div.gh-date-time-picker-error[data-test-date-time-picker-error]"
        );
        return errorDiv ? errorDiv.textContent.trim() : null;
      });
      if (error) {
        ans = new TestResponse(false, error);
        return ans;
      }

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "scheduleNewPage.png",
      });
      await this.page.waitForSelector('button[data-test-button="continue"]');
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector(
        'button[data-test-button="confirm-publish"]'
      );
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "confirmNewSceduled.png",
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );
      if (element) {
        ans = new TestResponse(true, "Page created successfully");
      } else {
        ans = new TestResponse(
          false,
          await this.page.$("[data-test-confirm-error]").value
        );
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPageScheduled.png",
      });
      this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]'
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="pages"]');
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backScheduled.png",
      });
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backlistScheduled.png",
      });
      return ans;
    } catch (error) {
      console.error("Create Scheduled page failed:", error.message);
      return new TestResponse(false, "Create Scheduled page failed");
    }
  }

  async editDraft(titlePage, newTitlePage, newDescriptionPage) {
    try {
      let ans = new TestResponse(false, "Page created failed");
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
        const element = document.querySelector(
          "textarea[data-test-editor-title-input]"
        );
        element.value = "";
        element.focus();
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "emptyTitle.png",
      });
      await this.page.keyboard.type(newTitlePage);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.press("Tab");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.press('End');
      for (let i = 0; i < 50; i++) {
        await this.page.keyboard.press("Backspace"); // Simulate pressing the Backspace key
      }
      await this.page.keyboard.type(newDescriptionPage);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editedPage.png",
      });

      //check for saved tag
      const saved = await this.page.waitForFunction(
        () => {
          const element = document.querySelector(
            "[data-test-editor-post-status]"
          );
          return element && element.textContent.trim().includes("Saved");
        },
        { timeout: timeoutConfig }
      );
      if (saved) {
        ans = new TestResponse(true, "Create Draft page passed");
      } else {
        ans = new TestResponse(false, "Create Draft page failed");
        return ans;
      }

      try {
        // Go back to the list of pages
        await this.page.waitForSelector(
          '.gh-btn-editor[data-test-link="pages"]',
          { timeout: timeoutConfig }
        );
      } catch {
        ans = new TestResponse(false, "Create Draft Page failed");
        return ans;
      }

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: timeoutConfig,
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "finalEditPage.png",
      });
      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let tituloEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(newTitlePage.trim())) {
          tituloEncontrado = true;
          ans = new TestResponse(true, "Edit draft Page success");
        }
      }
      if (!tituloEncontrado) {
        ans = new TestResponse(false,"no se encontro el titulo del draft en el listado de pages");      
      }

    
      return ans;
    } catch (error) {
      let ans = new TestResponse(false,"no se encontro el titulo del draft en el listado de pages");

      return ans; // Rethrow the error to propagate it to the calling code
    }
  }

  /*Delete the page with the title from the parameter*/
  async deletePage(titlePage) {
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
        path: this.screenshotDirectoryEscenario + "selectPageToDelete.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsDeletePage.png",
      });
      await Promise.resolve(
        this.page.click(
          "button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth"
        )
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickDeletePage.png",
      });
      await Promise.resolve(this.page.click("button.gh-btn-red"));
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "deletePagesPage.png",
      });

      const element = await this.page.evaluate((titlePage) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePage.trim()) {
            return false;
          }
        }
        return true;
      }, titlePage);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listPages.png",
      });
      if (element) {
        console.log("Delete Page successfully");
      } else {
        throw "Delete page fail";
      }
      return this.page;
    } catch (error) {
      console.error("Delete Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async changeURL(titlePage, newURL) {
    try {
      let ans = new TestResponse(false, "Change URL page failed");
      //Select the page to chnge the url
      await this.page.evaluate(async (titlePage) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePage.trim()) {
            await element.click();
            break; // Exit the loop once the element is clicked
          }
        }
      }, titlePage);

      await this.page.waitForTimeout(timeoutConfig);

      // Enter Settings
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForSelector(".post-setting-slug");

      // Clear the input field before typing the new URL
      await this.page.evaluate(() => {
        const slugInput = document.querySelector(".post-setting-slug");
        slugInput.value = "";
      });

      await this.page.type(".post-setting-slug", newURL);
      await this.page.keyboard.press("Tab");

      await this.page.waitForTimeout(timeoutConfig);

      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForTimeout(timeoutConfig);

      const saved = await this.page.waitForFunction(
        () => {
          const element = document.querySelector(
            "[data-test-editor-post-status]"
          );
          return element && element.textContent.trim().includes("Draft");
        },
        { timeout: timeoutConfig }
      );

      if (saved) {
        ans = new TestResponse(true, "Change URL page passed");
      } else {
        return new TestResponse(false, "Change URL page failed");
      }
      await this.page.waitForTimeout(timeoutConfig);

      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForSelector(".post-setting-slug");
      const updatedUrl = await this.page.evaluate(() => {
        return document.querySelector(".post-setting-slug").value;
      });
      if (updatedUrl === newURL) {
        ans = new TestResponse(true, "Change URL page passed");
      } else {
        return new TestResponse(false, "Change URL page failed");
      }

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="pages"]')
      );
      return ans;
    } catch (error) {
      console.log(error);
      return new TestResponse(false, "Change URL page failed");
    }
  }

  async editDate(titlePage, newDate) {
    try {
      let ans = new TestResponse(false, "Page edit date failed");
  
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
        path: this.screenshotDirectoryEscenario + "selectPageToEdit.png",
      });
      
      await this.page.waitForTimeout(timeoutConfig);
  
      await Promise.resolve(this.page.click('button[title="Settings"]'));
  
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate((newDate) => {
        document.querySelector(
          "[data-test-date-time-picker-date-input]"
        ).value = newDate;
        document
          .querySelector("[data-test-date-time-picker-date-input]")
          .focus();
      }, newDate);
      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(timeoutConfig);
  
      const error = await this.page.evaluate(() => {
        const errorDiv = document.querySelector(
          ".gh-date-time-picker-error"
        );
        return errorDiv ? errorDiv.textContent.trim() : null;
      });
      if (error) {
        ans = new TestResponse(false, error);
       }
       else{
        ans = new TestResponse(true, "Change date page passed");
       }
      await this.page.waitForTimeout(timeoutConfig);
  
  
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newInfoPage.png",
      });
      
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(this.page.click('button[title="Settings"]'));
  
      return ans;
    } catch (error) {
      console.error("Edit date page failed:", error.message);
      let ans = new TestResponse(
        false,
        "Edit date page failed"
      );
  
      return ans; // Rethrow the error to propagate it to the calling code
    }
  }

  async addYoutubeUrl(titlePage, url) {
    try {
      let ans = new TestResponse(false, "Add url failed");

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
        path: this.screenshotDirectoryEscenario + "selectPageToAddUrl.png",
      });
      await this.page.evaluate(() => {
        const element = document.querySelector(
          "textarea[data-test-editor-title-input]"
        );
        element.focus();
      });
      await this.page.keyboard.press("Tab");
      await this.page.click('button[aria-label="Add a card"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.click('[data-kg-card-menu-item="YouTube"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.type(url)
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(timeoutConfig);

      const errmsg=await this.page.$('[data-testid="embed-url-error-message"]');
      if(errmsg)
      {
        ans = new TestResponse(false, errmsg.value);
      }
      else{
        ans = new TestResponse(true, "Add url passed");
      }
   
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newInfoPage.png",
      });
     
      await this.page.waitForTimeout(timeoutConfig);
      return ans;
    } catch (error) {
      console.error("Add Url page failed:", error);
      let ans = new TestResponse(
        false,
        "Add Url page failed"
      );

      return ans; 
    }
  }

}

module.exports = PagesPage;
