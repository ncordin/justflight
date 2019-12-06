export const PAGE_TYPES = {
  WELCOME: 'welcome',
  BOARD: 'board',
  TUNNING: 'tunning',
  SETUP: 'setup',
  CLI: 'cli'
};

export const PAGE_DETAILS = {
  [PAGE_TYPES.WELCOME]: {
    name: PAGE_TYPES.WELCOME,
    icon: 'home',
    navigation: false,
    requireBoard: false
  },
  [PAGE_TYPES.BOARD]: {
    name: PAGE_TYPES.BOARD,
    icon: 'qrcode',
    navigation: true,
    requireBoard: true
  },
  [PAGE_TYPES.TUNNING]: {
    name: PAGE_TYPES.TUNNING,
    icon: 'rocket',
    navigation: true,
    requireBoard: true
  },
  [PAGE_TYPES.SETUP]: {
    name: PAGE_TYPES.SETUP,
    icon: 'setting',
    navigation: true,
    requireBoard: true
  },
  [PAGE_TYPES.CLI]: {
    name: PAGE_TYPES.CLI,
    icon: 'code',
    navigation: true,
    requireBoard: true
  }
};
