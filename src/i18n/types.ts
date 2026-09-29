export type CategoryOption = {
  value: string
  label: string
}

export type LocaleDictionary = {
  lang: { code: string; label: string }
  brand: {
    title: string
    subtitle: string
    rep: string
    role: string
  }
  nav: {
    home: string
    weeklyIssues: string
    meetingUpdates: string
    privacy: string
    admin: string
  }
  home: {
    badge: string
    headline: string
    subhead: string
    cardIssuesTitle: string
    cardIssuesSub: string
    cardIssuesBtn: string
    cardMeetingsTitle: string
    cardMeetingsSub: string
    cardMeetingsBtn: string
  }
  feedback: {
    title: string
    description: string
    messageLabel: string
    categoryLabel: string
    importanceLabel: string
    submit: string
    dice: string
  }
  suggest: {
    title: string
    description: string
    submit: string
  }
  confirmation: {
    title: string
    body: string
    backHome: string
  }
  weeklyIssues: {
    title: string
    subtitle: string
    sectionTitle: string
  }
  weeklyUpdates: {
    title: string
    empty: string
    discussed: string
    action: string
    status: string
  }
  privacy: {
    title: string
    introStrong: string
    intro: string
    collectTitle: string
    collectBody: string
    notCollectTitle: string
    notCollectBody: string
    useTitle: string
    useBody: string
    aiTitle: string
    aiBody: string
    retentionTitle: string
    retentionBody: string
    adminTitle: string
    adminBody: string
    sensitiveTitle: string
    sensitiveBody: string
  }
  footer: {
    credit: string
  }
  categories: CategoryOption[]
  common: {
    loading: string
    emptyWeek: string
    submitError: string
    diceError: string
    low: string
    medium: string
    high: string
    critical: string
  }
}
