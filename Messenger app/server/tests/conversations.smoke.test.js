import test from 'node:test';
import assert from 'node:assert/strict';

test(
  'conversation route exists',
  async () => {

    const response =
      await fetch(
        'http://127.0.0.1:3000/api/conversations'
      );

    assert.equal(
      response.status,
      401
    );

  }
);
