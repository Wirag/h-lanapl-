import { greeting } from './greeting';

describe('greeting', () => {
  it('greets good morning between 5 and 10', () => {
    expect(greeting(new Date(2026, 0, 1, 7))).toBe('Jó reggelt!');
  });

  it('greets good day between 10 and 18', () => {
    expect(greeting(new Date(2026, 0, 1, 13))).toBe('Jó napot!');
  });

  it('greets good evening between 18 and 23', () => {
    expect(greeting(new Date(2026, 0, 1, 20))).toBe('Jó estét!');
  });

  it('greets generically at night', () => {
    expect(greeting(new Date(2026, 0, 1, 2))).toBe('Szia!');
  });
});
