import boxen from 'boxen';
import chalk from 'chalk';
import { cardConfig } from '../config.js';

/**
 * Checks whether the current terminal environment supports OSC 8 hyperlinks.
 */
function supportsHyperlink(): boolean {
  if (process.env.FORCE_HYPERLINK === '0') return false;
  if (process.env.FORCE_HYPERLINK === '1') return true;
  return Boolean(
    process.stdout.isTTY &&
      (process.env.WT_SESSION ||
        process.env.TERM_PROGRAM ||
        process.env.COLORTERM ||
        process.env.VTE_VERSION),
  );
}

/**
 * Creates an OSC 8 terminal hyperlink if supported.
 * Falls back to plain styled text on unsupported or legacy terminals.
 */
export function terminalLink(text: string, url: string): string {
  if (!supportsHyperlink()) {
    return text;
  }
  return `\u001B]8;;${url}\u001B\\${text}\u001B]8;;\u001B\\`;
}

/**
 * Renders the terminal business card with modern styling,
 * vibrant accents, OSC 8 clickable hyperlinks, and discoverability footer.
 */
export function renderCard(): string {
  const name = chalk.hex('#ff4a4a').bold;
  const handle = chalk.hex('#5c6370');
  const role = chalk.hex('#e5e9f0');
  const company = chalk.hex('#ff5555').bold;
  const tagline = chalk.italic.hex('#7f848e');
  const label = chalk.hex('#61afef').bold;
  const url = chalk.hex('#98c379');

  const cardContent = [
    `${name(cardConfig.name)} ${handle(`(@${cardConfig.handle})`)}`,
    `${role(cardConfig.jobTitle)} @ ${company(cardConfig.company)}`,
    `${tagline(cardConfig.tagline)}`,
    '',
    `  ${label('Website:')}   ${terminalLink(url(cardConfig.links.website), cardConfig.links.website)}`,
    `  ${label('GitHub:')}    ${terminalLink(url(cardConfig.links.github), cardConfig.links.github)}`,
    `  ${label('LinkedIn:')}  ${terminalLink(url(cardConfig.links.linkedin), cardConfig.links.linkedin)}`,
    `  ${label('Twitter/X:')} ${terminalLink(url(cardConfig.links.twitter), cardConfig.links.twitter)}`,
  ].join('\n');

  const card = boxen(cardContent, {
    padding: { top: 1, bottom: 1, left: 2, right: 3 },
    margin: { top: 1, bottom: 0, left: 1, right: 1 },
    borderStyle: 'round',
    borderColor: '#4c566a',
  });

  const signature = `  ${chalk.dim('⚡ Powered by ')}${chalk.hex('#61afef')('terminalcard')}${chalk.dim(' · Run ')}${chalk.white.bold('npx terminalcard init')}${chalk.dim(' to create yours')}\n`;

  return `${card}\n${signature}`;
}
