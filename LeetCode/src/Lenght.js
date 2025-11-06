function lengthOfLastWord(s) {
    const words = s.trim().split(' ');
    const lastWord = words.filter(word => word.length > 0).pop();
    return lastWord ? lastWord.length : 0;
};

module.exports = {lengthOfLastWord};