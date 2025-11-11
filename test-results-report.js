// Test Results Report Standalone Application
// This file contains the logic for the standalone test results report tool

// Store test results by test ID
let testResultsStorage = {};

// Load test results from localStorage
function loadTestResults() {
  try {
    const saved = localStorage.getItem('itxpt_test_results');
    if (saved) {
      testResultsStorage = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load test results:", e);
    testResultsStorage = {};
  }
}

// Save test results to localStorage
function saveTestResults() {
  try {
    localStorage.setItem('itxpt_test_results', JSON.stringify(testResultsStorage));
  } catch (e) {
    console.warn("Could not save test results:", e);
  }
}

// Get test result for a specific test ID
function getTestResult(testId) {
  return testResultsStorage[testId] || { status: "not-tested", notes: "" };
}

// Set test result for a specific test ID
function setTestResult(testId, status, notes = "") {
  testResultsStorage[testId] = { status, notes };
  saveTestResults();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}

function populateServiceChecklists() {
  const providedContainer = document.getElementById("services-provided-checklist");
  const consumedContainer = document.getElementById("services-consumed-checklist");
  
  if (!providedContainer || !consumedContainer) return;
  
  // Get services from test templates (matching Excel file structure)
  const services = window.ITXPT_TEST_TEMPLATES?.SERVICES || {
    "Module Inventory Service": { code: "S02P01", spec: "S02P01-Inventory", description: "Module inventory and identification service" },
    "Time Service": { code: "S02P02", spec: "S02P02-Time", description: "Time synchronization service" },
    "GNSS Location Service": { code: "S02P03", spec: "S02P03-GNSS", description: "GNSS location/GPS service" },
    "FMStoIP Service": { code: "S02P04", spec: "S02P04-FMStoIP", description: "FMS to IP conversion service" },
    "VEHICLEtoIP Service": { code: "S02P05", spec: "S02P05-VEHICLEtoIP", description: "Vehicle information to IP service" },
    "AVMS Service": { code: "S02P06", spec: "S02P06-AVMS", description: "Automatic Vehicle Monitoring System service" },
    "APC Service": { code: "S02P07", spec: "S02P07-APC", description: "Automatic Passenger Counting service" },
    "MADT Service": { code: "S02P08", spec: "S02P08-MADT", description: "Mobile Application Development Toolkit service" },
    "MQTT broker Service": { code: "S02P09", spec: "S02P09-MQTT", description: "MQTT message broker service" }
  };
  
  // Create checkboxes for provided services
  let providedHTML = '';
  Object.keys(services).forEach(serviceName => {
    const service = services[serviceName];
    const checkboxId = `service-prov-${service.code}`;
    providedHTML += `
      <label style="display: flex; align-items: center; padding: 6px; cursor: pointer; border-radius: 4px; margin-bottom: 4px;" 
             onmouseover="this.style.background='#f3f2f1'" onmouseout="this.style.background='transparent'">
        <input type="checkbox" id="${checkboxId}" class="service-provided-checkbox" value="${escapeHtml(serviceName)}" 
               style="margin-right: 8px; cursor: pointer;" />
        <div style="flex: 1;">
          <div style="font-weight: 500; font-size: 13px;">${escapeHtml(serviceName)}</div>
          <div style="font-size: 11px; color: #605e5c;">${escapeHtml(service.spec)} - ${escapeHtml(service.description)}</div>
        </div>
      </label>
    `;
  });
  providedContainer.innerHTML = providedHTML;
  
  // Create checkboxes for consumed services
  let consumedHTML = '';
  Object.keys(services).forEach(serviceName => {
    const service = services[serviceName];
    const checkboxId = `service-cons-${service.code}`;
    consumedHTML += `
      <label style="display: flex; align-items: center; padding: 6px; cursor: pointer; border-radius: 4px; margin-bottom: 4px;" 
             onmouseover="this.style.background='#f3f2f1'" onmouseout="this.style.background='transparent'">
        <input type="checkbox" id="${checkboxId}" class="service-consumed-checkbox" value="${escapeHtml(serviceName)}" 
               style="margin-right: 8px; cursor: pointer;" />
        <div style="flex: 1;">
          <div style="font-weight: 500; font-size: 13px;">${escapeHtml(serviceName)}</div>
          <div style="font-size: 11px; color: #605e5c;">${escapeHtml(service.spec)} - ${escapeHtml(service.description)}</div>
        </div>
      </label>
    `;
  });
  consumedContainer.innerHTML = consumedHTML;
}

function setupTestFiltering() {
  const packageSelect = document.getElementById("test-package-type");
  const providedCheckboxes = document.querySelectorAll(".service-provided-checkbox");
  const consumedCheckboxes = document.querySelectorAll(".service-consumed-checkbox");
  
  // Load existing test results
  loadTestResults();
  
  // Filter tests when package or services change
  const filterTests = () => {
    const packageType = packageSelect?.value;
    if (!packageType) {
      const container = document.getElementById("workflow-test-results");
      if (container) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #605e5c;"><p>Select package type to see relevant tests</p></div>';
      }
      return;
    }
    
    // Get selected services
    const servicesProvided = Array.from(providedCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    
    const servicesConsumed = Array.from(consumedCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    
    // Get filtered tests from templates
    let tests = [];
    if (window.ITXPT_TEST_TEMPLATES && window.ITXPT_TEST_TEMPLATES.getFilteredTests) {
      tests = window.ITXPT_TEST_TEMPLATES.getFilteredTests(packageType, servicesProvided, servicesConsumed);
    }
    
    // Update test display
    displayFilteredTests(tests);
    
    // Update info text
    const infoEl = document.getElementById("test-filter-info");
    if (infoEl) {
      infoEl.textContent = `Showing ${tests.length} relevant test${tests.length !== 1 ? 's' : ''}`;
    }
  };
  
  // Add event listeners
  if (packageSelect) {
    packageSelect.addEventListener("change", filterTests);
  }
  
  providedCheckboxes.forEach(cb => {
    cb.addEventListener("change", filterTests);
  });
  
  consumedCheckboxes.forEach(cb => {
    cb.addEventListener("change", filterTests);
  });
  
  // Initial filter
  filterTests();
}

function displayFilteredTests(tests) {
  const container = document.getElementById("workflow-test-results");
  if (!container) return;
  
  // Clear existing tests
  container.innerHTML = "";
  
  if (tests.length === 0) {
    container.innerHTML = '<div style="padding: 20px; text-align: center; color: #605e5c;"><p>No tests match your selection. Select services to see relevant tests.</p></div>';
    return;
  }
  
  // Group tests by category
  const groupedTests = {
    base: [],
    package: [],
    "service-provider": [],
    "service-consumer": []
  };
  
  tests.forEach(test => {
    const category = test.category || "base";
    if (groupedTests[category]) {
      groupedTests[category].push(test);
    } else {
      groupedTests.base.push(test);
    }
  });
  
  // Create table structure
  const tableWrapper = document.createElement("div");
  tableWrapper.className = "test-results-table-wrapper";
  tableWrapper.style.cssText = "overflow-x: auto; margin-top: 8px;";
  
  const table = document.createElement("table");
  table.className = "test-results-table";
  table.style.cssText = "width: 100%; border-collapse: collapse; background: white; border-radius: 4px; overflow: hidden;";
  
  // Table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr style="background: #f3f2f1; border-bottom: 2px solid #c8c6c4;">
      <th style="text-align: left; padding: 12px; font-weight: 600; color: #323130; font-size: 13px;">Test</th>
      <th style="text-align: center; padding: 12px; font-weight: 600; color: #323130; font-size: 13px; width: 180px;">Result</th>
      <th style="text-align: left; padding: 12px; font-weight: 600; color: #323130; font-size: 13px;">Notes</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Table body
  const tbody = document.createElement("tbody");
  
  // Display tests grouped by category
  Object.keys(groupedTests).forEach(category => {
    const categoryTests = groupedTests[category];
    if (categoryTests.length === 0) return;
    
    // Add category row
    const categoryRow = document.createElement("tr");
    categoryRow.style.cssText = "background: #e8f4f8;";
    const categoryNames = {
      base: "Base Tests",
      package: "Package Tests",
      "service-provider": "Service Provider Tests",
      "service-consumer": "Service Consumer Tests"
    };
    categoryRow.innerHTML = `
      <td colspan="3" style="padding: 10px 12px; font-weight: 600; color: #0078d4; font-size: 13px; border-bottom: 1px solid #c8c6c4;">
        ${categoryNames[category] || category}
      </td>
    `;
    tbody.appendChild(categoryRow);
    
    // Add tests in this category
    categoryTests.forEach(test => {
      const testResult = getTestResult(test.id);
      const row = document.createElement("tr");
      row.className = "test-result-row";
      row.dataset.testId = test.id;
      row.style.cssText = "border-bottom: 1px solid #edebe9; transition: background-color 0.2s;";
      
      row.innerHTML = `
        <td style="padding: 12px; vertical-align: top;">
          <div style="font-weight: 600; color: #323130; font-size: 13px; margin-bottom: 4px;">${escapeHtml(test.name)}</div>
          <div style="color: #605e5c; font-size: 11px; line-height: 1.4;">${escapeHtml(test.description)}</div>
          ${test.specification ? `<div style="color: #0078d4; font-size: 10px; margin-top: 4px;">Spec: ${escapeHtml(test.specification)}</div>` : ''}
        </td>
        <td style="padding: 12px; text-align: center; vertical-align: middle;">
          <div class="test-result-buttons" style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="test-result-btn test-pass-btn" data-test-id="${test.id}" data-status="passed" 
                    style="padding: 8px 16px; background: ${testResult.status === 'passed' ? '#107c10' : '#e8f5e9'}; color: ${testResult.status === 'passed' ? 'white' : '#107c10'}; border: 2px solid #107c10; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 12px; transition: all 0.2s; min-width: 70px;">
              ✓ Pass
            </button>
            <button type="button" class="test-result-btn test-fail-btn" data-test-id="${test.id}" data-status="failed"
                    style="padding: 8px 16px; background: ${testResult.status === 'failed' ? '#d13438' : '#fff5f5'}; color: ${testResult.status === 'failed' ? 'white' : '#d13438'}; border: 2px solid #d13438; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 12px; transition: all 0.2s; min-width: 70px;">
              ✗ Fail
            </button>
            <button type="button" class="test-result-btn test-clear-btn" data-test-id="${test.id}" data-status="not-tested"
                    style="padding: 8px 12px; background: ${testResult.status === 'not-tested' ? '#f3f2f1' : 'white'}; color: #605e5c; border: 1px solid #c8c6c4; border-radius: 4px; cursor: pointer; font-size: 11px; transition: all 0.2s;"
                    title="Clear result">
              ○
            </button>
          </div>
        </td>
        <td style="padding: 12px; vertical-align: middle;">
          <input type="text" class="test-result-notes" data-test-id="${test.id}" 
                 value="${escapeHtml(testResult.notes || '')}" 
                 placeholder="Add notes or errors..." 
                 style="width: 100%; padding: 8px; border: 1px solid #c8c6c4; border-radius: 4px; font-size: 12px; box-sizing: border-box;" />
        </td>
      `;
      
      tbody.appendChild(row);
      
      // Add hover effect
      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = "#fafafa";
      });
      row.addEventListener("mouseleave", () => {
        row.style.backgroundColor = "transparent";
      });
      
      // Add button event listeners
      const passBtn = row.querySelector(".test-pass-btn");
      const failBtn = row.querySelector(".test-fail-btn");
      const clearBtn = row.querySelector(".test-clear-btn");
      const notesInput = row.querySelector(".test-result-notes");
      
      const updateButtonStates = (selectedStatus) => {
        const buttons = [passBtn, failBtn, clearBtn];
        buttons.forEach(btn => {
          const status = btn.dataset.status;
          if (status === selectedStatus) {
            if (status === 'passed') {
              btn.style.background = '#107c10';
              btn.style.color = 'white';
            } else if (status === 'failed') {
              btn.style.background = '#d13438';
              btn.style.color = 'white';
            } else {
              btn.style.background = '#f3f2f1';
              btn.style.color = '#605e5c';
            }
          } else {
            if (status === 'passed') {
              btn.style.background = '#e8f5e9';
              btn.style.color = '#107c10';
            } else if (status === 'failed') {
              btn.style.background = '#fff5f5';
              btn.style.color = '#d13438';
            } else {
              btn.style.background = 'white';
              btn.style.color = '#605e5c';
            }
          }
        });
      };
      
      passBtn.addEventListener("click", () => {
        const notes = notesInput.value.trim();
        setTestResult(test.id, "passed", notes);
        updateButtonStates("passed");
      });
      
      failBtn.addEventListener("click", () => {
        const notes = notesInput.value.trim();
        setTestResult(test.id, "failed", notes);
        updateButtonStates("failed");
      });
      
      clearBtn.addEventListener("click", () => {
        setTestResult(test.id, "not-tested", "");
        notesInput.value = "";
        updateButtonStates("not-tested");
      });
      
      notesInput.addEventListener("blur", () => {
        const currentResult = getTestResult(test.id);
        if (currentResult.status !== "not-tested") {
          setTestResult(test.id, currentResult.status, notesInput.value.trim());
        }
      });
      
      // Initialize button states
      updateButtonStates(testResult.status);
    });
  });
  
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  container.appendChild(tableWrapper);
}

function generateTestResultsReportSnippet() {
  const moduleName = document.getElementById("test-module-name")?.value || "[Module Name]";
  const packageType = document.getElementById("test-package-type")?.value || "";
  const specification = document.getElementById("test-specification")?.value?.trim() || "";
  // Get selected services from checkboxes
  const servicesProvided = Array.from(document.querySelectorAll(".service-provided-checkbox:checked"))
    .map(cb => cb.value);
  const servicesConsumed = Array.from(document.querySelectorAll(".service-consumed-checkbox:checked"))
    .map(cb => cb.value);
  const testDate = document.getElementById("test-date")?.value || "";
  const testerName = document.getElementById("tester-name")?.value || "[Tester Name]";
  const testNotes = document.getElementById("test-notes")?.value || "";
  
  // Collect test results from the table
  const testResults = [];
  const testRows = document.querySelectorAll("#workflow-test-results .test-result-row");
  testRows.forEach((row) => {
    const testId = row.dataset.testId;
    const testName = row.querySelector("td:first-child div:first-child")?.textContent.trim();
    const status = getTestResult(testId).status;
    const notes = row.querySelector(".test-result-notes")?.value.trim() || getTestResult(testId).notes;
    
    if (testName && status !== "not-tested") {
      testResults.push({ name: testName, status, notes });
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
${packageType ? `<p style="margin: 5px 0;"><strong>Package:</strong> ${packageType === "sequoia" ? "Sequoia" : "Linden"}</p>` : ''}
${specification ? `<p style="margin: 5px 0;"><strong>Specification:</strong> ${escapeHtml(specification)}</p>` : ''}
${dateText ? `<p style="margin: 5px 0;"><strong>Test Date:</strong> ${dateText}</p>` : ''}
<p style="margin: 5px 0;"><strong>Tester:</strong> ${escapeHtml(testerName)}</p>
${servicesProvided && servicesProvided.length > 0 ? `<p style="margin: 5px 0;"><strong>Services Provided:</strong> ${escapeHtml(servicesProvided.join(', '))}</p>` : ''}
${servicesConsumed && servicesConsumed.length > 0 ? `<p style="margin: 5px 0;"><strong>Services Consumed:</strong> ${escapeHtml(servicesConsumed.join(', '))}</p>` : ''}
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

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => {
      showMessage("Copied to clipboard!", "success");
      return true;
    }).catch(err => {
      console.error('Failed to copy:', err);
      showMessage("Failed to copy to clipboard", "error");
      return false;
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      showMessage("Copied to clipboard!", "success");
      return true;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      showMessage("Failed to copy to clipboard", "error");
      return false;
    }
  }
}

function showPreview() {
  const html = generateTestResultsReportSnippet();
  if (!html || html.trim() === "") {
    showMessage("Please fill in at least one field to preview", "warning");
    return;
  }
  
  const modal = document.getElementById("preview-modal");
  const previewContent = document.getElementById("preview-content");
  previewContent.innerHTML = html;
  modal.classList.add("show");
}

function closePreview() {
  const modal = document.getElementById("preview-modal");
  modal.classList.remove("show");
}

// Initialize when DOM is ready
function initializeApp() {
  console.log("Initializing Test Results Report application");
  
  // Populate service checklists and setup test filtering
  populateServiceChecklists();
  setTimeout(() => {
    setupTestFiltering();
  }, 100);
  
  // Generate report button
  const generateBtn = document.getElementById("generate-report-btn");
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const html = generateTestResultsReportSnippet();
      if (!html || html.trim() === "") {
        showMessage("Please fill in at least the package type and select some tests", "warning");
        return;
      }
      
      // Show copy buttons and preview
      document.getElementById("copy-html-btn").style.display = "inline-flex";
      document.getElementById("preview-btn").style.display = "inline-flex";
      document.getElementById("preview-area").style.display = "block";
      document.getElementById("preview-area").innerHTML = html;
    });
  }
  
  // Copy HTML button
  const copyBtn = document.getElementById("copy-html-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const html = generateTestResultsReportSnippet();
      copyToClipboard(html);
    });
  }
  
  // Preview button
  const previewBtn = document.getElementById("preview-btn");
  if (previewBtn) {
    previewBtn.addEventListener("click", showPreview);
  }
  
  // Copy from preview
  const copyFromPreviewBtn = document.getElementById("copy-from-preview");
  if (copyFromPreviewBtn) {
    copyFromPreviewBtn.addEventListener("click", () => {
      const html = generateTestResultsReportSnippet();
      copyToClipboard(html);
      closePreview();
    });
  }
  
  // Close preview
  const closePreviewBtn = document.getElementById("close-preview");
  if (closePreviewBtn) {
    closePreviewBtn.addEventListener("click", closePreview);
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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

