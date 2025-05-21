const myLibrary = [];

function Book(title, author, numberOfPages) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.id = crypto.randomUUID();
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages`;
    };
}

function addBookToLibrary(title, author, numberOfPages) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, numberOfPages);
    myLibrary.push(newBook);
}