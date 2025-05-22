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

const newBookButton = document.querySelector(".new-book-button");
const formModal = document.querySelector("dialog:has(form)");

newBookButton.addEventListener("click", () => {
    formModal.showModal();
});

const bookForm = document.querySelector("dialog > form");
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", (event) => {
    // Stop the form from submitting to the server
    event.preventDefault();

    // Save data from the form
    const newBookTitle = document.querySelector("#bookTitle").value;
    const newBookAuthor = document.querySelector("#bookAuthor").value;
    const newBookPagesNumber = document.querySelector("#numberOfPages").value;
    const isNewBookRead = document.querySelector("#isBookRead").checked;

    // Close the modal and clear the form
    formModal.close();
    bookForm.reset();

    // Show the new book on the web page
    
})
