import { strict as assert } from 'node:assert';
import { isBalvatikaStage, CURRICULUM_MAPPING } from '../config/curriculumMap.js';

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

console.log('curriculumMap — isBalvatikaStage check');

check('returns true for all Stage 3 (Balvatika) levels (19 to 46)', () => {
  for (let level = 19; level <= 46; level++) {
    assert.equal(
      isBalvatikaStage(level),
      true,
      `Level ${level} should be Balvatika Stage 3`
    );
  }
});

check('returns false for Stage 1 & Stage 2 levels (1 to 18)', () => {
  for (let level = 1; level <= 18; level++) {
    assert.equal(
      isBalvatikaStage(level),
      false,
      `Level ${level} should not be Balvatika Stage 3`
    );
  }
});

check('returns false for Stage 4+ levels (47 to 109)', () => {
  for (let level = 47; level <= 109; level++) {
    assert.equal(
      isBalvatikaStage(level),
      false,
      `Level ${level} should not be Balvatika Stage 3`
    );
  }
});

check('returns false for invalid or out-of-bound levels', () => {
  assert.equal(isBalvatikaStage(0), false);
  assert.equal(isBalvatikaStage(-1), false);
  assert.equal(isBalvatikaStage(110), false);
  assert.equal(isBalvatikaStage(999), false);
});

check('matches CURRICULUM_MAPPING stage === 3 for all mapped entries', () => {
  for (const [levelStr, config] of Object.entries(CURRICULUM_MAPPING)) {
    const level = Number(levelStr);
    const expected = config.stage === 3;
    assert.equal(
      isBalvatikaStage(level),
      expected,
      `Mismatch for level ${level}`
    );
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
