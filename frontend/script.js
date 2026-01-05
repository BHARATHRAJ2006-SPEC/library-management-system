const API = "https://library-management-system-ql11.onrender.com/books";

const list = document.getElementById("bookList");

async function loadBooks() {
  const res = await fetch(API);
  const books = await res.json();

  list.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${book.title}</strong> — ${book.author}</span>
      <button onclick="deleteBook('${book._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();

  if (!title || !author) {
    alert("Please fill all fields");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author })
  });

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";

  loadBooks();
}

async function deleteBook(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadBooks();
}

loadBooks();
