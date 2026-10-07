import { strict as assert } from 'node:assert';
import { dbStore } from '../db.js';

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error('    ', err instanceof Error ? err.message : String(err));
    failed++;
  }
}

console.log('db — seedCompetencyRequirements ESM check');

check('getSeedData().competencyRequirements returns 16 seed entries under ESM', () => {
  const seedData = dbStore.getSeedData();
  assert.ok(Array.isArray(seedData.competencyRequirements), 'competencyRequirements should be an array');
  assert.equal(
    seedData.competencyRequirements.length,
    16,
    `Expected 16 competency requirements, got ${seedData.competencyRequirements.length}`
  );
});

check('each competency requirement entry contains required fields', () => {
  const seedData = dbStore.getSeedData();
  for (const req of seedData.competencyRequirements) {
    assert.ok(typeof req.classNumber === 'number', 'classNumber must be number');
    assert.ok(typeof req.level === 'number', 'level must be number');
    assert.ok(typeof req.topic === 'string', 'topic must be string');
    assert.ok(typeof req.meetsThreshold === 'string', 'meetsThreshold must be string');
    assert.ok(typeof req.isMandatory === 'boolean', 'isMandatory must be boolean');
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
