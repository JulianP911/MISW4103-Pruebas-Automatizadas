const { faker } = require("@faker-js/faker");

class MembersPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      try {
        await this.page.waitForSelector('a[data-test-mobile-nav="members"]');

        await Promise.resolve(
          this.page.click('a[data-test-mobile-nav="members"]')
        );
      } catch (error) {
        try {
          await this.page.waitForSelector('a[data-test-nav="members"]');

          await Promise.resolve(this.page.click('a[data-test-nav="members"]'));
        } catch (error) {
          throw error;
        }
      }
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "membersPage.png",
      });
    } catch (error) {
      console.error("Visit members Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createMember() {
    try {
      // Wait for an element that contains a span with the text "New member"
      await this.page.waitForSelector('a[data-test-new-member-button="true"]');
      await this.page.click('a[data-test-new-member-button="true"]');
      await this.page.waitForSelector('input[data-test-input="member-name"]');
      const nameMember = faker.person.firstName();
      await this.page.keyboard.type(nameMember);
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.internet.email());
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createMember.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.waitForTimeout(2000);
      await Promise.resolve(
        this.page.click('a[data-test-link="members-back"]')
      );
      await this.page.waitForSelector("h2.gh-canvas-title");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "membersPage.png",
      });
      const h3Elements = await this.page.$$eval(
        "h3.ma0.pa0.gh-members-list-name",
        (h3s) => h3s.map((h3) => h3.textContent)
      );
      let memberEncontrado = false;
      for (let i = 0; i < h3Elements.length; i++) {
        if (h3Elements[i].includes(nameMember)) {
          memberEncontrado = true;
          return;
        }
      }
      if (!memberEncontrado) {
        throw "no se encontro el member creado";
      }
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("Create member faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createMemberWithoutMail_Error() {
    try {
      // Wait for an element that contains a span with the text "New member"
      await this.page.waitForSelector('a[data-test-new-member-button="true"]');
      await this.page.click('a[data-test-new-member-button="true"]');
      await this.page.waitForSelector('input[data-test-input="member-name"]');
      const nameMember = faker.person.firstName();
      await this.page.keyboard.type(nameMember);
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "createMember.png",
      });
      await this.page.waitForTimeout(2000);
      const pElements = await this.page.$$eval("p.response", (ps) =>
        ps.map((p) => p.textContent)
      );
      let errorEncontrado = false;
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "errorMemeberCreation.png",
      });
      for (let i = 0; i < pElements.length; i++) {
        if (pElements[i].includes("Please enter an email.")) {
          errorEncontrado = true;
          return;
        }
      }
      if (!errorEncontrado) {
        throw "no se encontro el error esperado";
      }
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("Create member without mail faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
  async editMember() {
    const newEmail=faker.internet.email()
    await this.page.waitForTimeout(6000);
     console.log(newEmail)
      await this.page.evaluate(() => {
        document.querySelectorAll(".gh-members-list-name")[0].click();
      }, this.page);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "selectMemberToEdit.png",
      });
    try {
      const email = await this.page.$("#member-email");
      await this.page.evaluate(() => {
        document.querySelector("#member-email").value="";

      }, this.page);
      await this.page.waitForTimeout(5000);
email.type(newEmail)
await this.page.waitForTimeout(8000);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editMember.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.waitForTimeout(2000);
      await Promise.resolve(
        this.page.click('a[data-test-link="members-back"]')
      );
      await this.page.waitForSelector("h2.gh-canvas-title");

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "editMemberFinalPage.png",
      });
      const memberEncontrado = await this.page.evaluate((newEmail) => {
        const elements = document.querySelectorAll(".gh-members-list-email");
        for (const element of elements) {
          console.log(element.textContent.trim());
          if (element.textContent.trim() === newEmail.trim()) {
             return true;
          }
        }
        return false;
      }, newEmail);

      if (!memberEncontrado) {
        throw "no se encontro el member creado";
      }
      await this.page.waitForTimeout(1000);
      return this.page;
    } catch (error) {
      console.error("Create member faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = MembersPage;
