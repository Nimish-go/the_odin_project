const Library = [];

const Book = (id, name, price, dop, genre) => {
    this.id = id;
    this.name = name;
    this.price = price;
    this.dop = dop;
    this.genre = genre;
}

const addBookToLibrary = () => {
    const name = document.getElementById('bookName');
    const price = document.getElementById('bookPrice');
    const dop = document.getElementById('bookDate');
    const genre = document.getElementById('bookGenre');
    const id = crypto.randomUUID();

    const book = new Book(id,name,price,dop,genre);

    Library.push(book);
}


