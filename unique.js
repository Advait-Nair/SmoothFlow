// Generate unique ids with a 20 char length to use as 'special' classes in dynamically inserted elements.

// You can change length here - 
window.uniqueCharLength = 20;

const acceptedCharacters = [
    '1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'
];

function unique(){
    // Okay its not very efficient but it works.
    let uniqueId = 'X';
    for(let i = 0; i < window.uniqueCharLength; i++){
        const acceptedCharLength = acceptedCharacters.length;
        const random = Math.ceil(Math.random()*acceptedCharLength);
        const selector = random - 1;
        const character = acceptedCharacters[selector];
        uniqueId += character;
    }
    return uniqueId;
}

