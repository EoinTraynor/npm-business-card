#!/usr/bin/env node
const chalk = require('chalk');
const boxen = require('boxen');
const cardInfo = require('./cardConfig.json');

const title = chalk.hex('#a6d4fa');
const info = chalk.hex('#81a2be');

const cardTemplate = `
  ${title(cardInfo.name)} 👋
  ${cardInfo.jobTitle} @ ${cardInfo.company}

      Website:  ${info(cardInfo.website)}
      Github:   ${info(cardInfo.github)}
      Twitter:  ${info(cardInfo.twitter)}
      LinkedIn: ${info(cardInfo.linkedIn)}
      Email:    ${info(cardInfo.email)}
`;

const boxenConfig = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: '#8abeb7',
};

console.log(boxen(cardTemplate, boxenConfig));
