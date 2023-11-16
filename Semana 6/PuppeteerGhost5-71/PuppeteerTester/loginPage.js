let config = require("./config.json");

const timeoutConfig = config.timeout;
// LoginPage.js

/**
 * Class representing a page object for interacting with the login functionality.
 */
class LoginPage {
  /**
   * Creates an instance of the LoginPage class.
   * @param {object} page - The Puppeteer page object.
   * @param {string} ghostUrl - The URL of the Ghost CMS login page.
   * @param {string} screenshotDirectoryEscenario - The directory to save screenshots for scenario steps.
   */
  constructor(page, ghostUrl, screenshotDirectoryEscenario) {
    this.page = page;
    this.ghostUrl = ghostUrl;
    this.screenshotDirectoryEscenario = screenshotDirectoryEscenario;
  }

  /**
   * Navigates to the Ghost CMS login page.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after navigation.
   */
  async visit() {
    await this.page.goto(this.ghostUrl);
    await this.page.waitForTimeout(timeoutConfig);
    await this.page.screenshot({
      path: this.screenshotDirectoryEscenario + "signInPage.png",
    });
  }

  /**
   * Logs in with the provided email and password.
   * @param {string} email - The email address for login.
   * @param {string} password - The password for login.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after successful login.
   * @throws Will throw an error if login fails.
   */
  async login(email, password) {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "startLogin.png",
      });
      // Reset input fields
      await this.page.evaluate(() => {
        document.querySelector("#identification").value = "";
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "emptyIdentification.png",
      });
      // Type the email
      const idField = await this.page.$("#identification");
      await idField.type(email);
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "emailInput.png",
      });
      // Type the password
      const passwordField = await this.page.$("#password");
      await passwordField.type(password);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "passwordInput.png",
      });

      // Click on login button
      await Promise.resolve(this.page.click("#ember5"));
      await this.page.waitForTimeout(timeoutConfig);

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

  /**
   * Initiates the process to reset the password for the provided email.
   * @param {string} email - The email address associated with the account for password reset.
   * @returns {Promise<object>} - A Promise resolving to the Puppeteer page object after initiating the password reset process.
   * @throws Will throw an error if the password reset process fails.
   */
  async forgotPassword(email) {
    try {
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "forgotPassword.png",
      });
      // Reset input fields
      await this.page.evaluate(() => {
        document.querySelector("#identification").value = "";
      });
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "emptyId.png",
      });
      // Type the email
      const idField = await this.page.$("#identification");
      await idField.type(email);

      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "fillInputs.png",
      });

      // Click on forgot button
      await Promise.resolve(this.page.click("#ember4"));

      // Wait for the password reset confirmation or error
      await this.page.waitForFunction(
        'document.querySelector(".main-error") && document.querySelector(".main-error").offsetHeight > 0'
      );
      await this.page.screenshot({
        path: this.screenshotDirectoryEscenario + "resetError.png",
      });
      // Wait for the password reset button to be visible
      await this.page.waitForFunction(
        () => {
          const button = document.querySelector("#ember4 span");
          return button && button.innerText.toLowerCase().includes("forgot");
        },
        { timeout: timeoutConfig + 120000 }
      );

      await new Promise((r) => setTimeout(r, timeoutConfig));

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
