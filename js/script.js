const myLibrary = [];

function Book(title, author, numberOfPages, isBookRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isBookRead = isBookRead;
}

Book.prototype.toggleReadStatus = function() {
    if (this.isBookRead === true) {
        this.isBookRead = false;
    } else {
        this.isBookRead = true;
    }
};

function addBookToLibrary(title, author, numberOfPages, isBookRead) {
    // Create a new book then store it in the array
    const newBook = new Book(title, author, numberOfPages, isBookRead);
    myLibrary.push(newBook);
}

function displayBooks(library) {
    // Clear the table first, then iterate over all books
    booksTable = document.querySelector(".books-table > tbody");
    booksTable.innerHTML = "";

    for (const book of library) {
        const newBookRow = document.createElement("tr");
        // Iterate over properties of the book and add them to the table
        for (const property in book) {
            const newBookDataColumn = document.createElement("td");

            // If the property of a book is known, add it as a column
            // Else if the property is about book being read, empty value means it hasn't
            // Else the value of that property is unknown
            if (book[property] && property !== "isBookRead") {
                newBookDataColumn.textContent = book[property];
            } else if (property === "isBookRead") {
                if (book.isBookRead === true) {
                    newBookDataColumn.textContent = "Yes";
                } else {
                    newBookDataColumn.textContent = "No";
                }

                // Add a button to change the read status of the book
                const toggleReadStatusButton = document.createElement("button");
                toggleReadStatusButton.type = "button";
                toggleReadStatusButton.innerText = "Change";
                toggleReadStatusButton.addEventListener("click", (event) => {
                    
                })
            } else {
                newBookDataColumn.textContent = "Unknown";
            }

            newBookRow.appendChild(newBookDataColumn);
        }

        // Last column contains a button to remove the book from the library
        const removeBookButton = document.createElement("button");
        const removeButtonTableColumn = document.createElement("td");

        // Add all relevant attributes to the button and append it to the row
        removeBookButton.type = "button";
        removeBookButton.innerText = "Remove Book";
        removeBookButton.dataAttribute = book.id;

        // Add logic to remove the book from the row
        removeBookButton.addEventListener("click", (event) => {
            // Remove the book with that book ID from the library array
            for (let i = 0; i < library.length; i++) {
                if (library[i].id === event.target.dataAttribute) {
                    library.splice(i, 1);
                    displayBooks(library);
                    break;
                }
            }
        });

        removeButtonTableColumn.appendChild(removeBookButton);
        newBookRow.appendChild(removeButtonTableColumn);

        booksTable.appendChild(newBookRow);
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

    // Add new book to the library and display all books in a table
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPagesNumber, isNewBookRead);
    displayBooks(myLibrary);
})
