'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import { NewPasswordScheme } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import { newPassword } from '@/actions/new-password'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import FormContainer from '@/components/form-container'

const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordScheme>>({
    resolver: zodResolver(NewPasswordScheme),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordScheme>) => {
    startTransition(() => {
      newPassword(values, token).then(data => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <FormContainer title="New Password">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Input
          label="Repeat Password"
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button label="Reset Password" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
        </div>
      </form>
    </FormContainer>
  )
}

export default NewPasswordForm