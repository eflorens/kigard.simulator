import React, { useState, MouseEvent, ReactNode } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

interface DropdownListProps<T> {
  name?: string;
  source: T[];
  title: keyof T;
  render?: (item?: T) => ReactNode;
  keyValue?: keyof T;
  value?: T;
  description?: string;
  hasEmpty?: boolean;
  size?: string;
  onChange?: (item?: T, e?: React.ChangeEvent<any>) => void;
}

export function DropdownList<T>({ name, source, title, render, keyValue, value, description, hasEmpty, size, onChange }: DropdownListProps<T>) {
  const [isOpen, setOpen] = useState(false);

  const handleChange: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, item?: T) => void = (e, item) => {
    if (onChange) {
      onChange(item, { ...e, target: { ...e.target, name, ddlValue: !keyValue ? item : item && item[keyValue] } });
    }
  }

  return (
    <Dropdown size={size} className="dropdownlist" direction="down" isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      {title && !render && <DropdownToggle caret>{value ? value[title] as string : description}</DropdownToggle>}
      {render && <DropdownToggle caret>{value ? render(value) : description}</DropdownToggle>}
      <DropdownMenu className="dropdownlist-content">
        {hasEmpty && (
          <>
            <DropdownItem key={0} active={!value} onClick={e => handleChange(e)}>Aucun</DropdownItem>
            <DropdownItem divider />
          </>
        )}
        {source.map((item, index) => {
          const isActive = value && value === item;
          return (
            <DropdownItem key={index + 1} active={isActive} onClick={e => handleChange(e, item)}>
              {title && !render && item[title] as string}
              {render && render(item)}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}