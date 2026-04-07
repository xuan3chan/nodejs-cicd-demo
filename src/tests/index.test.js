const { describe, it } = require('node:test');
const assert = require('node:assert');
const { getHealthInfo } = require('../index.js');

describe('Health Info', () => {
  it('should return status as healthy', () => {
    const info = getHealthInfo();
    assert.strictEqual(info.status, 'healthy');
  });

  it('should contain required fields', () => {
    const info = getHealthInfo();
    assert.ok(info.version, 'version should exist');
    assert.ok(info.timestamp, 'timestamp should exist');
    assert.ok(info.uptime, 'uptime should exist');
    assert.ok(info.hostname, 'hostname should exist');
    assert.ok(info.memory, 'memory should exist');
    assert.ok(info.memory.used, 'memory.used should exist');
    assert.ok(info.memory.total, 'memory.total should exist');
  });

  it('should have valid ISO timestamp', () => {
    const info = getHealthInfo();
    const date = new Date(info.timestamp);
    assert.ok(!isNaN(date.getTime()), 'timestamp should be valid ISO date');
  });

  it('should use default version when env not set', () => {
    const info = getHealthInfo();
    assert.strictEqual(info.version, '1.0.0');
  });
});
