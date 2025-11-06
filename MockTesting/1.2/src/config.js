const fs = require('fs');
function loadConfig(path) {
  const raw = fs.readFileSync(path, 'utf8');
  const cfg = JSON.parse(raw);
  if (process.env.APP_PORT) cfg.port = Number(process.env.APP_PORT);
  return cfg;
}
module.exports = { loadConfig };