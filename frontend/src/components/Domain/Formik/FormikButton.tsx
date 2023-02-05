import { Button, ButtonProps } from '@vechaiui/react'
import { useFormikContext } from 'formik'
import React, { memo } from 'react'

export type FormikButtonProps = ButtonProps & React.PropsWithChildren

const FormikButton: React.FC<FormikButtonProps> = ({ children, ...rest }): JSX.Element => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button
      color="primary"
      type="submit"
      loading={isSubmitting}
      loadingText="Loading..."
      className="cursor-pointer"
      {...rest}
    >
      {children}
    </Button>
  )
}

export default memo(FormikButton)
