'use client'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

import cn from '@/utils/cn'
import { user } from '@/constants/header'
import Avatar from '@/components/avatar'
import { signOut } from '@/actions/sign-out'

type NavigationMenuProps = {
  name: string
  src?: string
}

const NavigationMenu = ({ name, src }: NavigationMenuProps) => {
  return (
    <div className="hidden gap-x-4 sm:flex sm:items-center">
      <Menu as="div" className="relative flex-shrink-0">
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-darkModeNeutral-600">
          <span className="sr-only">Open user menu</span>
          <Avatar name={name} src={src} />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50">
            {user.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.path}
                    className={cn(
                      active ? 'bg-gray-100 dark:bg-darkModeNeutral-300 dark:text-darkModeNeutral-50' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    )}>
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              <button
                onClick={() => signOut()}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:bg-darkModeNeutral-600 dark:hover:bg-darkModeNeutral-300 dark:hover:text-darkModeNeutral-50">
                Sign Out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default NavigationMenu
