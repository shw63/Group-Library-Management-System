

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
const browseISBNs = collectionISBNs;
const browseTitles = collectionTitles;
const browseAuthors = collectionAuthors;
const browseGenres = collectionGenres;
const browse = [browseISBNs, browseTitles, browseAuthors, browseGenres];

// borrowed starts out empty
const borrowedISBNs = [];
const borrowedTitles = [];
const borrowedAuthors = [];
const borrowedGenres = [];
const borrowed = [borrowedISBNs, borrowedTitles, borrowedAuthors, borrowedGenres];

// actions to be carried out only once page loads
window.addEventListener("load", function() {
    // set up object to track the div where browse books cards are drawn
    const browseDiv = document.querySelector(".browseRow");
    // set up object to track where borrowed books cards are drawn
    const borrowedDiv = document.querySelector(".borrowedRow");
    // draw browse book cards on page load
        // function redrawBookArray below
    redrawBookArray(collection, browseDiv);

    // event listener for when sort selection updated
    const sortOption = document.querySelector('#sortSelect');
    sortOption.addEventListener('change', (event) => {
    const choice = event.target.value;
    // call sort function based on chosen option
    if (choice === "author") {
        sortCollection(browse, 2); 
    } else if (choice === "title") {
        sortCollection(browse, 1); 
    } else if (choice === "genre") {
        sortCollection(browse, 3);
    }
    // redraw our browse array once sort finished
    redrawBookArray(browse, browseDiv);
    });

    // event listener for "borrow" button clicked

    const borrowButtons = document.querySelectorAll('.borrow');

        // Loop through each button to add a listener
    borrowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(`clicked to borrow book: ${event.target.value}`);
        });
    });

});






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
    cardDiv.classList.add('card');
    // create a div for title text
    var titleDiv = document.createElement('div');
    // add the genre and title at current i index
    titleDiv.textContent = (`${bookArray[3][i]}  ${bookArray[1][i]}`)
    // add class so we can access this object easily in future
    titleDiv.classList.add('book_title');

    // create a div for author text
    var authorDiv = document.createElement('div');
    authorDiv.classList.add('book_author');
    // add author at current i index
    authorDiv.textContent = (`${bookArray[2][i]}`)

    // create new bootstrap column
    var bookCol = document.createElement('div');

    // create new button
    var borrowButton = document.createElement('button');
    borrowButton.textContent = "Borrow";
    borrowButton.value = `${isbn}`;
    borrowButton.classList.add('borrow');

    // set card to auto fit size to screen
    bookCol.classList.add('col', 'col-auto');

    // append objects to create card
    cardDiv.appendChild(img);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(borrowButton);
    bookCol.appendChild(cardDiv);
    parentRowDiv.appendChild(bookCol);

    });
}


// function to sort an array based on chosen option
    // array.map, array.sort, and localeCOmpare methods are new to me.
    // localeCompare returns which value comes alphabetically first
    // array.sort moves the values around based on the result of localeCompare
    // array.map creates an array numbered 0-number of books storing integers instead of author/genre/title so they can be moved around easily
function sortCollection(collectionArray, optionIndex) {
    let indices = collectionArray[0].map((_, i) => i);

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
}