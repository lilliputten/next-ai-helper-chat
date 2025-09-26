/* eslint-disable no-console */
/**
 * @desc Script to automatically switch prisma database provider from
 * postgresql (for vercel deployment environment) to sqlite (for local
 * development).
 */

import fs from 'fs';
import { glob } from 'glob';

const VERCEL_URL = process.env.VERCEL_URL;
const isVercel = !!VERCEL_URL;

console.log('prisma-switch: VERCEL_URL:', VERCEL_URL);

const prismaFile = 'prisma/schema.prisma';

/** Replace provider for required in the current environment: postgresql is only for vercel */
const requiredProvider = isVercel ? 'postgresql' : 'sqlite';
// TODO: Provider also should depend on a local `DATABASE_URL` environment parameter.<F2>

const providerRegex = /^(\s*provider\s*=\s*)"(sqlite|postgresql)"/m;
const content = fs.readFileSync(prismaFile, 'utf8');
const match = content.match(providerRegex);
const foundProvider = match && match[2];

console.log('prisma-switch: Found provider:', foundProvider);
console.log('prisma-switch: Required provider:', requiredProvider);

if (match && requiredProvider !== foundProvider) {
  console.log('prisma-switch: Replacing...');
  const newContent = content.replace(providerRegex, '$1"' + requiredProvider + '"');
  fs.writeFileSync(prismaFile, newContent);
  // Update migration SQL files
  console.log('prisma-switch: Update SQL files...');
  const migrationFiles = glob.sync('prisma/migrations/**/*.sql');
  if (migrationFiles.length > 0) {
    console.log('prisma-switch: Updating migration files...');
    const isPostgres = requiredProvider === 'postgresql';
    const postgresTimeFiled = 'TIMESTAMP(3)';
    const sqliteTimeField = 'DATETIME';
    const lookupStr = !isPostgres ? postgresTimeFiled : sqliteTimeField;
    const lookupQuotedStr = lookupStr.replace(/([()])/g, '\\$1');
    const lookupReg = new RegExp(lookupQuotedStr, 'g');
    const replaceStr = isPostgres ? postgresTimeFiled : sqliteTimeField;
    console.log(`prisma-switch: ${lookupStr} -> ${replaceStr}...`);
    migrationFiles.forEach((file) => {
      const sqlContent = fs.readFileSync(file, 'utf8');
      const updatedContent = sqlContent.replace(lookupReg, replaceStr);
      // if (requiredProvider === 'postgresql') {
      //   updatedContent = ;
      // } else {
      //   updatedContent = sqlContent.replace(/TIMESTAMP\(3\)/g, 'DATETIME');
      // }
      const isChanged = updatedContent !== sqlContent;
      console.log('prisma-switch: ' + file + ': ' + (isChanged ? 'changed' : 'unchanged'));
      debugger;
      if (isChanged) {
        fs.writeFileSync(file, updatedContent);
        console.log('prisma-switch: Updated', file);
      }
    });
  }
  console.log('prisma-switch: OK');
} else {
  console.log('prisma-switch: No changes are required, done.');
}
