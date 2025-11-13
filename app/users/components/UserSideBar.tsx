'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { USER_ACTIVITIES } from '@/app/utils/types';
import { DEFAULT_ICON } from '@/app/utils/types';
import Image from 'next/image';
import { 
  Dialog, 
  DialogBackdrop, 
  DialogPanel, 
  Disclosure, 
  DisclosureButton, 
  DisclosurePanel, 
  TransitionChild 
} from '@headlessui/react';
import { 
  ChevronRightIcon, 
  Cog6ToothIcon, 
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AdminNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSideBar: React.FC<AdminNavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-800/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <Link href="/" className='flex'>
                  <Image
                    src="/images/hitlalju.png"
                    alt="Shri Hit"
                    className='rounded-full mr-4'
                    width={32} // adjust as needed
                    height={32} // adjust as needed
                    priority
                  />
                  <span className='flex justify-center text-2xl font-bold text-white place-items-center'>
                    श्रीहित
                  </span>
                </Link>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {
                        USER_ACTIVITIES.map( (item) =>{
                          return <li key={item.label} className='border-b border-gray-500'>
                            {item.childs.length === 0 ? (
                              <a
                                href={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold 
                                  ${ item.current
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-400 hover:text-gray-300'
                                  }
                                `}
                              >
                                {<svg className='h-6 w-6' dangerouslySetInnerHTML={{__html: item.icon ? item.icon : DEFAULT_ICON}} />}
                                {item.label}
                              </a>
                            ) : (
                              <Disclosure as="div">
                                <DisclosureButton
                                  className={`
                                    group flex w-full items-center justify-between rounded-md p-2 text-left text-sm/6 font-semibold 
                                    ${item.current 
                                      ? 'bg-gray-700 text-white' 
                                      : 'text-gray-400  hover:text-gray-300'}
                                  `}
                                >
                                  <div className="flex items-center gap-x-3">
                                    <span dangerouslySetInnerHTML={{ __html: item.icon || DEFAULT_ICON }} className="h-6 w-6" />
                                    <span>{item.label}</span>
                                  </div>

                                  <ChevronRightIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500 transition-transform"
                                  />
                                </DisclosureButton>
                                <DisclosurePanel as="ul" className="mt-1 px-2">
                                  {item.childs.map((subItem) => (
                                    <li key={subItem.label} className='bg-gray-700 mb-1'>
                                      <DisclosureButton
                                        as="a"
                                        href={subItem.href}
                                        className={`
                                          block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-400 font-bold b 
                                          ${
                                            subItem.current ? 
                                            'bg-gray-700 text-white' 
                                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                          }
                                        `}
                                      >
                                        {subItem.label}
                                      </DisclosureButton>
                                    </li>
                                  ))}
                                </DisclosurePanel>
                              </Disclosure>
                            )}
                          </li>
                        })
                      }
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 pb-4">
          <div className={`flex h-16 shrink-0 items-center bg-blue-900 border-b border-r 
            border-gray-300 px-4`}>
            <Link href="/" className='flex'>
              <Image
                src="/images/hitlalju.png"
                alt="Shri Hit"
                className='rounded-full mr-4'
                width={32} // adjust as needed
                height={32} // adjust as needed
                priority
              />
              <span className='flex justify-center text-2xl font-bold text-white place-items-center'>
                श्रीहित
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col px-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {
                    USER_ACTIVITIES.map( (item, index) =>{
                      return <li key={index} className='border-b border-gray-500'>
                        {item.childs.length === 0 ? (
                          <Link
                            href={item.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold 
                              ${ 
                                item.current
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-400 hover:text-gray-300'
                              }
                            `}
                          >
                            {<svg className='h-6 w-6' dangerouslySetInnerHTML={{__html: item.icon ? item.icon : DEFAULT_ICON}} />}
                            {item.label}
                          </Link>
                        ) : (
                          <Disclosure as="div">
                            <DisclosureButton
                              className={`
                                group flex w-full items-center justify-between rounded-md p-2 text-left text-sm/6 font-semibold 
                                ${item.current 
                                  ? 'bg-gray-700 text-white' 
                                  : 'text-gray-400 hover:text-gray-300'}
                              `}
                            >
                              <div className="flex items-center gap-x-3">
                                <span dangerouslySetInnerHTML={{ __html: item.icon || DEFAULT_ICON }} className="h-6 w-6" />
                                <span>{item.label}</span>
                              </div>

                              <ChevronRightIcon
                                aria-hidden="true"
                                className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500 transition-transform"
                              />
                            </DisclosureButton>
                            <DisclosurePanel as="ul" className="mt-1 px-1">
                              {item.childs.map((subItem) => (
                                <li key={subItem.label} className='bg-gray-700 mb-1'>
                                  <DisclosureButton
                                    as="a"
                                    href={subItem.href}
                                    className={`
                                      block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-400 font-bold b 
                                      ${
                                        subItem.current ? 
                                        'bg-gray-700 text-white' 
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                      }
                                    `}
                                  >
                                    {subItem.label}
                                  </DisclosureButton>
                                </li>
                              ))}
                            </DisclosurePanel>
                          </Disclosure>
                        )}
                      </li>
                    })
                  }
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;