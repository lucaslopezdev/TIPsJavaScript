function FindNeedle (haystack, needle) {
  // Your code here:
  for(let i = 0; i < haystack.length - needle.length; i++){
    let found = true
    for(let j = 0; j < needle.length; j++){
      if(haystack[i+j] !== needle[j]) {
        found = false;
        break;
      };
    }
    if(found) return i;
  }
  return -1;
}

module.exports = FindNeedle
