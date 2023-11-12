const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require("chai").expect;

Given('I login email {kraken-string} and password {kraken-string}', async function (email, password) {
    let elementEmail = await this.driver.$('#identification');
    await elementEmail.setValue(email);

    let elementPassword = await this.driver.$('#password');
    await elementPassword.setValue(password);

    let elementLogin = await this.driver.$('#ember5');
    return await elementLogin.click();
});

Given('I see post published before edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Given('I see page drafted before edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas");
});

Given('I see tag created before edited', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Animales");
});

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click sign in', async function() {
    let element = await this.driver.$('#ember5');
    return await element.click();
});

When('I click Forgot?', async function() {
    let element = await this.driver.$('#ember4');
    return await element.click();
});

When('I click posts', async function() {
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();
});

When('I click new post', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    return await element.click();
});

When('I enter post title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    return await element.setValue(title);
});

When('I enter post description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    return await element.setValue(description);
});

When('I click publish', async function() {
    let element = await this.driver.$('.gh-publish-trigger');
    return await element.click();
});

When('I click continue, final review', async function() {
    let element = await this.driver.$('div.gh-publish-cta');
    return await element.click();
});

When('I click publish post, right now', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    return await element.click();
});

When('I click editor', async function() {
    let element = await this.driver.$('button.gh-publish-back-button');
    return await element.click();
});

When('I click back posts', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    return await element.click();
});

When('I click dropdown right now', async function() {
    let element = await this.driver.$('div[data-test-setting="publish-at"');
    return await element.click();
});

When('I enter utc hour {kraken-string}', async function (utc) {
    let element = await this.driver.$('.gh-date-time-picker-time  ');
    return await element.setValue(utc);
});

When('I click schedule for later', async function() {
    let element = await this.driver.$('label=Schedule for later');
    return await element.click();
});

When('I click publish post in future', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    return await element.click();
});

When('I click tags', async function() {
    let element = await this.driver.$('a[href="#/tags/"]');
    return await element.click();
});

When('I click new tag', async function() {
    let element = await this.driver.$('a[href="#/tags/new/"]');
    return await element.click();
});

When('I enter tag name {kraken-string}', async function (name) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(name);
});

When('I enter tag description {kraken-string}', async function (description) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(description);
});

When('I enter color {kraken-string}', async function (color) {
    let element = await this.driver.$('input[placeholder="15171A"');
    return await element.setValue(color);
});

When('I click save', async function () {
    let element = await this.driver.$('span[data-test-task-button-state="idle"]');
    return await element.click();
});

When('I click internal tags', async function () {
    let element = await this.driver.$('button[data-test-tags-nav="internal"]');
    return await element.click();
});

When('I click members', async function() {
    let element = await this.driver.$('a[href="#/members/"]');
    return await element.click();
});

When('I click new member', async function() {
    let element = await this.driver.$('a[href="#/members/new/"]');
    return await element.click();
});

When('I enter member name {kraken-string}', async function (name) {
    let element = await this.driver.$('#member-name');
    return await element.setValue(name);
});

When('I enter member email {kraken-string}', async function (email) {
    let element = await this.driver.$('#member-email');
    return await element.setValue(email);
});

When('I enter member note {kraken-string}', async function (note) {
    let element = await this.driver.$('#member-note');
    return await element.setValue(note);
});

When('I click pages', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

When('I click new page', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    return await element.click();
});

When('I enter page title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    return await element.setValue(title);
});

When('I enter page description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    return await element.setValue(description);
});

When('I click back pages', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    return await element.click();
});

When('I click post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    return await element.click();
});

When('I click update', async function() {
    let element = await this.driver.$('button[data-test-button="publish-save"]');
    return await element.click();
});

When('I click member created', async function() {
    let element = await this.driver.$('a[data-test-table-data="details"]');
    return await element.click();
});

When('I click page drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    return await element.click();
});

When('I click settings post', async function() {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

When('I click settings tags', async function() {
    let element = await this.driver.$('input[type="search"]');
    return await element.click();
});

When('I select first tag', async function() {
    let element = await this.driver.$('li[data-option-index="0"]');
    return await element.click();
});

When('I click all tags', async function() {
    let element = await this.driver.$('span=All tags');
    return await element.click();
});

When('I click tag animales', async function() {
    let element = await this.driver.$('li[data-option-index="1"]');
    return await element.click();
});

When('I click deleted post', async function() {
    let element = await this.driver.$('button.gh-btn-outline');
    return await element.click();
});

When('I click tag created', async function() {
    let element = await this.driver.$('.gh-tag-list-name');
    return await element.click();
});

Then('I check in dashboard', async function() {
    let element = await this.driver.$('#ember16');
    return await element.click();
});

Then('I see error for login in', async function() {
    let element = await this.driver.$('.main-error').getText();
    expect(element).to.contains("Please fill out the form to sign in.");
});

Then('I see error for forgot password', async function() {
    let element = await this.driver.$('.main-error').getText();
    expect(element).to.contains("Failed to send email. Reason: Sending failed.");
});

Then('I click published', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=published"]');
    return await element.click();
});

Then('I see post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Then('I click drafts', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=draft"]');
    return await element.click();
});

Then('I see post drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas borrador");
});

Then('I click scheduled', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=scheduled"]');
    return await element.click();
});

Then('I see post scheduled', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas programado");
});

Then('I see public tag', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Animales");
});

Then('I see error for tag', async function() {
    let element = await this.driver.$('.response').getText();
    expect(element).to.contains("You must specify a name for the tag.");
});

Then('I see internal tag', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("#Animales");
});

Then('I see member created', async function() {
    let element = await this.driver.$('.gh-members-list-email').getText();
    expect(element).to.contains("ana@yopmail.com");
});

Then('I see error for member', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Please enter an email.");
});

Then('I see page drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas borrador");
});

Then('I see page published', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas");
});

Then('I see page scheduled', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas programada");
});

Then('I see post edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas editado");
});

Then('I see member edited', async function() {
    let element = await this.driver.$('.gh-members-list-email').getText();
    expect(element).to.contains("alba-edited@yopmail.com");
});

Then('I see page edited', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primera página de pruebas automatizadas editada");
});

Then('I see post with correct tag', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Then('I see post deleted not appear', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).not.contain("Mi primer blog de pruebas automatizadas");
});

Then('I confirm delete post', async function() {
    let element = await this.driver.$('span=Delete');
    return await element.click();
});

Then('I see tag edited', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Anfibios");
});