function HasBalancedBrackets (string) {
  // Your code here:
  const stack = [];
  const validOpeningBrackets = ['[','{','('];
  const validClosingBrackets = [']','}',')'];

  for(let i = 0; i < string.length; i++){
    const bracket = string[i]

    if(validOpeningBrackets.includes(bracket)) stack.push(bracket)
    else if(validClosingBrackets.includes(bracket)){
      conversionToOpening = validOpeningBrackets[validClosingBrackets.indexOf(bracket)]
      if (!stack.length || stack.pop() !== conversionToOpening) return false;
    }
  }
  return !stack.length
}

module.exports = HasBalancedBrackets
