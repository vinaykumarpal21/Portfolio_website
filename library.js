document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Script (Synced with Portfolio)[cite: 2]
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // 2. Mobile Menu Toggle[cite: 2]
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    // 3. Library Management Application State
    let books = JSON.parse(localStorage.getItem('library_books')) || [
        { id: 1, title: 'Java Core Programming', author: 'Herbert Schildt', category: 'Programming', status: 'Available' },
        { id: 2, title: 'SAP ABAP Cloud Architecture', author: 'Bince Mathew', category: 'Enterprise IT', status: 'Issued' },
        { id: 3, title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Database', status: 'Available' }
    ];

    const bookForm = document.getElementById('bookForm');
    const bookTableBody = document.getElementById('bookTableBody');
    const searchInput = document.getElementById('searchInput');
    
    const totalBooksCount = document.getElementById('totalBooksCount');
    const availableBooksCount = document.getElementById('availableBooksCount');
    const issuedBooksCount = document.getElementById('issuedBooksCount');

    function saveAndRender() {
        localStorage.setItem('library_books', JSON.stringify(books));
        renderBooks();
    }

    function renderBooks(filterText = '') {
        bookTableBody.innerHTML = '';
        
        const filteredBooks = books.filter(b => 
            b.title.toLowerCase().includes(filterText.toLowerCase()) || 
            b.author.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredBooks.length === 0) {
            bookTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; opacity: 0.6; padding: 2rem; white-space: normal;">No matching books found in the catalog.</td></tr>`;
        } else {
            filteredBooks.forEach((book) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${book.title}</strong></td>
                    <td>${book.author}</td>
                    <td><span style="opacity:0.85; font-size:0.85rem;">${book.category}</span></td>
                    <td><span class="badge ${book.status === 'Available' ? 'badge-available' : 'badge-issued'}">${book.status}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-sm" onclick="toggleStatus(${book.id})" title="Toggle Issue/Return">
                                <i class="fas ${book.status === 'Available' ? 'fa-book-reader' : 'fa-undo'}"></i>
                            </button>
                            <button class="btn-sm btn-danger-sm" onclick="deleteBook(${book.id})" title="Delete Book">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                bookTableBody.appendChild(row);
            });
        }

        // Update Dashboard Statistics
        totalBooksCount.textContent = books.length;
        availableBooksCount.textContent = books.filter(b => b.status === 'Available').length;
        issuedBooksCount.textContent = books.filter(b => b.status === 'Issued').length;
    }

    // Add Book Handler
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('bookTitle').value.trim();
        const author = document.getElementById('bookAuthor').value.trim();
        const category = document.getElementById('bookCategory').value;

        if (!title || !author) return;

        const newBook = {
            id: Date.now(),
            title,
            author,
            category,
            status: 'Available'
        };

        books.push(newBook);
        saveAndRender();
        bookForm.reset();
    });

    // Global Functions for Actions
    window.toggleStatus = function(id) {
        books = books.map(b => {
            if (b.id === id) {
                b.status = b.status === 'Available' ? 'Issued' : 'Available';
            }
            return b;
        });
        saveAndRender();
    };

    window.deleteBook = function(id) {
        if (confirm('Are you sure you want to remove this book from the system?')) {
            books = books.filter(b => b.id !== id);
            saveAndRender();
        }
    };

    // Search Filter Listener
    searchInput.addEventListener('input', (e) => {
        renderBooks(e.target.value);
    });

    // Initial Render
    renderBooks();
});