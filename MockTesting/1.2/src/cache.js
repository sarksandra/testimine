class Storage { constructor(){ this.m=new Map(); } get(k){ return this.m.get(k); } set(k,v){ this.m.set(k,v); } }
class Cache {
  constructor(s=new Storage()){ this.s=s; }
  getOrSet(k, factory){
    const v = this.s.get(k);
    if (v !== undefined) return v;
    const nv = factory();
    this.s.set(k, nv);
    return nv;
  }
}
module.exports = { Storage, Cache };