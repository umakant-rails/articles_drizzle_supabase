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
    href: '/users/panchangs', label: 'पंचांग', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Zm3-7h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Zm-8 4h0v0h0v0Zm4 0h0v0h0v0Zm4 0h0v0h0v0Z"/>
    </svg>`
  },
  {
    href: '/users/suggestions', label: 'सुझाव', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5M9 3v4c0 .6-.4 1-1 1H4m11.4.8 2.7 2.7m1.2-3.9a2 2 0 0 1 0 3l-6.6 6.6L9 18l.7-3.7 6.7-6.7a2 2 0 0 1 3 0Z"/>
    </svg>`
  },
]
export const ADMIN_ACTIVITIES: NavItem[] = [
  { 
    href: '/admin/dashboard', label: 'Dashboard', childs: [], 
    icon: `<svg aria-hidden="true" className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>`
  },
  { href: '#', label: 'App विषय-सूची', 
    childs : [
      // {href: '/admin/articles', label: 'रचना'},
      // {href: '/admin/authors', label: 'रचनाकार'},
      // {href: '/admin/tags', label: 'टैग्स'},
      {href: '/admin/user_list', label: 'पंजीकृत उपयोगकर्ता'}
    ] 
  },
  // {
  //   href: '/admin/users_list', label: 'पंजीकृत उपयोगकर्ता', childs: [],
  //   icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  //   </svg>`,
  // },
  {
    href: '/admin/article_types', label: 'रचना प्रकार', childs: [],
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"/>
    </svg>`,
  },
  {
    href: '/admin/contexts', label: 'प्रसंग', childs: []
  },
  {
    href: '#', label: 'रसिक वाणी/ग्रन्थ',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
    </svg>`,
    childs: [
      {href: '/admin/scriptures/new', label: 'रसिक वाणी/ग्रन्थ जोड़े'},
      {href: '/admin/scriptures', label: 'रसिक वाणी/ग्रन्थ सूची'},
    ]
  },
  {
    href: '#', label: 'स्त्रोत/आरती',
    childs: [
      {href: '/admin/strota/new', label: 'स्त्रोत/आरती जोड़े'},
      {href: '/admin/strota', label: 'स्त्रोत/आरती सूची'}
    ]
  },
  {href: '/admin/panchangs', label: 'हितोत्सव पत्रिका', childs: []},
  {
    href: '#', label: 'रचना',
    childs: [
      {href: '/admin/articles/new', label: 'नई रचना जोड़े'},
      {href: '/admin/articles', label: 'रचना सूची'}
    ]
  },
  {
    href: '#', label: 'रचनाकार',
    icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>`,
    childs: [
      {href: '/admin/authors/new', label: 'रचनाकार जोड़े'},
      {href: '/admin/authors', label: 'रचनाकार सूची'}
    ]
  },
  {
    href: '/admin/tags', label: 'टैग्स',
    icon: `<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
    </svg>`,
    childs: []
  },
  {
    href: '#', label: 'संत चरित्र/प्रेरक प्रसंग',
    childs: [
      {href: '/admin/stories/new', label: 'संत चरित्र/प्रेरक प्रसंग जोड़े'},
      {href: '/admin/stories', label: 'संत चरित्र/प्रेरक प्रसंग सूची'}
    ]
  },
  // {
  //   href: '/admin/suggestions', label: 'सुझाव', childs: [], icon: `<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5M9 3v4c0 .6-.4 1-1 1H4m11.4.8 2.7 2.7m1.2-3.9a2 2 0 0 1 0 3l-6.6 6.6L9 18l.7-3.7 6.7-6.7a2 2 0 0 1 3 0Z"/>
  //   </svg>`
  // },
]
