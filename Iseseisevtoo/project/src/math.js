function sum(a,b){
  result = a+b
  if(typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)){
    throw new Error('Argumente peavad olema ainult numbrid.');
  }
  return result;

}

function max(a,b){
    let c = Math.max(a,b)
    return c;

}

function isEven(n){
    if(typeof n !== "number" || !Number.isInteger(n)){
        throw new Error('Sisend peab olema täisarv.');
    }
    return n % 2 === 0;
}


module.exports = { sum, max, isEven };