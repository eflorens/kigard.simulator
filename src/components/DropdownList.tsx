import React, { useState, MouseEvent, ReactNode } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

interface DropdownListProps<T> {
  name?: string;
  source: T[];
  title: keyof T;
  renderToggle?: (item?: T) => ReactNode;
  render?: (item?: T) => ReactNode;
  keyValue?: keyof T;
  value?: T;
  description?: string;
  hasEmpty?: boolean;
  size?: string;
  onChange?: (item?: T, e?: React.ChangeEvent<any>) => void;
}

export function DropdownList<T>({ name, source, title, render, renderToggle, keyValue, value, description, hasEmpty, size, onChange }: DropdownListProps<T>) {
  const [isOpen, setOpen] = useState(false);

  const handleChange: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, item?: T) => void = (e, item) => {
    if (onChange) {
      onChange(item, { ...e, target: { ...e.target, name, ddlValue: !keyValue ? item : item && item[keyValue] } });
    }
  }

  const renderItem = render || ((item?: T) => item && item[title] as string);
  const renderToggleItem = renderToggle || renderItem;
  return (
    <Dropdown size={size} className="dropdownlist" direction="down" isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle caret>{value ? renderToggleItem(value) : description}</DropdownToggle>
      <DropdownMenu className="dropdownlist-content">
        {value && (
          <>
            <DropdownItem active>{renderItem(value)}</DropdownItem>
            <DropdownItem divider />
          </>
        )}
        {hasEmpty && (
            <DropdownItem active={!value} onClick={e => handleChange(e)}>Aucun</DropdownItem>
        )}
        {source.map((item, index) => {
          const isActive = value && value === item;
          if (isActive) {
            return null;
          }
          
          return (
            <DropdownItem key={index + 1} active={isActive} onClick={e => handleChange(e, item)}>
              {renderItem(item)}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}