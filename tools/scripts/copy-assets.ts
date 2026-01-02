import fs from 'fs-extra';
import path from 'path';

const root = process.cwd();
const src = path.join(root, 'libs/shared/assets/src/assets');

function getDest(mode: 'dev' | 'dist') {
  return mode === 'dev'
    ? path.join(root, 'apps/cart/public/assets')
    : path.join(root, 'dist/apps/cart/assets');
}

async function run() {
  const mode = (process.argv[2] as 'dev' | 'dist') ?? 'dev';
  const dest = getDest(mode);

  await fs.ensureDir(dest);
  await fs.copy(src, dest, { overwrite: true });

  console.log(`✅ Assets copied (${mode}) -> ${dest}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
