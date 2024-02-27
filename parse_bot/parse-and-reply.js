let parsedResponses = []

async function parseAndReply(response, message) {
    let startingIndex = 0;
    let indexOfCodeBlockOpen = 0;
    let indexOfCodeBlockClose = 0;
    const backticks = "```"
    const firstBlockOfCode = response.slice(startingIndex, indexOfCodeBlockOpen);

    
    while(response.indexOf(backticks, startingIndex) > 0){

        indexOfCodeBlockOpen = response.indexOf(backticks, startingIndex);
        // Refactor this parameter to an arrow function?
        breakUp(response.slice(startingIndex, indexOfCodeBlockOpen));
        
        indexOfCodeBlockClose = response.indexOf(backticks, (indexOfCodeBlockOpen + 1)) + 2;
        
        parsedResponses.push(response.slice(indexOfCodeBlockOpen, indexOfCodeBlockClose + 1));
        
        startingIndex = indexOfCodeBlockClose + 3;
    }

    breakUp(response.slice(startingIndex, response.length));

    await parsedResponses.forEach((response) => message.reply(response));
    
    parsedResponses = []
}

function breakUp(chunk) {
    const lengthLimit = 1950;
    
    if (chunk.length > lengthLimit){
        for (let i = 0; i < chunk.length; i += lengthLimit) {
            const smallerChunk = chunk.substring(i, i + lengthLimit);
    
            parsedResponses.push(smallerChunk);
        }
    } else {
        parsedResponses.push(chunk);
    }
}

module.exports = parseAndReply