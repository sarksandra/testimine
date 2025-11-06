import { mountForm } from '../src/form.js';

describe('mountForm', () => {
  beforeEach(() => {
    mountForm();
  });

  test('button is initially disabled', async () => {
    const send = document.getElementById('send');
    expect(send.disabled).toBe(true);
  });

  test('button enabled/disabled on invalid/valid email input', async () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const send = document.getElementById('send');

    name.value = 'Mihkel';

    email.value = 'invalidemail';
    email.dispatchEvent(new Event('input'));
    expect(send.disabled).toBe(true);

    email.value = 'mihkel@example.com';
    email.dispatchEvent(new Event('input'));
    expect(send.disabled).toBe(false);
  });

  test('submit updates message', async () => {
    const form = document.getElementById('f');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const send = document.getElementById('send');
    const msg = document.getElementById('msg');

    name.value = 'Mihkel';
    email.value = 'mihkel@example.com';
    email.dispatchEvent(new Event('input'));
    expect(send.disabled).toBe(false);

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(msg.textContent).toBe('OK: Mihkel');
  });
});