export function mountForm() {
  document.body.innerHTML = `
    <form id="f">
      <input id="name" placeholder="Name" />
      <input id="email" placeholder="Email" />
      <button id="send" disabled>Send</button>
      <p id="msg"></p>
    </form>
  `;
  const name = f.name, email = f.email, send = f.send, msg = document.getElementById('msg');
  const okEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const upd = () => {
    const ok = name.value.trim() && okEmail(email.value);
    ok ? send.removeAttribute('disabled') : send.setAttribute('disabled','true');
  };
  name.addEventListener('input', upd);
  email.addEventListener('input', upd);
  f.addEventListener('submit', e => { e.preventDefault(); msg.textContent = `OK: ${name.value}`; });
}