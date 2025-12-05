// js/notes-list.js

let allNotes = []; // Store all notes
let filteredNotes = []; // Store filtered notes
let currentUser = null;

// ================================================
// REQUIRE LOGIN TO VIEW THIS PAGE
// ================================================
(async function initPage() {
    // Redirect to login if not authenticated
    currentUser = await requireAuth();

    // Load notes
    await loadNotes();

    // Setup filter listeners
    setupFilters();
})();

// ================================================
// LOGOUT BUTTON
// ================================================
document.getElementById('logoutBtn').addEventListener('click', async function() {
    await logout();
    window.location.href = 'login.html';
});

// ================================================
// LOAD ALL NOTES FROM DATABASE
// ================================================
async function loadNotes() {
    const loadingIndicator = document.getElementById('loadingIndicator');

    try {
        // Fetch all notes with uploader info
        const { data: notes, error } = await supabaseClient
            .from('notes')
            .select(`
        *,
        profiles (
          full_name,
          branch
        )
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Store notes globally
        allNotes = notes || [];
        filteredNotes = allNotes;

        // Hide loading
        loadingIndicator.style.display = 'none';

        // Update stats
        updateStats();

        // Display notes
        displayNotes();

    } catch (error) {
        console.error('Error loading notes:', error);
        loadingIndicator.innerHTML = '<p style="color: red;">❌ Error loading notes: ' + error.message + '</p>';
    }
}

// ================================================
// UPDATE STATISTICS
// ================================================
function updateStats() {
    // Total notes
    document.getElementById('totalNotes').textContent = allNotes.length;

    // Unique branches
    const uniqueBranches = new Set(allNotes.map(note => note.branch));
    document.getElementById('totalBranches').textContent = uniqueBranches.size;

    // User's uploads
    const userNotes = allNotes.filter(note => note.uploaded_by === currentUser.id);
    document.getElementById('userUploads').textContent = userNotes.length;
}

// ================================================
// DISPLAY NOTES IN GRID
// ================================================
function displayNotes() {
    const notesGrid = document.getElementById('notesGrid');
    const emptyState = document.getElementById('emptyState');
    const resultsCount = document.getElementById('resultsCount');

    // Clear grid
    notesGrid.innerHTML = '';

    // Check if empty
    if (filteredNotes.length === 0) {
        emptyState.style.display = 'block';
        resultsCount.textContent = 'No notes found';
        return;
    }

    // Hide empty state
    emptyState.style.display = 'none';
    resultsCount.textContent = filteredNotes.length + ' note(s) found';

    // Create cards
    filteredNotes.forEach(function(note) {
        const card = createNoteCard(note);
        notesGrid.appendChild(card);
    });
}

// ================================================
// CREATE NOTE CARD
// ================================================
function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';

    // Format date
    const date = new Date(note.created_at);
    const formattedDate = date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Uploader info
    const uploaderName = note.profiles ? note.profiles.full_name : 'Unknown';
    const uploaderBranch = note.profiles ? note.profiles.branch : '';

    // Get public URL
    const { data: urlData } = supabaseClient.storage
        .from('notes-files')
        .getPublicUrl(note.file_path);

    const fileUrl = urlData.publicUrl;

    // Branch colors
    const branchColors = {
        'BCA': '#667eea',
        'BCom': '#f093fb',
        'BA': '#4facfe',
        'BSc': '#43e97b',
        'BBA': '#fa709a',
        'MBA': '#ff6b6b'
    };

    const branchColor = branchColors[note.branch] || '#667eea';

    // Build card
    card.innerHTML = `
    <div class="card-header" style="background: linear-gradient(135deg, ${branchColor} 0%, ${branchColor}dd 100%);">
      <div class="card-header-content">
        <h3>${escapeHtml(note.title)}</h3>
        <div class="card-badges">
          <span class="branch-badge">${escapeHtml(note.branch)}</span>
          <span class="semester-badge">Sem ${note.semester}</span>
        </div>
      </div>
    </div>
    
    <div class="card-body">
      <p class="card-info">
        <strong>📚 Subject:</strong> ${escapeHtml(note.subject)}
      </p>
      <p class="card-info">
        <strong>📑 Unit:</strong> ${escapeHtml(note.unit)}
      </p>
      <p class="card-description">
        ${escapeHtml(note.description || 'No description provided')}
      </p>
    </div>
    
    <div class="card-footer">
      <div class="card-meta">
        <span class="uploader">👤 ${escapeHtml(uploaderName)}${uploaderBranch ? ' (' + escapeHtml(uploaderBranch) + ')' : ''}</span>
        <span class="date">📅 ${formattedDate}</span>
      </div>
      <a href="${fileUrl}" target="_blank" class="btn-download">
        📥 Download PDF
      </a>
    </div>
  `;

    return card;
}

// ================================================
// SETUP FILTERS
// ================================================
function setupFilters() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', applyFilters);

    // Course checkboxes
    const courseFilters = document.querySelectorAll('.course-filter');
    courseFilters.forEach(function(checkbox) {
        checkbox.addEventListener('change', applyFilters);
    });

    // Semester checkboxes
    const semesterFilters = document.querySelectorAll('.semester-filter');
    semesterFilters.forEach(function(checkbox) {
        checkbox.addEventListener('change', applyFilters);
    });

    // Clear filters button
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);

    // Close sidebar button (mobile)
    document.getElementById('closeSidebarBtn').addEventListener('click', closeSidebar);

    // Mobile filter toggle
    const mobileFilterToggle = document.getElementById('mobileFilterToggle');
    const filterSidebar = document.querySelector('.filter-sidebar');

    // Function to close sidebar
    function closeSidebar() {
        filterSidebar.classList.remove('mobile-active');
        mobileFilterToggle.textContent = '🔍 Show Filters';
        document.body.style.overflow = '';

        // Remove backdrop if exists
        const backdrop = document.querySelector('.filter-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    // Function to open sidebar
    function openSidebar() {
        filterSidebar.classList.add('mobile-active');
        mobileFilterToggle.textContent = '✖ Hide Filters';
        document.body.style.overflow = 'hidden';

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'filter-backdrop';
        document.body.appendChild(backdrop);

        // Close when clicking backdrop
        backdrop.addEventListener('click', closeSidebar);
    }

    // Toggle filter sidebar
    mobileFilterToggle.addEventListener('click', function(e) {
        e.stopPropagation();

        if (filterSidebar.classList.contains('mobile-active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Prevent closing when clicking inside sidebar
    filterSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ================================================
// APPLY FILTERS
// ================================================
function applyFilters() {
    // Get search term
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Get selected courses
    const selectedCourses = [];
    document.querySelectorAll('.course-filter:checked').forEach(function(checkbox) {
        selectedCourses.push(checkbox.value);
    });

    // Get selected semesters
    const selectedSemesters = [];
    document.querySelectorAll('.semester-filter:checked').forEach(function(checkbox) {
        selectedSemesters.push(parseInt(checkbox.value));
    });

    // Filter notes
    filteredNotes = allNotes.filter(function(note) {
        // Search filter
        const matchesSearch = !searchTerm ||
            note.title.toLowerCase().includes(searchTerm) ||
            note.subject.toLowerCase().includes(searchTerm);

        // Course filter
        const matchesCourse = selectedCourses.length === 0 ||
            selectedCourses.includes(note.branch);

        // Semester filter
        const matchesSemester = selectedSemesters.length === 0 ||
            selectedSemesters.includes(note.semester);

        return matchesSearch && matchesCourse && matchesSemester;
    });

    // Update active filters display
    updateActiveFilters(searchTerm, selectedCourses, selectedSemesters);

    // Display filtered results
    displayNotes();
}

// ================================================
// UPDATE ACTIVE FILTERS CHIPS
// ================================================
function updateActiveFilters(searchTerm, courses, semesters) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const filterChips = document.getElementById('filterChips');

    // Clear chips
    filterChips.innerHTML = '';

    let hasFilters = false;

    // Search chip
    if (searchTerm) {
        hasFilters = true;
        const chip = document.createElement('span');
        chip.className = 'filter-chip';
        chip.textContent = '🔍 "' + searchTerm + '"';
        filterChips.appendChild(chip);
    }

    // Course chips
    courses.forEach(function(course) {
        hasFilters = true;
        const chip = document.createElement('span');
        chip.className = 'filter-chip';
        chip.textContent = course;
        filterChips.appendChild(chip);
    });

    // Semester chips
    semesters.forEach(function(sem) {
        hasFilters = true;
        const chip = document.createElement('span');
        chip.className = 'filter-chip';
        chip.textContent = 'Sem ' + sem;
        filterChips.appendChild(chip);
    });

    // Show/hide active filters
    activeFiltersDiv.style.display = hasFilters ? 'flex' : 'none';
}

// ================================================
// CLEAR ALL FILTERS
// ================================================
function clearAllFilters() {
    // Clear search
    document.getElementById('searchInput').value = '';

    // Uncheck all checkboxes
    document.querySelectorAll('.course-filter, .semester-filter').forEach(function(checkbox) {
        checkbox.checked = false;
    });

    // Reset filtered notes
    filteredNotes = allNotes;

    // Update display
    updateActiveFilters('', [], []);
    displayNotes();
}

// ================================================
// ESCAPE HTML
// ================================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================================
// NAVBAR FUNCTIONALITY
// ================================================
(function initNavbar() {
    // Mobile hamburger menu toggle
    const hamburger = document.getElementById('navHamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update user name and avatar in navbar
    if (currentUser) {
        supabaseClient
            .from('profiles')
            .select('full_name')
            .eq('id', currentUser.id)
            .single()
            .then(function(response) {
                if (response.data) {
                    const userName = response.data.full_name;
                    const userNameEl = document.getElementById('userName');
                    const userAvatar = document.getElementById('userAvatar');

                    if (userNameEl) {
                        userNameEl.textContent = userName.split(' ')[0]; // First name only
                    }

                    if (userAvatar) {
                        userAvatar.textContent = userName.charAt(0).toUpperCase(); // First letter
                    }
                }
            });
    }

    // Mobile user dropdown toggle
    const navUser = document.querySelector('.nav-user');
    const navUserBtn = document.querySelector('.nav-user-btn');

    if (navUserBtn && window.innerWidth <= 768) {
        navUserBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navUser.classList.toggle('active');
        });
    }
})();