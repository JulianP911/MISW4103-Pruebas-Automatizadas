const { faker } = require("@faker-js/faker");
const assert = require("assert");
class TagsPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      if ((await this.page.$(".gh-mobile-nav-bar-more")) !== null) {
        await this.page.click(".gh-mobile-nav-bar-more");
      }
      await this.page.waitForTimeout(5000);
      if ((await this.page.$('a[data-test-nav="tags"]')) !== null) {
        await this.page.click('a[data-test-nav="tags"]');
      }

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "tagsPage.png",
      });
    } catch (error) {
      console.error("Visit Tags Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createTag(newTagName,isPublic) {
    try {
      // Wait for an element that contains a span with the text "New post"
      await this.page.waitForTimeout(1000);
      await this.page.click('a[href="#/tags/new/"]');
      await this.page.waitForTimeout(2000);
      const name = await this.page.$("#tag-name");
      await name.type(newTagName);
      await this.page.waitForTimeout(5000);
      const description = await this.page.$("#tag-description");
      await description.type(faker.lorem.sentence(5));
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.waitForTimeout(5000);
      await this.page.click('a[data-test-link="tags-back"]');
      await this.page.waitForTimeout(5000);
if(isPublic){
  await this.page.click('button[data-test-tags-nav="public"]');
      await this.page.waitForTimeout(2000);
}else{
  await this.page.click('button[data-test-tags-nav="internal"]');
  await this.page.waitForTimeout(2000);
}
      const element = await this.page.evaluate((newTagName) => {
        const elements = document.querySelectorAll(".gh-tag-list-name");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === newTagName.trim()) {
            return element;
          }
        }
        return null;
      }, newTagName);

      if (element) {
        console.log("Tag creado exitosamente");
      } else {
        throw "No se encontro componente de creacion exitosa";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPostsPage.png",
      });

      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      error, console.error("Create tag Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createTagError() {
    try {
     // Wait for an element that contains a span with the text "New post"
     await this.page.waitForTimeout(1000);
     await this.page.click('a[href="#/tags/new/"]');
     await this.page.waitForTimeout(2000);
     const description = await this.page.$("#tag-description");
     await description.type(faker.lorem.sentence(5));
     await Promise.resolve(this.page.click('button[data-test-button="save"]'));
     await this.page.waitForTimeout(5000);
     const actualErrorMessage = await this.page.$eval(".error", (el) =>
     el.textContent.trim()
   );
   // Compare with the expected error message
   
     assert.ok(actualErrorMessage.includes('You must specify a name for the tag'));


     await this.page.waitForTimeout(1000);
     return this.page;
   } catch (error) {
     error, console.error("Create tag Page failed:", error.message);
     throw error; // Rethrow the error to propagate it to the calling code
   }
  }

  async createPostScheduled() {
    try {
      // Wait for an element that contains a span with the text "New post"
      await this.page.waitForTimeout(1000);
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(2000);
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(5000);
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(5000);
      await this.page.evaluate(() => {
        document.querySelector("button.gh-publish-setting-title").click();
      });
      await this.page.waitForTimeout(5000);
      await this.page.evaluate(() => {
        document
          .querySelector('.gh-radio-button[data-test-radio="schedule"]')
          .click();
      });
      await this.page.waitForTimeout(5000);
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(5000);
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(5000);
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );
      if (element) {
        console.log("Post creado exitosamente");
      } else {
        throw "No se encontro componente de creacion exitosa";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPostsPage.png",
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(5000);
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(5000);
      return this.page;
    } catch (error) {
      console.error("Visit Scheduled Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = TagsPage;
