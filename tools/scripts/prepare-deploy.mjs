import fs from 'fs-extra';
import path from 'path';

const root = process.cwd();

const productsDist = path.join(root, 'dist/apps/products');
const cartDist = path.join(root, 'dist/apps/cart');
const deployDist = path.join(root, 'dist/deploy');

async function run() {
  await fs.remove(deployDist);
  await fs.ensureDir(deployDist);

  // products -> /
  await fs.copy(productsDist, deployDist);

  // cart -> /cart
  const cartDeployDir = path.join(deployDist, 'cart');
  await fs.ensureDir(cartDeployDir);
  await fs.copy(cartDist, cartDeployDir);

  // ✅ hard-ensure base href for cart
  const cartIndex = path.join(cartDeployDir, 'index.html');
  let html = await fs.readFile(cartIndex, 'utf8');

  // Normalize base to /cart/
  html = html.replace(/<base href="[^"]*"\s*\/?>/i, '<base href="/cart/">');

  await fs.writeFile(cartIndex, html, 'utf8');

  console.log('✅ Prepared dist/deploy (base href patched)');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
