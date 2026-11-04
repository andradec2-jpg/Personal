import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizedBody
} from '../study/input.js';
test(
  'blank body rejected',
  () => {
	assert.equal(
  	normalizedBody('   '),
  	null
	);
  }
);
