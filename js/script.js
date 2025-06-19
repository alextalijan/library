const myLibrary = [];

// Create a book class
class Book {
    constructor(title, author, numberOfPages, isBookRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isBookRead = isBookRead;
    }

    // Add a method to the book prototype for toggling the read status
    toggleReadStatus() {
        if (this.isBookRead === true) {
            this.isBookRead = false;
        } else {
            this.isBookRead = true;
        }
    }
}

// Create a new book then store it in the library array
function addBookToLibrary(title, author, numberOfPages, isBookRead, library) {
    const newBook = new Book(title, author, numberOfPages, isBookRead);
    library.push(newBook);
}

function displayBooks(library) {
    // Clear the table first, then iterate over all books
    const booksTable = document.querySelector(".books-table > tbody");
    booksTable.innerHTML = "";

    for (const book of library) {
        const newBookRow = document.createElement("tr");
        // Iterate over properties of the book to add them to the table
        for (const property in book) {
            const newBookDataColumn = document.createElement("td");

            // If the property of a book is known, add it as a column
            // Else if the property is about book being read, empty value means it hasn't
            // Else the value of that property is unknown
            if (book[property] && property !== "isBookRead") {
                newBookDataColumn.textContent = book[property];
            }
            else if (property === "isBookRead") {
                if (book.isBookRead === true) {
                    newBookDataColumn.textContent = "Yes";
                } else {
                    newBookDataColumn.textContent = "No";
                }

                // Add a button to change the read status of the book
                const toggleReadStatusButton = document.createElement("button");
                toggleReadStatusButton.type = "button";
                toggleReadStatusButton.innerText = "Change";
                toggleReadStatusButton.dataAttribute = book.id;
                toggleReadStatusButton.addEventListener("click", (event) => {
                    // Iterate over the library and toggle the read status
                    for (const book of library) {
                        if (book.id === event.target.dataAttribute) {
                            book.toggleReadStatus();
                            displayBooks(library);
                            break;
                        }
                    }
                });

                newBookDataColumn.appendChild(toggleReadStatusButton);
            }
            else {
                newBookDataColumn.textContent = "Unknown";
            }

            newBookRow.appendChild(newBookDataColumn);
        }

        // Create button that will be the last column in a row for removing a book
        const removeBookButton = document.createElement("button");
        const removeButtonTableColumn = document.createElement("td");

        // Add all relevant attributes to the button
        removeBookButton.type = "button";
        removeBookButton.innerText = "Remove Book";
        removeBookButton.dataAttribute = book.id;

        // When the button is clicked, the book with relevant ID is removed
        removeBookButton.addEventListener("click", (event) => {
            for (let i = 0; i < library.length; i++) {
                if (library[i].id === event.target.dataAttribute) {
                    library.splice(i, 1);
                    displayBooks(library);
                    break;
                }
            }
        });

        // Append the button to the row
        removeButtonTableColumn.appendChild(removeBookButton);
        newBookRow.appendChild(removeButtonTableColumn);

        booksTable.appendChild(newBookRow);
    }
}

// Create button for showing form modal on the screen
const newBookButton = document.querySelector(".new-book-button");
const formModal = document.querySelector("dialog:has(form)");

newBookButton.addEventListener("click", () => {
    formModal.showModal();
});

const bookForm = document.querySelector("dialog > form");
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", (event) => {
    // // Stop the form from submitting to the server
    event.preventDefault();

    // Check if all inputs have been given
    const newBookTitle = document.querySelector("#bookTitle");
    const newBookAuthor = document.querySelector("#bookAuthor");
    const newBookPagesNumber = document.querySelector("#numberOfPages");

    // Clear out any previous error messages
    newBookTitle.setCustomValidity('');
    newBookAuthor.setCustomValidity('');
    newBookPagesNumber.setCustomValidity('');

    if (!newBookTitle.checkValidity()) {
        newBookTitle.setCustomValidity('Please enter the title of the book');
        newBookTitle.reportValidity();
    } else if (!newBookAuthor.checkValidity()) {
        newBookAuthor.setCustomValidity('There must be an author of the book included.');
        newBookAuthor.reportValidity();
    } else if (!newBookPagesNumber.checkValidity()) {
        if (newBookPagesNumber.validity.rangeUnderflow) {
            newBookPagesNumber.setCustomValidity('The book has to have at least 1 page.');
        } else {
            newBookPagesNumber.setCustomValidity('Please input the number of pages.');
        }

        newBookPagesNumber.reportValidity();
    } else {
        const isNewBookRead = document.querySelector("#isBookRead").checked;

        // Add new book to the library and display all books in a table
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPagesNumber.value, isNewBookRead, myLibrary);
        displayBooks(myLibrary);

        // Close the modal and clear the form
        formModal.close();
        bookForm.reset();
    }
})
