const myLibrary = [];

function Book(title, author, numberOfPages) {
    // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages`;
    };
}

function addBookToLibrary(title, author, numberOfPages) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, numberOfPages);
    myLibrary.push(newBook);
}

function displayBooks(library) {
    for (const book of library) {
        console.log(book.info());
    }
}
