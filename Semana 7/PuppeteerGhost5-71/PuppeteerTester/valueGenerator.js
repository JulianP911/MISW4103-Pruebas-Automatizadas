const { faker } = require("@faker-js/faker");
const linesQuantity = 29;
const RANDOM_CHARACTERS_FILE = "./mockarooCSV/randomCharacters.csv";
//const RANDOM_CHARACTERS_FILE = "./mockarooCSV/randomCharacters.csv";
//const RANDOM_CHARACTERS_FILE = "./mockarooCSV/randomCharacters.csv";

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
    //mokaroo
  };

  generateLongString = () => {
    //mokaroo
  };

  generateWord = () => {
    return faker.lorem.word();
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

}
module.exports=ValueGenerator;