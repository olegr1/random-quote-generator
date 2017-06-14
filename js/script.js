// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//An array of quote objects
var quotes = [
    {
        quote: "A flailing monkey wants to go to hell.",
        source: "nonsense.x2d.org",
        year: "2017",
        tags: ["nonsensical", "humorous"]
    },
    {
        quote: "Pecunia non olet",
        source: "Roman emperor Vespasian",
        tags: ["historical", "humorous"]
    },
    {
        quote: "Lorem ipsum dolor sit amet...",
        source: "Dummy text of the printing and typesetting industry",
        tags: ["historical", "random"]
    },
    {
        quote: "I can resist anything except temptation.",
        source: "Oscar Wilde",
        citation: "Lady Windermere's Fan",
        year: "1892",
        tags: ["literary"]
    },
    {
        quote: "Denial ain't just a river in Egypt.",
        source: "Mark Twain",
        tags: ["humorous"]
    }
];

//An additional array to keep track of quotes that have already been shown (Exceed Expectations functionality)
var usedQuoteIndices = [];

//The function that manages random selection of quotes from the array
function getRandomQuote(){
    
    //Index of a quote randomly picked from the array cannot be larger than the total number of quotes
    var quoteIndexRangeMax = quotes.length;

    //Picking a number to be used as an index for retrieving a random quote from the array
    var quoteIndex = Math.floor(Math.random() * quoteIndexRangeMax);

    //Making sure that the current quote doesn't get shown again before all others in the array are shown (Exceed Expectations functionality)
    //Will try to produce a random index which hasn't been used before 
    while(usedQuoteIndices.indexOf(quoteIndex) !== -1 && usedQuoteIndices.length < 5){
        quoteIndex = Math.floor(Math.random() * quoteIndexRangeMax);
    }    

    //If all items have already been shown once, empty the used indices array to start over
    if(usedQuoteIndices.length === quotes.length){
        usedQuoteIndices.length = 0;
        //Rendering a separator to visually show the new cycle in the console
        console.log("-----------------");
    }

    //Add the index of the current randomly picked quote to the usedQuoteIndices array to mark it as used
    usedQuoteIndices.push(quoteIndex);

    //Retrieve a quote using the previously generated index
    var quoteObject = quotes[quoteIndex];   

    //Output the quote in the console to track usage (Exceed Expectations functionality)
    console.log(quoteObject.quote);    

    //Return the current quote to be used in the printing function
    return quoteObject;
}

//The function in charge of displaying the quotes
function printQuote(){

    //Get the randomly selected quote object
    var quoteObject = getRandomQuote();

    //Create a container for the tag properties (Exceed Expectations functionality)
    var tagsContainer = document.createElement("div");
    tagsContainer.id = "tags-container";
    document.body.appendChild(tagsContainer);

    //Render the tag properties into the container
    var tagsHtmlString = "";
    for(var i = 0; i < quoteObject.tags.length; i++){
        tagsHtmlString += '<span class="tag">' + quoteObject.tags[i] + '</span>';
    }
    document.getElementById('tags-container').innerHTML = tagsHtmlString;    

    //Make sure the year is rendered only if the property is present in the object
    var quoteYearHtmlString = "";
    if(quoteObject.hasOwnProperty('year')) { 
        quoteYearHtmlString = '<span class="year">' + quoteObject.year + '</span>';
    };

    //Make sure the citation is rendered only if the property is present in the object
    var quoteCitationHtmlString = "";
    if(quoteObject.hasOwnProperty('citation')) { 
        quoteCitationHtmlString = '<span class="citation">' + quoteObject.citation + '</span>';
    };
    
    //Create the markup for the quote as per template and add it to the DOM
    var quoteHtmlString = '<p class="quote">' + quoteObject.quote + '</p>' +
                          '<p class="source">' + quoteObject.source +
                            quoteCitationHtmlString +
                            quoteYearHtmlString +
                          '</p>';
    document.getElementById('quote-box').innerHTML = quoteHtmlString;
    
    //Assign a new random background colour to the page body (Exceed Expectations functionality)
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);  
    
    var color = "rgb(" + r + "," + g + "," + b + ")";
    document.body.style.background = color;
}

//Make the quote refresh itself after a delay
var quoteRefreshInterval = setInterval(printQuote, 10000);

//Starting the execution
printQuote();