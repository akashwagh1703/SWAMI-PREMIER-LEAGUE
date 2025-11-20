export default {
  hero: {
    title: "SWAMI CORPORATE PREMIER LEAGUE 2026",
    subtitle: "Turf Cricket Tournament – Corporate Teams Only",
    highlight: "COMING SOON IN JANUARY",
    youtubeLive: true
  },

  entryFee: {
    amount: "₹15,000",
    includes: ["Team T-shirts", "Food"]
  },

  matchFormat: [
    "League Matches",
    "Team Size: 10 Players (Playing 8)",
    "6 Overs Per Match",
    "Professional External Umpires",
    "Bowling Speed Limit: 68 kmph",
    "Some rules will be decided by the committee"
  ],

  awards: [
    "Prize Money for Winner & Runner-up",
    "Winner, Runner-up & Second Runner-up Trophies",
    "Best Batsman, Best Bowler, Best Fielder, MVP",
    "Man of the Match Trophy for every match"
  ],

  dates: {
    start: "January 2026",
    registrationDeadline: "25 December 2025"
  },

  venue: "Will be decided",

  contact: ["9970520198", "9175525354"],

  registrationForm: {
    companyVerification: {
      enabled: true,
      fields: [
        { label: "Company Name", type: "text", required: true },
        { label: "Company ID", type: "text", required: true },
        { label: "Company Email Domain", type: "text", required: true },
        { label: "HR Email", type: "email", required: false },
        { label: "Company ID Proof Upload", type: "file", required: true }
      ]
    },

    captainDetails: {
      fields: [
        { label: "Captain Name", type: "text", required: true },
        { label: "Corporate Email", type: "email", required: true },
        { label: "Mobile Number", type: "number", required: true },
        { label: "Employee ID", type: "text", required: true },
        { label: "Corporate ID Card", type: "file", required: true }
      ]
    },

    playerList: {
      minPlayers: 8,
      maxPlayers: 10,
      roles: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
      tshirtSizes: ["S", "M", "L", "XL", "XXL"],
      verificationFields: [
        { label: "Employee ID", type: "text", required: true },
        { label: "Corporate Email", type: "email", required: true },
        { label: "Corporate ID Proof", type: "file", required: true },
        { label: "Payslip Upload", type: "file", required: false }
      ]
    }
  }
};
