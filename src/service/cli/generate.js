'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  messageColor
} = require(`../../utils`);
const {
  ExitCode
} = require(`../../constants`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;


const DEFAULT_COUNT = 1;
const MAX_OFFERS_AMOUNT = 1000;
const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = (num) => {
  return num < 10 ? `item0${num}.jpg` : `item${num}.jpg`;
};

const getMockCategories = (categories) => {
  let newArr = [...categories];
  const ITEMS_TO_REMOVE = getRandomInt(1, newArr.length);
  for (let i = 1; i < ITEMS_TO_REMOVE; i++) {
    newArr.splice(getRandomInt(0, newArr.length), 1);
  }
  return newArr;
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    category: getMockCategories(categories),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (e) {
    console.error(e);
    return []
  }
};


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS_AMOUNT) {
      console.log(chalk[messageColor.error](`Не больше ${MAX_OFFERS_AMOUNT} объявлений`));
      process.exit(ExitCode.error);
    }
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    await fs.writeFile(FILE_NAME, content, (err) => {
      return err ? console.error(chalk[messageColor.error](`Can't write data to file...`)) : console.info(chalk[messageColor.success](`Operation success. File created.`));
    });
  }
};
