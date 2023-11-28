const { faker } = require("@faker-js/faker");
let config = require("./config.json");

const timeoutConfig = config.timeout;
const assert = require("assert");
class SettingsPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "beforeSettingsPage.png",
      });
      if ((await this.page.$(".gh-mobile-nav-bar-more")) !== null) {
        await this.page.click(".gh-mobile-nav-bar-more");
      }
      await new Promise((r) => setTimeout(r, timeoutConfig+timeoutConfig+timeoutConfig));
    
      await this.page.evaluate(() => {
        const settingsLink = document.querySelector('a[href="#/settings/"]');
        if (settingsLink) {
          settingsLink.click();
        } else {
          console.error('Settings link not found');
        }
      });

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "afterSettingsPage.png",
      });
    } catch (error) {
      console.error("Visit Settings Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createNewsletter() {
    try {
      await this.page.waitForTimeout(timeoutConfig+timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createNewNewsletter.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === 'Add newsletter') {
            console.log(element.textContent);
            element.click()
          }
          
        }
      });
    await this.page.keyboard.type(faker.lorem.sentence())
    const createBtn=await this.page.$('button.cursor-pointer.bg-black.text-white')
    createBtn.click();
    await this.page.waitForTimeout(timeoutConfig);
    await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === 'Save') {
            element.click()
          }
          
        }
      });
    await this.page.waitForTimeout(timeoutConfig);

    /*if (element) {
        console.log("Newsletter created successfully");
      } else {
        throw "Create Newsletter fail";
      }*/
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createdNewsletterPage.png",
      });

      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      error, console.error("Create Newsletter Page failed:", error);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}
module.exports = SettingsPage;
