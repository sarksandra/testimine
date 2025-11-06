function debounce(fn, ms){
  let t=null;
  return (...a)=>{ if(t) clearTimeout(t); t=setTimeout(()=>fn(...a), ms); };
}
module.exports = { debounce };