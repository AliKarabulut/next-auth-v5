import Link from 'next/link'

import cn from '@/utils/cn'

type ButtonProps = {
  href?: string
  label: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

const Button = ({ href, label, type = 'submit', onClick, className, children, disabled, variant = 'primary', ...props }: ButtonProps) => {
  const buttonClass = cn(
    'flex w-full justify-center transition-all gap-3 rounded-md dark:text-darkModeNeutral-50 px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    {
      'opacity-50': disabled,
      'bg-indigo-600 dark:bg-darkModeNeutral-600 dark:focus-visible:outline-darkModeNeutral-600 dark:hover:bg-darkModeNeutral-500 shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600':
        variant === 'primary',
      'text-indigo-600 hover:text-indigo-500': variant === 'ghost',
    },
    className,
  )

  return href ? (
    <Link href={href} className={buttonClass} {...props}>
      {children}
      {label}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={buttonClass} disabled={disabled} {...props}>
      {children}
      {label}
    </button>
  )
}

export default Button
