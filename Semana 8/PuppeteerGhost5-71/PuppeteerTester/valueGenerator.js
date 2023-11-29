const { faker } = require("@faker-js/faker");
const linesQuantity = 29;
const RANDOM_CHARACTERS_FILE = "./mockarooCSV/randomCharacters.csv";
const RANDOM_YOUTUBE_FILE = "./mockarooCSV/youtubeRandom.csv";
const LIST_YOUTUBE_FILE = "./mockarooCSV/youtubeList.csv";
const LONG_STRINGS_FILE = "./mockarooCSV/longStrings.csv";
const CAR_LIST_FILE = "./mockarooCSV/carList.csv";
const DESCRIPTIONS_FILE = "./mockarooCSV/descriptions.csv";
const TITLE_DESCRIPTION =
  "https://my.api.mockaroo.com/title_description.json?key=8d863b40";
const NO_TITLE_DESCRIPTION =
  "https://my.api.mockaroo.com/title_description_blank_title.json?key=8d863b40";
const NO_TITLE_DESCRIPTION_EDIT =
  "https://my.api.mockaroo.com/title_description_blank_title_edit.json?key=8d863b40";
const TITLE_DESCRIPTION_EDIT =
  "https://my.api.mockaroo.com/title_description_edit.json?key=8d863b40";

const restrictedWords = ["ghost"];
class ValueGenerator {
  constructor() {}
  generateString = () => {
    return faker.lorem.sentences(2);
  };

  generateSpecialCharacters = () => {
    return this.readFile(RANDOM_CHARACTERS_FILE)[
      faker.number.int(linesQuantity)
    ];
  };

  generateFutureDate = () => {
    return faker.date.future().toISOString().split("T")[0];
  };
  generatePastDate = () => {
    return faker.date.past().toISOString().split("T")[0];
  };

  generateStringDate = () => {
    return faker.date.past().toDateString();
  };

  generateYoutubeUrlInvalid = () => {
    return this.readFile(RANDOM_YOUTUBE_FILE)[faker.number.int(linesQuantity)];
  };

  generateLongString = () => {
    return this.readFile(LONG_STRINGS_FILE)[faker.number.int(linesQuantity)];
  };

  getEmptyString = () => {
    return "";
  };

  getRestrictedWord = () => {
    return restrictedWords[faker.number.int(restrictedWords.length) - 1];
  };

  generateWord = () => {
    return faker.lorem.word();
  };

  generateDateWrongMonth = () => {
    return "2023-45-45";
  };

  getURLYoutube = () => {
    return this.readFile(LIST_YOUTUBE_FILE)[faker.number.int(linesQuantity)];
  };

  getRandomTitle = () => {
    return this.readFile(CAR_LIST_FILE)[faker.number.int(linesQuantity)];
  };

  getRandomDescription = () => {
    return this.readFile(DESCRIPTIONS_FILE)[faker.number.int(linesQuantity)];
  };

  getTitleDescription = async () => {
    return await this.generateDataAPI(TITLE_DESCRIPTION);
   };
  getTitleDescriptionEdit = async () => {
    return await this.generateDataAPI(TITLE_DESCRIPTION_EDIT);
  };
  getBlankTitleDescription = async () => {
    return await this.generateDataAPI(NO_TITLE_DESCRIPTION);
  };
  getBlankTitleDescriptionEdit = async () => {
    return await this.generateDataAPI(NO_TITLE_DESCRIPTION_EDIT);
  };
  readFile = (fileName) => {
    const fs = require("fs");
    const file = fs.readFileSync(fileName, "utf-8");
    const lines = [];
    for (const line of file.split("\n")) {
      lines.push(line);
    }
    return lines;
  };

  generateDataAPI = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };
}
module.exports = ValueGenerator;
