const { faker } = require("@faker-js/faker");
const TestResponse = require("./testResponse.js");
let config = require("./config.json");

const timeoutConfig = config.timeout;
class PostsPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "startVisitPosts.png",
      });
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
  /**
   * Creates a new post with the provided title using the Puppeteer page object.
   * This function simulates the process of creating a new post, filling in details,
   * publishing the post, and confirming its successful publication.
   * @param {string} titlePost - The title of the post to be created.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after
   * the post is created and confirmed.
   * @throws Will throw an error if the post creation process fails.
   */
  async createPost(titlePost, descriptionPost) {
    try {
      let ans = new TestResponse(false, "Post created failed");
      // Wait for an element that contains a span with the text "New post"
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: timeoutConfig,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "postForm.png",
      });
      // Type title
      await this.page.keyboard.type(titlePost);
      await this.page.keyboard.press("Tab");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titlePost.png",
      });
      // Type content
      await this.page.keyboard.type(descriptionPost);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "postCreationPage.png",
      });

      // Click on publish
      await this.page.waitForSelector(
        'button[data-test-button="publish-flow"]',
        {
          timeout: timeoutConfig,
        }
      );
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishPost.png",
      });
      // Confirm the publication
      await this.page.waitForSelector('button[data-test-button="continue"]', {
        timeout: timeoutConfig,
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario + "continuePostCreationPage.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.waitForSelector(
        'button[data-test-button="confirm-publish"]',
        {
          timeout: timeoutConfig,
        }
      );
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);

      // Check if the post is created successfully
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );

      if (element) {
        //console.log("Post created successfully");
        ans = new TestResponse(true, "Post created successfully");
      } else {
        // throw "Post created failed";
        ans = new TestResponse(false, "Post created failed");
      }

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPostsPage.png",
      });

      // Close the publish flow
      await this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]',
        { timeout: timeoutConfig }
      );
      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "closePublishPost.png",
      });
      // Navigate back to the posts section
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        {
          timeout: timeoutConfig,
        }
      );
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backPostsList.png",
      });
      return ans;
    } catch (error) {
      console.error("Create Post failed:", error.message);
      let ans = new TestResponse(false, "Post created failed");
      return ans; // Rethrow the error to propagate it to the calling code
    }
  }

  /**
   * Creates a draft post with the provided title using the Puppeteer page object.
   * This function simulates the process of creating a new draft post, filling in details,
   * and validating its presence in the list of posts.
   * @param {string} titlePost - The title of the draft post to be created.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after
   * the draft post is created and validated.
   * @throws Will throw an error if the draft post creation process fails or if the
   * created draft post is not found in the list of posts.
   */
  async createDraft(titlePost, descriptionPost) {
    try {
      let ans = new TestResponse(false, "Create Draft Post failed");
      // Click on 'New Post'
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: timeoutConfig,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "postDraftForm.png",
      });
      // Type the title
      await this.page.keyboard.type(titlePost);
      await this.page.keyboard.press("Tab");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "postTitleDraft.png",
      });
      // Type the content
      await this.page.keyboard.type(descriptionPost);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "draftPage.png",
      });
      //check for saved tag
      const saved = await this.page.waitForFunction(
        () => {
          const element = document.querySelector(
            "[data-test-editor-post-status]"
          );
          return element && element.textContent.trim() === "Draft";
        },
        { timeout: timeoutConfig }
      );
      if (saved) {
        ans = new TestResponse(true, "Create Draft Post passed");

        return ans;
      }
      try {
        // Go back to the list of posts
        await this.page.waitForSelector(
          '.gh-btn-editor[data-test-link="posts"]',
          { timeout: timeoutConfig }
        );
      } catch {
        ans = new TestResponse(false, "Create Draft Post failed");
        return ans;
      }
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "draftList.png",
      });
      // Wait for the list of posts to be visible
      await this.page.waitForSelector("h3.gh-content-entry-title", {
        timeout: timeoutConfig,
      });

      // Validate if the draft post was created
      const h3Elements = await this.page.$$eval(
        "h3.gh-content-entry-title",
        (h3s) => h3s.map((h3) => h3.textContent)
      );

      let titleFound = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(titlePost)) {
          titleFound = true;
          ans = new TestResponse(true, "Create Draft Post passed");

          return ans;
        }
      }

      if (!titleFound) {
        ans = new TestResponse(false, "Create Draft Post failed");
      }

      return ans;
    } catch (error) {
      console.log("Create Draft Post failed:", error.message);
      let ans = new TestResponse(false, "Create Draft Post failed");
      return ans;
    }
  }

  /**
   * Creates a scheduled post using the provided Puppeteer page object and Faker library.
   * This function simulates the process of creating a new post, filling in details,
   * scheduling the post, and confirming its successful publication.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after
   * the scheduled post is created and confirmed.
   * @throws Will throw an error if the scheduled post creation process validation fails or if any step fails.
   */
  async createPostScheduled(titlePost, descriptionPost, scheduleDate) {
    try {
      console.log(scheduleDate);
      let ans = new TestResponse(false, "Create Scheduled Post failed");
      // Click on new post
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: timeoutConfig,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "scheduledForm.png",
      });
      // Type title
      await this.page.keyboard.type(titlePost);
      await this.page.keyboard.press("Tab");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "titleScheduled.png",
      });
      // Type description
      await this.page.keyboard.type(descriptionPost);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillPostScheduled.png",
      });

      // Schedule the post
      // Click on post
      await this.page.waitForSelector(
        'button[data-test-button="publish-flow"]',
        {
          timeout: timeoutConfig,
        }
      );
      await Promise.resolve(
        this.page.click('button[data-test-button="publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishScheduled.png",
      });
      // Click on Schedule config
      await Promise.resolve(
        this.page.click('div[data-test-setting="publish-at"]')
      );

      // Click on select date
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('div[data-test-radio="schedule"]', {
        timeout: timeoutConfig,
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "publishAtScheduled.png",
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
        // console.log("Post created successfully");
      }

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "schedulePostsPage.png",
      });

      // Click on continue with the publication
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "continueScheduled.png",
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);

      // Check if the post is created successfully
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );

      if (element) {
        ans = new TestResponse(true, "Post created successfully");
        // console.log("Post created successfully");
      } else {
        //throw "No se encontró el componente de creación exitosa";
        ans = new TestResponse(
          false,
          await this.page.$("[data-test-confirm-error]").value
        );
      }

      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario +
          "finishSchedulePostsPublication.png",
      });

      await this.page.waitForSelector(
        'button[data-test-button="close-publish-flow"]',
        { timeout: timeoutConfig }
      );

      // Close the publish flow
      await Promise.resolve(
        this.page.click('button[data-test-button="close-publish-flow"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "closeScheduled.png",
      });
      // Navigate back to the posts section
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: timeoutConfig }
      );
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backListScheduled.png",
      });
      return ans;
    } catch (error) {
      console.error("Create Scheduled Post failed:", error.message);
      let ans = new TestResponse(false, "Create Scheduled Post failed");

      return ans;
    }
  }

  async editDraft(titlePost, newTitlePost, newDescriptionPost) {
    try {
      let ans = new TestResponse(false, "Post created failed");

      await this.page.evaluate(async (titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePost.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePost);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "selectPostToEdit.png",
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
        path: this.screenshotDirectoryEscenario + "emptyTitleEditPost.png",
      });
      await this.page.keyboard.type(newTitlePost);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.press("Tab");
        for (let i = 0; i < 50; i++) {
          await this.page.keyboard.press('Backspace'); // Simulate pressing the Backspace key
        }
    
      
    
      await this.page.keyboard.type(newDescriptionPost);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newInfoPost.png",
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
        ans = new TestResponse(true, "Create Draft Post passed");

       
      }
      else{
        ans = new TestResponse(false, "Create Draft Post failed");
       return ans
      }
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: timeoutConfig }
      );
      try {
        // Go back to the list of posts
        await this.page.waitForSelector(
          '.gh-btn-editor[data-test-link="posts"]',
          { timeout: timeoutConfig }
        );
      } catch {
        ans = new TestResponse(false, "Create Draft Post failed");
       return ans
      }
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: timeoutConfig }
      );
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
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
        if (h3Elements[i].includes(newTitlePost)) {
          tituloEncontrado = true;
          ans = new TestResponse(true, "Edit draft Post success");
        }
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "lisPosts.png",
      });
      if (!tituloEncontrado) {
        ans = new TestResponse(
          false,
          "no se encontro el titulo del draft en el listado de posts"
        );
      }

      await this.page.waitForTimeout(timeoutConfig);
      return ans;
    } catch (error) {
      console.error("Edit draft Post failed:", error.message);
      let ans = new TestResponse(
        false,
        "no se encontro el titulo del draft en el listado de posts"
      );

      return ans; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = PostsPage;
