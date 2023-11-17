const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require("chai").expect;
const { takeCustomScreenshot } = require("./customScreenshot.js");


Given('I login email {kraken-string} and password {kraken-string}', async function (email, password) {
    let elementEmail = await this.driver.$('#identification');
    await elementEmail.setValue(email);

    let elementPassword = await this.driver.$('#password');
    await elementPassword.setValue(password);

    await takeCustomScreenshot(this.driver, "loginComplete", null);

    let elementLogin = await this.driver.$('#ember5');
    await elementLogin.click();
});

Given('I see post published before edited', async function() {
    let element = await this.driver.$('.gh-post-list-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
    await takeCustomScreenshot(this.driver, "postPublishedBeforeEdited", null);
});

Given('I see page drafted before edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas");
    await takeCustomScreenshot(this.driver, "pageDraftedBeforeEdited", null);
});

Given('I see tag created before edited', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Animales");
    await takeCustomScreenshot(this.driver, "tagCreatedBeforeEdited", null);
});

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    await element.setValue(email);
    await takeCustomScreenshot(this.driver, "enterEmail", null);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    await element.setValue(password);
    await takeCustomScreenshot(this.driver, "enterPassword", null);
});

When('I click sign in', async function() {
    let element = await this.driver.$('#ember5');
    await takeCustomScreenshot(this.driver, "clickSignIn", null);
    await element.click();
});

When('I click Forgot?', async function() {
    let element = await this.driver.$('#ember4');
    await takeCustomScreenshot(this.driver, "clickForgot", null);
    await element.click();
});

When('I click posts', async function() {
    let element = await this.driver.$('a[href="#/posts/"]');
    await takeCustomScreenshot(this.driver, "clickPosts", null);
    await element.click();
});

When('I click new post', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    await takeCustomScreenshot(this.driver, "clickNewPost", null);
    await element.click();
});

When('I enter post title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    await element.setValue(title);
    await takeCustomScreenshot(this.driver, "enterPostTitle", null);
});

When('I enter post description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    await element.setValue(description);
    await takeCustomScreenshot(this.driver, "enterPostDescription", null);
});

When('I click publish', async function() {
    let element = await this.driver.$('span=Publish');
    await takeCustomScreenshot(this.driver, "clickPublish", null);
    await element.click();
});

When('I click continue, final review', async function() {
    let element = await this.driver.$('button[data-test-button="continue"]');
    await takeCustomScreenshot(this.driver, "clickContinueFinalReview", null);
    await element.click();
});

When('I click publish post, right now', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    await takeCustomScreenshot(this.driver, "clickPublishPostRightNow", null);
    await element.click();
});

When('I click editor', async function() {
    let element = await this.driver.$('button.gh-publish-back-button');
    await takeCustomScreenshot(this.driver, "clickEditor", null);
    await element.click();
});

When('I click back posts', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    await takeCustomScreenshot(this.driver, "clickBackPosts", null);
    await element.click();
});

When('I click dropdown right now', async function() {
    let element = await this.driver.$('div[data-test-setting="publish-at"]');
    await takeCustomScreenshot(this.driver, "clickDropdownRightNow", null);
    await element.click();
});

When('I enter utc hour {kraken-string}', async function (utc) {
    let element = await this.driver.$('.gh-date-time-picker-time  ');
    await element.setValue(utc);
    await takeCustomScreenshot(this.driver, "enterUTCHour", null);
});

When('I click schedule for later', async function() {
    let element = await this.driver.$('label=Schedule for later');
    await takeCustomScreenshot(this.driver, "clickScheduleForLater", null);
    await element.click();
});

When('I click publish post in future', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    await takeCustomScreenshot(this.driver, "clickPublishPostInFuture", null);
    await element.click();
});

When('I click tags', async function() {
    let element = await this.driver.$('a[href="#/tags/"]');
    await takeCustomScreenshot(this.driver, "clickTags", null);
    await element.click();
});

When('I click new tag', async function() {
    let element = await this.driver.$('a[href="#/tags/new/"]');
    await takeCustomScreenshot(this.driver, "clickNewTag", null);
    await element.click();
});

When('I enter tag name {kraken-string}', async function (name) {
    let element = await this.driver.$('#tag-name');
    await takeCustomScreenshot(this.driver, "enterTagName", null);
    await element.setValue(name);
});

When('I enter tag description {kraken-string}', async function (description) {
    let element = await this.driver.$('#tag-description');
    await takeCustomScreenshot(this.driver, "enterTagDescription", null);
    await element.setValue(description);
});

When('I enter color {kraken-string}', async function (color) {
    let element = await this.driver.$('input[placeholder="15171A"');
    await takeCustomScreenshot(this.driver, "enterTagColor", null);
    await element.setValue(color);
});

When('I click save', async function () {
    let element = await this.driver.$('span[data-test-task-button-state="idle"]');
    await takeCustomScreenshot(this.driver, "clickSave", null);
    await element.click();
});

When('I click internal tags', async function () {
    let element = await this.driver.$('button[data-test-tags-nav="internal"]');
    await takeCustomScreenshot(this.driver, "clickInternalTags", null);
    await element.click();
});

When('I click members', async function() {
    let element = await this.driver.$('a[href="#/members/"]');
    await takeCustomScreenshot(this.driver, "clickMembers", null);
    await element.click();
});

When('I click new member', async function() {
    let element = await this.driver.$('a[href="#/members/new/"]');
    await takeCustomScreenshot(this.driver, "clickNewMember", null);
    await element.click();
});

When('I enter member name {kraken-string}', async function (name) {
    let element = await this.driver.$('#member-name');
    await takeCustomScreenshot(this.driver, "enterMemberName", null);
    await element.setValue(name);
});

When('I enter member email {kraken-string}', async function (email) {
    let element = await this.driver.$('#member-email')
    await takeCustomScreenshot(this.driver, "enterMemberEmail", null);
    await element.setValue(email);
});

When('I enter member note {kraken-string}', async function (note) {
    let element = await this.driver.$('#member-note');
    await takeCustomScreenshot(this.driver, "enterMemberNote", null);
    await element.setValue(note);
});

When('I click pages', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    await takeCustomScreenshot(this.driver, "clickPages", null);
    await element.click();
});

When('I click new page', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    await takeCustomScreenshot(this.driver, "clickNewPage", null);
    await element.click();
});

When('I enter page title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    await takeCustomScreenshot(this.driver, "enterPageTitle", null);
    await element.setValue(title);
});

When('I enter page description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    await takeCustomScreenshot(this.driver, "enterPageDescription", null);
    await element.setValue(description);
});

When('I click back pages', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    await takeCustomScreenshot(this.driver, "clickBackPages", null);
    await element.click();
});

When('I click post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    await takeCustomScreenshot(this.driver, "clickPostPublished", null);
    await element.click();
});

When('I click update', async function() {
    let element = await this.driver.$('button[data-test-button="publish-save"]');
    await takeCustomScreenshot(this.driver, "clickUpdate", null);
    await element.click();
});

When('I click member created', async function() {
    let element = await this.driver.$('a[data-test-table-data="details"]');
    await takeCustomScreenshot(this.driver, "clickMemberCreated", null);
    await element.click();
});

When('I click page drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    await takeCustomScreenshot(this.driver, "clickPageDrafted", null);
    await element.click();
});

When('I click settings post', async function() {
    let element = await this.driver.$('button[title="Settings"]');
    await takeCustomScreenshot(this.driver, "clickSettingsPost", null);
    await element.click();
});

When('I click settings tags', async function() {
    let element = await this.driver.$('input[type="search"]');
    await takeCustomScreenshot(this.driver, "clickSettingsTags", null);
    await element.click();
});

When('I select first tag', async function() {
    let element = await this.driver.$('li[data-option-index="0"]');
    await takeCustomScreenshot(this.driver, "selectFirstTag", null);
    await element.click();
});

When('I click all tags', async function() {
    let element = await this.driver.$('span=All tags');
    await takeCustomScreenshot(this.driver, "clickAllTags", null);
    await element.click();
});

When('I click tag animales', async function() {
    let element = await this.driver.$('li[data-option-index="1"]');
    await takeCustomScreenshot(this.driver, "clickTagAnimales", null);
    await element.click();
});

When('I click deleted post', async function() {
    let element = await this.driver.$('button.gh-btn-outline');
    await takeCustomScreenshot(this.driver, "clickDeletedPost", null);
    await element.click();
});

When('I click tag created', async function() {
    let element = await this.driver.$('.gh-tag-list-name');
    await takeCustomScreenshot(this.driver, "clickTagCreated", null);
    await element.click();
});

Then('I check in dashboard', async function() {
    let element = await this.driver.$('#ember16');
    await takeCustomScreenshot(this.driver, null, "checkInDashboard");
    await element.click();
});

Then('I see error for login in', async function() {
    let element = await this.driver.$('.main-error').getText();
    await takeCustomScreenshot(this.driver, null, "seeErrorForLogin");
    expect(element).to.contains("Please fill out the form to sign in.");
});

Then('I see error for forgot password', async function() {
    let element = await this.driver.$('.main-error').getText();
    await takeCustomScreenshot(this.driver, null, "seeErrorForForgotPassword");
    expect(element).to.contains("User not found.");
});

Then('I click published', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=published"]');
    await takeCustomScreenshot(this.driver, null, "clickPublished");
    await element.click();
});

Then('I see post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePostPublished");
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Then('I click drafts', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=draft"]');
    await takeCustomScreenshot(this.driver, null, "clickDrafts");
    await element.click();
});

Then('I see post drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePostDrafted");
    expect(element).to.contains("Mi primer blog de pruebas automatizadas borrador");
});

Then('I click scheduled', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=scheduled"]');
    await takeCustomScreenshot(this.driver, null, "clickScheduled");
    await element.click();
});

Then('I see post scheduled', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePostScheduled");
    expect(element).to.contains("Mi primer blog de pruebas automatizadas programado");
});

Then('I see public tag', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    await takeCustomScreenshot(this.driver, null, "seePublicTag");
    expect(element).to.contains("Animales");
});

Then('I see error for tag', async function() {
    let element = await this.driver.$('.response').getText();
    await takeCustomScreenshot(this.driver, null, "seeErrorForTag");
    expect(element).to.contains("You must specify a name for the tag.");
});

Then('I see internal tag', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    await takeCustomScreenshot(this.driver, null, "seeInternalTag");
    expect(element).to.contains("#Animales");
});

Then('I see member created', async function() {
    let element = await this.driver.$('.gh-members-list-email').getText();
    await takeCustomScreenshot(this.driver, null, "seeMemberCreated");
    expect(element).to.contains("ana@yopmail.com");
});

Then('I see error for member', async function() {
    let element = await this.driver.$('div.error').getText();
    await takeCustomScreenshot(this.driver, null, "seeErrorForMember");
    expect(element).to.contains("Please enter an email.");
});

Then('I see page drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePageDrafted");
    expect(element).to.contains("Mi primera página de pruebas automatizadas borrador");
});

Then('I see page published', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePagePublished");
    expect(element).to.contains("Mi primera página de pruebas automatizadas");
});

Then('I see page scheduled', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePageScheduled");
    expect(element).to.contains("Mi primera página de pruebas automatizadas programada");
});

Then('I see post edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePageEdited");
    expect(element).to.contains("Mi primer blog de pruebas automatizadas editado");
});

Then('I see member edited', async function() {
    let element = await this.driver.$('.gh-members-list-email').getText();
    await takeCustomScreenshot(this.driver, null, "seeMemberCreated");
    expect(element).to.contains("alba-edited@yopmail.com");
});

Then('I see page edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePageEdited");
    expect(element).to.contains("Mi primera página de pruebas automatizadas editada");
});

Then('I see post with correct tag', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePostWithCorrectTag");
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Then('I see post deleted not appear', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    await takeCustomScreenshot(this.driver, null, "seePostDeletedNotAppear");
    expect(element).not.contain("Mi primer blog de pruebas automatizadas");
});

Then('I confirm delete post', async function() {
    let element = await this.driver.$('span=Delete');
    await takeCustomScreenshot(this.driver, null, "confirmDeletePost");
    await element.click();
});

Then('I see tag edited', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    await takeCustomScreenshot(this.driver, null, "seeTagEdited");
    expect(element).to.contains("Anfibios");
});