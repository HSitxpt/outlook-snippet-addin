// ITxPT Test Templates and Service Definitions
// This file contains predefined tests that are filtered based on package type and services

// Common ITxPT Services
const ITXPT_SERVICES = {
  // Core Services
  "Time Service": { code: "S02P02", spec: "S02P02-Time", description: "Time synchronization service" },
  "Location Service": { code: "S02P03", spec: "S02P03-Location", description: "Location/GPS service" },
  "Vehicle Service": { code: "S02P04", spec: "S02P04-Vehicle", description: "Vehicle information service" },
  "Journey Service": { code: "S02P05", spec: "S02P05-Journey", description: "Journey planning service" },
  "Stop Point Service": { code: "S02P06", spec: "S02P06-StopPoint", description: "Stop point information" },
  "Line Service": { code: "S02P07", spec: "S02P07-Line", description: "Line/route information" },
  "Destination Service": { code: "S02P08", spec: "S02P08-Destination", description: "Destination display service" },
  "Occupancy Service": { code: "S02P09", spec: "S02P09-Occupancy", description: "Occupancy monitoring" },
  "Door Service": { code: "S02P10", spec: "S02P10-Door", description: "Door control service" },
  "Emergency Service": { code: "S02P11", spec: "S02P11-Emergency", description: "Emergency communication" },
  "Audio Service": { code: "S02P12", spec: "S02P12-Audio", description: "Audio announcement service" },
  "Video Service": { code: "S02P13", spec: "S02P13-Video", description: "Video display service" },
  "WiFi Service": { code: "S02P14", spec: "S02P14-WiFi", description: "WiFi connectivity service" },
  "Diagnostic Service": { code: "S02P15", spec: "S02P15-Diagnostic", description: "Diagnostic and monitoring" }
};

// Base tests that apply to all modules
const BASE_TESTS = [
  {
    id: "base-001",
    name: "Module Identification",
    description: "Verify module identification and basic connectivity",
    category: "base",
    appliesTo: ["sequoia", "linden"]
  },
  {
    id: "base-002",
    name: "Network Configuration",
    description: "Test network setup, IP configuration, and connectivity",
    category: "base",
    appliesTo: ["sequoia", "linden"]
  },
  {
    id: "base-003",
    name: "DHCP Configuration",
    description: "Verify DHCP assignment and network addressing",
    category: "base",
    appliesTo: ["sequoia", "linden"]
  }
];

// Sequoia Package Tests
const SEQUOIA_TESTS = [
  {
    id: "seq-001",
    name: "Sequoia Package Compliance",
    description: "Verify compliance with Sequoia package requirements",
    category: "package",
    appliesTo: ["sequoia"]
  },
  {
    id: "seq-002",
    name: "Sequoia Core Services",
    description: "Test core Sequoia package services and protocols",
    category: "package",
    appliesTo: ["sequoia"]
  },
  {
    id: "seq-003",
    name: "Sequoia Data Exchange",
    description: "Verify Sequoia data exchange protocols and formats",
    category: "package",
    appliesTo: ["sequoia"]
  }
];

// Linden Package Tests
const LINDEN_TESTS = [
  {
    id: "lind-001",
    name: "Linden Package Compliance",
    description: "Verify compliance with Linden package requirements",
    category: "package",
    appliesTo: ["linden"]
  },
  {
    id: "lind-002",
    name: "Linden Core Services",
    description: "Test core Linden package services and protocols",
    category: "package",
    appliesTo: ["linden"]
  },
  {
    id: "lind-003",
    name: "Linden Data Exchange",
    description: "Verify Linden data exchange protocols and formats",
    category: "package",
    appliesTo: ["linden"]
  }
];

// Service Provider Tests (applies when module provides a service)
function getServiceProviderTests(serviceName) {
  const service = ITXPT_SERVICES[serviceName];
  if (!service) return [];
  
  return [
    {
      id: `prov-${service.code}`,
      name: `${serviceName} - Service Provider`,
      description: `Test ${serviceName} service provision according to ${service.spec} specification`,
      category: "service-provider",
      service: serviceName,
      specification: service.spec,
      appliesTo: ["sequoia", "linden"]
    },
    {
      id: `prov-${service.code}-data`,
      name: `${serviceName} - Data Format Compliance`,
      description: `Verify ${serviceName} data format compliance with ${service.spec}`,
      category: "service-provider",
      service: serviceName,
      specification: service.spec,
      appliesTo: ["sequoia", "linden"]
    },
    {
      id: `prov-${service.code}-api`,
      name: `${serviceName} - API Compliance`,
      description: `Test ${serviceName} API compliance with ${service.spec} specification`,
      category: "service-provider",
      service: serviceName,
      specification: service.spec,
      appliesTo: ["sequoia", "linden"]
    }
  ];
}

// Service Consumer Tests (applies when module consumes a service)
function getServiceConsumerTests(serviceName) {
  const service = ITXPT_SERVICES[serviceName];
  if (!service) return [];
  
  return [
    {
      id: `cons-${service.code}`,
      name: `${serviceName} - Service Consumer`,
      description: `Test ${serviceName} service consumption and integration`,
      category: "service-consumer",
      service: serviceName,
      specification: service.spec,
      appliesTo: ["sequoia", "linden"]
    },
    {
      id: `cons-${service.code}-integration`,
      name: `${serviceName} - Integration Test`,
      description: `Verify integration with ${serviceName} service provider`,
      category: "service-consumer",
      service: serviceName,
      specification: service.spec,
      appliesTo: ["sequoia", "linden"]
    }
  ];
}

// Get all available tests filtered by package and services
function getFilteredTests(packageType, servicesProvided, servicesConsumed) {
  let tests = [];
  
  // Add base tests
  tests = tests.concat(BASE_TESTS.filter(t => t.appliesTo.includes(packageType)));
  
  // Add package-specific tests
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

