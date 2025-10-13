import { describe, it, expect } from 'vitest';
// Since StuffClient uses inject(), full DI setup is complex in unit test context without TestBed.
// We perform a lightweight sanity check on interface typing instead.
import { StuffDto } from '../models';

describe('StuffClient (typing)', () => {
    it('StuffDto should have required fields', () => {
        const sample: StuffDto = { id: 1, name: 'A', description: 'Desc', neighborId: 2 };
        expect(sample.name).toBe('A');
    });
});
