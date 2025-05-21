const myLibrary = [];

function Book(title, author, numberOfPages, isBookRead) {
    // the constructor...
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isBookRead = isBookRead;
    this.info = function() {
        let infoSentence = `${this.title} by ${this.author}, ${this.numberOfPages} pages, `;
        if (this.isBookRead) {
            infoSentence += "has been read";
        } else {
            infoSentence += "not read yet";
        }

        return infoSentence;
    };
}

function addBookToLibrary(title, author, numberOfPages, isBookRead) {
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, numberOfPages, isBookRead);
    myLibrary.push(newBook);
}

function displayBooks(library) {
    for (const book of library) {
        console.log(book.info());
    }
}
