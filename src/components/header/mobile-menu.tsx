'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

import cn from '@/utils/cn'
import { navigation, user } from '@/constants/header'
import Notification from '@/components/header/notification'

const MobileMenu = () => {
  const pathname = usePathname()

  return (
    <Disclosure as="nav" className="flex items-center bg-white sm:hidden ">
      {({ open }) => (
        <>
          {/* Mobile menu button */}
          <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
          </Disclosure.Button>

          <Disclosure.Panel className="absolute left-0 top-14 z-10 w-full bg-white shadow-lg sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map(item => (
                <Disclosure.Button
                  as={Link}
                  href={item.path}
                  key={item.name}
                  className={cn('block border-l-4 py-2 pl-3 pr-4  text-base font-medium', {
                    '  border-indigo-500 bg-indigo-50  text-indigo-700': pathname === item.path,
                    '  border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800': pathname !== item.path,
                  })}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">AK</div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                </div>
                <Notification />
              </div>
              <div className="mt-3 space-y-1">
                {user.map(item => (
                  <Disclosure.Button
                    as={Link}
                    href={item.path}
                    key={item.name}
                    className={cn('block border-l-4 px-4 py-2 text-base font-medium', {
                      'border-indigo-500 bg-indigo-50 text-indigo-700': pathname === item.path,
                      'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800': pathname !== item.path,
                    })}>
                    {item.name}
                  </Disclosure.Button>
                ))}

                <Disclosure.Button className="block w-full px-5 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                  Sign Out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default MobileMenu