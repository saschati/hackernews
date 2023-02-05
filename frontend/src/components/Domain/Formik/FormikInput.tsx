import Input, { InputProps } from 'components/UI/Form/Input'
import { useField } from 'formik'
import React, { memo } from 'react'

export type FormikInputProps = InputProps & {
  name: string
}

const FormikInput: React.FC<FormikInputProps> = ({ name, ...props }): JSX.Element => {
  const [field, meta] = useField(name)

  const errorMessage = (meta.touched && meta.error) || undefined

  return <Input errorMessage={errorMessage} {...field} {...props} />
}

export default memo(FormikInput)
