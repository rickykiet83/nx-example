import fs from 'fs-extra';
import path from 'path';

const root = process.cwd();

const src = path.join(root, 'libs/shared/assets/src/assets');

const destinations = [
  path.join(root, 'apps/cart/public/assets'),   // dùng cho nx serve cart (dev)
  path.join(root, 'dist/apps/cart/assets'),     // dùng cho nx build cart (deploy)
];

async function run() {
  for (const dest of destinations) {
    await fs.ensureDir(dest);
    await fs.copy(src, dest, { overwrite: true });
    console.log(`✅ Assets copied to ${dest}`);
  }
}

run().catch((err) => {
  console.error('❌ Copy assets failed', err);
  process.exit(1);
});
