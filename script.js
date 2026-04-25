
var currentSortOption = 1;



// declare arrays for book info
const collectionISBNs = ["9788448032951", "9788401329104", "9781400063802", "9780399141430", "9780515109740", "9780399139703", "9780743465014", "9780380978540", "9780380978793", "9780385180290", "9780399156816", "9780446603393", "9780765317322", "9780399135811", "9780385485081", "9781451642476", "9780553370317", "9780373250479", "9780805095937", "9781440564833", "9780316198530", "9780399150555", "9780316188524", "9780061432712", "9780380974054", "9781451642544", "9781432825522", "9780062065483", "9780345435736", "9780061098765", "9780553801378", "9781412024686", "9780525939764", "9780312531188", "9780425239131", "9780312376451", "9780007213511", "9780553010770", "9780393027211", "9780553081305", "9780547819228", "9781401302313", "9780307266873", "9780312660819", "9780385126939", "9780345457233", "9780307985767", "9780312936686", "9781455526062", "9780345547651" ];

const collectionTitles = ["El Señor de los Anillos", "Dioses Menores", "Pilgrims Upon the Earth", "Rosehaven", "The Hellion Bride", "The Nightingale Legacy", "Genesis Force", "Heart of a Warrior", "The Fresco", "The Ordeal of Gilbert Pinfold", "Crossfire", "Strange Highways", "The Third Lynx", "Longshot", "Harlem", "Midwinter Blood", "Last Refuge", "Slightly Settled", "The Afrika Reich", "Sons of Moriarty", "You", "McNally's Dare", "Gods and Beasts", "Gator a-Go-Go", "Midnight in Ruby Bayou", "Summer of the Dead", "Desert Steel", "The Body in the Cast", "Jarka Ruus", "Law of Gravity", "One Door Away from Heaven", "The Judas King", "Blood Relations", "Yours, Mine, and Ours", "Mourning Glory", "The Good Thief", "The Scent of Rain and Lightning", "Dragonworld", "The Great Gatsby", "Sideshow", "The Best American Short Stories", "The Yummy Mummy", "The Fifth Floor", "Quicksilver", "Sequoia Shootout", "Settling Accounts", "A Study in Revenge", "Splintered Icons", "A House Divided", "Bryant & May and the Bleeding Heart"];

const collectionAuthors = ["David Eddings", "Terry Pratchett", "Brad Land", "Catherine Coulter", "Catherine Coulter", "Catherine Coulter", "John Vornholt", "Johanna Lindsey", "Sheri S. Tepper", "Frank Roderus", "Dick Francis", "Dean Koontz", "Timothy Zahn", "Dick Francis", "Len Riley", "Mons Kallentoft", "Elizabeth Scarborough", "Wendy Markham", "Guy Saville", "Loren D. Estleman", "Austin Grossman", "Lawrence Sanders", "Denise Mina", "Tim Dorsey", "Elizabeth Lowell", "Mons Kallentoft", "L. P. Holmes", "Katherine Page", "Terry Brooks", "Stephen Horn", "Dean Koontz", "Rob Rickards", "Barbara Parker", "Mary Davidson", "Susan Albert", "Chris Ewan", "Andrew Taylor", "Byron Preiss", "John Minahan", "Sheri S. Tepper", "Jennifer Egan", "Polly Williams", "Michael Harvey", "Bill Pronzini", "John Reese", "Harry Turtledove", "Kieran Shields", "Bill Napier", "Kimberla Roby", "Christopher Fowler"];

// S-F = Sci-Fi, W = Western, M = Mystery, F = general fiction
const collectionGenres = [
  "S-F", "S-F", "F", "F", "F", "F", "S-F", "F", "F", "S-F", 
  "W", "M", "F", "S-F", "M", "F", "M", "S-F", "F", "F", 
  "M", "F", "M", "M", "M", "F", "M", "W", "M", "S-F", 
  "M", "F", "F", "M", "F", "M", "M", "S-F", "M", "S-F", 
  "F", "F", "M", "M", "W", "S-F", "M", "M", "F", "M"
];


const collection = [collectionISBNs, collectionTitles, collectionAuthors, collectionGenres];

// The results in browse section will default to entire collection
const browseISBNs = [...collectionISBNs]; 
const browseTitles = [...collectionTitles];
const browseAuthors = [...collectionAuthors];
const browseGenres = [...collectionGenres];
const browseCheckedOut = [];
collectionISBNs.forEach(() => browseCheckedOut.push(0));
var checkoutRow = 4;
const browse = [browseISBNs, browseTitles, browseAuthors, browseGenres, browseCheckedOut];

// borrowed starts out empty
const borrowedISBNs = [];
const borrowedTitles = [];
const borrowedAuthors = [];
const borrowedGenres = [];
const borrowedDueDate = [];
const borrowed = [borrowedISBNs, borrowedTitles, borrowedAuthors, borrowedGenres, borrowedDueDate];

const currentlyCheckedOut = [];



const BORROWED_KEY = 'borrowedStorageArray'; 



// set up object to track the div where browse books cards are drawn
const browseDiv = document.querySelector(".browseRow");
// set up object to track where borrowed books cards are drawn
const borrowedDiv = document.querySelector(".borrowedRow");

// load borowed books from storage
loadBorrowedBooks();
// perform initial sort by title on page load
    // sortCollection defined below
sortCollection(browse, currentSortOption);
// draw browse book cards on page load
    // redrawBookArray defined below
redrawBookArray(browse, browseDiv);
redrawBookArray(borrowed, borrowedDiv);

// event listener for toggle grid/list view
const toggleViewButton = document.querySelector('#viewToggle');
toggleViewButton.addEventListener('change', (event) => {
    // value will be the string "grid" or "list"
    var viewChoice = event.target.value;

    const browseRow = document.querySelector(".browseRow");
    const borrowRow = document.querySelector(".borrowedRow");

    if (viewChoice === "list") {
        browseRow.classList.add('list-view');
        borrowedRow.classList.add('list-view');
    } else {
        browseRow.classList.remove('list-view');
        borrowedRow.classList.remove('list-view');
    }
});

// event listener for when sort selection updated
const sortOption = document.querySelector('#sortSelect');
sortOption.addEventListener('change', (event) => {
    var choice = event.target.value;

    // call sort function based on chosen option
    if (choice === "author") {
        currentSortOption = 2; 
    } else if (choice === "title") {
        currentSortOption = 1;
    } else if (choice === "genre") {
        currentSortOption = 3;
    }
    sortCollection(browse, currentSortOption);
    // redraw our browse array once sort finished
    redrawBookArray(browse, browseDiv);
});

// event listener for searchbar updated
searchBar.addEventListener('input', (event) => {
    // make search matching case insensitive
    const currentText = event.target.value.toLowerCase();
    // select all cards in browseDiv
    const browseDivCards = browseDiv.querySelectorAll('.card');
    // loop through each card
    browseDivCards.forEach(card => {
        const bookTitle = card.querySelector('.text_group .book_title');
        // find all book title divs
        if(bookTitle){
            // convert title to lowercase
            var titleText = bookTitle.textContent.toLowerCase();
            
            // Determine if card should be displayed
            var displayCard = titleText.includes(currentText);

            // target the col the card is contained in
            const container = card.closest('.col-12, .col-md-4, .col-lg-3'); 
            // choose whether to show or hide card
            if(displayCard){
                // force card to show up again when it matches search
                container.style.display = "";      
            } 
            else {
                // hide card if it doesn't match search
                container.style.display = "none";    
            }
        }
    });
});
// event listener for browse container
browseDiv.addEventListener('click', (event) => {

    // Check if what was clicked is actually a borrow button
    if(event.target.classList.contains('borrow')) {
        const button = event.target;
        var index = button.dataset.arrayLocation;
        
        // Check if the book is not checked out (value 0)
        if(browse[checkoutRow][index] === 0) {
            
            // Update the status to checked out (1)
            browse[checkoutRow][index] = 1;
            
            // Add to borrowed array and refresh the UI
            addToBorrowed(button, borrowed);       
            redrawBookArray(borrowed, borrowedDiv);
            redrawBookArray(browse, browseDiv);

        }
    }
});

// event listener for return button clicked
borrowedDiv.addEventListener('click', (event) => {
    // Check if what was clicked is actually a borrow button
    if(event.target.classList.contains('borrow')) {
        console.log(`tried to return ${event.target}`)
        var button = event.target;
        var index = button.dataset.arrayLocation;
        

            
        returnBook(event.target, browse);
        redrawBookArray(borrowed, borrowedDiv);
        redrawBookArray(browse, browseDiv);

    }
});

// function to update stats page
function updateStats()
{
    var bookTotal = document.querySelector('#totalBooks');
    var borrowedTotal = document.querySelector('#borrowedCount');
    var overDueTotal = document.querySelector('#overdueCount');
    var totalOverdue = 0;
    // set a date to todays date for comparison
    var today = new Date();
    // loop through each borrowed book
    borrowedDueDate.forEach((date) =>{
        // get due date
        checkDate = new Date(date);
        // if book overdue
        if(today > checkDate)
        {  
            // increment overdue counter
            totalOverdue++;
        }
    });

    // update text content of tracking divs
    bookTotal.textContent = "Total Books: " + collection[0].length;
    borrowedTotal.textContent = "Borrowed Books: " + borrowed[0].length;
    overDueTotal.textContent = "Overdue Books: " + totalOverdue;
}
// call once on page load 
updateStats();







// function to draw a bootstrap row of books based on an array
// containing ISBN, Title, and Author for each book
function redrawBookArray(bookArray, parentRowDiv) {

    // clear out existing card objects from row
    parentRowDiv.innerHTML = "";

    // for each isbn in the book array (row 0 is isbn #s)
    bookArray[0].forEach((isbn, i) => {
            // create a new image
        var img = document.createElement('img');
            // pull cover png from openlibrary.org
        img.src = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
        
        // if no cover for this isbn found, use default
        img.onerror = function() {
            this.src = './no_cover.png'; 
        };

        // set alt text for cover
        img.alt = `Book cover for ISBN ${isbn}`;
        // set cover image dimentions
        img.style.height = "150px";
        img.style.width = "auto"; 
        img.style.objectFit = "contain";

        // create a new bootstrap card
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-100' ,'h-100', 'shadow-sm');
        // create a div for title text
        var titleDiv = document.createElement('h5');
        // add the genre and title at current i index
        titleDiv.textContent = (`${bookArray[3][i]}  ${bookArray[1][i]}`)
        // add class so we can access this object easily in future
        titleDiv.classList.add('book_title', 'card-title');

        // create a div for author text
        var authorDiv = document.createElement('p');
        authorDiv.classList.add('book_author', 'card-text', 'text-muted');
        // add author at current i index
        authorDiv.textContent = (`${bookArray[2][i]}`)

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'text-center');
        // create new bootstrap column
        var bookCol = document.createElement('div');

        // create new button
        var borrowButton = document.createElement('button');
        // set up attributes for button to store

        // Group text for styling purposes
        var textGroup = document.createElement('div');
        textGroup.classList.add('text_group');
        textGroup.appendChild(titleDiv);
        textGroup.appendChild(authorDiv);
        // I set the value and a separate dataset to isbn
        // I don't remember if both are used anymore
        borrowButton.value = isbn;
        borrowButton.dataset.isbn = `${isbn}`;
        // 1 = title row, 2 = author row, 3 = genre row
        borrowButton.dataset.bookTitle = `${bookArray[1][i]}`;
        borrowButton.dataset.genre = `${bookArray[3][i]}`;
        borrowButton.dataset.author = `${bookArray[2][i]}`;
        borrowButton.dataset.arrayLocation = i;
        borrowButton.myCard = cardDiv;
        // add classes to button for later use/styling
        borrowButton.classList.add('borrow', 'btn', 'btn-primary', 'mt-auto');

        // if the array we are drawing is the browe array
        if(bookArray === browse)
        {
            // if the book is checked out
            if(bookArray[checkoutRow][i] === 1)
            {
                // style for checkout
                borrowButton.innerText = "Checked Out";
                borrowButton.style.backgroundColor = "red";
            }
            else
            {
                // style for on shelf
                borrowButton.innerText = "Borrow";
                borrowButton.style.backgroundColor = "";
            }
        }
        // if the array being drawn is borrowed books
        if(bookArray === borrowed)
        {  
            borrowButton.innerText = "Return";


            // format due date and check for overdue
            var dueDateDiv = document.createElement('div');
            // Style Due Date
            dueDateDiv.classList.add('due_date', 'small', 'text-muted', 'card-text');
        
            var returByDate = new Date(borrowed[4][i]);
            dueDateDiv.innerText = `Due Date: ${returByDate.toLocaleDateString('en-US')}`;
            var today = new Date();
            // if book overdue
            if(today > returByDate){
                dueDateDiv.classList.replace('text-muted', 'text-danger');
                dueDateDiv.style.fontWeight = "bold";
            }


        }


        // set card to auto fit size to screen
        bookCol.classList.add('col-12', 'col-md-4', 'col-lg-3', 'mb-4');

        // append objects to create card
        cardDiv.appendChild(img);
        cardDiv.appendChild(textGroup);
        
        // only attempt to append due date if drawing borrowed array
        if(bookArray === borrowed)
        {cardDiv.appendChild(dueDateDiv);}
        
        cardDiv.appendChild(borrowButton);
        bookCol.appendChild(cardDiv);
        parentRowDiv.appendChild(bookCol);

    }); 

    // ensure filtering is applied when books redrawn
    searchBar.dispatchEvent(new Event('input'));
    // keep stats in sync
    updateStats(); 
    
}


// function to sort an array based on chosen option
    // array.map, array.sort, and localeCOmpare methods are new to me.
    // localeCompare returns which value comes alphabetically first
    // array.sort moves the values around based on the result of localeCompare
    // array.map creates an array numbered 0-number of books storing integers instead of author/genre/title so they can be moved around easily
function sortCollection(collectionArray, optionIndex) {
    // create an array same size as our array
    // but values are the indexes themselves
    let indices = collectionArray[0].map((_, i) => i);
    // sort using index at a and b converted to lowercase
    // row is the sorting option chosen
    indices.sort((a, b) => {
        let valA = (collectionArray[optionIndex][a]).toLowerCase();
        let valB = (collectionArray[optionIndex][b]).toLowerCase();
        return valA.localeCompare(valB);
    });

    // after sorting complete, update the other arrays to match new indice map
    collectionArray[0] = indices.map(i => collectionArray[0][i]); 
    collectionArray[1] = indices.map(i => collectionArray[1][i]); 
    collectionArray[2] = indices.map(i => collectionArray[2][i]);
    collectionArray[3] = indices.map(i => collectionArray[3][i]); 
    if(collectionArray === browse)
    {
      collectionArray[4] = indices.map(i => collectionArray[4][i]);   
    }
}



// function to add an ISBN to borrowed books when borrow button clicked
function addToBorrowed(buttonClicked, destArray)
{
    var alreadyBorrowed = 0;
    // check if book already in borrowed array
    destArray[0].forEach((isbn) => {
        if(isbn === buttonClicked.dataset.isbn)
        {
            // if found, set already borrowed to true
            alreadyBorrowed = 1;
        }
    });
    // if it isn't already borrowed
    if(alreadyBorrowed === 0)
    {
        // push book array contents to borrowed array
        destArray[0].push(buttonClicked.dataset.isbn);
        destArray[1].push(buttonClicked.dataset.bookTitle);
        destArray[2].push(buttonClicked.dataset.author);
        destArray[3].push(buttonClicked.dataset.genre);
        // set checkout date
        destArray[4].push(getRandomDate());

        // set the checkout status in browse array to 1, indicating checked out
        browse[checkoutRow][buttonClicked.dataset.arrayLocation] = 1;     
    }  
    // save updated borrowed to local storage
    saveBorrowedBooks();
}

// function to return a book
function returnBook(buttonClicked)
{
    // get index in browse array of current book
    var browseIndex = browse[0].indexOf(buttonClicked.dataset.isbn);
    // set checkout status to 0, indicating not checked out
    browse[checkoutRow][browseIndex] = 0;
    

    // get the array index of current book
    var returnIndex = borrowed[0].indexOf(buttonClicked.dataset.isbn);
    // remove book from "borrowed" array in each row using splice
    borrowed[0].splice(returnIndex, 1); 
    borrowed[1].splice(returnIndex, 1); 
    borrowed[2].splice(returnIndex, 1); 
    borrowed[3].splice(returnIndex, 1);
    borrowed[4].splice(returnIndex, 1); 

    // save updated borrowed to local storage
    saveBorrowedBooks();

}

// function to save current borrowed book info
function saveBorrowedBooks() {
    localStorage.setItem(BORROWED_KEY, JSON.stringify(borrowed));
}


// function to load borrowed book info
function loadBorrowedBooks() {
    // load string version of borrowed books from local storage
    const borrowedString = localStorage.getItem(BORROWED_KEY);
    // if the string existed (borrowed books were saved in storage)
    if(borrowedString)
    {
        // convert string to array
        const borrowedArray = JSON.parse(borrowedString);
        
        // Clear current arrays and push loaded data back in
        for(var i = 0; i < borrowedArray.length; i++) {
            // clear current borrowed array
            borrowed[i].length = 0;
            // push saved ISBN, title, author, genre arrays
            borrowed[i].push(...borrowedArray[i]); 
        }

        // Synchronize borrow buttons so they don't show as checked out in browse div
        borrowed[0].forEach((isbn, i) => {
            // find index of this isbn in the browse array
            var location = browse[0].indexOf(isbn);
            // set checkout status at index to 1 for checked out
            browse[checkoutRow][location] = 1;
        });
    }
}


// function to generate a random date from a week ago to a week from now
function getRandomDate() {
    var now = new Date();
    var oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    
    // Get a random time in range
    var randomTime = (now.getTime() - oneWeekInMs) + (Math.random() * (oneWeekInMs * 2));
    
    // return the date as a Date object
    return new Date(randomTime); 
}