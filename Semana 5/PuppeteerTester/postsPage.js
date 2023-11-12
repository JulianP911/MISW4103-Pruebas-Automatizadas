const { faker } = require("@faker-js/faker");

class PostsPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      const elementExists = (await this.page.$("#ember313")) !== null;
      if (elementExists) {
        await this.page.click("#ember313"); // Screen is wide
      } else {
        if ((await this.page.$("#ember13")) !== null) {
          await this.page.click("#ember13"); // Screen is narrow
        }
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "postsPage.png",
      });
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createPost(titlePost) {
    try {
      // Wait for an element that contains a span with the text "New post"
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: 100000,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(2000);
      await this.page.keyboard.type(titlePost);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector(
        'button[data-test-button="publish-flow"]',
        { timeout: 100000 }
      );
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector('button[data-test-button="continue"]', {
        timeout: 100000,
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector(
        'button[data-test-button="confirm-publish"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(1000);
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
      this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(1000);
      this.page.waitForSelector('.gh-btn-editor[data-test-link="posts"]', {
        timeout: 100000,
      });

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createDraft(titlePost) {
    try {
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: 100000,
      });

      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(2000);
      await this.page.keyboard.type(titlePost);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(1000);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "draftPage.png",
      });
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: 100000,
      });

      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let tituloEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(titlePost)) {
          tituloEncontrado = true;
          return;
        }
      }
      if (!tituloEncontrado) {
        throw "no se encontro el titulo del draft en el listado de posts";
      }
      return this.page;
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createPostScheduled() {
    try {
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: 100000,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(2000);
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector(
        'button[data-test-button="publish-flow"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(5000);

      await this.page.evaluate(() => {
        document.querySelector("button.gh-publish-setting-title").click();
      });
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector('div[data-test-radio="schedule"]', {
        timeout: 100000,
      });

      await this.page.evaluate(() => {
        document.querySelector('div[data-test-radio="schedule"]').click();
      });
      await this.page.waitForTimeout(1000);

      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(1000);

      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(1000);

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
      await this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("create Scheduled Post failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
  async addTagPost(titlePost, nameTag) {
    try {
      await this.page.evaluate(async (titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === titlePost.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePost);
      await this.page.waitForTimeout(10000);
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await Promise.resolve(this.page.click('div[id="tag-input"]'));
      const inputTag = await this.page.$(
        ".ember-power-select-trigger-multiple-input"
      );
      await inputTag.type(nameTag);
      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(5000);
      this.page.click('button[title="Settings"]');
      this.page.waitForSelector('span[data-test-task-button-state="idle"]', {
        timeout: 100000,
      });

      await Promise.resolve(
        this.page.click('span[data-test-task-button-state="idle"]')
      );
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector('div[data-test-tag-select="true"]', {
        timeout: 100000,
      });

      await Promise.resolve(
        this.page.click('div[data-test-tag-select="true"]')
      );
      await this.page.evaluate(async (nameTag) => {
        const elements = document.querySelectorAll("li");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === nameTag.trim()) {
            await element.click();
          }
        }
        return null;
      }, nameTag);
      await this.page.waitForTimeout(5000);
      const element = await this.page.evaluate((titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === titlePost.trim()) {
            return element;
          }
        }
        return null;
      }, titlePost);

      if (element) {
        console.log("Tag adicionado exitosamente");
      } else {
        throw "No se encontro componente de adición exitosa";
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "addTagPostsPage.png",
      });
      return this.page;
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async deletePost(titlePost) {
    try {
      await this.page.evaluate(async (titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === titlePost.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePost);
      await this.page.waitForTimeout(10000);
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForTimeout(5000);
      await Promise.resolve(
        this.page.click(
          "button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth"
        )
      );
      await this.page.waitForTimeout(7000);
      await Promise.resolve(this.page.click("button.gh-btn-red"));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "deletePostsPage.png",
      });
      const element = await this.page.evaluate((titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === titlePost.trim()) {
            return false;
          }
        }
        return true;
      }, titlePost);

      if (element) {
        console.log("Post eliminado exitosamente");
      } else {
        throw "No se encontro componente de eliminado exitosa";
      }
      return this.page;
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async editDraft(titlePost, newTitlePost) {
    try {
      await this.page.evaluate(async (titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === titlePost.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePost);

      await this.page.waitForSelector("textarea[data-test-editor-title-input]");
      await this.page.evaluate((titlePost) => {
        const element = document.querySelector("textarea[data-test-editor-title-input]");
        element.value ="";
        element.focus();
      }, newTitlePost);
      await this.page.keyboard.type(newTitlePost);
      await this.page.waitForTimeout(3000);
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: 100000 }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(1000);
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: 100000,
      });

      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let tituloEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(newTitlePost)) {
          tituloEncontrado = true;
          return;
        }
      }
      if (!tituloEncontrado) {
        throw "no se encontro el titulo del draft en el listado de posts";
      }
      
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("Edit draft Post failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = PostsPage;
