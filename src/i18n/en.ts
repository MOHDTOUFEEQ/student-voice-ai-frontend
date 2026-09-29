export const en = {
  lang: { code: 'en', label: 'EN' },
  brand: {
    title: 'Student Voice',
    subtitle: 'MSc Student Feedback',
    rep: 'Toufeeq Mohammed',
    role: 'MSc Representative',
  },
  nav: {
    home: 'Home',
    weeklyIssues: 'Weekly Issues',
    meetingUpdates: 'Meeting Updates',
    privacy: 'Privacy',
    admin: 'Admin',
  },
  home: {
    badge: 'MSc Student Feedback',
    headline: 'Your voice. Your feedback. Anonymous.',
    subhead:
      'Share your experience, raise concerns, and suggest improvements without providing your name or personal details.',
    cardIssuesTitle: 'Most Frequent Issues',
    cardIssuesSub: 'See what students are raising most often this week.',
    cardIssuesBtn: "View This Week's Issues",
    cardMeetingsTitle: 'Weekly Meeting Updates',
    cardMeetingsSub: 'See what was discussed and what actions are being taken.',
    cardMeetingsBtn: 'View Meeting Updates',
  },
  feedback: {
    title: 'Give Anonymous Feedback',
    description: 'Your feedback helps improve the MSc student experience.',
    messageLabel: 'What is your feedback?',
    categoryLabel: 'What is your feedback about?',
    importanceLabel: 'How important is this?',
    submit: 'Submit Anonymously',
    dice: 'Suggest example feedback (AI)',
  },
  suggest: {
    title: 'Submit an Anonymous Suggestion',
    description: 'Share ideas to improve the programme.',
    submit: 'Submit Suggestion Anonymously',
  },
  confirmation: {
    title: 'Thank you for your feedback.',
    body: 'Your feedback has been submitted anonymously and will contribute to the student feedback process.',
    backHome: 'Return home',
  },
  weeklyIssues: {
    title: 'Week {week}',
    subtitle: 'Aggregated themes only — individual submissions are never shown.',
    sectionTitle: 'Most Frequent Issues',
  },
  weeklyUpdates: {
    title: 'Week {week} Meeting Updates',
    empty: 'No published meeting updates for this week yet.',
    discussed: 'Discussed',
    action: 'Action',
    status: 'Status',
  },
  privacy: {
    title: 'Privacy Notice',
    introStrong: 'Anonymous by design.',
    intro:
      'We do not ask for your name, email, or student ID. We do not create student accounts for submitting feedback.',
    collectTitle: 'What we collect',
    collectBody:
      'Your feedback text, chosen category, importance level, submission time, and academic week. AI-derived themes, sentiment, and priority labels.',
    notCollectTitle: 'What we do not collect',
    notCollectBody:
      'Student name, email, student ID, phone number, or account information. We do not intentionally store IP addresses or device fingerprints in the database.',
    useTitle: 'How feedback is used',
    useBody:
      'Aggregated insights are shared with the MSc representative to improve the programme. Public pages show themes only — never individual submissions.',
    aiTitle: 'How AI is used',
    aiBody:
      'AI helps classify topics, detect themes, summarize groups of feedback, and highlight priorities. AI is not used to identify who wrote feedback. Recommendations are labelled as AI-generated.',
    retentionTitle: 'Retention',
    retentionBody:
      'Raw feedback is retained according to admin-configured retention settings. Aggregated analytics may be kept longer.',
    adminTitle: 'Admin access',
    adminBody:
      'Only authenticated administrators can view individual submissions for moderation and representative duties.',
    sensitiveTitle: 'Sensitive concerns',
    sensitiveBody:
      'This channel is not an emergency service. For safeguarding, welfare crises, or serious allegations, please use official university safeguarding and support routes in addition to any anonymous feedback.',
  },
  footer: {
    credit: 'Designed by Toufeeq Mohammed',
  },
  categories: [
    { value: 'Teaching & Learning', label: 'Teaching & Learning' },
    { value: 'Coursework & Assignments', label: 'Coursework & Assignments' },
    { value: 'Assessment & Exams', label: 'Assessment & Exams' },
    { value: 'Timetable', label: 'Timetable' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'Student Experience', label: 'Student Experience' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Class Environment', label: 'Class Environment' },
    { value: 'University Services', label: 'University Services' },
    { value: 'Other', label: 'Other' },
  ],
  common: {
    loading: 'Loading…',
    emptyWeek: 'No feedback has been submitted this week yet.',
    submitError: 'Submission failed',
    diceError: 'Could not generate a suggestion right now.',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  },
} satisfies import('./types').LocaleDictionary
