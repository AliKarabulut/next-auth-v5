'use client'
import { useState } from 'react'
import { Switch } from '@headlessui/react'

import cn from '@/utils/cn'

type SwitchProps = {
  name?: string
  onChange: (e: boolean) => void
  falseIcon?: React.ReactNode
  trueIcon?: React.ReactNode
  initialValue?: boolean
  disabled?: boolean
}

const SwitchComponent = ({ name, onChange, falseIcon, trueIcon, initialValue, disabled }: SwitchProps) => {
  const [enabled, setEnabled] = useState<boolean>(initialValue ?? false)

  const changeHandler = (e: boolean) => {
    setEnabled(e)
    onChange(e)
  }

  return (
    <div className="flex h-full items-center">
      <Switch
        checked={enabled}
        onChange={(e: boolean) => {
          changeHandler(e)
        }}
        disabled={disabled}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75',
          {
            'bg-indigo-600 dark:bg-teal-700': enabled,
            'bg-teal-700 dark:bg-darkModeNeutral-600': !enabled,
          },
        )}>
        <span className="sr-only">{name}</span>

        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-darkModeNeutral-50`}>
          {falseIcon && trueIcon && enabled ? trueIcon : falseIcon}
        </span>
      </Switch>
    </div>
  )
}
export default SwitchComponent
