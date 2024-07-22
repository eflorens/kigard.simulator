import React, { useRef } from 'react';
import { UncontrolledTooltip as TooltipStrap, UncontrolledTooltipProps as TooltipStrapProps } from 'reactstrap';

import './Tooltip.scss';

interface TooltipProps extends Omit<TooltipStrapProps, 'target'> {
  description?: string | React.ReactNode;
}

export function Tooltip({ description, children, className, ...props }: TooltipProps) {
  const ref = useRef(null);
  const classNames = ["tooltip-custom", className].filter(c => !!c);
  return (
    <>
      <div className="tooltip-target" ref={ref}>{children}</div>
      <TooltipStrap className={classNames.join(" ")} target={ref} {...props}>{description}</TooltipStrap>
    </>
  )
}