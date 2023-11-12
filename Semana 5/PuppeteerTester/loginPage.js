// LoginPage.js

class LoginPage {
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }

  async visit() {
    await this.page.goto(this.ghostUrl);
    await this.page.waitForTimeout(5000);
    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "signInPage.png",
    });
  }

  async login(email, password) {
    try {
      // Reset input fields
      await this.page.evaluate(() => {
        document.querySelector("#identification").value = "";
      });
      const idField = await this.page.$("#identification");
      await idField.type(email);
      const passwordField = await this.page.$("#password");
      await passwordField.type(password);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillInputs.png",
      });

      await Promise.resolve(this.page.click("#ember5"));
      await this.page.waitForTimeout(5000);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "afterSignIn.png",
      });

      // You might want to add additional checks for successful login

      return this.page;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }

  async forgotPassword(email) {
    try {
      // Reset input fields
      await this.page.evaluate(() => {
        document.querySelector("#identification").value = "";
      });
      const idField = await this.page.$("#identification");
      await idField.type(email);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillInputs.png",
      });

      await Promise.resolve(this.page.click("#ember4"));
      await this.page.waitForFunction(
        'document.querySelector(".main-error") && document.querySelector(".main-error").offsetHeight > 0'
      );
      await this.page.waitForFunction(
        () => {
          const button = document.querySelector("#ember4 span");
          return button && button.innerText.toLowerCase().includes("forgot");
        },
        { timeout: 100000 } // Set timeout to 60 seconds (60000 milliseconds)
      );
      await new Promise((r) => setTimeout(r, 5000));
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "afterForgot.png",
      });

      return this.page;
    } catch (error) {
      console.error("Forgot Password failed:", error.message);
      throw error; // Rethrow the error to propagate it to the calling code
    }
  }
}

module.exports = LoginPage;
