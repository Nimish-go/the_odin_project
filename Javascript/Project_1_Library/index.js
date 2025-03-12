const Library = [];

const Book = (id, name, genre) => {
    this.id = id;
    this.name = name;
    this.genre = genre;
}

const addBook = document.querySelector('.add-new-book');

const dialog = document.querySelector('dialog');

addBook.addEventListener("click", () => {
    dialog.showModal();
})

const submitBook = document.querySelector(".submitBook");

submitBook.addEventListener("click" , addBookToLibrary, false);

const addBookToLibrary = (event) => {
    event.preventDefault();

    const name = document.querySelector('.bookName');
    const genre = document.querySelector('.bookGenre');
    const id = crypto.randomUUID();

    const book = new Book(id,name,price,dop,genre);
    Library.push(book);

    dialog.close();

}

const closeModal = document.getElementById("close");

closeModal.addEventListener("click" , () => {
    dialog.close();
})

const cards = document.getElementById('cards');

if(Library.length === 0 || Library.length === null || Library.length === undefined){
    cards.innerHTML = `
    <div class='card'>
        <p class='null-title'>No Books to be displayed</p>
    </div>`;
}else{
    Library.forEach((elem) => {
        cards.innerHTML = `
        <div class='card'>
            <p class='card-title'>${elem.name}</p>
            <p class='book-genre'>${elem.genre}</p>
        </div>`;
    });
}