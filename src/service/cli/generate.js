'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {messageColor} = require(`../../utils`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  ExitCode
} = require(`../../constants`);


const DEFAULT_COUNT = 1;
const MAX_OFFERS_AMOUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита`,
  `Куплю детские санки`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];


const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const getMockCategories = () => {
  let newArr = [...CATEGORIES];
  const ITEMS_TO_REMOVE = getRandomInt(1, newArr.length);
  for (let i = 1; i < ITEMS_TO_REMOVE; i++) {
    newArr.splice(getRandomInt(0, newArr.length), 1);
  }
  return newArr;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getMockCategories(),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS_AMOUNT) {
      console.log(chalk[messageColor.error](`Не больше ${MAX_OFFERS_AMOUNT} объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk[messageColor.success](`Operation success. File created.`))
    } catch (e) {
      console.error(chalk[messageColor.error](`Can't write data to file...`))
    }
  }
};
