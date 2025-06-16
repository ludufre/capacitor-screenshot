#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const PLACEHOLDER_TEAM_ID = 'XXXXXXXXXX';
const PROJECT_FILE = 'example-app/ios/App/App.xcodeproj/project.pbxproj';

const filePath = resolve(PROJECT_FILE);

if (!existsSync(filePath)) {
  console.log(`⚠️  Project file not found: ${filePath}`);
  process.exit(0);
}

console.log(`🔧 Sanitizing ${filePath}...`);

try {
  const content = readFileSync(filePath, 'utf8');

  // Find all DEVELOPMENT_TEAM entries
  const teamIdRegex = /DEVELOPMENT_TEAM = ([A-Z0-9]{10});/g;
  const matches = [...content.matchAll(teamIdRegex)];

  if (matches.length === 0) {
    console.log(`ℹ️  No DEVELOPMENT_TEAM found in ${filePath}`);
    process.exit(1);
  }

  // Replace with placeholder
  const sanitizedContent = content.replace(teamIdRegex, `DEVELOPMENT_TEAM = ${PLACEHOLDER_TEAM_ID};`);

  writeFileSync(filePath, sanitizedContent, 'utf8');

  console.log(`✅ Sanitized ${matches.length} DEVELOPMENT_TEAM entries in ${filePath}`);
} catch (error) {
  console.error(`❌ Error sanitizing ${filePath}:`, error.message);
  process.exit(1);
}

console.log('\n✨ Sanitization complete!');
console.log('📝 Team IDs have been replaced with placeholder values.');
console.log('🔒 Your actual Team ID will not be exposed in the published package.\n');
