/* global Office */

let testCounter = 0;

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.addEventListener("DOMContentLoaded", () => {
      initializeApp();
    });
  }
});

function initializeApp() {
  // Add test button
  document.getElementById("add-test-btn").addEventListener("click", addTestRow);
  
  // Insert template button
  document.getElementById("insert-template-btn").addEventListener("click", insertTemplate);
  
  // Clear form button
  document.getElementById("clear-form-btn").addEventListener("click", clearForm);
  
  // Add initial test row
  addTestRow();
}

function addTestRow() {
  testCounter++;
  const container = document.getElementById("tests-container");
  const testDiv = document.createElement("div");
  testDiv.className = "test-row";
  testDiv.id = `test-row-${testCounter}`;
  
  testDiv.innerHTML = `
    <div class="test-row-content">
      <input type="text" class="ms-TextField-field test-name" placeholder="Testnamn" />
      <select class="ms-Dropdown test-status">
        <option value="passed">✓ Genomfört</option>
        <option value="failed">✗ Misslyckades</option>
        <option value="in-progress">⟳ Pågår</option>
        <option value="pending">○ Väntar</option>
      </select>
      <input type="text" class="ms-TextField-field test-notes" placeholder="Anteckningar (valfritt)" />
      <button class="ms-Button remove-test-btn" data-test-id="${testCounter}">Ta bort</button>
    </div>
  `;
  
  container.appendChild(testDiv);
  
  // Add remove button listener
  testDiv.querySelector(".remove-test-btn").addEventListener("click", (e) => {
    const testId = e.target.getAttribute("data-test-id");
    document.getElementById(`test-row-${testId}`).remove();
  });
}

function clearForm() {
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
}

function insertTemplate() {
  const template = generateTemplate();
  
  // Check if we're in compose mode (can write) or read mode
  const item = Office.context.mailbox.item;
  
  if (item.itemType === Office.MailboxEnums.ItemType.Message) {
    // For compose mode, use setSelectedDataAsync
    if (item.body) {
      item.body.setSelectedDataAsync(
        template,
        { coercionType: Office.CoercionType.Html },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            showMessage("Template infogad i email!", "success");
          } else {
            showMessage("Fel vid infogning: " + result.error.message, "error");
            console.error("Error details:", result.error);
          }
        }
      );
    } else {
      showMessage("Kan inte skriva till detta meddelande. Öppna ett nytt email för att komponera.", "error");
    }
  } else {
    showMessage("Detta fungerar endast med email-meddelanden.", "error");
  }
}

function generateTemplate() {
  const deadlineDate = document.getElementById("deadline-date").value;
  const deadlineTime = document.getElementById("deadline-time").value;
  const processStage = document.getElementById("process-stage").value;
  const plannerTicket = document.getElementById("planner-ticket").value;
  const additionalNotes = document.getElementById("additional-notes").value;
  
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
  
  // Build template HTML
  let html = '<div style="font-family: Segoe UI, Arial, sans-serif; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #0078d4;">';
  html += '<h3 style="color: #0078d4; margin-top: 0;">ITXPT Labeling Information</h3>';
  
  // Deadline section
  if (deadlineDate || deadlineTime) {
    html += '<div style="margin-bottom: 15px;">';
    html += '<strong style="color: #333;">⏰ Deadline:</strong><br>';
    let deadlineText = '';
    if (deadlineDate) {
      const dateObj = new Date(deadlineDate);
      deadlineText += dateObj.toLocaleDateString('sv-SE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    if (deadlineTime) {
      deadlineText += (deadlineText ? ' kl ' : '') + deadlineTime;
    }
    html += '<span style="color: #666;">' + deadlineText + '</span>';
    html += '</div>';
  }
  
  // Process stage section
  if (processStage || plannerTicket) {
    html += '<div style="margin-bottom: 15px;">';
    html += '<strong style="color: #333;">📍 Processsteg:</strong><br>';
    if (processStage) {
      const stageNames = {
        'planning': 'Planering',
        'preparation': 'Förberedelse',
        'testing': 'Testning pågår',
        'review': 'Granskning',
        'finalization': 'Finalisering',
        'completed': 'Klart'
      };
      html += '<span style="color: #666;">' + stageNames[processStage] + '</span>';
    }
    if (plannerTicket) {
      html += (processStage ? ' | ' : '') + '<span style="color: #666;">Ticket: ' + plannerTicket + '</span>';
    }
    html += '</div>';
  }
  
  // Tests section
  if (tests.length > 0) {
    html += '<div style="margin-bottom: 15px;">';
    html += '<strong style="color: #333;">🧪 Genomförda Tester:</strong><br>';
    html += '<ul style="margin: 5px 0; padding-left: 20px; color: #666;">';
    tests.forEach((test) => {
      const statusIcons = {
        'passed': '✓',
        'failed': '✗',
        'in-progress': '⟳',
        'pending': '○'
      };
      const statusTexts = {
        'passed': 'Genomfört',
        'failed': 'Misslyckades',
        'in-progress': 'Pågår',
        'pending': 'Väntar'
      };
      html += '<li>';
      html += statusIcons[test.status] + ' <strong>' + test.name + '</strong> - ' + statusTexts[test.status];
      if (test.notes) {
        html += ' (' + test.notes + ')';
      }
      html += '</li>';
    });
    html += '</ul>';
    html += '</div>';
  }
  
  // Additional notes
  if (additionalNotes) {
    html += '<div style="margin-bottom: 15px;">';
    html += '<strong style="color: #333;">📝 Anteckningar:</strong><br>';
    html += '<span style="color: #666;">' + escapeHtml(additionalNotes) + '</span>';
    html += '</div>';
  }
  
  html += '</div>';
  html += '<br>';
  
  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showMessage(message, type) {
  // Create a simple message display
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${type === 'success' ? '#107c10' : '#d13438'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: fadeIn 0.3s;
  `;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'fadeOut 0.3s';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

