const INPUT_CLASSNAME =
  'bg-transparent border dark:border-white/10 border-black/10 rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:border-teal-light dark:focus:border-teal-light transition-colors mb-4'

type FormFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  multiline?: boolean
  error?: string
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  multiline = false,
  error = '',
}: FormFieldProps) {
  const inputProps = {
    id,
    required,
    value,
    className: INPUT_CLASSNAME,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  }
  return (
    <>
      <label className="text-sm text-muted-foreground mb-1" htmlFor={id}>
        {label}
        {required && '*'}
      </label>
      {multiline ? <textarea {...inputProps} /> : <input type={type} {...inputProps} />}
      {error && <p className="text-red-500 text-xs -mt-3 mb-3">{error}</p>}
    </>
  )
}
