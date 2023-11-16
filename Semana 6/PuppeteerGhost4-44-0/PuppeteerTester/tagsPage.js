const { faker } = require("@faker-js/faker");
let config = require("./config.json");

const timeoutConfig = config.timeout;
const assert = require("assert");
class TagsPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "beforeTagsPage.png",
      });
      if ((await this.page.$(".gh-mobile-nav-bar-more")) !== null) {
        await this.page.click(".gh-mobile-nav-bar-more");
      }
      await new Promise((r) => setTimeout(r, timeoutConfig));
       
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/tags/"]')[0].click();
      });

      
    

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "afterTagsPage.png",
      });
    } catch (error) {
      console.error("Visit Tags Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createTag(newTagName, isPublic) {
    try {
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.click('a[href="#/tags/new/"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createNewTag.png",
      });
      await this.page.waitForSelector("#tag-name", { timeout: timeoutConfig });

      const name = await this.page.$("#tag-name");
      await name.type(newTagName);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "inputNameNewTagsPage.png",
      });
      await this.page.waitForSelector("#tag-description", { timeout: timeoutConfig });

      const description = await this.page.$("#tag-description");
      await description.type(faker.lorem.sentence(5));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "inputDescriptionNewTagsPage.png",
      });
      await this.page.waitForSelector('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view', { timeout: timeoutConfig });

      await Promise.resolve(this.page.click('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickSaveButtonNewTagsPage.png",
      });
      await this.page.waitForSelector('a[href="#/tags/"]', { timeout: timeoutConfig });
      

      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/tags/"]')[0].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listAfterNewTagsPage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      if (isPublic) {
        await this.page.evaluate(() => {
        const xpathSelector = "//span[contains(text(), 'Public tags')]";
        const list = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        list.click()});
        await this.page.waitForTimeout(timeoutConfig);
       
      } else {
        await this.page.evaluate(() => {
          const xpathSelector = "//span[contains(text(), 'Internal tags')]";
          const list = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          list.click()});
        await this.page.waitForTimeout(timeoutConfig);
        
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listTagsAfterCreation.png",
      });
      const element = await this.page.evaluate((newTagName) => {
        const elements = document.querySelectorAll(".gh-tag-list-name");
        for (const element of elements) {
          if (element.textContent.trim() === newTagName.trim()) {
            return element;
          }
        }
        return null;
      }, newTagName);

      if (element) {
        console.log("Tag created successfully");
      } else {
        throw "Create tag fail";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createdTagPage.png",
      });

      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      error, console.error("Create tag Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createTagError() {
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('a[href="#/tags/new/"]', { timeout: timeoutConfig });
      
      await this.page.click('a[href="#/tags/new/"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createNewTagForError.png",
      });
      const description = await this.page.$("#tag-description");
      await description.type(faker.lorem.sentence(5));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "inputDescriptionTagForError.png",
      });
      await this.page.waitForSelector('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view', { timeout: timeoutConfig });

      await Promise.resolve(this.page.click('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "saveTagForError.png",
      });
      const actualErrorMessage = await this.page.$eval(".error", (el) =>
        el.textContent.trim()
      );
      // Compare with the expected error message

      assert.ok(
        actualErrorMessage.includes("You must specify a name for the tag")
      );

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "tagError.png",
      });
      return this.page;
    } catch (error) {
      error, console.error("Create tag Error Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
  async editTag(newTagName) {
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "firstViewEditTag.png",
      });
      await this.page.evaluate(() => {
        document.querySelectorAll(".gh-tag-list-name")[0].click();
      }, this.page);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "selectTagToEdit.png",
      });
      await this.page.waitForSelector("#tag-name", { timeout: timeoutConfig });

      const name = await this.page.$("#tag-name");
      await this.page.evaluate(() => {
        document.querySelector("#tag-name").value="";

      }, this.page);
      await name.type(newTagName);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "typeTagNameToEdit.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editedTag.png",
      });
      await this.page.waitForSelector('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view', { timeout: timeoutConfig });

      await Promise.resolve(this.page.click('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "savedEditedTag.png",
      });
      await this.page.waitForSelector('a[href="#/tags/"]', { timeout: timeoutConfig });

      
      await this.page.evaluate(() => {
        document.querySelectorAll('a[href="#/tags/"]')[0].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backToTagList.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.evaluate(() => {
        const xpathSelector = "//span[contains(text(), 'Public tags')]";
        const list = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        list.click()});
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listTagsAfterEdit.png",
      });
      const element = await this.page.evaluate((newTagName) => {
        const elements = document.querySelectorAll(".gh-tag-list-name");
        for (const element of elements) {
          if (element.textContent.trim() === newTagName.trim()) {
            return element;
          }
        }
        return null;
      }, newTagName);

      if (element) {
        console.log("Edit tag successfully");
      } else {
        throw "Edit tag fail";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "finalEditTags.png",
      });

      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      error, console.error("Edit tag Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = TagsPage;
