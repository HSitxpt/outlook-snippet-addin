/* global Office */

let testCounter = 0;
let savedPresets = [];

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.addEventListener("DOMContentLoaded", () => {
      initializeApp();
    });
  }
});

function initializeApp() {
  // Load saved presets
  loadPresets();
  
  // Workflow snippet type selector
  const workflowSnippetType = document.getElementById("workflow-snippet-type");
  workflowSnippetType.addEventListener("change", handleWorkflowSnippetChange);
  
  // Insert workflow snippet button
  document.getElementById("insert-workflow-snippet-btn").addEventListener("click", insertWorkflowSnippet);
  
  // Add test button
  document.getElementById("add-test-btn").addEventListener("click", addTestRow);
  
  // Insert template button
  document.getElementById("insert-template-btn").addEventListener("click", insertTemplate);
  
  // Clear form button
  document.getElementById("clear-form-btn").addEventListener("click", clearForm);
  
  // Preview button
  document.getElementById("preview-btn").addEventListener("click", showPreview);
  
  // Modal controls
  document.getElementById("close-preview").addEventListener("click", closePreview);
  document.getElementById("insert-from-preview").addEventListener("click", () => {
    closePreview();
    insertTemplate();
  });
  
  // Quick action buttons
  document.getElementById("load-preset-btn").addEventListener("click", showPresetMenu);
  document.getElementById("save-preset-btn").addEventListener("click", savePreset);
  document.getElementById("auto-fill-btn").addEventListener("click", autoFillFromEmail);
  
  // Character counter for notes
  const notesTextarea = document.getElementById("additional-notes");
  notesTextarea.addEventListener("input", updateCharCount);
  notesTextarea.addEventListener("input", autoSave);
  
  // Auto-save on input changes
  const inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(input => {
    if (input.id !== "additional-notes") {
      input.addEventListener("change", autoSave);
    }
  });
  
  // Load saved data
  loadSavedData();
  
  // Add initial test row
  addTestRow();
  
  // Update initial counts
  updateTestCount();
  updateCharCount();
}

function addTestRow() {
  testCounter++;
  const container = document.getElementById("tests-container");
  const testDiv = document.createElement("div");
  testDiv.className = "test-row";
  testDiv.id = `test-row-${testCounter}`;
  testDiv.dataset.testId = testCounter;
  
  const testNumber = container.children.length + 1;
  
  testDiv.innerHTML = `
    <div class="test-row-header">
      <span class="test-row-number">#${testNumber}</span>
    </div>
    <input type="text" class="form-input test-name" placeholder="Test name (e.g., Compliance Check)" />
    <div class="test-row-fields">
      <select class="form-select test-status">
        <option value="pending">○ Pending</option>
        <option value="in-progress">⟳ In Progress</option>
        <option value="passed">✓ Passed</option>
        <option value="failed">✗ Failed</option>
      </select>
      <input type="text" class="form-input test-notes" placeholder="Notes (optional)" />
    </div>
    <div class="test-actions">
      <button class="move-test-btn move-up" data-test-id="${testCounter}" title="Move up">↑</button>
      <button class="move-test-btn move-down" data-test-id="${testCounter}" title="Move down">↓</button>
      <button class="remove-test-btn" data-test-id="${testCounter}">Remove</button>
    </div>
  `;
  
  container.appendChild(testDiv);
  
  // Add event listeners
  const removeBtn = testDiv.querySelector(".remove-test-btn");
  removeBtn.addEventListener("click", () => {
    testDiv.remove();
    updateTestCount();
    updateTestNumbers();
    autoSave();
  });
  
  const moveUpBtn = testDiv.querySelector(".move-up");
  moveUpBtn.addEventListener("click", () => moveTest(testCounter, -1));
  
  const moveDownBtn = testDiv.querySelector(".move-down");
  moveDownBtn.addEventListener("click", () => moveTest(testCounter, 1));
  
  // Add change listeners for auto-save
  testDiv.querySelector(".test-name").addEventListener("input", () => {
    updateTestCount();
    autoSave();
  });
  testDiv.querySelector(".test-status").addEventListener("change", autoSave);
  testDiv.querySelector(".test-notes").addEventListener("input", autoSave);
  
  updateTestCount();
  updateTestNumbers();
  autoSave();
}

function moveTest(testId, direction) {
  const testRow = document.getElementById(`test-row-${testId}`);
  const container = document.getElementById("tests-container");
  const allRows = Array.from(container.children);
  const currentIndex = allRows.indexOf(testRow);
  
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < allRows.length) {
    if (direction > 0) {
      container.insertBefore(testRow, allRows[newIndex + 1]);
    } else {
      container.insertBefore(testRow, allRows[newIndex]);
    }
    updateTestNumbers();
    autoSave();
  }
}

function updateTestNumbers() {
  const container = document.getElementById("tests-container");
  const rows = container.children;
  Array.from(rows).forEach((row, index) => {
    const numberSpan = row.querySelector(".test-row-number");
    if (numberSpan) {
      numberSpan.textContent = `#${index + 1}`;
    }
  });
}

function updateTestCount() {
  const container = document.getElementById("tests-container");
  const tests = container.querySelectorAll(".test-row");
  const filledTests = Array.from(tests).filter(test => {
    return test.querySelector(".test-name").value.trim() !== "";
  });
  
  const countBadge = document.getElementById("test-count");
  countBadge.textContent = filledTests.length;
  
  if (filledTests.length > 0) {
    countBadge.style.display = "inline-block";
  } else {
    countBadge.style.display = "none";
  }
}

function updateCharCount() {
  const textarea = document.getElementById("additional-notes");
  const count = textarea.value.length;
  const countDisplay = document.getElementById("notes-char-count");
  countDisplay.textContent = count;
  
  if (count > 500) {
    countDisplay.style.color = "#d13438";
    textarea.style.borderColor = "#d13438";
  } else if (count > 450) {
    countDisplay.style.color = "#ffaa44";
    textarea.style.borderColor = "#ffaa44";
  } else {
    countDisplay.style.color = "#605e5c";
    textarea.style.borderColor = "#c8c6c4";
  }
}

function clearForm() {
  if (!confirm("Are you sure you want to clear all form data?")) {
    return;
  }
  
  // Clear deadline
  document.getElementById("deadline-date").value = "";
  document.getElementById("deadline-time").value = "";
  
  // Clear process stage
  document.getElementById("process-stage").value = "";
  document.getElementById("planner-ticket").value = "";
  
  // Clear tests
  const container = document.getElementById("tests-container");
  container.innerHTML = "";
  testCounter = 0;
  addTestRow();
  
  // Clear notes
  document.getElementById("additional-notes").value = "";
  
  updateTestCount();
  updateCharCount();
  clearSavedData();
  showMessage("Form cleared", "success");
}

function insertTemplate() {
  const template = generateTemplate();
  
  if (!template || template.trim() === "") {
    showMessage("Please fill in at least one field before inserting", "warning");
    return;
  }
  
  const item = Office.context.mailbox.item;
  
  if (item.itemType === Office.MailboxEnums.ItemType.Message) {
    if (item.body) {
      item.body.setSelectedDataAsync(
        template,
        { coercionType: Office.CoercionType.Html },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            showMessage("Template inserted successfully!", "success");
          } else {
            showMessage("Error inserting template: " + result.error.message, "error");
            console.error("Error details:", result.error);
          }
        }
      );
    } else {
      showMessage("Cannot write to this message. Please open a new email to compose.", "error");
    }
  } else {
    showMessage("This only works with email messages.", "error");
  }
}

function showPreview() {
  const template = generateTemplate();
  
  if (!template || template.trim() === "") {
    showMessage("Please fill in at least one field to preview", "warning");
    return;
  }
  
  const modal = document.getElementById("preview-modal");
  const previewContent = document.getElementById("preview-content");
  previewContent.innerHTML = template;
  modal.classList.add("show");
}

function closePreview() {
  const modal = document.getElementById("preview-modal");
  modal.classList.remove("show");
}

function generateTemplate() {
  const deadlineDate = document.getElementById("deadline-date").value;
  const deadlineTime = document.getElementById("deadline-time").value;
  const processStage = document.getElementById("process-stage").value;
  const plannerTicket = document.getElementById("planner-ticket").value.trim();
  const additionalNotes = document.getElementById("additional-notes").value.trim();
  
  // Get all tests
  const testRows = document.querySelectorAll(".test-row");
  const tests = [];
  testRows.forEach((row) => {
    const name = row.querySelector(".test-name").value.trim();
    const status = row.querySelector(".test-status").value;
    const notes = row.querySelector(".test-notes").value.trim();
    
    if (name) {
      tests.push({ name, status, notes });
    }
  });
  
  // Check if there's any content
  if (!deadlineDate && !deadlineTime && !processStage && !plannerTicket && tests.length === 0 && !additionalNotes) {
    return "";
  }
  
  // Build template HTML with improved styling
  let html = '<div style="font-family: Segoe UI, Arial, sans-serif; padding: 20px; background: linear-gradient(to bottom, #f8f9fa, #ffffff); border-left: 5px solid #0078d4; border-radius: 6px; margin: 15px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">';
  html += '<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e1dfdd;">';
  html += '<div style="width: 40px; height: 40px; background: linear-gradient(135deg, #0078d4, #005a9e); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">ITXPT</div>';
  html += '<h3 style="margin: 0; color: #0078d4; font-size: 20px; font-weight: 600;">Labeling Information</h3>';
  html += '</div>';
  
  // Deadline section
  if (deadlineDate || deadlineTime) {
    html += '<div style="margin-bottom: 16px; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">';
    html += '<span style="font-size: 18px;">⏰</span>';
    html += '<strong style="color: #323130; font-size: 14px;">Deadline:</strong>';
    html += '</div>';
    let deadlineText = '';
    if (deadlineDate) {
      const dateObj = new Date(deadlineDate + 'T00:00:00');
      deadlineText += dateObj.toLocaleDateString('sv-SE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    if (deadlineTime) {
      deadlineText += (deadlineText ? ' at ' : '') + deadlineTime;
    }
    html += '<div style="color: #605e5c; font-size: 14px; margin-left: 26px;">' + deadlineText + '</div>';
    html += '</div>';
  }
  
  // Process stage section
  if (processStage || plannerTicket) {
    html += '<div style="margin-bottom: 16px; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">';
    html += '<span style="font-size: 18px;">📍</span>';
    html += '<strong style="color: #323130; font-size: 14px;">Process Step:</strong>';
    html += '</div>';
    html += '<div style="color: #605e5c; font-size: 14px; margin-left: 26px;">';
    if (processStage) {
      const stageNames = {
        'planning': '📋 Planering',
        'preparation': '🔧 Förberedelse',
        'testing': '🧪 Testning pågår',
        'review': '👀 Granskning',
        'finalization': '✅ Finalisering',
        'completed': '✓ Klart'
      };
      html += stageNames[processStage] || processStage;
    }
    if (plannerTicket) {
      html += (processStage ? ' | ' : '') + '<strong>Ticket:</strong> ' + escapeHtml(plannerTicket);
    }
    html += '</div>';
    html += '</div>';
  }
  
  // Tests section
  if (tests.length > 0) {
    html += '<div style="margin-bottom: 16px; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">';
    html += '<span style="font-size: 18px;">🧪</span>';
    html += '<strong style="color: #323130; font-size: 14px;">Completed Tests:</strong>';
    html += '</div>';
    html += '<ul style="margin: 0; padding-left: 26px; color: #605e5c; font-size: 14px; list-style: none;">';
    tests.forEach((test, index) => {
      const statusConfig = {
        'passed': { icon: '✓', text: 'Passed', color: '#107c10' },
        'failed': { icon: '✗', text: 'Failed', color: '#d13438' },
        'in-progress': { icon: '⟳', text: 'In Progress', color: '#0078d4' },
        'pending': { icon: '○', text: 'Pending', color: '#605e5c' }
      };
      const config = statusConfig[test.status] || statusConfig.pending;
      html += '<li style="margin-bottom: 8px; padding-left: 20px; position: relative;">';
      html += '<span style="position: absolute; left: 0; color: ' + config.color + '; font-weight: bold;">' + config.icon + '</span>';
      html += '<strong style="color: #323130;">' + escapeHtml(test.name) + '</strong>';
      html += ' <span style="color: ' + config.color + ';">(' + config.text + ')</span>';
      if (test.notes) {
        html += ' <span style="color: #8a8886; font-style: italic;">- ' + escapeHtml(test.notes) + '</span>';
      }
      html += '</li>';
    });
    html += '</ul>';
    html += '</div>';
  }
  
  // Additional notes
  if (additionalNotes) {
    html += '<div style="margin-bottom: 16px; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">';
    html += '<span style="font-size: 18px;">📝</span>';
    html += '<strong style="color: #323130; font-size: 14px;">Notes:</strong>';
    html += '</div>';
    html += '<div style="color: #605e5c; font-size: 14px; margin-left: 26px; white-space: pre-wrap; line-height: 1.6;">' + escapeHtml(additionalNotes) + '</div>';
    html += '</div>';
  }
  
  html += '</div>';
  html += '<br>';
  
  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}

function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 4000);
}

// Auto-save functionality
function autoSave() {
  const formData = {
    deadlineDate: document.getElementById("deadline-date").value,
    deadlineTime: document.getElementById("deadline-time").value,
    processStage: document.getElementById("process-stage").value,
    plannerTicket: document.getElementById("planner-ticket").value,
    additionalNotes: document.getElementById("additional-notes").value,
    tests: []
  };
  
  const testRows = document.querySelectorAll(".test-row");
  testRows.forEach((row) => {
    const name = row.querySelector(".test-name").value.trim();
    const status = row.querySelector(".test-status").value;
    const notes = row.querySelector(".test-notes").value.trim();
    if (name) {
      formData.tests.push({ name, status, notes });
    }
  });
  
  try {
    localStorage.setItem('itxpt_form_data', JSON.stringify(formData));
    localStorage.setItem('itxpt_test_counter', testCounter.toString());
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function loadSavedData() {
  try {
    const saved = localStorage.getItem('itxpt_form_data');
    if (saved) {
      const formData = JSON.parse(saved);
      document.getElementById("deadline-date").value = formData.deadlineDate || "";
      document.getElementById("deadline-time").value = formData.deadlineTime || "";
      document.getElementById("process-stage").value = formData.processStage || "";
      document.getElementById("planner-ticket").value = formData.plannerTicket || "";
      document.getElementById("additional-notes").value = formData.additionalNotes || "";
      
      const counter = localStorage.getItem('itxpt_test_counter');
      if (counter) {
        testCounter = parseInt(counter, 10) || 0;
      }
      
      // Load tests
      const container = document.getElementById("tests-container");
      container.innerHTML = "";
      if (formData.tests && formData.tests.length > 0) {
        formData.tests.forEach((test) => {
          addTestRow();
          const lastRow = container.lastElementChild;
          lastRow.querySelector(".test-name").value = test.name;
          lastRow.querySelector(".test-status").value = test.status;
          lastRow.querySelector(".test-notes").value = test.notes;
        });
      } else {
        addTestRow();
      }
      
      updateTestCount();
      updateCharCount();
    }
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
  }
}

function clearSavedData() {
  try {
    localStorage.removeItem('itxpt_form_data');
    localStorage.removeItem('itxpt_test_counter');
  } catch (e) {
    console.warn("Could not clear localStorage:", e);
  }
}

// Preset functionality
function loadPresets() {
  try {
    const saved = localStorage.getItem('itxpt_presets');
    if (saved) {
      savedPresets = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load presets:", e);
  }
}

function savePreset() {
  const name = prompt("Enter a name for this preset:");
  if (!name || name.trim() === "") {
    return;
  }
  
  const formData = {
    deadlineDate: document.getElementById("deadline-date").value,
    deadlineTime: document.getElementById("deadline-time").value,
    processStage: document.getElementById("process-stage").value,
    plannerTicket: document.getElementById("planner-ticket").value,
    additionalNotes: document.getElementById("additional-notes").value,
    tests: []
  };
  
  const testRows = document.querySelectorAll(".test-row");
  testRows.forEach((row) => {
    const name = row.querySelector(".test-name").value.trim();
    const status = row.querySelector(".test-status").value;
    const notes = row.querySelector(".test-notes").value.trim();
    if (name) {
      formData.tests.push({ name, status, notes });
    }
  });
  
  savedPresets.push({ name: name.trim(), data: formData, date: new Date().toISOString() });
  
  try {
    localStorage.setItem('itxpt_presets', JSON.stringify(savedPresets));
    showMessage("Preset saved successfully!", "success");
  } catch (e) {
    showMessage("Could not save preset: " + e.message, "error");
  }
}

function showPresetMenu() {
  if (savedPresets.length === 0) {
    showMessage("No presets saved yet. Save a preset first!", "warning");
    return;
  }
  
  const presetNames = savedPresets.map(p => p.name).join('\n');
  const choice = prompt("Available presets:\n\n" + savedPresets.map((p, i) => `${i + 1}. ${p.name}`).join('\n') + "\n\nEnter the number to load:");
  
  if (!choice) return;
  
  const index = parseInt(choice, 10) - 1;
  if (index >= 0 && index < savedPresets.length) {
    loadPreset(savedPresets[index]);
  } else {
    showMessage("Invalid preset number", "error");
  }
}

function loadPreset(preset) {
  const formData = preset.data;
  
  document.getElementById("deadline-date").value = formData.deadlineDate || "";
  document.getElementById("deadline-time").value = formData.deadlineTime || "";
  document.getElementById("process-stage").value = formData.processStage || "";
  document.getElementById("planner-ticket").value = formData.plannerTicket || "";
  document.getElementById("additional-notes").value = formData.additionalNotes || "";
  
  const container = document.getElementById("tests-container");
  container.innerHTML = "";
  testCounter = 0;
  
  if (formData.tests && formData.tests.length > 0) {
    formData.tests.forEach((test) => {
      addTestRow();
      const lastRow = container.lastElementChild;
      lastRow.querySelector(".test-name").value = test.name;
      lastRow.querySelector(".test-status").value = test.status;
      lastRow.querySelector(".test-notes").value = test.notes;
    });
  } else {
    addTestRow();
  }
  
  updateTestCount();
  updateCharCount();
  autoSave();
  showMessage(`Preset "${preset.name}" loaded!`, "success");
}

function autoFillFromEmail() {
  const item = Office.context.mailbox.item;
  
  if (item && item.subject) {
    item.subject.getAsync((result) => {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        const subject = result.value;
        // Try to extract ticket ID from subject
        const ticketMatch = subject.match(/(LAB|TICKET|TKT)[- ]?\d+/i);
        if (ticketMatch) {
          document.getElementById("planner-ticket").value = ticketMatch[0].toUpperCase();
          showMessage("Auto-filled ticket ID from email subject", "success");
        } else {
          showMessage("No ticket ID found in email subject", "warning");
        }
      }
    });
  } else {
    showMessage("Could not read email subject", "error");
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById("preview-modal");
  if (e.target === modal) {
    closePreview();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePreview();
  }
});

// Workflow Snippet Functions
function handleWorkflowSnippetChange() {
  const snippetType = document.getElementById("workflow-snippet-type").value;
  const fieldsContainer = document.getElementById("workflow-snippet-fields");
  const insertBtn = document.getElementById("insert-workflow-snippet-btn");
  const customSections = [
    document.getElementById("deadline-section"),
    document.getElementById("custom-template-section"),
    document.getElementById("tests-section"),
    document.getElementById("notes-section"),
    document.getElementById("action-section")
  ];
  
  // Hide all custom template sections by default
  customSections.forEach(section => {
    if (section) section.style.display = "none";
  });
  
  if (snippetType === "none") {
    fieldsContainer.style.display = "none";
    insertBtn.style.display = "none";
  } else if (snippetType === "custom-template") {
    fieldsContainer.style.display = "none";
    insertBtn.style.display = "none";
    // Show custom template sections
    customSections.forEach(section => {
      if (section) section.style.display = "block";
    });
  } else {
    // Show workflow snippet fields
    fieldsContainer.style.display = "block";
    insertBtn.style.display = "block";
    renderWorkflowSnippetFields(snippetType);
  }
}

function renderWorkflowSnippetFields(snippetType) {
  const fieldsContainer = document.getElementById("workflow-snippet-fields");
  fieldsContainer.innerHTML = "";
  
  switch(snippetType) {
    case "documentation-request":
      fieldsContainer.innerHTML = `
        <div class="form-group">
          <label for="module-label" class="form-label">
            <span class="label-icon">🏷️</span>
            Module Label (e.g., label process 20250122-0226)
          </label>
          <input type="text" id="module-label" class="form-input" placeholder="label process 20250122-0226" />
        </div>
        <div class="form-group">
          <label for="questionnaire-link" class="form-label">
            <span class="label-icon">🔗</span>
            Questionnaire Link
          </label>
          <input type="text" id="questionnaire-link" class="form-input" placeholder="https://forms.office.com/e/z4AzDkB0pT" value="https://forms.office.com/e/z4AzDkB0pT" />
        </div>
      `;
      break;
      
    case "remote-session-setup":
      fieldsContainer.innerHTML = `
        <div class="form-group">
          <label for="zerotier-network-id" class="form-label">
            <span class="label-icon">🌐</span>
            ZeroTier Network ID
          </label>
          <input type="text" id="zerotier-network-id" class="form-input" placeholder="93afae5963c29064" value="93afae5963c29064" />
        </div>
        <div class="form-group">
          <label for="booking-link" class="form-label">
            <span class="label-icon">📅</span>
            Booking Link
          </label>
          <input type="text" id="booking-link" class="form-input" placeholder="ITxPT Gothenburg Lab booking link" />
        </div>
      `;
      break;
      
    case "lab-shipping-instructions":
      fieldsContainer.innerHTML = `
        <div class="form-group">
          <label for="module-name" class="form-label">
            <span class="label-icon">📦</span>
            Module Name
          </label>
          <input type="text" id="module-name" class="form-input" placeholder="Module name" />
        </div>
        <div class="form-group">
          <label for="contact-person" class="form-label">
            <span class="label-icon">👤</span>
            Contact Person
          </label>
          <input type="text" id="contact-person" class="form-input" placeholder="Jim Lindkvist or Henrik Simpanen" value="Jim Lindkvist or Henrik Simpanen" />
        </div>
      `;
      break;
      
    case "test-results-report":
      fieldsContainer.innerHTML = `
        <div class="form-group">
          <label for="test-module-name" class="form-label">
            <span class="label-icon">📦</span>
            Module Name
          </label>
          <input type="text" id="test-module-name" class="form-input" placeholder="Module name" />
        </div>
        <div class="form-group">
          <label for="test-date" class="form-label">
            <span class="label-icon">📅</span>
            Test Date
          </label>
          <input type="date" id="test-date" class="form-input" />
        </div>
        <div class="form-group">
          <label for="tester-name" class="form-label">
            <span class="label-icon">👤</span>
            Tester Name
          </label>
          <input type="text" id="tester-name" class="form-input" placeholder="Tester name" />
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">🧪</span>
            Test Results
          </label>
          <div id="workflow-test-results" class="tests-container" style="margin-bottom: 10px;">
            <!-- Test results will be added here -->
          </div>
          <button type="button" id="add-workflow-test-btn" class="btn btn-secondary btn-full" style="margin-bottom: 10px;">
            <span class="btn-icon">➕</span>
            <span>Add Test Result</span>
          </button>
        </div>
        <div class="form-group">
          <label for="test-notes" class="form-label">
            <span class="label-icon">📝</span>
            Additional Notes
          </label>
          <textarea id="test-notes" class="form-textarea" rows="3" placeholder="Additional notes and observations..."></textarea>
        </div>
      `;
      
      // Add event listener for adding test results
      setTimeout(() => {
        const addTestBtn = document.getElementById("add-workflow-test-btn");
        if (addTestBtn) {
          addTestBtn.addEventListener("click", addWorkflowTestResult);
        }
        // Add initial test result row
        addWorkflowTestResult();
      }, 100);
      break;
  }
}

function generateWorkflowSnippet(snippetType) {
  switch(snippetType) {
    case "documentation-request":
      return generateDocumentationRequestSnippet();
    case "remote-session-setup":
      return generateRemoteSessionSetupSnippet();
    case "lab-shipping-instructions":
      return generateLabShippingInstructionsSnippet();
    case "test-results-report":
      return generateTestResultsReportSnippet();
    default:
      return "";
  }
}

function generateDocumentationRequestSnippet() {
  const moduleLabel = document.getElementById("module-label")?.value || "label process [DATE]";
  const questionnaireLink = document.getElementById("questionnaire-link")?.value || "https://forms.office.com/e/z4AzDkB0pT";
  
  return `
<div style="font-family: Segoe UI, Arial, sans-serif; padding: 20px; background: #f8f9fa; border-left: 5px solid #0078d4; border-radius: 6px; margin: 15px 0;">
<p>The labelling test for your module (<strong>${escapeHtml(moduleLabel)}</strong>) will be handled by the ITxPT Gothenburg laboratory.</p>

<p><strong>The second step of the labelling process is the collection of documents.</strong></p>

<p>In this step, we collect all the necessary documents related to the module that needs to be labelled. These documents include any relevant files provided by the manufacturer, such as:</p>

<ul>
<li>Product datasheet (mandatory)</li>
<li>User manual (mandatory)</li>
<li>EC declaration</li>
<li>E-marking statement</li>
<li>Drawings</li>
<li>Product pictures</li>
<li>Architecture diagram</li>
<li>List of expected services provided by the module (if applicable)</li>
</ul>

<p>As part of the documentation verification process, we need to collect details about the hardware interface and provided services. This will help us perform a preliminary check for compliance with specifications.</p>

<p>To do this, please complete the questionnaire by clicking the link below:</p>

<p>👉 <a href="${escapeHtml(questionnaireLink)}" style="color: #0078d4; text-decoration: none; font-weight: bold;">${escapeHtml(questionnaireLink)}</a></p>

<p><em>(One questionnaire per device)</em></p>

<p>The labeling process can only move to Step 3 (Remote Testing) after completing this questionnaire and reviewing the documentation.</p>

<p>Please send us all the relevant documents for this module and fill in the questionnaire.</p>
</div>
  `.trim();
}

function generateRemoteSessionSetupSnippet() {
  const zerotierId = document.getElementById("zerotier-network-id")?.value || "93afae5963c29064";
  const bookingLink = document.getElementById("booking-link")?.value || "ITxPT Gothenburg Lab";
  
  return `
<div style="font-family: Segoe UI, Arial, sans-serif; padding: 20px; background: #f8f9fa; border-left: 5px solid #0078d4; border-radius: 6px; margin: 15px 0;">
<p>Here are the necessary resources to help you set up your VM bridge and connect to our testing environment.</p>

<h3 style="color: #0078d4; margin-top: 20px;">Getting Started</h3>
<p>To begin, please follow the attached guide:</p>
<p>📂 <strong>ITxPT Bridge Setup Guide.pdf</strong></p>

<p>You'll need to connect to our network using Zero Tier. Below is your unique network ID:</p>
<p>🔗 <strong>ZeroTier Network ID:</strong> <code style="background: #e1dfdd; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${escapeHtml(zerotierId)}</code></p>

<h3 style="color: #0078d4; margin-top: 20px;">Book Your Session</h3>
<p>Once your setup is complete, or if you need any assistance, please schedule a session with us at your convenience:</p>
<p>📅 <strong>Booking Link:</strong> ${escapeHtml(bookingLink)}</p>

<p style="background: #fff4e5; padding: 12px; border-left: 4px solid #ffaa44; border-radius: 4px; margin: 15px 0;">
<strong>⚠️ Important:</strong> Do not book a Remote Test Session before the Bridge Setup is Complete and you have provided a print-screen of the state of your bridge VM.
</p>

<p>If you have any questions or need further assistance, feel free to reach out.</p>
</div>
  `.trim();
}

function generateLabShippingInstructionsSnippet() {
  const moduleName = document.getElementById("module-name")?.value || "[Module Name]";
  const contactPerson = document.getElementById("contact-person")?.value || "Jim Lindkvist or Henrik Simpanen";
  
  return `
<div style="font-family: Segoe UI, Arial, sans-serif; padding: 20px; background: #f8f9fa; border-left: 5px solid #0078d4; border-radius: 6px; margin: 15px 0;">
<p>This means that you are ready for testing in our Lab.</p>

<p>And you should be able to ship the module to:</p>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0; border: 1px solid #c8c6c4;">
<p style="margin: 5px 0;"><strong>ITxPT</strong><br/>
${escapeHtml(contactPerson)}<br/>
Lindholmspiren 3-5<br/>
Lindhomen Science Park<br/>
41756 Gothenburg<br/>
Sweden</p>

<p style="margin: 10px 0 5px 0;"><strong>EORI:</strong> BE0656563009</p>
<p style="margin: 5px 0;"><strong>Orgnumber:</strong> 502082-6615</p>
</div>

<div style="background: #fff4e5; padding: 12px; border-left: 4px solid #ffaa44; border-radius: 4px; margin: 15px 0;">
<p style="margin: 5px 0;"><strong>/!\\ Important /!\\</strong></p>
<ul style="margin: 10px 0; padding-left: 20px;">
<li>Set the Module to DHCP assignment for Lab testing.</li>
<li>Enclose the return slip in the parcel at the same time</li>
<li>Please ensure that you have paid all customs duties associated with your module shipment to the Gothenburg laboratory (consult your carrier for detailed customs procedures and charges to Sweden). The laboratory will not receive your parcel if there are any unpaid customs charges and will not be able to assist you.</li>
</ul>
</div>
</div>
  `.trim();
}

function addWorkflowTestResult() {
  const container = document.getElementById("workflow-test-results");
  if (!container) return;
  
  const testDiv = document.createElement("div");
  testDiv.className = "test-row";
  testDiv.style.marginBottom = "10px";
  testDiv.style.padding = "10px";
  testDiv.style.background = "#f8f9fa";
  testDiv.style.borderRadius = "4px";
  testDiv.style.border = "1px solid #c8c6c4";
  
  const testId = Date.now() + Math.random();
  testDiv.innerHTML = `
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 8px; align-items: center;">
      <input type="text" class="form-input workflow-test-name" placeholder="Test name/description" style="margin: 0;" />
      <select class="form-select workflow-test-status" style="margin: 0;">
        <option value="passed">✓ Passed</option>
        <option value="failed">✗ Failed</option>
        <option value="warning">⚠ Warning</option>
        <option value="not-tested">○ Not Tested</option>
      </select>
      <input type="text" class="form-input workflow-test-notes" placeholder="Notes/errors" style="margin: 0;" />
      <button type="button" class="remove-workflow-test-btn" style="padding: 6px 10px; background: #d13438; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
    </div>
  `;
  
  container.appendChild(testDiv);
  
  // Add remove button listener
  const removeBtn = testDiv.querySelector(".remove-workflow-test-btn");
  removeBtn.addEventListener("click", () => {
    testDiv.remove();
  });
}

function generateTestResultsReportSnippet() {
  const moduleName = document.getElementById("test-module-name")?.value || "[Module Name]";
  const testDate = document.getElementById("test-date")?.value || "";
  const testerName = document.getElementById("tester-name")?.value || "[Tester Name]";
  const testNotes = document.getElementById("test-notes")?.value || "";
  
  // Collect test results
  const testResults = [];
  const testRows = document.querySelectorAll("#workflow-test-results .test-row");
  testRows.forEach((row) => {
    const name = row.querySelector(".workflow-test-name")?.value.trim();
    const status = row.querySelector(".workflow-test-status")?.value;
    const notes = row.querySelector(".workflow-test-notes")?.value.trim();
    
    if (name) {
      testResults.push({ name, status, notes });
    }
  });
  
  let dateText = "";
  if (testDate) {
    const dateObj = new Date(testDate + 'T00:00:00');
    dateText = dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // Separate passed and failed tests
  const passedTests = testResults.filter(t => t.status === "passed");
  const failedTests = testResults.filter(t => t.status === "failed");
  const warningTests = testResults.filter(t => t.status === "warning");
  const notTested = testResults.filter(t => t.status === "not-tested");
  
  let html = `
<div style="font-family: Segoe UI, Arial, sans-serif; padding: 20px; background: #f8f9fa; border-left: 5px solid #0078d4; border-radius: 6px; margin: 15px 0;">
<h2 style="color: #0078d4; margin-top: 0;">Test Results Report</h2>

<div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0; border: 1px solid #c8c6c4;">
<p style="margin: 5px 0;"><strong>Module:</strong> ${escapeHtml(moduleName)}</p>
${dateText ? `<p style="margin: 5px 0;"><strong>Test Date:</strong> ${dateText}</p>` : ''}
<p style="margin: 5px 0;"><strong>Tester:</strong> ${escapeHtml(testerName)}</p>
</div>

<h3 style="color: #0078d4; margin-top: 20px;">Test Summary</h3>
<div style="background: white; padding: 12px; border-radius: 4px; margin: 10px 0; border: 1px solid #c8c6c4;">
<p style="margin: 5px 0;"><strong>Total Tests:</strong> ${testResults.length}</p>
<p style="margin: 5px 0; color: #107c10;"><strong>Passed:</strong> ${passedTests.length}</p>
<p style="margin: 5px 0; color: #d13438;"><strong>Failed:</strong> ${failedTests.length}</p>
${warningTests.length > 0 ? `<p style="margin: 5px 0; color: #ffaa44;"><strong>Warnings:</strong> ${warningTests.length}</p>` : ''}
${notTested.length > 0 ? `<p style="margin: 5px 0; color: #605e5c;"><strong>Not Tested:</strong> ${notTested.length}</p>` : ''}
</div>
`;
  
  if (testResults.length > 0) {
    html += `<h3 style="color: #0078d4; margin-top: 20px;">Tested Items</h3>`;
    html += `<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0; border: 1px solid #c8c6c4;">`;
    html += `<table style="width: 100%; border-collapse: collapse;">`;
    html += `<thead><tr style="border-bottom: 2px solid #c8c6c4;"><th style="text-align: left; padding: 8px;">Test</th><th style="text-align: left; padding: 8px;">Status</th><th style="text-align: left; padding: 8px;">Notes/Errors</th></tr></thead>`;
    html += `<tbody>`;
    
    testResults.forEach((test) => {
      const statusConfig = {
        'passed': { icon: '✓', text: 'Passed', color: '#107c10' },
        'failed': { icon: '✗', text: 'Failed', color: '#d13438' },
        'warning': { icon: '⚠', text: 'Warning', color: '#ffaa44' },
        'not-tested': { icon: '○', text: 'Not Tested', color: '#605e5c' }
      };
      const config = statusConfig[test.status] || statusConfig['not-tested'];
      
      html += `<tr style="border-bottom: 1px solid #e1dfdd;">`;
      html += `<td style="padding: 8px;"><strong>${escapeHtml(test.name)}</strong></td>`;
      html += `<td style="padding: 8px;"><span style="color: ${config.color}; font-weight: bold;">${config.icon} ${config.text}</span></td>`;
      html += `<td style="padding: 8px;">${test.notes ? escapeHtml(test.notes) : '<em>No notes</em>'}</td>`;
      html += `</tr>`;
    });
    
    html += `</tbody></table></div>`;
  }
  
  if (failedTests.length > 0) {
    html += `<h3 style="color: #d13438; margin-top: 20px;">Issues Found</h3>`;
    html += `<div style="background: #fff4e5; padding: 15px; border-radius: 4px; margin: 10px 0; border-left: 4px solid #d13438;">`;
    html += `<ul style="margin: 0; padding-left: 20px;">`;
    failedTests.forEach((test) => {
      html += `<li style="margin-bottom: 8px;"><strong>${escapeHtml(test.name)}</strong>`;
      if (test.notes) {
        html += `: ${escapeHtml(test.notes)}`;
      }
      html += `</li>`;
    });
    html += `</ul></div>`;
  }
  
  if (testNotes) {
    html += `<h3 style="color: #0078d4; margin-top: 20px;">Additional Notes</h3>`;
    html += `<div style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0; border: 1px solid #c8c6c4;">`;
    html += `<p style="margin: 0; white-space: pre-wrap;">${escapeHtml(testNotes)}</p>`;
    html += `</div>`;
  }
  
  html += `</div>`;
  
  return html.trim();
}

function insertWorkflowSnippet() {
  const snippetType = document.getElementById("workflow-snippet-type").value;
  
  if (snippetType === "none" || snippetType === "custom-template") {
    showMessage("Please select a workflow snippet type", "warning");
    return;
  }
  
  const template = generateWorkflowSnippet(snippetType);
  
  if (!template || template.trim() === "") {
    showMessage("Error generating snippet", "error");
    return;
  }
  
  const item = Office.context.mailbox.item;
  
  if (item.itemType === Office.MailboxEnums.ItemType.Message) {
    if (item.body) {
      item.body.setSelectedDataAsync(
        template,
        { coercionType: Office.CoercionType.Html },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            showMessage("Workflow snippet inserted successfully!", "success");
          } else {
            showMessage("Error inserting snippet: " + result.error.message, "error");
            console.error("Error details:", result.error);
          }
        }
      );
    } else {
      showMessage("Cannot write to this message. Please open a new email to compose.", "error");
    }
  } else {
    showMessage("This only works with email messages.", "error");
  }
}
