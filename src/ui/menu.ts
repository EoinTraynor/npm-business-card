import { select } from '@inquirer/prompts';
import open from 'open';
import chalk from 'chalk';
import { cardConfig } from '../config.js';

/**
 * Runs an interactive arrow-key menu enabling the user to open links
 * in their default browser or view additional info.
 */
export async function runInteractiveMenu(): Promise<void> {
  while (true) {
    try {
      const choice = await select({
        message: chalk.hex('#e5e9f0')('What would you like to do?'),
        choices: [
          {
            name: `${chalk.hex('#61afef')('🌐')} Open Website`,
            value: 'website',
            description: cardConfig.links.website,
          },
          {
            name: `${chalk.hex('#98c379')('🐙')} Open GitHub`,
            value: 'github',
            description: cardConfig.links.github,
          },
          {
            name: `${chalk.hex('#61afef')('💼')} Open LinkedIn`,
            value: 'linkedin',
            description: cardConfig.links.linkedin,
          },
          {
            name: `${chalk.hex('#e5c07b')('🐦')} Open Twitter/X`,
            value: 'twitter',
            description: cardConfig.links.twitter,
          },
          {
            name: `${chalk.hex('#c678dd')('📄')} View About & Bio`,
            value: 'bio',
            description: 'Learn more about Eoin',
          },
          {
            name: `${chalk.hex('#e06c75')('🚪')} Exit`,
            value: 'exit',
            description: 'Close this card',
          },
        ],
      });

      switch (choice) {
        case 'website':
          console.log(chalk.hex('#61afef')(`\n  Opening ${cardConfig.links.website}...\n`));
          await open(cardConfig.links.website);
          break;
        case 'github':
          console.log(chalk.hex('#98c379')(`\n  Opening ${cardConfig.links.github}...\n`));
          await open(cardConfig.links.github);
          break;
        case 'linkedin':
          console.log(chalk.hex('#61afef')(`\n  Opening ${cardConfig.links.linkedin}...\n`));
          await open(cardConfig.links.linkedin);
          break;
        case 'twitter':
          console.log(chalk.hex('#e5c07b')(`\n  Opening ${cardConfig.links.twitter}...\n`));
          await open(cardConfig.links.twitter);
          break;
        case 'bio':
          console.log(
            `\n  ${chalk.hex('#ff4a4a').bold(cardConfig.name)} is an ${chalk.bold(
              cardConfig.jobTitle,
            )} at ${chalk.hex('#ff5555').bold(cardConfig.company)}.`,
          );
          console.log(`  ${chalk.hex('#abb2bf')(cardConfig.tagline)}`);
          console.log(`  Personal website: ${chalk.hex('#61afef').underline(cardConfig.links.website)}\n`);
          break;
        case 'exit':
          console.log(chalk.hex('#98c379')('\n  👋 Thanks for stopping by! Have a great day.\n'));
          return;
      }
    } catch {
      // User pressed Ctrl+C or exited
      console.log(chalk.dim('\n  Goodbye!\n'));
      return;
    }
  }
}
