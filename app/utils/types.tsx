interface NavChild {
  href: string;
  label: string;
  current?: boolean;
}

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  current?: boolean; // ✅ add this
  childs: NavChild[];
}

export const DEFAULT_ICON = `<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m4 8h6m-6-4h6m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
</svg>`;
export const USER_ACTIVITIES: NavItem[] = [
  {
    href: '#', label: 'Article',
    childs: [
      {href: '/users/articles/new', label: 'Add New Article'},
      {href: '/users/articles', label: 'Article List'}
    ]
  },
]
export const ADMIN_ACTIVITIES: NavItem[] = [
  {
    href: '#', label: 'Articles',
    childs: [
      {href: '/admin/articles/new', label: 'Add New Article'},
      {href: '/admin/articles', label: 'Article List'}
    ]
  },
  {
    href: '/admin/authors', label: 'Authors',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>`,
    childs: []
  },
  {
    href: '/admin/tags', label: 'Tags',
    icon: `<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
    </svg>`,
    childs: []
  }
]
