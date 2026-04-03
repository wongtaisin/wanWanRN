import React from 'react'
import Svg from 'react-native-svg'

type SvgIconProps = {
  icon: React.ReactNode | (() => React.ReactNode)
}

const SvgIcon = ({ icon }: SvgIconProps) => {
  const renderedIcon = typeof icon === 'function' ? icon() : icon

  return (
    <Svg width="32" height="32" viewBox="0 0 1024 1024">
      {typeof renderedIcon === 'string' ? null : renderedIcon}
    </Svg>
  )
}

export default SvgIcon
