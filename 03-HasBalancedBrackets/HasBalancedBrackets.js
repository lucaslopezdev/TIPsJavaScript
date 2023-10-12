// function HasBalancedBrackets (string) {
//   // Your code here:
//   const stack = [];
//   const validOpeningBrackets = ['[','{','('];
//   const validClosingBrackets = [']','}',')'];

//   for(let i = 0; i < string.length; i++){
//     const bracket = string[i]

//     if(validOpeningBrackets.includes(bracket)) stack.push(bracket)
//     else if(validClosingBrackets.includes(bracket)){
//       conversionToOpening = validOpeningBrackets[validClosingBrackets.indexOf(bracket)]
//       if (!stack.length || stack.pop() !== conversionToOpening) return false;
//     }
//   }
//   return !stack.length
// }

function HasBalancedBrackets (string) {
  const stack = [];
  const validBrackets = {
    '{': '}',
    '[': ']',
    '(': ')'
  }

  for(const bracket of string){
    if(validBrackets[bracket]) stack.push(bracket)
    else if(validBrackets[stack.pop()] !== bracket) return false;
  }
  return !stack.length
}

module.exports = HasBalancedBrackets
