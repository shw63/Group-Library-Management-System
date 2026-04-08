const mySelect = document.querySelector('#sortSelect');
mySelect.addEventListener('change', (event) => {
    console.log("Selected value:", event.target.value);
    
});


const isbns = ["9788448032951", "9788401329104", "9781400063802", "9780399141430", "9780515109740", "9780399139703", "9780743465014", "9780380978540", "9780380978793", "9780385180290", "9780399156816", "9780446603393", "9780765317322", "9780399135811", "9780385485081", "9781451642476", "9780553370317", "9780373250479", "9780805095937", "9781440564833", "9780316198530", "9780399150555", "9780316188524", "9780061432712", "9780380974054", "9781451642544", "9781432825522", "9780062065483", "9780345435736", "9780061098765", "9780553801378", "9781412024686", "9780525939764", "9780312531188", "9780425239131", "9780312376451", "9780007213511", "9780553010770", "9780393027211", "9780553081305", "9780547819228", "9781401302313", "9780307266873", "9780312660819", "9780385126939", "9780345457233", "9780307985767", "9780312936686", "9781455526062", "9780345547651" ];

const titles = ["El Señor de los Anillos", "Dioses Mendigos", "Pilgrims Upon the Earth", "Rosehaven", "The Hellion Bride", "The Nightingale", "Genesis Force", "Heart of a Warrior", "The Fresco", "The Ordeal of Gilbert Pinfold", "Crossfire", "Strange Highways", "The Third Lynx", "Longshot", "Harlem", "Midwinter Blood", "Last Refuge", "Slightly Settled", "The Afrika Reich", "Sons of Moriah", "You", "McNally's Dare", "Gods and Beasts", "Gator a-Go-Go", "Midnight in Ruby Bayou", "Summer of the Dead", "Desert Steel", "The Body in the Cast", "Jarka Ruus", "Law of Gravity", "One Door Away from Heaven", "The Judas King", "Blood Relations", "Yours, Mine, and Ours", "Mourning Glory", "The Good Thief", "The Scent of Rain and Lightning", "Dragonworld", "The Great Gatsby", "Sideshow", "The Best American Short Stories", "The Yummy Mummy", "The Fifth Floor", "Quicksilver", "Sequoia Shootout", "Settling Accounts", "A Study in Revenge", "Splintered Icons", "A House Divided", "Bryant & May and the Bleeding Heart"];

const authors = ["David Eddings", "Terry Pratchett", "Brad Land", "Catherine Coulter", "Catherine Coulter", "Catherine Coulter", "John Vornholt", "Johanna Lindsey", "Sheri S. Tepper", "Frank Roderus", "Dick Francis", "Dean Koontz", "Timothy Zahn", "Dick Francis", "Len Riley", "Mons Kallentoft", "Elizabeth Scarborough", "Wendy Markham", "Guy Saville", "Grossman", "Vincent Lardo", "Denise Mina", "Tim Dorsey", "Elizabeth Lowell", "Mons Kallentoft", "L. P. Holmes", "Katherine Page", "Terry Brooks", "Stephen Horn", "Dean Koontz", "Rob Rickards", "Barbara Parker", "Mary Davidson", "Susan Albert", "Chris Ewan", "Andrew Taylor", "Byron Preiss", "John Minahan", "Sheri S. Tepper", "Polly Williams", "Michael Harvey", "Bill Pronzini", "John Reese", "Harry Turtledove", "Kieran Shields", "Bill Napier", "Kimberla Roby", "Christopher Fowler"];

const bookList = document.querySelector('#bookList');
var counter = 0;

var bookContainer = document.createElement('div');
bookContainer.classList.add('container');

var bookRow = document.createElement('div');
bookRow.classList.add('row');


bookContainer.appendChild(bookRow);
bookList.appendChild(bookContainer);

isbns.forEach(isbn => {
var img = document.createElement('img');
img.src = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;

img.onerror = function() {
    this.src = './no_cover.png'; 
};

img.alt = `Book cover for ISBN ${isbn}`;
img.style.height = "100px";
img.style.width = "auto"; 
img.style.objectFit = "contain";


var cardDiv = document.createElement('div');
cardDiv.classList.add('card');

var titleDiv = document.createElement('div');
titleDiv.textContent = (`${titles[counter]}`)
titleDiv.classList.add('book_author');

var authorDiv = document.createElement('div');
authorDiv.classList.add('book_author');
authorDiv.textContent = (`${authors[counter]}`)

var bookCol = document.createElement('div');

bookCol.classList.add('col', 'col-auto');

cardDiv.appendChild(img);
cardDiv.appendChild(titleDiv);
cardDiv.appendChild(authorDiv);
bookCol.appendChild(cardDiv);
bookRow.appendChild(bookCol);



counter++;
});

