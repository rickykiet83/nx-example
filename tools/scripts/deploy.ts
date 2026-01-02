import 'dotenv/config';

import { execSync } from 'node:child_process';

function sh(cmd: string) {
  execSync(cmd, { stdio: 'inherit' });
}

const SITE_ID = process.env.NETLIFY_SITE_ID;
const AUTH = process.env.NETLIFY_AUTH_TOKEN;

if (!SITE_ID || !AUTH) {
  console.error('Missing NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN');
  process.exit(1);
}

// 1) build + prepare dist/deploy (anh dùng đúng pipeline đang chạy OK)
sh('yarn build:all');

// 2) deploy dist/deploy lên Netlify (prod)
sh(
  `npx netlify deploy --dir dist/deploy --prod --site ${SITE_ID} --auth ${AUTH} --message "manual deploy"`
);
