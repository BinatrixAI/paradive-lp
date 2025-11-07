import { Label } from 'flowbite-react'
import { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  children: ReactNode
  error?: string
}

export default function FormField({ id, label, children, error }: FormFieldProps) {
  return (
    <div className="mb-5">
      <div className="mb-2 block">
        <Label htmlFor={id} className="font-medium">{label}</Label>
      </div>
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  )
}
