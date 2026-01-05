const API = "https://library-management-system-ql11.onrender.com/books";
const tableBody = document.querySelector("#bookList tbody");

// Load all books
async function loadBooks() {
  const res = await fetch(API);
  const books = await res.json();

  tableBody.innerHTML = "";
  books.forEach(book => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category || '-'}</td>
      <td>${book.publishedYear || '-'}</td>
      <td>
        <button class="action-btn" onclick="deleteBook('${book._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add new book
async function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();
  const year = document.getElementById("year").value.trim();

  if (!title || !author) {
    alert("Title and Author are required!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category, publishedYear: year })
  });

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("year").value = "";

  loadBooks();
}

// Delete book
async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadBooks();
}

// Search books
async function searchBooks() {
  const query = document.getElementById("searchQuery").value.toLowerCase();
  const res = await fetch(API);
  const books = await res.json();

  const filtered = books.filter(book =>
    (book.title && book.title.toLowerCase().includes(query)) ||
    (book.author && book.author.toLowerCase().includes(query)) ||
    (book.category && book.category.toLowerCase().includes(query)) ||
    (book.publishedYear && book.publishedYear.toString().includes(query))
  );

  tableBody.innerHTML = "";
  filtered.forEach(book => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category || '-'}</td>
      <td>${book.publishedYear || '-'}</td>
      <td>
        <button class="action-btn" onclick="deleteBook('${book._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial load
loadBooks();
