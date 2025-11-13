'use client'

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { toTitleCase } from '@/app/utils/utilityFunctions';
import { signOut } from 'next-auth/react'

interface AdminNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 
        bg-blue-900 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8`}>
        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>

        {/* Separator */}
        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="grid flex-1 grid-cols-1" />
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

            {/* Profile dropdown */}
            <Menu as="div" className="relative" suppressHydrationWarning>
              <MenuButton className="-m-1.5 flex items-center p-1.5" suppressHydrationWarning>
                <span className="sr-only">Open user menu</span>
                <div className="size-8 rounded-full bg-gray-50 overflow-hidden relative">
                  <Image
                    src="/images/tmplogo.png"
                    alt="Special Characters Icon"
                    fill
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                {/* <span className="hidden lg:flex lg:items-center">
                  <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-300">
                    {toTitleCase(session?.user?.username)}
                  </span>
                  <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-300" />
                </span> */}
              </MenuButton>
              <MenuItems
                transition suppressHydrationWarning
                className="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href='#'
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    You Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href='/users/password/change'
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    Change Password
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href='#' onClick={() => signOut({ callbackUrl: '/' })}
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    Sign Out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;