// function MaxValue (shares) {
//   // Your code here:
//   let max = -Infinity;
//   for(let i = 0; i < shares.length - 1; i++){
//     for(let j = i + 1; j < shares.length; j++){
//       let newMax = shares[j] - shares[i]
//       if( newMax > max) max = newMax 
//     }
//   }
//   return max
// }

function MaxValue (shares) {
  let minPrice = shares[0], maxProfit = -Infinity; 
  // Or maxProfit = 0 if I want to know only how much I won and not if I lost

  for(let i = 1; i < shares.length; i++){
    if(shares[i] < minPrice) minPrice = shares[i];
    if(shares[i] - minPrice > maxProfit) maxProfit = shares[i] - minPrice;
  }

  return maxProfit;
}

module.exports = MaxValue
