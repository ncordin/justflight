export enum PageTypes {
  Welcome = 'welcome',
  Board = 'board',
  Tunning = 'tunning',
  Setup = 'setup',
  Cli = 'cli',
}

export interface PageDetail {
  type: PageTypes;
  label: string;
  icon: string;
  navigation: boolean;
  requireBoard: boolean;
}

export const PAGE_DETAILS: PageDetail[] = [
  {
    type: PageTypes.Welcome,
    label: 'Welcome',
    icon: 'home',
    navigation: false,
    requireBoard: false,
  },
  {
    type: PageTypes.Board,
    label: 'Board',
    icon: 'qrcode',
    navigation: true,
    requireBoard: true,
  },
  {
    type: PageTypes.Tunning,
    label: 'Tunning',
    icon: 'rocket',
    navigation: true,
    requireBoard: true,
  },
  {
    type: PageTypes.Setup,
    label: 'Setup',
    icon: 'setting',
    navigation: true,
    requireBoard: true,
  },
  {
    type: PageTypes.Cli,
    label: 'CLI',
    icon: 'code',
    navigation: true,
    requireBoard: true,
  },
];

export const getPageDetail = (type: PageTypes): PageDetail => {
  const detail = PAGE_DETAILS.find(detail => detail.type === type);

  if (!detail) {
    throw new Error(`Can't find PageDetail ${type}`);
  }

  return detail;
};
