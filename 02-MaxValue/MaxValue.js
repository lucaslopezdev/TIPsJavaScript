function MaxValue (shares) {
  // Your code here:
  let maximo = -Infinity;
  for(let i = 0; i < shares.length - 1; i++){
    for(let j = i + 1; j < shares.length; j++){
      let newMax = shares[j] - shares[i]
      if( newMax > maximo) maximo = newMax 
    }
  }
  return maximo
}

module.exports = MaxValue
