const { faker } = require("@faker-js/faker");
let config = require("./config.json");

const timeoutConfig = config.timeout;

class MembersPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }
  async visit() {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "beforeVisitMembersPage.png",
      });
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

  async createMember(nameMember) {
    try {
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "beforeNewMembersPage.png",
      });
      // Wait for an element that contains a span with the text "New member"
      await this.page.waitForSelector('a[data-test-new-member-button="true"]');
      await this.page.click('a[data-test-new-member-button="true"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newMemberPage.png",
      });

      await this.page.keyboard.type(nameMember);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "typeInputNameNewMember.png",
      });
      await this.page.keyboard.press("Tab");
      await this.page.keyboard.type(faker.internet.email());
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "typeInputDescriptionNewMember.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickSaveButtonNewMember.png",
      });
      await Promise.resolve(
        this.page.click('a[data-test-link="members-back"]')
      );
      await this.page.waitForSelector("h2.gh-canvas-title");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backMembersListAfterNewMember.png",
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
      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Create member faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async createMemberWithoutMail_Error() {
    try { await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "beforeNewMembersPageForError.png",
    });
      // Wait for an element that contains a span with the text "New member"
      await this.page.waitForSelector('a[data-test-new-member-button="true"]');
      await this.page.click('a[data-test-new-member-button="true"]');
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "newMemberPageForError.png",
      });
      const nameMember = faker.person.firstName();
      await this.page.keyboard.type(nameMember);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "typeInputNameNewMemberForError.png",
      });
      await this.page.waitForTimeout(timeoutConfig); 
      await this.page.waitForTimeout(timeoutConfig); 
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
     
      await this.page.waitForTimeout(timeoutConfig); 
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickSaveButtonNewMemberForError.png",
      });
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
      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Create member without mail faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
  async editMember() {
    
    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "beforeEditMembersPage.png",
    });
    const newEmail = faker.internet.email();
    await this.page.waitForTimeout(timeoutConfig);
    await this.page.evaluate(() => {
      document.querySelectorAll(".gh-members-list-name")[0].click();
    }, this.page);
    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "selectMemberToEdit.png",
    });
    try {
      const email = await this.page.$("#member-email");
      await this.page.evaluate(() => {
        document.querySelector("#member-email").value = "";
      }, this.page); await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "cleanEmailMemberToEdit.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      email.type(newEmail);
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "typeNewInputEmailEditMember.png",
      });
      await Promise.resolve(this.page.click('button[data-test-button="save"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickSaveButtonEditMember.png",
      });
      await Promise.resolve(
        this.page.click('a[data-test-link="members-back"]')
      );
      await this.page.waitForSelector("h2.gh-canvas-title");
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "backMembersListAfterEditMember.png",
      });

      const memberEncontrado = await this.page.evaluate((newEmail) => {
        const elements = document.querySelectorAll(".gh-members-list-email");
        for (const element of elements) {
          if (element.textContent.trim() === newEmail.trim()) {
            return true;
          }
        }
        return false;
      }, newEmail);

      if (!memberEncontrado) {
        throw "no se encontro el member creado";
      }
      await this.page.waitForTimeout(timeoutConfig);
      return this.page;
    } catch (error) {
      console.error("Create member faile:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
  /*Delete the member with the title from the parameter*/
  async deleteMember(nameMember) {
    try {
      await this.page.evaluate(async (nameMember) => {
        const elements = document.querySelectorAll(".gh-members-list-name");
        for (const element of elements) {
          if (element.textContent.trim() === nameMember.trim()) {
            await element.click();
          }
        }
        return null;
      }, nameMember);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "selectMemberToDelete.png",
      });
      await this.page.waitForTimeout(timeoutConfig);
      await Promise.resolve(this.page.click('button[data-test-button="member-actions"]'));
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "settingsDeleteMember.png",
      });
      await Promise.resolve(
        this.page.click('button[data-test-button="delete-member"]')
      );
      await this.page.waitForTimeout(timeoutConfig);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "clickDeleteMember.png",
      });
      await Promise.resolve(this.page.click("button.gh-btn-red"));
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "deleteMember.png",
      });

      const element = await this.page.evaluate((nameMember) => {
        const elements = document.querySelectorAll(".gh-members-list-name");
        for (const element of elements) {
          if (element.textContent.trim() === nameMember.trim()) {
            return false;
          }
        }
        return true;
      }, nameMember);
      await this.page.waitForTimeout(timeoutConfig);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "listMembers.png",
      });
      if (element) {
        console.log("Delete Member successfully");
      } else {
        throw "Delete Member fail";
      }
      return this.page;
    } catch (error) {
      console.error("Delete Member Page failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = MembersPage;
