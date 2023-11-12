const { faker } = require("@faker-js/faker");
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
async createPost(titlePost) {
  try {
    // Wait for an element that contains a span with the text "New post"
    await this.page.waitForSelector(".view-actions-top-row", { timeout: timeoutConfig });
    await this.page.click(".view-actions-top-row");
    await this.page.waitForTimeout(timeoutConfig);

    // Type title
    await this.page.keyboard.type(titlePost);
    await this.page.keyboard.press("Tab");

    // Type content
    await this.page.keyboard.type(faker.lorem.sentence(2));
    await this.page.waitForTimeout(timeoutConfig);

    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "postCreationPage.png",
    });

    // Click on publish
    await this.page.waitForSelector('button[data-test-button="publish-flow"]', {
      timeout: timeoutConfig,
    });
    await Promise.resolve(
      this.page.click('button[data-test-button="publish-flow"]')
    );
    await this.page.waitForTimeout(timeoutConfig);

    // Confirm the publication
    await this.page.waitForSelector('button[data-test-button="continue"]', {
      timeout: timeoutConfig,
    });
    await Promise.resolve(
      this.page.click('button[data-test-button="continue"]')
    );
    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "continuePostCreationPage.png",
    });
    await this.page.waitForTimeout(timeoutConfig);

    await this.page.waitForSelector('button[data-test-button="confirm-publish"]', {
      timeout: timeoutConfig,
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
      console.log("Post created successfully");
    } else {
      throw "Post created failed";
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

    // Navigate back to the posts section
    await this.page.waitForSelector('.gh-btn-editor[data-test-link="posts"]', {
      timeout: timeoutConfig,
    });
    await Promise.resolve(
      this.page.click('.gh-btn-editor[data-test-link="posts"]')
    );
    await this.page.waitForTimeout(timeoutConfig);

    return this.page;
  } catch (error) {
    console.error("Create Post failed:", error.message);
    throw error; // Rethrow the error to propagate it to the calling code
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
async createDraft(titlePost) {
  try {
    // Click on 'New Post'
    await this.page.waitForSelector(".view-actions-top-row", { timeout: timeoutConfig });
    await this.page.click(".view-actions-top-row");
    await this.page.waitForTimeout(timeoutConfig);

    // Type the title
    await this.page.keyboard.type(titlePost);
    await this.page.keyboard.press("Tab");

    // Type the content
    await this.page.keyboard.type(faker.lorem.sentence(2));
    await this.page.waitForTimeout(timeoutConfig);

    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "draftPage.png",
    });

    // Go back to the list of posts
    await this.page.waitForSelector(
      '.gh-btn-editor[data-test-link="posts"]',
      { timeout: timeoutConfig }
    );
    await Promise.resolve(
      this.page.click('.gh-btn-editor[data-test-link="posts"]')
    );
    await this.page.waitForTimeout(timeoutConfig);
    
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
        return this.page;
      }
    }

    if (!titleFound) {
      throw "The title of the draft was not found in the list of posts";
    }

  } catch (error) {
    console.error("Create Draft Post failed:", error.message);
    throw error; // Rethrow the error to propagate it to the calling code
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
  async createPostScheduled() {
    try {
      // Click on new post
      await this.page.waitForSelector(".view-actions-top-row", {
        timeout: timeoutConfig,
      });
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(timeoutConfig);

      // Type title
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press("Tab");

      // Type description
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillPostsPage.png",
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

      // Click on Schedule config
      await Promise.resolve(
        this.page.click('div[data-test-setting="publish-at"]')
      );

      // Click on select date
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForSelector('div[data-test-radio="schedule"]', {
        timeout: timeoutConfig,
      });

      await this.page.evaluate(() => {
        document.querySelector('div[data-test-radio="schedule"]').click();
      });

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "schedulePostsPage.png",
      });

      // Click on continue with the publication
      await Promise.resolve(
        this.page.click('button[data-test-button="continue"]')
      );
      await this.page.waitForTimeout(timeoutConfig);

      await Promise.resolve(
        this.page.click('button[data-test-button="confirm-publish"]')
      );
      await this.page.waitForTimeout(timeoutConfig);

      // Check if the post is created successfully
      const element = await this.page.$(
        '.gh-publish-title[data-test-publish-flow="complete"]'
      );

      if (element) {
        console.log("Post created successfully");
      } else {
        throw "No se encontró el componente de creación exitosa";
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

      // Navigate back to the posts section
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: timeoutConfig }
      );
      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(timeoutConfig);

      return this.page;
    } catch (error) {
      console.error("Create Scheduled Post failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
/* Add a created tag to a published post*/
  async addTagPost(titlePost, nameTag) {
    try {
      //Select the post according to the title from parameters
      await this.page.evaluate(async (titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePost.trim()) {
            await element.click();
          }
        }
        return null;
      }, titlePost);
      await this.page.waitForTimeout(timeoutConfig);
      
      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario +
          "selectPublishedPost.png",
      });
      //Add the tag to the post through settings
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await Promise.resolve(this.page.click('div[id="tag-input"]'));
      const inputTag = await this.page.$(
        ".ember-power-select-trigger-multiple-input"
      );
      await inputTag.type(nameTag);
      await this.page.keyboard.press("Enter");
      
     
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario +
          "assignedTag.png",
      });
      //Save the update of the post
      this.page.click('button[title="Settings"]');
      this.page.waitForSelector('span[data-test-task-button-state="idle"]', {
        timeout: timeoutConfig,
      });

      await Promise.resolve(
        this.page.click('span[data-test-task-button-state="idle"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      //Get back to posts
      await this.page.waitForSelector(
        '.gh-btn-editor[data-test-link="posts"]',
        { timeout: timeoutConfig }
      );

      await Promise.resolve(
        this.page.click('.gh-btn-editor[data-test-link="posts"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      //Filter by the tag that was assigned
      await this.page.waitForSelector('div[data-test-tag-select="true"]', {
        timeout: timeoutConfig,
      });
      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario +
          "filterAssignedTag.png",
      });
      await Promise.resolve(
        this.page.click('div[data-test-tag-select="true"]')
      );
      await this.page.evaluate(async (nameTag) => {
        const elements = document.querySelectorAll("li");
        for (const element of elements) {
          if (element.textContent.trim() === nameTag.trim()) {
            await element.click();
          }
        }
        return null;
      }, nameTag);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario +
          "listFilteredAssignedTag.png",
      });
      //Validate that when filtered by the tag the post appear
      const element = await this.page.evaluate((titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePost.trim()) {
            return element;
          }
        }
        return null;
      }, titlePost);

      if (element) {
        console.log("Add Tag successfully");
      } else {
        throw "Add Tag failed";
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
/*Delete the post with the title from the parameter*/
  async deletePost(titlePost) {
    try {
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
        path: this.screenshotDirectoryEscenario + "selectPostToDelete.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(this.page.click('button[title="Settings"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(
        this.page.click(
          "button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth"
        )
      );
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(this.page.click("button.gh-btn-red"));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "deletePostsPage.png",
      });
      
      const element = await this.page.evaluate((titlePost) => {
        const elements = document.querySelectorAll(".gh-content-entry-title");
        for (const element of elements) {
          if (element.textContent.trim() === titlePost.trim()) {
            return false;
          }
        }
        return true;
      }, titlePost);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listPosts.png",
      });
      if (element) {
        console.log("Delete Post successfully");
      } else {
        throw "Delete post fail";
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
      await this.page.keyboard.type(newTitlePost);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newInfoPost.png",
      });
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
          return;
        }
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "lisPosts.png",
      });
      if (!tituloEncontrado) {
        throw "no se encontro el titulo del draft en el listado de posts";
      }

      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Edit draft Post failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = PostsPage;
