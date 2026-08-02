document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Script (Synced with Portfolio)
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

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    // 3. Notes CRUD Application State
    let notes = JSON.parse(localStorage.getItem('vk_all_notes')) || [
        { id: 1, title: 'Welcome Note', category: 'General', content: 'This is your all-in-one advanced notes manager. You can Create, Read, Update, and Delete notes seamlessly!', date: '26 Jul 2026' }
    ];

    const noteForm = document.getElementById('noteForm');
    const noteIdInput = document.getElementById('noteId');
    const noteTitleInput = document.getElementById('noteTitleInput');
    const noteCategoryInput = document.getElementById('noteCategoryInput');
    const noteContentInput = document.getElementById('noteContentInput');
    const notesContainer = document.getElementById('notesContainer');
    const searchInput = document.getElementById('searchInput');
    const formHeading = document.getElementById('formHeading');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    function saveAndRender() {
        localStorage.setItem('vk_all_notes', JSON.stringify(notes));
        renderNotes();
    }

    function renderNotes(filterText = '') {
        notesContainer.innerHTML = '';
        
        const filteredNotes = notes.filter(n => 
            n.title.toLowerCase().includes(filterText.toLowerCase()) || 
            n.content.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredNotes.length === 0) {
            notesContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; opacity: 0.6; padding: 3rem; white-space: normal;">No notes found. Create your first note on the left!</div>`;
            return;
        }

        filteredNotes.forEach((note) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.innerHTML = `
                <div style="min-width: 0;">
                    <div class="note-header">
                        <span class="note-title">${escapeHTML(note.title)}</span>
                        <span class="note-category-badge">${escapeHTML(note.category)}</span>
                    </div>
                    <p class="note-body" style="margin-top: 0.8rem;">${escapeHTML(note.content)}</p>
                </div>
                <div class="note-footer">
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${note.date}</span>
                    <div class="note-actions">
                        <button class="btn-sm" onclick="editNote(${note.id})" title="Edit Note"><i class="fas fa-edit"></i></button>
                        <button class="btn-sm btn-danger-sm" onclick="deleteNote(${note.id})" title="Delete Note"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Form Submit (Create or Update)
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = noteIdInput.value;
        const title = noteTitleInput.value.trim();
        const category = noteCategoryInput.value;
        const content = noteContentInput.value.trim();

        if (!title || !content) return;

        const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        if (id) {
            // Update existing note
            notes = notes.map(n => n.id == id ? { ...n, title, category, content, date: currentDate + ' (Edited)' } : n);
        } else {
            // Create new note
            const newNote = {
                id: Date.now(),
                title,
                category,
                content,
                date: currentDate
            };
            notes.unshift(newNote);
        }

        saveAndRender();
        resetForm();
    });

    // Global Edit Handler
    window.editNote = function(id) {
        const note = notes.find(n => n.id == id);
        if (!note) return;

        noteIdInput.value = note.id;
        noteTitleInput.value = note.title;
        noteCategoryInput.value = note.category;
        noteContentInput.value = note.content;

        formHeading.innerHTML = `<i class="fas fa-edit"></i> Edit Note`;
        saveBtn.innerHTML = `<i class="fas fa-save"></i> Update Note`;
        cancelBtn.style.display = 'inline-flex';
        noteTitleInput.focus();
    };

    // Global Delete Handler
    window.deleteNote = function(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            notes = notes.filter(n => n.id != id);
            saveAndRender();
            resetForm();
        }
    };

    // Reset Form State
    window.resetForm = function() {
        noteForm.reset();
        noteIdInput.value = '';
        formHeading.innerHTML = `<i class="fas fa-pen-nib"></i> Create New Note`;
        saveBtn.innerHTML = `<i class="fas fa-plus"></i> Save Note`;
        cancelBtn.style.display = 'none';
    };

    // Search Filter Listener
    searchInput.addEventListener('input', (e) => {
        renderNotes(e.target.value);
    });

    // Initial Render
    renderNotes();
});