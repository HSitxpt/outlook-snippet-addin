// ITxPT Test Templates and Service Definitions
// This file contains predefined tests extracted from the Sequoia Excel test report template
// Tests are filtered based on package type and services provided/consumed

// Common ITxPT Services (mapped to Excel test IDs)
const ITXPT_SERVICES = {
  "Module Inventory Service": { code: "S02P01", spec: "S02P01-Inventory", testId: "M-019", consumeTestId: "M-028" },
  "Time Service": { code: "S02P02", spec: "S02P02-Time", testId: "M-020", consumeTestId: "M-029" },
  "GNSS Location Service": { code: "S02P03", spec: "S02P03-GNSS", testId: "M-021", consumeTestId: "M-030" },
  "FMStoIP Service": { code: "S02P04", spec: "S02P04-FMStoIP", testId: "M-022", consumeTestId: "M-031" },
  "VEHICLEtoIP Service": { code: "S02P05", spec: "S02P05-VEHICLEtoIP", testId: "M-023", consumeTestId: "M-032" },
  "AVMS Service": { code: "S02P06", spec: "S02P06-AVMS", testId: "M-024", consumeTestId: "M-033" },
  "APC Service": { code: "S02P07", spec: "S02P07-APC", testId: "M-025", consumeTestId: "M-034" },
  "MADT Service": { code: "S02P08", spec: "S02P08-MADT", testId: "M-026", consumeTestId: "M-035" },
  "MQTT broker Service": { code: "S02P09", spec: "S02P09-MQTT", testId: "M-027", consumeTestId: "M-036" }
};

// Base tests that apply to all modules (from Excel "Test report" worksheet)
const BASE_TESTS = [
  {
    id: "M-001",
    name: "Test M-001 - Technical module documentation",
    description: "List in Test M-001 all documentation provided. Minimum expected: datasheet & manual",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "Preliminary documentation check"
  },
  {
    id: "M-002",
    name: "Test M-002 - Module IP address",
    description: "Module IP address from 192.168.x.0 to 192.168.x.255. Other classes may be considered: 10.0.0.0 - 10.255.255.255 or 172.16.0.0 - 172.31.255.255",
    category: "base",
    appliesTo: ["sequoia"],
    specification: "S02P00 - 1.7 - Network address map for IPv4"
  },
  {
    id: "M-002",
    name: "Test M-002 - Module IP address DHCP",
    description: "Consuming to get ip from a DHCP server",
    category: "base",
    appliesTo: ["linden"],
    specification: "S02P00 - 1.7 - Network address map for IPv4"
  },
  {
    id: "M-003",
    name: "Test M-003 - Module hostname",
    description: "[hostname] that resolves the IP address of test M-002 as defined in target field of SRV record",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S02P00 - 2.1.2.1 - SRV record naming convention"
  },
  {
    id: "M-003-A",
    name: "Test M-003-A - Address assignment",
    description: "Module supports both static and dynamic address assignment as configured by the end-user",
    category: "base",
    appliesTo: ["sequoia"],
    specification: "S02P00 - 1.7.1 - Address assignment"
  },
  {
    id: "M-004",
    name: "Test M-004 - Power supply connector type",
    description: "Power supply cable with related female MCP type connector with 6 pins, type TYCO reference: 8-968970-1 Blue Code A",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.2.2 - Power supply connectors"
  },
  {
    id: "M-005",
    name: "Test M-005 - Power supply pin distribution",
    description: "Power-supply connector pinning according the chapter",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.2.2 - Power supply connectors"
  },
  {
    id: "M-006",
    name: "Test M-006 - ECOMODE and power consumption",
    description: "ECO Mode support and Power consumption",
    category: "base",
    appliesTo: ["sequoia"],
    specification: "S01 - 2.2.3 ITS consumption modes"
  },
  {
    id: "M-006-A",
    name: "Test M-006-A - ECOMODE Power Consumption",
    description: "Accumulated power consumption limit",
    category: "base",
    appliesTo: ["linden"],
    specification: "S01 - 2.2.3.5 - ITS power consumption"
  },
  {
    id: "M-006-B",
    name: "Test M-006-B - ECOMODE Transition",
    description: "Alternative 1, 2, 3, 4, 5, 6, 7 or 8",
    category: "base",
    appliesTo: ["linden"],
    specification: "S01 - 2.2.3.6 - ITS consumption modes compared to vehicle use phases"
  },
  {
    id: "M-007",
    name: "Test M-007 - Bus-FMS connector type",
    description: "DIN 72585 female 4-Pin",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.3 - FMS interface"
  },
  {
    id: "M-008",
    name: "Test M-008 - Bus-FMS pin distribution",
    description: "Bus-FMS connector pinning according the chapter",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.3 - FMS interface"
  },
  {
    id: "M-009",
    name: "Test M-009 - Audio connector type",
    description: "MCP 9-Pin female, type TYCO reference: 1-967626-1 Yellow code A",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.4 - Audio interface"
  },
  {
    id: "M-010",
    name: "Test M-010 - Audio priorities area management",
    description: "All priorities implemented by the module",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.4 - Audio interface"
  },
  {
    id: "M-011",
    name: "Test M-011 - Audio pin distribution",
    description: "Audio connector pinning according chapter",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.4 - Audio interface"
  },
  {
    id: "M-012",
    name: "Test M-012 - WLAN interface",
    description: "Fakra Code I / Male / Beige",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.5 - Wireless communication interface"
  },
  {
    id: "M-013",
    name: "Test M-013 - GSM interface",
    description: "Fakra Code D / Male / Bordeaux",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.5 - Wireless communication interface"
  },
  {
    id: "M-014",
    name: "Test M-014 - GPS interface",
    description: "Fakra Code C / Male / Blue",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.5 - Wireless communication interface"
  },
  {
    id: "M-015",
    name: "Test M-015 - Auxiliary connector type",
    description: "MCP 18-Pin female, type TYCO reference: 1-967629-1 Grey code A",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.6 - Auxiliary interface"
  },
  {
    id: "M-016",
    name: "Test M-016 - Auxiliary pin distribution",
    description: "Auxiliary connector pinning according the chapter",
    category: "base",
    appliesTo: ["sequoia", "linden"],
    specification: "S01 - 2.6 - Auxiliary interface"
  },
  {
    id: "M-017",
    name: "Test M-017 - Ethernet interface to vehicle",
    description: "Native M12 Ethernet connector (female) or Ethernet adaptors with related M12 Ethernet connector (male), with 4 pins D-coded for 10/100Base-TX or with 8 pins X-coded for 1000Base-T",
    category: "base",
    appliesTo: ["sequoia"],
    specification: "S01 - 2.7.3 - Ethernet connectors"
  },
  {
    id: "M-017",
    name: "Test M-017 - Ethernet interface to vehicle",
    description: "Native M12 Ethernet connector or Ethernet cable with related M12 Ethernet connector, with 4 pins D-coded for 10/100Base-TX or with 8 pins X-coded for 1000Base-T",
    category: "base",
    appliesTo: ["linden"],
    specification: "S01 - 2.7.3 - Ethernet connectors"
  },
  {
    id: "M-018",
    name: "Test M-018 - PoE",
    description: "For switches supplying PoE: Switch is able to power a consumer over PoE",
    category: "base",
    appliesTo: ["sequoia"],
    specification: "S01 - 2.2.4 - Power over Ethernet"
  }
];

// Sequoia Package Tests (package-specific tests)
const SEQUOIA_TESTS = [];

// Linden Package Tests (package-specific tests)
const LINDEN_TESTS = [
  {
    id: "M-040",
    name: "Test M-040 - Vehicle Communication Gateway",
    description: "VCG module requirement",
    category: "package",
    appliesTo: ["linden"],
    specification: "S01 - VCG Vehicle Communication Gateway - WAN connection delivery module"
  }
];

// Service Provider Tests (applies when module provides a service)
function getServiceProviderTests(serviceName) {
  const service = ITXPT_SERVICES[serviceName];
  if (!service) return [];
  
  const tests = [];
  const baseTestId = service.testId;
  
  // Base service test
  tests.push({
    id: baseTestId,
    name: `Test ${baseTestId} - ${serviceName}`,
    description: `Service publication and compliance with ${service.spec} specification`,
    category: "service-provider",
    service: serviceName,
    specification: service.spec,
    appliesTo: ["sequoia", "linden"]
  });
  
  // Add service-specific sub-tests based on Excel structure
  if (serviceName === "FMStoIP Service") {
    // FMStoIP has many sub-tests
    const subTests = [
      { suffix: "A", name: "FMStoIP Configuration Service", desc: "Service publication" },
      { suffix: "B", name: "FMStoIP Provision Service", desc: "Service publication" },
      { suffix: "C", name: "FMStoIP Configuration Service addpgn Op.", desc: "AddPGN configuration" },
      { suffix: "D", name: "FMStoIP Configuration Service removepgn Op.", desc: "RemovePGN configuration" },
      { suffix: "E", name: "FMStoIP Configuration Service getpgn Op.", desc: "FMStoIPDelivery restricted to requested PGN(s)" },
      { suffix: "F", name: "FMStoIP Configuration Service addspndecode Op.", desc: "Add SPN to decode list" },
      { suffix: "G", name: "FMStoIP Configuration Service registrationstatus Op.", desc: "List of all registered PGNs" },
      { suffix: "H", name: "FMStoIP Configuration Service pgnstatus Op.", desc: "List of all seen PGNs" },
      { suffix: "I", name: "FMStoIP Configuration Service pgninfoknown Op.", desc: "List of PGNs for which either repetition rate or SPN decodings are known" },
      { suffix: "J", name: "FMStoIP Configuration Service pgninfo Op.", desc: "Details about a specific PGN" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-provider",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  } else if (serviceName === "AVMS Service") {
    const subTests = [
      { suffix: "A", name: "AVMS Run Monitoring Operation", desc: "RunMonitoringDelivery" },
      { suffix: "B", name: "AVMS Planned Pattern Operation", desc: "PlannedPatternDelivery" },
      { suffix: "C", name: "AVMS Pattern Monitoring Operation", desc: "PatternMonitoringDelivery" },
      { suffix: "D", name: "AVMS Vehicle Monitoring Operation", desc: "VehicleMonitoringDelivery" },
      { suffix: "E", name: "AVMS Journey Monitoring Operation", desc: "JourneyMonitoringDelivery" },
      { suffix: "F", name: "AVMS General Message Operation", desc: "GeneralMessageDelivery" },
      { suffix: "G", name: "AVMS Connection Monitoring Operation", desc: "ConnectionMonitoringDelivery" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-provider",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  } else if (serviceName === "APC Service") {
    const subTests = [
      { suffix: "A", name: "APC Passenger Door Count Operation", desc: "PassengerDoorCountDelivery", appliesTo: ["sequoia", "linden"] },
      { suffix: "B", name: "APC Passenger Vehicle Count Operation", desc: "PassengerVehicleCountDelivery", appliesTo: ["sequoia", "linden"] },
      { suffix: "C", name: "APC Occupancy", desc: "OccupancyDelivery", appliesTo: ["linden"] }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-provider",
        service: serviceName,
        specification: service.spec,
        appliesTo: st.appliesTo
      });
    });
  } else if (serviceName === "MADT Service") {
    const subTests = [
      { suffix: "A", name: "MADT Information Operation", desc: "GetInfo Response" },
      { suffix: "B", name: "MADT Play a sound Operation", desc: "PlaySound Response" },
      { suffix: "C", name: "MADT Read settings Operation", desc: "GetSettings Response" },
      { suffix: "D", name: "MADT Write settings Operation", desc: "SetSettings Response" },
      { suffix: "E", name: "MADT Stop the MADT Operation", desc: "Stop Response" },
      { suffix: "F", name: "MADT Restart the MADT Operation", desc: "Restart Response" },
      { suffix: "G", name: "MADT Retrieve MTS characteristics Operation", desc: "GetCharacteristics Response" },
      { suffix: "H", name: "MADT Create a Web tab Operation", desc: "NewWebTab Response" },
      { suffix: "I", name: "MADT Create a VNC tab Operation", desc: "NewVNCTab Response" },
      { suffix: "J", name: "MADT Create a Shortcut Operation", desc: "NewShortcut Response" },
      { suffix: "K", name: "MADT Navigate to given URI Operation", desc: "NavigateTo Response" },
      { suffix: "L", name: "MADT Blink a tab Operation", desc: "BlinkTab Response" },
      { suffix: "M", name: "MADT Activate a tab Operation", desc: "ActivateTab Response" },
      { suffix: "N", name: "MADT Remove a tab Operation", desc: "KillTab Response" },
      { suffix: "O", name: "MADT Remove a Shortcut Operation", desc: "KillShortcut Response" },
      { suffix: "P", name: "MADT I am alive Operation", desc: "IAmAlive Response" },
      { suffix: "Q", name: "MADT Get tabs mapping Operation", desc: "GetTabMap Response" },
      { suffix: "R", name: "MADT Get Shortcuts Operation", desc: "GetShortcuts Response" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-provider",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  }
  
  return tests;
}

// Service Consumer Tests (applies when module consumes a service)
function getServiceConsumerTests(serviceName) {
  const service = ITXPT_SERVICES[serviceName];
  if (!service) return [];
  
  const tests = [];
  const baseTestId = service.consumeTestId;
  
  // Base service consumption test
  tests.push({
    id: baseTestId,
    name: `Test ${baseTestId} - ${serviceName}`,
    description: `Service consumption and integration with ${service.spec} specification`,
    category: "service-consumer",
    service: serviceName,
    specification: service.spec,
    appliesTo: ["sequoia", "linden"]
  });
  
  // Add service-specific sub-tests for consumption
  if (serviceName === "FMStoIP Service") {
    const subTests = [
      { suffix: "A", name: "FMStoIP addpgn Operation", desc: "Add PGN request" },
      { suffix: "B", name: "FMStoIP removepgn Operation", desc: "Remove PGN request" },
      { suffix: "C", name: "FMStoIP getpgn Operation", desc: "Get PGN request" },
      { suffix: "D", name: "FMStoIP addspndecode Operation", desc: "Add SPN to decode list" },
      { suffix: "E", name: "FMStoIP registrationstatus Operation", desc: "Get list of all registered PGNs" },
      { suffix: "F", name: "FMStoIP pgnstatus Operation", desc: "Get list of all seen PGNs" },
      { suffix: "G", name: "FMStoIP pgninfoknown Operation", desc: "Get list of PGNs for which either repetition rate or SPN decodings are known" },
      { suffix: "H", name: "FMStoIP pgninfo Operation", desc: "Get details about a specific PGN" },
      { suffix: "I", name: "FMStoIP Service consumption", desc: "Join the multicast group" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-consumer",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  } else if (serviceName === "AVMS Service") {
    const subTests = [
      { suffix: "A", name: "AVMS Run Monitoring Operation", desc: "RunMonitoringDelivery subscription request" },
      { suffix: "B", name: "AVMS Planned Pattern Operation", desc: "PlannedPatternDelivery subscription request" },
      { suffix: "C", name: "AVMS Pattern Monitoring Operation", desc: "PatternMonitoringDelivery subscription request" },
      { suffix: "D", name: "AVMS Vehicle Monitoring Operation", desc: "VehicleMonitoringDelivery subscription request" },
      { suffix: "E", name: "AVMS Journey Monitoring Operation", desc: "JourneyMonitoringDelivery subscription request" },
      { suffix: "F", name: "AVMS General Message Operation", desc: "GeneralMessageDelivery subscription request" },
      { suffix: "G", name: "AVMS Connection Monitoring Operation", desc: "ConnectionMonitoringDelivery subscription request" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-consumer",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  } else if (serviceName === "APC Service") {
    const subTests = [
      { suffix: "A", name: "APC Passenger Door Count Operation", desc: "PassengerDoorCountDelivery subscription request", appliesTo: ["sequoia", "linden"] },
      { suffix: "B", name: "APC Passenger Vehicle Count Operation", desc: "PassengerVehicleCountDelivery subscription request", appliesTo: ["sequoia", "linden"] },
      { suffix: "C", name: "APC Occupancy", desc: "OccupancyDelivery subscription request", appliesTo: ["linden"] }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-consumer",
        service: serviceName,
        specification: service.spec,
        appliesTo: st.appliesTo
      });
    });
  } else if (serviceName === "MADT Service") {
    const subTests = [
      { suffix: "A", name: "MADT Information Operation", desc: "GetInfo Request" },
      { suffix: "B", name: "MADT Play a sound Operation", desc: "PlaySound Request" },
      { suffix: "C", name: "MADT Read settings Operation", desc: "GetSettings Request" },
      { suffix: "D", name: "MADT Write settings Operation", desc: "SetSettings Request" },
      { suffix: "E", name: "MADT Stop the MADT Operation", desc: "Stop Request" },
      { suffix: "F", name: "MADT Restart the MADT Operation", desc: "Restart Request" },
      { suffix: "G", name: "MADT Retrieve MTS characteristics Operation", desc: "GetCharacteristics Request" },
      { suffix: "H", name: "MADT Create a Web tab Operation", desc: "NewWebTab Request" },
      { suffix: "I", name: "MADT Create a VNC tab Operation", desc: "NewVNCTab Request" },
      { suffix: "J", name: "MADT Create a Shortcut Operation", desc: "NewShortcut Request" },
      { suffix: "K", name: "MADT Navigate to given URI Operation", desc: "NavigateTo Request" },
      { suffix: "L", name: "MADT Blink a tab Operation", desc: "BlinkTab Request" },
      { suffix: "M", name: "MADT Activate a tab Operation", desc: "ActivateTab Request" },
      { suffix: "N", name: "MADT Remove a tab Operation", desc: "KillTab Request" },
      { suffix: "O", name: "MADT Remove a Shortcut Operation", desc: "KillShortcut Request" },
      { suffix: "P", name: "MADT I am alive Operation", desc: "IAmAlive Request" },
      { suffix: "Q", name: "MADT Get tabs mapping Operation", desc: "GetTabMap Request" },
      { suffix: "R", name: "MADT Get Shortcuts Operation", desc: "GetShortcuts Request" }
    ];
    subTests.forEach(st => {
      tests.push({
        id: `${baseTestId}-${st.suffix}`,
        name: `Test ${baseTestId}-${st.suffix} - ${st.name}`,
        description: st.desc,
        category: "service-consumer",
        service: serviceName,
        specification: service.spec,
        appliesTo: ["sequoia", "linden"]
      });
    });
  }
  
  return tests;
}

// Get all available tests filtered by package and services
function getFilteredTests(packageType, servicesProvided, servicesConsumed) {
  let tests = [];
  
  // Add base tests (always included)
  tests = tests.concat(BASE_TESTS.filter(t => t.appliesTo.includes(packageType)));
  
  // Add package-specific tests (currently empty, but structure is ready)
  if (packageType === "sequoia") {
    tests = tests.concat(SEQUOIA_TESTS);
  } else if (packageType === "linden") {
    tests = tests.concat(LINDEN_TESTS);
  }
  
  // Add service provider tests
  if (servicesProvided && servicesProvided.length > 0) {
    servicesProvided.forEach(serviceName => {
      tests = tests.concat(getServiceProviderTests(serviceName));
    });
  }
  
  // Add service consumer tests
  if (servicesConsumed && servicesConsumed.length > 0) {
    servicesConsumed.forEach(serviceName => {
      tests = tests.concat(getServiceConsumerTests(serviceName));
    });
  }
  
  return tests;
}

// Export for use in main script
if (typeof window !== 'undefined') {
  window.ITXPT_TEST_TEMPLATES = {
    SERVICES: ITXPT_SERVICES,
    BASE_TESTS: BASE_TESTS,
    SEQUOIA_TESTS: SEQUOIA_TESTS,
    LINDEN_TESTS: LINDEN_TESTS,
    getServiceProviderTests: getServiceProviderTests,
    getServiceConsumerTests: getServiceConsumerTests,
    getFilteredTests: getFilteredTests
  };
}
