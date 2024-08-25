import { createHash } from 'crypto';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { relative } from 'path';
import { globSync } from 'fast-glob';

console.info('[BUILD] Compile assets');

const assetDir = '/app/app/assets';
const outputDir = '/app/.output/assets';
const assetIndex = {} as Record<string, string>;

mkdirSync(outputDir, { recursive: true });

globSync(`${assetDir}/**/*`).forEach((absolutePath) => {
  const path = relative(assetDir, absolutePath);
  const data = readFileSync(absolutePath);
  const md5 = createHash('md5').update(readFileSync(absolutePath)).digest('hex');
  const size = (data.byteLength / 1024 * 1000 | 0) / 1000;

  assetIndex[path] = md5;
  writeFileSync(`${outputDir}/${md5}`, data);

  console.info(`- ${path} --> ${md5}  (${size}kb)`);
});

writeFileSync(`${outputDir}/index.json`, JSON.stringify(assetIndex));
