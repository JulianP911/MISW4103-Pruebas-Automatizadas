const { faker } = require("@faker-js/faker");
const linesQuantity = 29;
const RANDOM_CHARACTERS_FILE = "./mockarooCSV/randomCharacters.csv";
const RANDOM_YOUTUBE_FILE = "./mockarooCSV/youtubeRandom.csv";
const LIST_YOUTUBE_FILE = "./mockarooCSV/youtubeList.csv";
const LONG_STRINGS_FILE = "./mockarooCSV/longStrings.csv";
const restrictedWords = ["ghost"];
class ValueGenerator{
    constructor(){
    }
  generateString = () => {
    return faker.lorem.sentences(2);
  };

  generateSpecialCharacters= () => {
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
    return this.readFile(RANDOM_YOUTUBE_FILE)[
        faker.number.int(linesQuantity)
      ];
  };

  generateLongString = () => {
    return this.readFile(LONG_STRINGS_FILE)[
        faker.number.int(linesQuantity)
      ];
  };

  getEmptyString=()=>{
    return "";
  }

  getRestrictedWord=()=>{
    return restrictedWords[faker.number.int(restrictedWords.length)-1];
  }

  generateWord = () => {
    return faker.lorem.word();
  };

  generateDateWrongMonth = () => {
    return "2023-45-45";
  }

  getURLYoutube = () =>{
    return this.readFile(LIST_YOUTUBE_FILE)[
        faker.number.int(linesQuantity)
      ];
  }

  readFile = (fileName) => {
    const fs = require("fs");
    const file = fs.readFileSync(fileName, "utf-8");
    const lines = [];
    for (const line of file.split("\n")) {
      lines.push(line);
    }
    return lines;
  };

}
module.exports=ValueGenerator;