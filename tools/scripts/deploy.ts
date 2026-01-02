import 'dotenv/config';

import { execSync } from 'node:child_process';

function sh(cmd: string) {
  execSync(cmd, { stdio: 'inherit' });
}

const AUTH = process.env.NETLIFY_AUTH_TOKEN;

if (!AUTH) {
  console.error('Missing NETLIFY_AUTH_TOKEN');
  process.exit(1);
}

// 1) build + prepare dist/deploy (anh dùng đúng pipeline đang chạy OK)
sh('yarn build:all');

// 2) deploy dist/deploy lên Netlify (prod)
sh(
  `npx netlify deploy --dir dist/deploy --prod --auth ${AUTH} --message "manual deploy"`
);
