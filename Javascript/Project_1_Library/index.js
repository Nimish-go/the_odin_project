const library = [];


function book (bookName,genre,author,read) {
    this.id = crypto.randomUUID();
    this.bookName = bookName;
    this.genre = genre;
    this.author = author;
    this.read = read;
}

const cards = document.querySelector(".cards-main-library");

if(library.length === 0 || library.length === null || library.length === undefined){
    cards.innerHTML = `
    <p class='add-books-text'>Please Add Some Books to the Library database</p><br />
    `;
} else {
    displayBooks();
}

book.prototype.toggleRead = function() {
    this.read = !this.read;
}

const bookToggleRead = ((id) => {
    const book = library.find(book => book.id === id);

    if(book){
        book.toggleRead();
        displayBooks();
    }
    
})

const addBooksToLibrary = ((bookName,author,genre,read) => {
    const new_book = new book(bookName, genre, author, read);
    library.push(new_book);

    displayBooks();
});

const addBook = document.querySelector(".addBooksBtn");

const modal = document.querySelector(".modal-dialog");

const addBookForm = document.querySelector(".book-add-form");

addBookForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    const formData = new FormData(addBookForm);
    const bookName = formData.get('bookName');
    const genre = formData.get('genre');
    const author = formData.get('author');
    const read = formData.get('read');
    addBooksToLibrary(bookName, author, genre, read);
    addBookForm.reset();

    const modalElement = bootstrap.Modal.getInstance(document.getElementById('modal-add-book'));
    modalElement.hide();
});

const displayBooks = (() => {
    console.log(library)

    const book_cards = document.querySelector('.cards-all-books');

    book_cards.innerHTML = '';
    library.forEach(book => {
        book_cards.innerHTML += `
        <div class="card mb-3 text-bg-light" style="max-width: 540px;, display: flex;, justify-content: center;, align-items: center;">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Book Details:</h5>
                        <p class="card-text">Book Id: ${book.id}</p>
                        <p class="card-text">Book Name: ${book.bookName}</p>
                        <p class="card-text">Book Genre: ${book.genre}</p>
                        <p class="card-text">Author Name: ${book.author}</p>
                        <p class="card-text">Read: ${book.read ? "Have Read" : "Haven't Read"}</p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-danger delete-book-btn" onclick="removeBook('${book.id}')">Delete Book Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
});


const removeBook = ((id) => {
    console.log("removebook called")
    const index = library.findIndex(book => book.id === id);
    if(index > -1){
        library.splice(index, 1);
        displayBooks();
    }
})



// document.querySelectorAll('.btn-danger').forEach(button => {
//     button.addEventListener('click', (e) => {
//         const id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
//         removeBook(id);
//     })
// });