/*
  RIDGE ROCK SAFETY HUB DATA
  --------------------------
  This is the main file you update when adding reports, resources,
  contacts, or toolbox talks.

  IMPORTANT:
  - Keep commas between each item.
  - Set active: false to hide an item without deleting it.
  - The highest toolbox talk number automatically becomes current.
*/

const safetyHubData = {
  lastUpdated: "July 29, 2026",

  quickLinks: [
    { label: "Report a Near Miss", target: "#reporting", icon: "!" },
    { label: "Current Toolbox Talk", target: "#toolbox", icon: "T" },
    { label: "Safety Resources", target: "#resources", icon: "R" },
    { label: "Safety Contacts", target: "#contacts", icon: "C" }
  ],

  reports: [
    {
      title: "Report a Near Miss",
      description: "Report unsafe conditions, close calls, and events that could have caused an injury or damage.",
      url: "https://forms.cloud.microsoft/r/jYkmUAKjwm",
      buttonText: "Open Near Miss Form",
      icon: "!",
      theme: "amber",
      active: true
    },
    {
      title: "Report an Incident",
      description: "Use this area for injuries, property damage, vehicle incidents, or other reportable events.",
      url: "#",
      buttonText: "Form Coming Soon",
      icon: "+",
      theme: "red",
      active: true,
      disabled: true
    },
    {
      title: "Report a Safety Concern",
      description: "Submit a general safety concern, unsafe condition, or recommendation for improvement.",
      url: "#",
      buttonText: "Form Coming Soon",
      icon: "?",
      theme: "blue",
      active: true,
      disabled: true
    },
    {
      title: "Equipment Damage Report",
      description: "Use this area for damage to tools, vehicles, equipment, or company property.",
      url: "#",
      buttonText: "Form Coming Soon",
      icon: "E",
      theme: "slate",
      active: true,
      disabled: true
    }
  ],

  resources: [
    {
      title: "Safety Policies",
      description: "Company safety policies, expectations, and procedures.",
      url: "#",
      buttonText: "Coming Soon",
      icon: "P",
      theme: "purple",
      active: true,
      disabled: true
    },
    {
      title: "Safety Plans",
      description: "Jobsite-specific plans, emergency plans, and safety documentation.",
      url: "#",
      buttonText: "Coming Soon",
      icon: "S",
      theme: "teal",
      active: true,
      disabled: true
    },
    {
      title: "Toolbox Talk Documentation",
      description: "Document attendance and completion after discussing the weekly Toolbox Talk.",
      url: "https://forms.cloud.microsoft/r/Q3wMn0mKvE",
      buttonText: "Open Documentation Form",
      icon: "D",
      theme: "green",
      active: true
    },
    {
      title: "Training & Orientation",
      description: "Employee training, new-hire orientation, and required safety materials.",
      url: "#",
      buttonText: "Coming Soon",
      icon: "T",
      theme: "blue",
      active: true,
      disabled: true
    }
  ],

  contacts: [
    {
      name: "Richard Payne",
      role: "Safety Officer",
      phone: "801-787-2646",
      email: "richard@ridgerockinc.com"
    },
    {
      name: "Matrix Ercanbrack",
      role: "Safety Coordinator",
      phone: "801-822-4922",
      email: "matrix@ridgerockinc.com"
    }
  ],

  toolboxTalks: [
    {
      number: 1,
      title: "Backing Safety",
      category: "Vehicle Safety",
      description: "Safe backing procedures, spotters, blind spots, and visibility.",
      fileName: "Toolbox Talk 001 - Backing Safety.pdf",
      keywords: "backing spotter blind spots vehicles visibility",
      active: true
    },
    {
      number: 2,
      title: "Slips Trips and Falls",
      category: "Fall Prevention",
      description: "Housekeeping, walking surfaces, and preventing falls.",
      fileName: "Toolbox Talk 002 - Slips Trips and Falls.pdf",
      keywords: "slips trips falls housekeeping walking surfaces",
      active: true
    },
    {
      number: 3,
      title: "Working Around Heavy Equipment",
      category: "Heavy Equipment",
      description: "Blind spots, communication, and maintaining a safe distance.",
      fileName: "Toolbox Talk 003 - Working Around Heavy Equipment.pdf",
      keywords: "heavy equipment operators blind spots communication",
      active: true
    },
    {
      number: 4,
      title: "Seat Belt Use",
      category: "Vehicle Safety",
      description: "Seat-belt requirements in company vehicles and equipment.",
      fileName: "Toolbox Talk 004 - Seat Belt Use.pdf",
      keywords: "seat belt vehicles equipment restraint",
      active: true
    },
    {
      number: 5,
      title: "Staying Hydrated",
      category: "Heat Safety",
      description: "Preventing dehydration and heat-related illness.",
      fileName: "Toolbox Talk 005 - Staying Hydrated.pdf",
      keywords: "hydration water heat illness dehydration",
      active: true
    },
    {
      number: 6,
      title: "Trench & Excavation Safety",
      category: "Excavation",
      description: "Protective systems, safe access, and excavation hazards.",
      fileName: "Toolbox Talk 006 - Trench & Excavation Safety.pdf",
      keywords: "trench excavation cave in protective systems access",
      active: true
    },
    {
      number: 7,
      title: "Wildlife Awareness",
      category: "Environmental Safety",
      description: "Recognizing wildlife hazards and responding safely.",
      fileName: "Toolbox Talk 007 - Wildlife Awareness.pdf",
      keywords: "wildlife animals snakes hazards outdoors",
      active: true
    },
    {
      number: 8,
      title: "Hand & Finger Injury Prevention",
      category: "Injury Prevention",
      description: "Preventing pinch, crush, cut, and caught-between injuries.",
      fileName: "Toolbox Talk 008 - Hand & Finger Injury Prevention.pdf",
      keywords: "hands fingers pinch crush cuts caught between",
      active: true
    },
    {
      number: 9,
      title: "Tool and Equipment Pre-use Inspection",
      category: "Tools & Equipment",
      description: "Inspecting tools and equipment before beginning work.",
      fileName: "Toolbox Talk 009 - Tool and Equipment Pre-use Inspection.pdf",
      keywords: "tools equipment inspection defects damaged pre-use",
      active: true
    },
    {
      number: 10,
      title: "Cell Phone Use",
      category: "Distraction Awareness",
      description: "Preventing cell phone distractions while working, driving, or operating equipment.",
      fileName: "2026-08-03 Toolbox Talk 010 - Cell Phone Use.pdf",
      keywords: "cell phone phones distraction texting driving equipment focus",
      active: true
    }
  ]
};
