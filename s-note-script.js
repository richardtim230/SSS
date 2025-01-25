
// Initialize the rich text editor for notes
const quill = new Quill('#noteEditor', {
  theme: 'snow',
  placeholder: 'Start typing...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // Basic formatting
      [{ 'font': [] }], // Font family
      [{ 'size': ['small', false, 'large', 'huge'] }], // Font size
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header levels
      [{ 'align': [] }], // Alignment
      [{ 'color': [] }, { 'background': [] }], // Text and background colors
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and superscript
      [{ 'direction': 'rtl' }], // Text direction
      ['link', 'image', 'video'], // Links, images, and videos
      ['code-block', 'blockquote'], // Code block and blockquote
      ['formula'], // Math formulas
      ['clean'], // Clear formatting
    ],
  },
});

// Add a custom handler for image uploads
quill.getModule('toolbar').addHandler('image', () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', e.target.result);

        // Apply fixed size to images
        const images = document.querySelectorAll('.ql-editor img');
        images.forEach((img) => {
          img.style.width = '300px'; // Fixed width
          img.style.height = 'auto'; // Maintain aspect ratio
        });
      };
      reader.readAsDataURL(file);
    }
  };
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadCategories();
    console.log('Categories loaded successfully');
  } catch (error) {
    console.error('Error in loadCategories:', error);
  }
});


  const defaultCategories = JSON.parse(localStorage.getItem('categories')) || ["Personal", "Academic", "Miscellaneous"];
  let selectedCategory = "Personal";

  function showCategory(category) {
    selectedCategory = category;
    loadNotes(); // Function to load notes based on the selected category
  }

  function addCategory() {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !defaultCategories.includes(newCategory)) {
      defaultCategories.push(newCategory);
      localStorage.setItem('categories', JSON.stringify(defaultCategories)); // Save to local storage
      // Update the categories section with the new category button
      const categoriesDiv = document.getElementById('categories');
      const newButton = document.createElement('button');
      newButton.textContent = newCategory;
      newButton.onclick = () => showCategory(newCategory);
      categoriesDiv.insertBefore(newButton, categoriesDiv.lastElementChild);
    }
  }

  function loadCategories() {
    const categoriesDiv = document.getElementById('categories');
    categoriesDiv.innerHTML = '';
    defaultCategories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category;
      button.onclick = () => showCategory(category);
      categoriesDiv.appendChild(button);
    });
    // Add the "Add Category" button
    const addCategoryButton = document.createElement('button');
    addCategoryButton.textContent = 'Add Category';
    addCategoryButton.onclick = addCategory;
    categoriesDiv.appendChild(addCategoryButton);
  }

// Random weekly schedules for departments
const departmentSchedules = {
  SCI123: [
    { time: '8:00 AM', Mon: 'PHY101 Lab 1', Tue: 'CHM102 LT 2', Wed: 'MTH105 LT 3', Thu: 'PHY101 Lab 2', Fri: 'BIO110 LT 1' },
    { time: '10:00 AM', Mon: 'CHM102 LT 3', Tue: 'PHY101 Lab 2', Wed: 'BIO110 Lab 1', Thu: 'MTH105 LT 1', Fri: 'CHM102 Lab' },
    { time: '1:00 PM', Mon: 'MTH105 LT 2', Tue: 'BIO110 Lab 1', Wed: '', Thu: 'PHY101 Lab 3', Fri: '' }
  ],
  HEA456: [
    { time: '8:00 AM', Mon: 'MED200 Lab 3', Tue: 'NUR210 LT 1', Wed: 'ANAT301 LT 2', Thu: 'MED200 LT 3', Fri: 'PHYS301 LT 1' },
    { time: '11:00 AM', Mon: 'NUR210 Lab', Tue: '', Wed: 'PHARM210 Lab', Thu: 'ANAT301 LT 2', Fri: 'NUR210 LT 2' },
    { time: '3:00 PM', Mon: '', Tue: 'MED200 LT 3', Wed: 'NUR210 Lab', Thu: '', Fri: '' }
  ],
  PHA789: [
    { time: '9:00 AM', Mon: 'PHA201 Lab', Tue: 'PHA203 LT 1', Wed: 'PHA202 LT 3', Thu: 'PHA201 Lab', Fri: 'PHA202 LT 1' },
    { time: '1:00 PM', Mon: '', Tue: 'PHA202 LT 1', Wed: 'PHA203 Lab', Thu: '', Fri: 'PHA201 Lab' },
    { time: '4:00 PM', Mon: 'PHA202 LT 3', Tue: '', Wed: 'PHA201 Lab', Thu: 'PHA203 LT 2', Fri: '' }
  ],
  AGR101: [
    { time: '8:00 AM', Mon: 'AGRO101 LT 1', Tue: 'FST105 Lab', Wed: 'AGR105 LT 3', Thu: 'FST105 Lab', Fri: 'AGR106 LT 2' },
    { time: '12:00 PM', Mon: '', Tue: 'AGR107 LT 2', Wed: 'AGRO101 LT 1', Thu: 'AGR106 Lab', Fri: '' },
    { time: '2:00 PM', Mon: 'AGR106 LT 3', Tue: '', Wed: '', Thu: 'FST105 LT 3', Fri: '' }
  ],
  ART202: [
    { time: '9:00 AM', Mon: 'HIS101 LT 2', Tue: 'ENG102 LT 3', Wed: 'PHIL105 LT 2', Thu: 'HIS101 LT 1', Fri: 'ART110 LT 2' },
    { time: '11:00 AM', Mon: 'ENG102 LT 1', Tue: 'PHIL105 LT 3', Wed: '', Thu: 'ART110 LT 3', Fri: 'ENG102 LT 2' },
    { time: '3:00 PM', Mon: '', Tue: 'PHIL105 LT 1', Wed: 'HIS101 LT 3', Thu: 'ENG102 LT 1', Fri: '' }
  ],
  "ZOO/PT1": [
    { time: '8:00 AM', Mon: 'CHM 101 (1k SLT)', Tues: 'SER 001 (BOOC)', Wed: 'ZOO 101 (ODLT 1)', Thur: 'SER 001 (BOOC)', Fri: 'ZOO 101 (TETFUND ETF)' },
    { time: '9:00 AM', Mon: 'ZOO 101 (FBLT)', Tues: 'CHM 101 (1k SLT)', Wed: '—', Thur: '—', Fri: '-' },
    { time: '10:00 AM', Mon: 'PHY 105 (1k SLT)', Tues: '—', Wed: 'PHY 105 (1k SLT)', Thur: '-', Fri: 'PHY 105 (1k SLT)' },
    { time: '11:00 AM', Mon: '—', Tues: 'BOT 101 (1k SLT)', Wed: '-', Thur: '-', Fri: '-' },
    { time: '12:00 PM', Mon: 'BOT 101 (1k SLT)', Tues: 'ZOO 101 (—)', Wed: 'BOT 101 (1k SLT)', Thur: 'CHM 101 (1k SLT)', Fri: '-' },
    { time: '1:00 PM', Mon: '-', Tues: '-', Wed: 'CHM 101 (1k SLT)', Thur: 'PHY 107 (Yellow House)', Fri: '-' },
    { time: '2:00 PM', Mon: '-', Tues: '-', Wed: 'CHM 103 (2:00PM-5:00PM)', Thur: '-', Fri: '-' },
    { time: '3:00 PM', Mon: '-', Tues: '-', Wed: '-', Thur: '-', Fri: '-' },
    { time: '4:00 PM', Mon: '-', Tues: '-', Wed: '-', Thur: '-', Fri: 'BOT 103 (4:30 PM - 6:00 PM)' },
    { time: '5:00 PM', Mon: '-', Tues: '-', Wed: '-', Thur: '-', Fri: '-' }
  ],
  "ZOO/PT2": [
    { time: '8:00 AM', Mon: 'MTH105 ODLT 2', Tues: 'ZOO207 Z0.01', Wed: 'ZOO203 G.23', Thur: 'ZOO207 Z0.01', Fri: '-' },
    { time: '9:00 AM', Mon: 'ZOO203 BOO C', Tues: 'BOT202 G.23', Wed: 'ZOO203 BOO B', Thur: '-', Fri: 'ZOO203 BOO C' },
    { time: '10:00 AM', Mon: '-', Tues: '-', Wed: '-', Thur: 'BOT202 G.23', Fri: '' },
    { time: '11:00 AM', Mon: 'ZOO201 Z0.01', Tues: 'MTH105 FBLT', Wed: 'ZOO201 BOO B', Thur: 'ZOO201 Z0.01', Fri: 'ZOO201 BOO A' },
    { time: '12:00 PM', Mon: 'BOT202 BOO C', Tues: '-', Wed: '-', Thur: '-', Fri: '-' },
    { time: '1:00 PM', Mon: 'ZOO203 HSLT C', Tues: '-', Wed: '-', Thur: '-', Fri: '-' },
    { time: '2:00 PM', Mon: 'MTH105 ODLT 1', Tues: '-', Wed: '-', Thur: 'MTH105 ODLT 2', Fri: '-' },
    { time: '3:00 PM', Mon: '-', Tues: 'MTH105 HSLT C', Wed: '-', Thur: '-', Fri: '-' },
    { time: '4:00 PM', Mon: '-', Tues: '-', Wed: 'MTH105 HSLT C', Thur: '-', Fri: 'CSC201 HSLT C' }

],
  "MCB/PT1": [
    { time: '8:00 AM', Mon: 'CHM 101 (1k SLT)\nBOT 103 (Bot Gr. IF)', Tues: 'SEA 001 (All venues)', Wed: 'CHM 101 (1k SLT)', Thur: 'SEA 001 (All venues)', Fri: 'ZOO 101 (CET/TETFUND)' },
    { time: '9:00 AM', Mon: 'ZOO 101 (FBLT)', Tues: 'CHM 101 (1k SLT)', Wed: 'ZOO 101 (ODLT 1)', Thur: 'CHM 101 (1k SLT)', Fri: 'CHM 101 (1k SLT)' },
    { time: '10:00 AM', Mon: 'PHY 105 (1k SLT)', Tues: 'PHY 105 (1k SLT)', Wed: 'PHY 105 (1k SLT)', Thur: 'PHY 105 (1k SLT)', Fri: 'PHY 105 (1k SLT)\nM CB SEMINAR (BOP C)' },
    { time: '11:00 AM', Mon: 'CHM 101 (1k SLT)', Tues: 'BOT 101 (1k SLT)', Wed: '', Thur: 'CHM 101 (1k SLT)', Fri: '' },
    { time: '12:00 PM', Mon: 'BOT 101 (1k SLT)', Tues: 'ZOO 101 (FBLT)', Wed: 'BOT 101 (1k SLT)', Thur: '', Fri: '' },
    { time: '1:00 PM', Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' },
    { time: '2:00 PM', Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' },
    { time: '3:00 PM', Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' },
    { time: '4:00 PM', Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' },
    { time: '5:00 PM', Mon: '', Tues: 'ZOO 103 (Zoology Lab Z 1:00)', Wed: 'ZOO 103 (Zoology Lab Z 1:00)', Thur: '', Fri: '' },
    { time: '6:00 PM', Mon: '', Tues: '', Wed: '', Thur: '', Fri: '' }
  ]
};

function loadDepartmentSchedule() {
  const code = document.getElementById('scheduleCode').value.trim();
  const schedule = departmentSchedules[code];

  if (!schedule) {
    alert('Invalid code. Please try again.');
    return;
  }

  renderSchedule(schedule);
}

function renderSchedule(schedule) {
  const predefinedScheduleBody = document.getElementById('predefinedScheduleBody');
  predefinedScheduleBody.innerHTML = schedule.map(row => 
    <tr>
      <td>${row.time}</td>
      <td>${row.Mon || ''}</td>
      <td>${row.Tues || ''}</td>
      <td>${row.Wed || ''}</td>
      <td>${row.Thur || ''}</td>
      <td>${row.Fri || ''}</td>
    </tr>
  ).join('');
}

// Modified addSchedule function to add rows to the manual schedule table and save to local storage
  function addSchedule() {
    const time = document.getElementById('timeInput').value.trim();
    const day = document.getElementById('dayInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim();

    if (!time  !day  !subject) {
      alert('Please fill in all fields to add a schedule.');
      return;
    }

    const scheduleBody = document.getElementById('manualScheduleBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = 
      <td>${time}</td>
      <td>${day === 'Monday' ? subject : ''}</td>
      <td>${day === 'Tuesday' ? subject : ''}</td>
      <td>${day === 'Wednesday' ? subject : ''}</td>
      <td>${day === 'Thursday' ? subject : ''}</td>
      <td>${day === 'Friday' ? subject : ''}</td>
    ;
    scheduleBody.appendChild(newRow);

    // Save to local storage
    saveManualSchedulesToLocalStorage();

    // Clear inputs
    document.getElementById('timeInput').value = '';
    document.getElementById('dayInput').value = '';
    document.getElementById('subjectInput').value = '';
  }

    function switchScheduleTables() {
    const predefinedScheduleWrapper = document.getElementById('predefinedScheduleWrapper');
    const manualScheduleWrapper = document.getElementById('manualScheduleWrapper');
    if (predefinedScheduleWrapper.classList.contains('hidden')) {
      predefinedScheduleWrapper.classList.remove('hidden');
      manualScheduleWrapper.classList.add('hidden');
    } else {
      predefinedScheduleWrapper.classList.add('hidden');
      manualScheduleWrapper.classList.remove('hidden');
    }
  }

// Save schedule to local storage with title
function savePredefinedToLocalStorage() {
  const title = document.getElementById('scheduleTitle').value.trim();
  const code = document.getElementById('scheduleCode').value.trim();
  const schedule = departmentSchedules[code];

  if (!title) {
    alert('Please enter a title for the schedule.');
    return;
  }

  if (!schedule) {
    alert('Invalid code. No schedule to save.');
    return;
  }

const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules')) || {};

  if (savedSchedules[title]) {
    alert('This schedule is already saved.');
    return;
  }

  savedSchedules[title] = schedule;
  localStorage.setItem('savedSchedules', JSON.stringify(savedSchedules));
  alert('Schedule saved to local storage!');
}
    
  // New function to save manually added schedules to local storage
  function saveManualSchedulesToLocalStorage() {
    const manualSchedules = [];
    document.querySelectorAll('#manualScheduleBody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      manualSchedules.push({
        time: cells[0].textContent,
        Mon: cells[1].textContent,
        Tues: cells[2].textContent,
        Wed: cells[3].textContent,
        Thur: cells[4].textContent,
        Fri: cells[5].textContent
      });
    });
    localStorage.setItem('manualSchedules', JSON.stringify(manualSchedules));
  }

  // New function to load manually added schedules from local storage
    document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadManualSchedules();
    console.log('Manual schedules loaded successfully');
  } catch (error) {
    console.error('Error in loadManualSchedules:', error);
  }
});

  function loadManualSchedules() {
    const manualSchedules = JSON.parse(localStorage.getItem('manualSchedules')) || [];
    const scheduleBody = document.getElementById('manualScheduleBody');
    scheduleBody.innerHTML = '';
    manualSchedules.forEach(schedule => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = 
        <td>${schedule.time}</td>
        <td>${schedule.Mon || ''}</td>
        <td>${schedule.Tues || ''}</td>
        <td>${schedule.Wed || ''}</td>
        <td>${schedule.Thur || ''}</td>
        <td>${schedule.Fri || ''}</td>
      ;
      scheduleBody.appendChild(newRow);
    });
  }
    
// Load schedule from local storage
    document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadSavedSchedule();
    console.log('Saved schedules loaded successfully');
  } catch (error) {
    console.error('Error in loadSavedSchedule:', error);
  }
});

function loadSavedSchedule() {
  const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules')) || {};
  const scheduleBody = document.getElementById('predefinedScheduleBody');
  scheduleBody.innerHTML = '';

  Object.keys(savedSchedules).forEach(title => {
    const titleRow = document.createElement('tr');
    titleRow.innerHTML = <td colspan="6" style="font-weight:bold; text-align:center;">${title}</td>;
    scheduleBody.appendChild(titleRow);

    renderSchedule(savedSchedules[title]);
  });
}

    
// Save note
function saveNote() {
  // Show custom prompt for note title
  document.getElementById('customPrompt').style.display = 'flex';

  const promptInput = document.getElementById('promptInput');
  const promptOk = document.getElementById('promptOk');
  const promptCancel = document.getElementById('promptCancel');

  function handleSave() {
    const title = promptInput.value.trim();

    if (!title) {
      alert("Please enter a title for the note.");
      return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const duplicateNote = notes.find(note => note.title === title);

    if (duplicateNote) {
      alert("A note with this title already exists. Please use a different title.");
      return;
    }

    const text = quill.root.innerHTML.trim(); // Quill editor content
    const mediaInput = document.getElementById('noteMedia').files[0];
    const reader = new FileReader();

    reader.onload = () => {
      notes.push({ title, text, media: reader.result, category: selectedCategory });
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      quill.root.innerHTML = ''; // Clear editor after saving
      document.getElementById('noteMedia').value = '';
    };

if (mediaInput) {
      reader.readAsDataURL(mediaInput); // Handle media upload
    } else {
      notes.push({ title, text, media: null, category: selectedCategory });
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      quill.root.innerHTML = ''; // Clear editor after saving
      document.getElementById('noteMedia').value = '';
    }

    // Hide custom prompt after saving
    document.getElementById('customPrompt').style.display = 'none';
    // Remove event listeners to avoid duplicate calls
    promptOk.removeEventListener('click', handleSave);
    promptCancel.removeEventListener('click', handleCancel);
  }

  function handleCancel() {
    // Hide custom prompt without saving
    document.getElementById('customPrompt').style.display = 'none';
    // Remove event listeners to avoid duplicate calls
    promptOk.removeEventListener('click', handleSave);
    promptCancel.removeEventListener('click', handleCancel);
  }

  // Add event listeners for the custom prompt buttons
  promptOk.addEventListener('click', handleSave);
  promptCancel.addEventListener('click', handleCancel);
}


let currentEditingNote = -1; // Initialize currentEditingNote variable

function showNotePopup(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const filteredNotes = notes.filter(note => note.category === selectedCategory);
  const note = filteredNotes[index];

  // Display title and content
  document.getElementById('noteTitle').textContent = note.title || "Untitled";
  document.getElementById('noteContent').innerHTML = note.text || "No content available";

  // Handle media preview
  const mediaPreview = document.getElementById('noteMediaPreview');
  if (note.media) {
    mediaPreview.src = note.media;
    mediaPreview.style.display = 'block';
  } else {
    mediaPreview.style.display = 'none';
  }

  currentEditingNote = index;
  document.getElementById('notePopup').style.display = 'flex';
}

// Load notes

    document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadNotes();
    console.log('Notes loaded successfully');
  } catch (error) {
    console.error('Error in loadNotes:', error);
  }
});
    
function loadNotes() {
  const notesList = document.getElementById('notesList');
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const filteredNotes = notes.filter(note => note.category === selectedCategory);
  
  notesList.innerHTML = filteredNotes
    .map((note, index) => 
      <li>
        <h4>${note.title}</h4>
        <button onclick="showNotePopup(${index})">View</button>
        <button onclick="generateQRCode(${index})">Generate QR Code</button>
        <div id="qrcode-${index}"></div>
        <button onclick="startQRScan()">Scan QR Code</button>
        <div id="qr-reader" style="width:300px; height:100px;"></div>
      </li>).join('');
}


function generateQRCode(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const note = notes[index];
  const qrCodeContainer = document.getElementById(qrcode-${index});
  qrCodeContainer.innerHTML = ""; // Clear existing QR codes

  const canvas = document.createElement('canvas');
  canvas.style.maxWidth = "100%";
  canvas.style.height = "auto";
  qrCodeContainer.appendChild(canvas);

  QRCode.toCanvas(canvas, JSON.stringify(note), { width: 200 }, function (error) {
    if (error) {
      console.error('Error generating QR code:', error);
    } else {
      console.log('QR code generated successfully!');
    }
  });
}

function startQRScan() {
  Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length === 0) {
      console.error("No cameras found.");
    } else {
      const cameraId = cameras[0].id;
      const qrReader = new Html5Qrcode("qr-reader");

      qrReader.start(

cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
          console.log("QR Code scanned successfully:", decodedText);
          const sharedNote = JSON.parse(decodedText);
          saveReceivedNote(sharedNote);

          qrReader.stop().then(() => {
            document.getElementById("qr-reader").innerHTML = ""; // Clear container
          });
        },
        (errorMessage) => {
          console.warn("QR scanning error:", errorMessage);
        }
      ).catch(err => {
        console.error("Failed to start QR scanner:", err);
      });
    }
  }).catch(err => console.error("Error getting cameras:", err));
}

function saveReceivedNote(sharedNote) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(sharedNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

    // MiniBrowser

const homepage = "https://www.wikipedia.org";

function toggleMiniBrowser() {
  const miniBrowser = document.getElementById("miniBrowser");
  const browserIcon = document.getElementById("browserIcon");

  if (miniBrowser.classList.contains("hidden")) {
    // Show the browser
    miniBrowser.classList.remove("hidden");
    browserIcon.textContent = "❌";
    document.body.style.overflow = "hidden"; // Disable scrolling
  } else {
    // Hide the browser
    miniBrowser.classList.add("hidden");
    browserIcon.textContent = "🌐";
    document.body.style.overflow = "auto"; // Enable scrolling
    }
  }

function navigateBrowser() {
  const urlInput = document.getElementById("browserUrl");
  const iframe = document.getElementById("browserFrame");
  let url = urlInput.value.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url; // Default to HTTPS if no protocol is provided
  }

  iframe.src = url;
}

function reloadBrowser() {
  const iframe = document.getElementById("browserFrame");
  iframe.contentWindow.location.reload(); // Reload iframe content
}

function goBack() {
  const iframe = document.getElementById("browserFrame");
  try {
    iframe.contentWindow.history.back(); // Navigate back
  } catch (e) {
    alert("No back history available.");
  }
}

function goForward() {
  const iframe = document.getElementById("browserFrame");
  try {
    iframe.contentWindow.history.forward(); // Navigate forward
  } catch (e) {
    alert("No forward history available.");
  }
  }
function goHome() {
  const iframe = document.getElementById("browserFrame");
  iframe.src = homepage; // Set iframe source to homepage
}
    
// Calendar functions

    document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadCalendar();
    console.log('Calendar loaded successfully');
  } catch (error) {
    console.error('Error in loadCalendar:', error);
  }
});

function loadCalendar() {
  const calendar = document.getElementById('calendar');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const todayIndex = today.getDay();

  calendar.innerHTML = days.map((day, index) => 
    <div class="day ${index === todayIndex ? 'today' : ''}">${day}</div>
  ).join('');

  document.getElementById('calendarMessage').textContent = 'Make today count!';
}
    


// Save note
function saveNote() {
  openCustomPrompt((title) => {
    if (!title) {
      alert("Note title is required!");
      return;
    }

    const text = quill.root.innerHTML.trim(); // Get Quill editor content
    const mediaInput = document.getElementById('noteMedia').files[0];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const reader = new FileReader();

    reader.onload = () => {
      notes.push({ title, text, media: reader.result, category: selectedCategory });
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      quill.root.innerHTML = ''; // Clear editor after saving
      document.getElementById('noteMedia').value = '';
    };

if (mediaInput) {
      reader.readAsDataURL(mediaInput); // Handle media upload
    } else {
      notes.push({ title, text, media: null, category: selectedCategory });
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      quill.root.innerHTML = ''; // Clear editor after saving
      document.getElementById('noteMedia').value = '';
    }
  });
}
    
let customPromptCallback = null;

// Open the custom prompt modal
function openCustomPrompt(callback) {
  customPromptCallback = callback;
  document.getElementById('customPromptModal').style.display = 'block'; // Show modal
  document.getElementById('customPromptInput').value = ''; // Clear input
  document.getElementById('customPromptInput').focus(); // Focus on the input field
  document.body.classList.add('modal-active'); // Prevent background scrolling
}

// Close the custom prompt modal
function closeCustomPrompt(isConfirmed) {
  const modal = document.getElementById('customPromptModal');
  const input = document.getElementById('customPromptInput').value.trim();

  if (isConfirmed && customPromptCallback) {
    customPromptCallback(input); // Pass the input value to the callback
  } else if (!isConfirmed && customPromptCallback) {
    customPromptCallback(null); // Pass null if the user cancels
  }

  modal.style.display = 'none'; // Hide the modal
  document.body.classList.remove('modal-active'); // Allow background scrolling
}



// Edit note
function editNote() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const filteredNotes = notes.filter(note => note.category === selectedCategory);
  const note = filteredNotes[currentEditingNote];

  // Load the note into the editor for editing
  if (note) {
    quill.root.innerHTML = note.text || "";
    document.getElementById('noteTitle').textContent = note.title || "Untitled";

    // Handle media preview if any
    const mediaPreview = document.getElementById('noteMediaPreview');
    if (note.media) {
      mediaPreview.src = note.media;
      mediaPreview.style.display = 'block';
    } else {
      mediaPreview.style.display = 'none';
    }
  }

  // Hide the popup after editing is done
  document.getElementById('notePopup').style.display = 'none';
    }

// Delete note
function deleteNote() {
  if (currentEditingNote !== null) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.splice(currentEditingNote, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
      closeNotePopup();
    }
  }
}

// Close note popup
function closeNotePopup() {
  document.getElementById('notePopup').style.display = 'none';
}

// Navigate note
function navigateNote(direction) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  if (notes.length === 0) return;

  // Calculate the next note index
  let newIndex = currentEditingNote + direction;

  // Handle wrapping around notes
  if (newIndex < 0) {
    newIndex = notes.length - 1; // Go to last note
  } else if (newIndex >= notes.length) {
    newIndex = 0; // Go to first note
  }

  showNotePopup(newIndex);
}
    async function downloadNoteAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const title = document.getElementById('noteTitle').textContent || "Untitled";
  const content = document.getElementById('noteContent').innerHTML;

  doc.setFontSize(16);
  doc.text(title, 10, 10);
  doc.setFontSize(12);
  doc.fromHTML(content, 10, 20);

  doc.save(${title}.pdf);
  }
    
  
