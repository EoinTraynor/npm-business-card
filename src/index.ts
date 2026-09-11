import { renderCard } from './ui/card.js';
import { runInteractiveMenu } from './ui/menu.js';
import { cardConfig } from './config.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: npx eointraynor [options]

Options:
  -s, --static       Print the card and exit without interactive prompt
  -j, --json         Output raw card configuration in JSON format
  -v, --version      Show CLI version
  -h, --help         Show help menu
`);
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log('1.4.0');
    return;
  }

  if (args.includes('--json') || args.includes('-j')) {
    console.log(JSON.stringify(cardConfig, null, 2));
    return;
  }

  // Render the visual terminal card
  console.log(renderCard());

  const isStatic = args.includes('--static') || args.includes('-s');
  const isInteractive = Boolean(process.stdout.isTTY && process.stdin.isTTY) && !isStatic;

  if (isInteractive) {
    await runInteractiveMenu();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
