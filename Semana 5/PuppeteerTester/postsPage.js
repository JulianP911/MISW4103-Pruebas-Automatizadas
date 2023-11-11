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

  async createPost() {
    try {
      // Wait for an element that contains a span with the text "New post"
      await this.page.click(".view-actions-top-row");
      await this.page.waitForTimeout(2000);
await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.type(faker.lorem.sentence(2));
      await this.page.waitForTimeout(1000);
      await Promise.resolve(this.page.click('button[data-test-button="publish-flow"]'));
      await this.page.waitForTimeout(1000);
      await Promise.resolve(this.page.click('button[data-test-button="continue"]'));
      await this.page.waitForTimeout(1000);
      await Promise.resolve(this.page.click('button[data-test-button="confirm-publish"]'));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createPostsPage.png",
      });
      return this.page;
    } catch (error) {
      console.error("Visit Post Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = PostsPage;
