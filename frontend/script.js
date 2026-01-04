const backendUrl = "https://library-management-system-ql11.onrender.com/books"; // Replace with your Render backend URL

// Fetch and display books
async function fetchBooks() {
  const response = await fetch(backendUrl);
  const books = await response.json();
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `${book.title} by ${book.author} 
      <button onclick="deleteBook('${book._id}')">Delete</button>`;
    container.appendChild(li);
  });
}

// Add a new book
async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  if (!title || !author) {
    alert("Please enter both title and author!");
    return;
  }
  await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author })
  });
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  fetchBooks();
}

// Delete a book
async function deleteBook(id) {
  await fetch(`${backendUrl}/${id}`, { method: "DELETE" });
  fetchBooks();
}

// Load books on page load
fetchBooks();
