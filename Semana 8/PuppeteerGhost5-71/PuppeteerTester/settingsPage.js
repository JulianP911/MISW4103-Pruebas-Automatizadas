const { faker } = require("@faker-js/faker");
let config = require("./config.json");
const TestResponse = require("./testResponse");
const timeoutConfig = config.timeout;
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
      await new Promise((r) =>
        setTimeout(r, timeoutConfig + timeoutConfig + timeoutConfig)
      );

      await this.page.evaluate(() => {
        const settingsLink = document.querySelector('a[href="#/settings/"]');
        if (settingsLink) {
          settingsLink.click();
        } else {
          console.error("Settings link not found");
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

  async createNewsletter(newsletterTitle) {
    try {
      await this.page.waitForTimeout(timeoutConfig + timeoutConfig);
      let ans = new TestResponse(false, "Create newsletter failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createNewNewsletter.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("input.checked");
        elements.forEach((element) => {
          element.classList.add("::after");
        });
      });

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Add newsletter") {
            console.log(element.textContent);
            element.click();
          }
        }
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.keyboard.type(newsletterTitle);
      const createBtn = await this.page.$(
        "button.cursor-pointer.bg-black.text-white"
      );
      createBtn.click();
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Save") {
            element.click();
          }
        }
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Close") {
            element.click();
          }
        }
      });
      ans = await this.page.evaluate(
        (newsletterTitle, ans) => {
          const elements = document.querySelectorAll("span.font-medium");
          for (const element of elements) {
            if (element.textContent.includes(newsletterTitle.trim())) {
              ans.status = true;
              ans.message = "Create newsletter passed";

              return ans;
            }
          }
        },
        newsletterTitle,
        ans
      );
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createdNewsletterPage.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Create newsletter failed");
      return ans;
    }
  }

  async editNewsletter(newsletterTitle, newNewsletterDescription) {
    try {
      await this.page.waitForTimeout(timeoutConfig);
      let ans = new TestResponse(false, "Edit newsletter failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editNewNewsletter.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.evaluate((newsletterTitle) => {
        const elements = document.querySelectorAll("span.font-medium");
        for (const element of elements) {
          if (element.textContent.includes(newsletterTitle.trim())) {
            element.click();
          }
        }
      }, newsletterTitle);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("textarea");
        elements[0].click();
        elements[0].focus();
      });
      await this.page.keyboard.type(newNewsletterDescription);

      const createBtn = await this.page.$(
        "button.cursor-pointer.bg-black.text-white"
      );
      createBtn.click();
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Save") {
            element.click();
          }
        }
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Close") {
            element.click();
          }
        }
      });
      ans = await this.page.evaluate(
        (newNewsletterDescription, ans) => {
          const elements = document.querySelectorAll("span");
          for (const element of elements) {
            if (element.textContent.includes(newNewsletterDescription.trim())) {
              ans.status = true;
              ans.message = "Edit newsletter passed";

              return ans;
            }
          }
          return ans;
        },
        newNewsletterDescription,
        ans
      );
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editedNewsletterPage.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Edit newsletter failed");
      return ans;
    }
  }
  async createNewsletter(newsletterTitle) {
    try {
      await this.page.waitForTimeout(timeoutConfig + timeoutConfig);
      let ans = new TestResponse(false, "Create newsletter failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createNewNewsletter.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Add newsletter") {
            console.log(element.textContent);
            element.click();
          }
        }
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.keyboard.type(newsletterTitle);
      const createBtn = await this.page.$(
        "button.cursor-pointer.bg-black.text-white"
      );
      createBtn.click();
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Save") {
            element.click();
          }
        }
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "Close") {
            element.click();
          }
        }
      });
      ans = await this.page.evaluate(
        (newsletterTitle, ans) => {
          const elements = document.querySelectorAll("span.font-medium");
          for (const element of elements) {
            if (element.textContent.includes(newsletterTitle.trim())) {
              ans.status = true;
              ans.message = "Create newsletter passed";

              return ans;
            }
          }
        },
        newsletterTitle,
        ans
      );
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createdNewsletterPage.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Create newsletter failed");
      return ans;
    }
  }

  async addIntegration(integrationName) {
    try {
      await this.page.waitForTimeout(timeoutConfig + timeoutConfig);
      let ans = new TestResponse(false, "Add integration failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "addIntegration.png",
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.includes("Add custom integration")) {
            element.click();
          }
        }
      });
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.keyboard.type(integrationName);
      const createBtn = await this.page.$(
        "button.cursor-pointer.bg-black.text-white"
      );
      createBtn.click();
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim().includes("Save")) {
            element.click();
          }
        }
      });

      ans = await this.page.evaluate(
        (integrationName, ans) => {
          const elements = document.querySelectorAll("span");
          for (const element of elements) {
            if (element.textContent.includes(integrationName.trim())) {
              ans.status = true;
              ans.message = "Add custom integration passed";

              return ans;
            }
          }
          return ans;
        },
        integrationName,
        ans
      );
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path:
          this.screenshotDirectoryEscenario + "addedCustomIntegrationPage.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Add custom integration failed");
      return ans;
    }
  }

  async reviewHistory() {
    try {
      await this.page.waitForTimeout(timeoutConfig + timeoutConfig);
      let ans = new TestResponse(false, "Review history failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "reviewHistory.png",
      });

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll("span");
        for (const element of elements) {
          if (element.textContent.trim() === "View history") {
            console.log(element.textContent);
            element.click();
          }
        }
      });

      await this.page.waitForTimeout(timeoutConfig);
      const element = await this.page.evaluate(() => {
        const elements = document.querySelectorAll(".text-sm");
        for (const element of elements) {
          if (
            element.textContent.trim().includes("Post added") ||
            element.textContent.trim().includes("Post edited")
          ) {
            return true;
          }
        }
        return false;
      });
      if (element) {
        ans.status = true;
        ans.message = "Review history passed";

        return ans;
      }

      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createdNewsletterPage.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Create newsletter failed");
      return ans;
    }
  }

  async customizeNavigation(newNav) {
    try {
      await this.page.waitForTimeout(timeoutConfig + timeoutConfig);
      let ans = new TestResponse(false, "Customize Navigation failed");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "customNavigation.png",
      });

      await this.page.waitForTimeout(timeoutConfig);
      for (let i = 0; i < 16; i++) {
        await this.page.keyboard.press("Tab");
      }
      await this.page.keyboard.press("Enter");

      await this.page.waitForTimeout(timeoutConfig);

      await this.page.waitForTimeout(timeoutConfig);
      const label = await this.page.$('[placeholder="New item label"]');
      await label.focus();
      await this.page.keyboard.type(newNav);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.waitForTimeout(timeoutConfig);
      //await this.page.keyboard.press("Tab");
      const addBtn = await this.page.$('[data-testid="add-button"]');
      await addBtn.click();
      await this.page.waitForTimeout(timeoutConfig);
      const element = await this.page.evaluate((newNav) => {
        const elements = document.querySelectorAll(
          '[data-testid="navigation-item-editor"] input'
        );
        for (const element of elements) {
          if (element.getAttribute("value").includes(newNav.trim())) {
            return true;
          }
        }
        return false;
      }, newNav);
      if (element) {
        ans.status = true;
        ans.message = "Add navigation passed";

        return ans;
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "addNavigation.png",
      });

      return ans;
    } catch (error) {
      console.log(error);
      let ans = new TestResponse(false, "Add navigation failed");
      return ans;
    }
  }
  async updateFacebookURL(newUrl) {
    let ans = new TestResponse(false, "Update facebook failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateFacebookPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[6].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateFacebookForm.png",
      });
      await this.page.keyboard.type(newUrl);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updatedFacebookForm.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[6].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "facebookNewInfo.png",
      });
      const facebookUpdated = await this.page.evaluate((newUrl) => {
        const elements = document.querySelectorAll(
          "div.flex.items-center.mt-1"
        );
        for (const element of elements) {
          if (element.textContent.includes(newUrl)) {
            return true;
          }
        }
        return false;
      }, newUrl);
      if (facebookUpdated) {
        return new TestResponse(true, "update facebook successful");
      }
      await this.page.waitForTimeout(timeoutConfig);
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }

  async updateXURL(newUrl) {
    let ans = new TestResponse(false, "Update x failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateXPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[6].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateXForm.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.press("End");
      await this.page.keyboard.type(newUrl);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updatedXForm.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[6].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "XNewInfo.png",
      });
      const facebookUpdated = await this.page.evaluate((newUrl) => {
        const elements = document.querySelectorAll(
          "div.flex.items-center.mt-1"
        );
        for (const element of elements) {
          if (element.textContent.includes(newUrl)) {
            return true;
          }
        }
        return false;
      }, newUrl);
      if (facebookUpdated) {
        return new TestResponse(true, "update X successful");
      }
      await this.page.waitForTimeout(timeoutConfig);
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }

  async updateXCard(title, description) {
    let ans = new TestResponse(false, "Update X card failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateXCardPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[4].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateXCardForm.png",
      });
      await this.page.keyboard.type(title);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(description);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updatedXCardForm.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[4].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[4].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "XCardCheckUpdate.png",
      });
      const facebookUpdated = await this.page.evaluate((title) => {
        const elements = document.querySelectorAll(
          "input.peer.order-2.h-8.w-full.bg-transparent.px-3.py-1.text-sm.rounded-md"
        );
        for (const element of elements) {
          console.log(element);
          if (element.value.includes(title)) {
            return true;
          }
        }
        return false;
      }, title);
      if (facebookUpdated) {
        return new TestResponse(true, "update facebook successful");
      }
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }

  async updateFacebookCard(title, description) {
    let ans = new TestResponse(false, "Update facebook Card failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateFacebookCardPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[5].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateFacebookCardForm.png",
      });
      await this.page.keyboard.type(title);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(description);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updatedFacebookCardForm.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[5].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[5].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "FacebookCardCheckUpdate.png",
      });
      const facebookUpdated = await this.page.evaluate((title) => {
        const elements = document.querySelectorAll(
          "input.peer.order-2.h-8.w-full.bg-transparent.px-3.py-1.text-sm.rounded-md"
        );
        for (const element of elements) {
          console.log(element);
          if (element.value.includes(title)) {
            return true;
          }
        }
        return false;
      }, title);
      if (facebookUpdated) {
        return new TestResponse(true, "update facebook successful");
      }
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }

  async updateTimeZone(timezone) {
    let ans = new TestResponse(false, "Update timezone failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[1].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updateTimezoneForm.png",
      });
      await this.page.click('[data-testid="timezone-select"]');

      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.type(timezone.charAt(0));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.keyboard.press("Enter");
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "updatedTimezoneForm.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[1].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "timezoneNewInfo.png",
      });
      const cancelElements = await this.page.evaluate(() => {
        return document.querySelectorAll(
          "button.cursor-pointer.text-black.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-semibold.p-1"
        ).length;
      });
      if (cancelElements < 1) {
        return new TestResponse(true, "Update timezone successful");
      }
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }

  async addRecommendation(newUrl) {
    let ans = new TestResponse(false, "Add recommendation failed");
    try {
      await this.page.waitForTimeout(timeoutConfig);
      const recommendations = await this.page.evaluate(() => {
        return document.querySelectorAll(
          '[data-testid="recommendation-list-item"]'
        ).length;
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsPage.png",
      });
      await this.page.evaluate(() => {
        const elements = document.querySelectorAll(
          "button.cursor-pointer.text-green.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold"
        );
        elements[16].click();
      });
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "addRecommendationForm.png",
      });
      await this.page.keyboard.type(newUrl);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "recommendationForm.png",
      });
      await this.page.click(
        "button.cursor-pointer.bg-black.text-white.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.px-4"
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "recommendations.png",
      });
      const recommendationsUpdated = await this.page.evaluate(() => {
        return document.querySelectorAll(
          '[data-testid="recommendation-list-item"]'
        ).length;
      });
      if (recommendationsUpdated > recommendations) {
        return new TestResponse(true, "update facebook successful");
      }
      await this.page.waitForTimeout(timeoutConfig);
      return ans;
    } catch (error) {
      console.log(error);
      return ans;
    }
  }
}
module.exports = SettingsPage;
