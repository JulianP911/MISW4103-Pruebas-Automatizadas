const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require("chai").expect;
const fs = require('fs');
const data = require('../../../properties.json')
const axios = require('axios')
const faker = require('faker')

var dataSchema;

async function getDataDynamic(schema){
    const httpClient = axios.create({
        baseURL: "https://my.api.mockaroo.com",
        timeout: 60000,
    });

    let extension;
    if(schema == '1'){
        extension = "/member.json?key=9a68cdb0"
    } else if (schema == '2') {
        extension = "/tag.json?key=9a68cdb0"
    } else if (schema == '3') {
        extension = "/user.json?key=9a68cdb0"
    }

    let { data } = await httpClient.get(extension);
    dataSchema = data;
}

Given('I login email {kraken-string} and password {kraken-string}', async function (email, password) {
    let elementEmail = await this.driver.$('#identification');
    await elementEmail.setValue(email);

    let elementPassword = await this.driver.$('#password');
    await elementPassword.setValue(password);

    let elementLogin = await this.driver.$('#ember5');
    await elementLogin.click();
});

Given('I see post published before edited', async function() {
    let element = await this.driver.$('.gh-post-list-title').getText();
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

Given('I load data member', async function() {
    await getDataDynamic('1');
});

Given('I load data tag', async function() {
    await getDataDynamic('2');
});

Given('I load data user', async function() {
    await getDataDynamic('3');
});

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    await element.setValue(password);
});

When('I click sign in', async function() {
    let element = await this.driver.$('#ember5');
    await element.click();
});

When('I click Forgot?', async function() {
    let element = await this.driver.$('#ember4');
    await element.click();
});

When('I click posts', async function() {
    let element = await this.driver.$('a[href="#/posts/"]');
    await element.click();
});

When('I click new post', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    await element.click();
});

When('I enter post title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    await element.setValue(title);
});

When('I enter post description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    await element.setValue(description);
});

When('I click publish', async function() {
    let element = await this.driver.$('span=Publish');
    await element.click();
});

When('I click continue, final review', async function() {
    let element = await this.driver.$('button[data-test-button="continue"]');
    await element.click();
});

When('I click publish post, right now', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    await element.click();
});

When('I click editor', async function() {
    let element = await this.driver.$('button.gh-publish-back-button');
    await element.click();
});

When('I click back posts', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    await element.click();
});

When('I click dropdown right now', async function() {
    let element = await this.driver.$('div[data-test-setting="publish-at"]');
    await element.click();
});

When('I enter utc hour {kraken-string}', async function (utc) {
    let element = await this.driver.$('.gh-date-time-picker-time  ');
    await element.setValue(utc);
});

When('I click schedule for later', async function() {
    let element = await this.driver.$('label=Schedule for later');
    await element.click();
});

When('I click publish post in future', async function() {
    let element = await this.driver.$('button.gh-btn-pulse');
    await element.click();
});

When('I click tags', async function() {
    let element = await this.driver.$('a[href="#/tags/"]');
    await element.click();
});

When('I click new tag', async function() {
    let element = await this.driver.$('a[href="#/tags/new/"]');
    await element.click();
});

When('I enter tag name {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#tag-name');
    if(scenario == '1'){
        await element.setValue(data["scenario_2"]["case_1"]["name"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_2"]["case_2"]["name"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_2"]["case_3"]["name"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_2"]["case_4"]["name"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_2"]["case_5"]["name"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_2"]["case_6"]["name"]);
    }
});

When('I enter tag name dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#tag-name');
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['name_tag']);
    } else if(scenario == '2'){
        await element.setValue("");
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['name_tag']);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[0]['name_tag']+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I enter tag description {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#tag-description');
    if(scenario == '1'){
        await element.setValue(data["scenario_2"]["case_1"]["description"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_2"]["case_2"]["description"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_2"]["case_3"]["description"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_2"]["case_4"]["description"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_2"]["case_5"]["description"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_2"]["case_6"]["description"]);
    }
});

When('I enter tag description dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#tag-description');
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['description_tag']);
    } else if(scenario == '2'){
        await element.setValue(dataSchema[0]['description_tag']);
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['description_tag']+dataSchema[0]['description_tag']+dataSchema[0]['description_tag']+dataSchema[0]['description_tag']+dataSchema[0]['description_tag']+dataSchema[0]['description_tag']+dataSchema[0]['description_tag']);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[1]['description_tag']+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I enter tag color {kraken-string}', async function (scenario) {
    let element = await this.driver.$('input[placeholder="15171A"');
    if(scenario == '1'){
        await element.setValue(data["scenario_2"]["case_1"]["color"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_2"]["case_2"]["color"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_2"]["case_3"]["color"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_2"]["case_4"]["color"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_2"]["case_5"]["color"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_2"]["case_6"]["color"]);
    }
});

When('I enter tag color dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('input[placeholder="15171A"');
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['color_tag'].split('#')[1]);
    } else if(scenario == '2'){
        await element.setValue(dataSchema[0]['color_tag'].split('#')[1]);
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['color_tag'].split('#')[1]);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[0]['color_tag'].split('#')[1]+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I click save', async function () {
    let element = await this.driver.$('span[data-test-task-button-state="idle"]');
    await element.click();
});

When('I click internal tags', async function () {
    let element = await this.driver.$('button[data-test-tags-nav="internal"]');
    await element.click();
});

When('I click members', async function() {
    let element = await this.driver.$('a[href="#/members/"]');
    await element.click();
});

When('I click new member', async function() {
    let element = await this.driver.$('a[href="#/members/new/"]');
    await element.click();
});

When('I enter member name {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-name');
    if(scenario == '1'){
        await element.setValue(data["scenario_1"]["case_1"]["name"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_1"]["case_2"]["name"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_1"]["case_3"]["name"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_1"]["case_4"]["name"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_1"]["case_5"]["name"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_1"]["case_6"]["name"]);
    }
});

When('I enter member name dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-name');
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['name_member']);
    } else if(scenario == '2'){
        await element.setValue("");
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['name_member']);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[0]['name_member']+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I enter member email {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-email')
    if(scenario == '1'){
        await element.setValue(data["scenario_1"]["case_1"]["email"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_1"]["case_2"]["email"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_1"]["case_3"]["email"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_1"]["case_4"]["email"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_1"]["case_5"]["email"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_1"]["case_6"]["email"]);
    } else {
        await element.setValue(scenario);
    }
});

When('I enter member email dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-email')
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['email_member']);
    } else if(scenario == '2'){
        await element.setValue(dataSchema[0]['email_member']);
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['email_member']);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[0]['email_member']+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I enter member note {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-note');
    if(scenario == '1'){
        await element.setValue(data["scenario_1"]["case_1"]["note"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_1"]["case_2"]["note"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_1"]["case_3"]["note"]);
    } else if(scenario == '4') {
        await element.setValue(data["scenario_1"]["case_4"]["note"]);
    } else if(scenario == '5') {
        await element.setValue(data["scenario_1"]["case_5"]["note"]);
    } else if(scenario == '6') {
        await element.setValue(data["scenario_1"]["case_6"]["note"]);
    }
});

When('I enter member note dynamic {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#member-note')
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['note_member']);
    } else if(scenario == '2'){
        await element.setValue("");
    } else if(scenario == '3'){
        await element.setValue("\t \n");
    } else if(scenario == '4'){
        await element.setValue(dataSchema[0]['note_member']+dataSchema[0]['note_member']+dataSchema[0]['note_member']+dataSchema[0]['note_member']+dataSchema[0]['note_member']+dataSchema[0]['note_member']+dataSchema[0]['note_member']);
    } else if(scenario == '5'){
        await element.setValue('#$%&%$#$%'+dataSchema[0]['note_member']+'#$%&%$#$%');
    } else if(scenario == '6'){
        await element.setValue("");
    }
});

When('I click pages', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    await element.click();
});

When('I click new page', async function() {
    let element = await this.driver.$('.view-actions-top-row');
    await element.click();
});

When('I enter page title {kraken-string}', async function (title) {
    let element = await this.driver.$('.gh-editor-title');
    await element.setValue(title);
});

When('I enter page description {kraken-string}', async function (description) {
    let element = await this.driver.$('.kg-prose');
    await element.setValue(description);
});

When('I click back pages', async function() {
    let element = await this.driver.$('.gh-editor-back-button');
    await element.click();
});

When('I click post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.click();
});

When('I click update', async function() {
    let element = await this.driver.$('button[data-test-button="publish-save"]');
    await element.click();
});

When('I click member created', async function() {
    let element = await this.driver.$('a[data-test-table-data="details"]');
    await element.click();
});

When('I click page drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.click();
});

When('I click settings post', async function() {
    let element = await this.driver.$('button[title="Settings"]');
    await element.click();
});

When('I click settings tags', async function() {
    let element = await this.driver.$('input[type="search"]');
    await element.click();
});

When('I select first tag', async function() {
    let element = await this.driver.$('li[data-option-index="0"]');
    await element.click();
});

When('I click all tags', async function() {
    let element = await this.driver.$('span=All tags');
    await element.click();
});

When('I click tag animales', async function() {
    let element = await this.driver.$('li[data-option-index="1"]');
    await element.click();
});

When('I click deleted post', async function() {
    let element = await this.driver.$('button.gh-btn-outline');
    await element.click();
});

When('I click tag created', async function() {
    let element = await this.driver.$('.gh-tag-list-name');
    await element.click();
});

When('I click member settings', async function() {
    let element = await this.driver.$('button[data-test-button="member-actions"]');
    await element.click();
});

When('I click delete member', async function() {
    let element = await this.driver.$('button[data-test-button="delete-member"]');
    await element.click();
});

When('I click delete tag', async function() {
    let element = await this.driver.$('button[data-test-button="delete-tag"]');
    await element.click();
});

When('I click settings page', async function() {
    let element = await this.driver.$('button[title="Settings"]');
    await element.click();
});

When('I click deleted page', async function() {
    let element = await this.driver.$('button.gh-btn-outline');
    await element.click();
});

When('I click page published', async function() {
    let element = await this.driver.$('.gh-content-entry-title');
    await element.click();
});

When('I click expand meta data', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/section/form/section/div[1]/div[1]/button');
    await element.click();
});

When('I click expand x', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/section/form/section/div[2]/div[1]/button');
    await element.click();
});

When('I click expand facebook', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/section/form/section/div[3]/div[1]/button');
    await element.click();
});

When('I enter tag meta title {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#meta-title');
    if(scenario == '1'){
        await element.setValue(data["scenario_3"]["case_1"]["title"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_3"]["case_2"]["title"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_3"]["case_3"]["title"]);
    }
});

When('I enter tag meta description {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#meta-description');
    if(scenario == '1'){
        await element.setValue(data["scenario_3"]["case_1"]["description"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_3"]["case_2"]["description"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_3"]["case_3"]["description"]);
    }
});

When('I enter tag meta url {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#canonical-url');
    if(scenario == '1'){
        await element.setValue(data["scenario_3"]["case_1"]["url"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_3"]["case_2"]["url"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_3"]["case_3"]["url"]);
    }
});

When('I enter tag x title {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#twitter-title');
    if(scenario == '1'){
        await element.setValue(data["scenario_4"]["case_1"]["title"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_4"]["case_2"]["title"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_4"]["case_3"]["title"]);
    }
});

When('I enter tag x description {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#twitter-description');
    if(scenario == '1'){
        await element.setValue(data["scenario_4"]["case_1"]["description"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_4"]["case_2"]["description"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_4"]["case_3"]["description"]);
    }
});

When('I enter tag facebook title {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#og-title');
    if(scenario == '1'){
        await element.setValue(data["scenario_5"]["case_1"]["title"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_5"]["case_2"]["title"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_5"]["case_3"]["title"]);
    }
});

When('I enter tag facebook description {kraken-string}', async function (scenario) {
    let element = await this.driver.$('#og-description');
    if(scenario == '1'){
        await element.setValue(data["scenario_5"]["case_1"]["description"]);
    } else if(scenario == '2') {
        await element.setValue(data["scenario_5"]["case_2"]["description"]);
    } else if(scenario == '3') {
        await element.setValue(data["scenario_5"]["case_3"]["description"]);
    }
});

When('I click user', async function() {
    let element = await this.driver.$('.gh-user-avatar');
    await element.click();
});

When('I click your profile', async function() {
    let element = await this.driver.$('a[href="#/settings/staff/prueba/"]');
    await element.click();
});

When('I enter user location {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['ubication_user']);
    } else if(scenario == '2') {
        await element.setValue("");
    } else if(scenario == '3') {
        await element.setValue("\t \n");
    } else if(scenario == '4') {
        await element.setValue(dataSchema[0]['ubication_user']);
    } else if(scenario == '5') {
        await element.setValue('#$%&%$#$%'+dataSchema[0]['ubication_user']+'#$%&%$#$%');
    } else if(scenario == '6') {
        await element.setValue("");
    }
});

When('I enter user website {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['website_user']);
    } else if(scenario == '2') {
        await element.setValue("");
    } else if(scenario == '3') {
        await element.setValue("\t \n");
    } else if(scenario == '4') {
        await element.setValue(dataSchema[0]['website_user']);
    } else if(scenario == '5') {
        await element.setValue('#$%&%$#$%'+dataSchema[0]['website_user']+'#$%&%$#$%');
    } else if(scenario == '6') {
        await element.setValue("");
    }
});

When('I enter user facebook {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[3]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['facebook_user']);
    } else if(scenario == '2') {
        await element.setValue(dataSchema[0]['facebook_user']);
    } else if(scenario == '3') {
        await element.setValue("\t \n");
    } else if(scenario == '4') {
        await element.setValue(dataSchema[0]['facebook_user']);
    } else if(scenario == '5') {
        await element.setValue('#$%&%$#$%'+dataSchema[0]['facebook_user']+'#$%&%$#$%');
    } else if(scenario == '6') {
        await element.setValue("");
    }
});

When('I enter user bio {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[5]/textarea');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1'){
        await element.setValue(dataSchema[0]['bio_user']);
    } else if(scenario == '2') {
        await element.setValue(dataSchema[0]['bio_user']);
    } else if(scenario == '3') {
        await element.setValue("\t \n");
    } else if(scenario == '4') {
        await element.setValue(dataSchema[0]['bio_user']+dataSchema[0]['bio_user']+dataSchema[0]['bio_user']+dataSchema[0]['bio_user']+dataSchema[0]['bio_user']+dataSchema[0]['bio_user']);
    } else if(scenario == '5') {
        await element.setValue('#$%&%$#$%'+dataSchema[0]['bio_user']+'#$%&%$#$%');
    } else if(scenario == '6') {
        await element.setValue("");
    }
});

When('I click save and close', async function() {
    let element = await this.driver.$('span=Save & close');
    await element.click();
});

When('I click change password', async function() {
    let element = await this.driver.$('button=Change password');
    await element.click();
});

When('I enter old password valid', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue("prueba123456");
});

When('I enter old password invalid', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue(faker.internet.password());
});

When('I enter new password', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[3]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue(faker.internet.password());
});

When('I enter repeat new password', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[4]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue(faker.internet.password());
});

When('I enter old password empty', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue("");
});

When('I enter new password empty', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[3]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue("");
});

When('I enter repeat new password empty', async function () {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[4]/section/div[1]/div/div[2]/div[4]/div[4]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    await element.setValue("");
});

When('I click general settings', async function() {
    let element = await this.driver.$('a[data-test-nav="settings"]');
    await element.click();
});

When('I click title and description', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div[2]/div[2]/div/button/span');
    await element.click();
});

When('I click publication language', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[2]/div/button/span');
    await element.click();
});

When('I click meta data', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[4]/div[2]/div[2]/div/button/span');
    await element.click();
});

When('I click save web site', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div[2]/div[2]/div/button[2]');
    await element.click();
});

When('I enter title web site {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div[3]/div[1]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1') {
        await element.setValue(faker.lorem.words(2));
    } else if (scenario == '2') {
        await element.setValue("");
    } else if (scenario == '3') {
        await element.setValue("\t \n"+faker.lorem.words(2));
    } else if (scenario == '4') {
        await element.setValue(faker.lorem.words(2));
    } else if (scenario == '5') {
        await element.setValue('#$%&%$#$%'+faker.lorem.words(2)+'#$%&%$#$%');
    } else if (scenario == '6') {
        await element.setValue("");
    }
});

When('I enter description web site {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[1]/div[3]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1') {
        await element.setValue(faker.lorem.paragraphs());
    } else if (scenario == '2') {
        await element.setValue(faker.lorem.paragraphs());
    } else if (scenario == '3') {
        await element.setValue("\t \n"+faker.lorem.paragraphs());
    } else if (scenario == '4') {
        await element.setValue(faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs());
    } else if (scenario == '5') {
        await element.setValue('#$%&%$#$%'+faker.lorem.paragraphs()+'#$%&%$#$%');
    } else if (scenario == '6') {
        await element.setValue("");
    }
});

When('I click save publication lenguage', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]/div[2]/div/button[2]');
    await element.click();
});

When('I enter language web site {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[3]/div[3]/div/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    const languageAbbreviations = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'zh', 'ru', 'ar', 'pt'];
    if(scenario == '1') {
        await element.setValue(faker.random.arrayElement(languageAbbreviations));
    } else if (scenario == '2') {
        await element.setValue("\t \n"+faker.random.arrayElement(languageAbbreviations));
    } else if (scenario == '3') {
        await element.setValue("");
    } else if (scenario == '4') {
        await element.setValue(faker.random.arrayElement(languageAbbreviations)+faker.random.arrayElement(languageAbbreviations)+faker.random.arrayElement(languageAbbreviations)+faker.random.arrayElement(languageAbbreviations));
    } else if (scenario == '5') {
        await element.setValue('#$%&%$#$%'+faker.random.arrayElement(languageAbbreviations)+'#$%&%$#$%');
    }
});

When('I click save meta data', async function() {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[4]/div[2]/div[2]/div/button[2]');
    await element.click();
});

When('I enter title meta data {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[4]/div[4]/div[1]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1') {
        await element.setValue(faker.lorem.words(2));
    } else if (scenario == '2') {
        await element.setValue(faker.lorem.words(2));
    } else if (scenario == '3') {
        await element.setValue("");
    } else if (scenario == '4') {
        await element.setValue("\t \n"+faker.lorem.words(2));
    } else if (scenario == '5') {
        await element.setValue(faker.lorem.words(2));
    } else if (scenario == '6') {
        await element.setValue('#$%&%$#$%'+faker.lorem.words(2)+'#$%&%$#$%');
    } else if (scenario == '7') {
        await element.setValue("");
    }
});

When('I enter description meta data {kraken-string}', async function (scenario) {
    let element = await this.driver.$('/html/body/div[2]/div/main/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[4]/div[4]/div[2]/div/input');
    const selectorValue = await element.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    element.setValue(backSpaces);
    if(scenario == '1') {
        await element.setValue(faker.lorem.paragraphs());
    } else if (scenario == '2') {
        await element.setValue("");
    } else if (scenario == '3') {
        await element.setValue(faker.lorem.paragraphs());
    } else if (scenario == '4') {
        await element.setValue("\t \n"+faker.lorem.paragraphs());
    } else if (scenario == '5') {
        await element.setValue(faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs()+faker.lorem.paragraphs());
    } else if (scenario == '6') {
        await element.setValue('#$%&%$#$%'+faker.lorem.paragraphs()+'#$%&%$#$%');
    } else if (scenario == '7') {
        await element.setValue("");
    }
});


Then('I check in dashboard', async function() {
    let element = await this.driver.$('#ember16');
    await element.click();
});

Then('I see error for login in', async function() {
    let element = await this.driver.$('.main-error').getText();
    expect(element).to.contains("Please fill out the form to sign in.");
});

Then('I see error for forgot password', async function() {
    let element = await this.driver.$('.main-error').getText();
    expect(element).to.contains("User not found.");
});

Then('I click published', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=published"]');
    await element.click();
});

Then('I see post published', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas");
});

Then('I click drafts', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=draft"]');
    await element.click();
});

Then('I see post drafted', async function() {
    let element = await this.driver.$('.gh-content-entry-title').getText();
    expect(element).to.contains("Mi primer blog de pruebas automatizadas borrador");
});

Then('I click scheduled', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=scheduled"]');
    await element.click();
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

Then('I see member duplicate', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Member already exists.");
});

Then('I see member error email', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Invalid Email.");
});

Then('I see member error note', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Note is too long.");
});

Then('I see member error email empty', async function() {
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
    await element.click();
});

Then('I see tag edited', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Anfibios");
});

Then('I confirm delete member', async function() {
    let element = await this.driver.$('span=Delete member');
    await element.click();
});

Then('I confirm delete tag', async function() {
    let element = await this.driver.$('span=Delete');
    await element.click();
});

Then('I confirm delete page', async function() {
    let element = await this.driver.$('span=Delete');
    await element.click();
});

Then('I see error tag name', async function() {
    let element = await this.driver.$('span.error').getText();
    expect(element).to.contains("You must specify a name for the tag.");
});

Then('I see error tag color', async function() {
    let element = await this.driver.$('span.error').getText();
    expect(element).to.contains("The colour should be in valid hex format");
});

Then('I see error tag description', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Description cannot be longer than 500 characters");
});

Then('I see error tag meta data url', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("The url should be a valid url");
});

Then('I see error tag meta data description', async function() {
    let element = await this.driver.$('div.error').getText();
    expect(element).to.contains("Meta Description cannot be longer than 500 characters");
});

Then('I see error tag x description', async function() {
    let element = await this.driver.$('div.gh-alert-content').getText();
    expect(element).to.contains("Validation error, cannot save tag. Validation failed for twitter_description");
});

Then('I see error tag facebook description', async function() {
    let element = await this.driver.$('div.gh-alert-content').getText();
    expect(element).to.contains("Validation error, cannot save tag. Validation failed for og_description");
});

Then('I see tag edited dynamic', async function() {
    let element = await this.driver.$(`h3=${dataSchema[0]['name_tag']}`).getText();
    expect(element).to.contains(`${dataSchema[0]['name_tag']}`);
});

Then('I see tag edited name dynamic', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Animales");
});

Then('I see tag edited name, description and color dynamic', async function() {
    let element = await this.driver.$('.gh-tag-list-name').getText();
    expect(element).to.contains("Animales");
});

Then('I see member edited dynamic', async function() {
    let element = await this.driver.$(`h3=${dataSchema[0]['name_member']}`).getText();
    expect(element).to.contains(`${dataSchema[0]['name_member']}`);
});

Then('I see member edited email dynamic', async function() {
    let element = await this.driver.$(`h3=${dataSchema[0]['email_member']}`).getText();
    expect(element).to.contains(`${dataSchema[0]['email_member']}`);
});

Then('I check in general setting', async function() {
    let element = await this.driver.$('h2=General settings');
    await element.click();
});

Then('I see error user update', async function() {
    let element = await this.driver.$('div[data-testid="toast-error"]').getText();
    expect(element).to.contains("Can't save user, please double check that you've filled all mandatory fields");
});

Then('I see error do not match password', async function() {
    let element = await this.driver.$('span.text-red').getText();
    expect(element).to.contains("Your new passwords do not match");
});

Then('I see error do not empty password', async function() {
    let element = await this.driver.$('span.text-red').getText();
    expect(element).to.contains("Your current password is required to set a new one");
});

Then('I see changes in title and description web site', async function() {
    let element = await this.driver.$('div[data-testid="title-and-description"]');
    element.click()
});

Then('I see changes in publication lenguage', async function() {
    let element = await this.driver.$('div[data-testid="publication-language"]');
    element.click()
});

Then('I see changes in meta data', async function() {
    let element = await this.driver.$('div[data-testid="metadata"]');
    element.click()
});
