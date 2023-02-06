import { Input as InputUI, InputProps as InputPropsUI } from '@vechaiui/react'
import React, { memo } from 'react'

export type InputProps = InputPropsUI & {
  type: React.HTMLInputTypeAttribute
  LeftElement?: React.FC
  RightElement?: React.FC
  errorMessage?: string
}

const Input: React.FC<InputProps> = ({
  type,
  LeftElement,
  RightElement,
  errorMessage,
  ...rest
}): JSX.Element => {
  return (
    <div className="w-full">
      <InputUI.Group>
        {LeftElement && (
          <InputUI.LeftElement>
            <LeftElement />
          </InputUI.LeftElement>
        )}
        <InputUI type={type} invalid={!!errorMessage || undefined} {...rest} />
        {RightElement && (
          <InputUI.RightElement>
            <RightElement />
          </InputUI.RightElement>
        )}
      </InputUI.Group>
      {errorMessage && <p className="mt-1 text-red-600 text-xs">{errorMessage}</p>}
    </div>
  )
}

export default memo(Input)
