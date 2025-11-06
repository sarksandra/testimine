const store = new Map();
module.exports = {
  __setFile(p, s){ store.set(p, s); },
  readFileSync(p, enc){
    if (enc !== 'utf8') throw new Error('encoding');
    if (!store.has(p)) throw new Error('ENOENT');
    return store.get(p);
  }
};