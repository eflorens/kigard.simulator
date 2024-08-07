import React, { useState, MouseEvent, ReactNode, useEffect, useCallback } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Input } from './Input';

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
  search?: boolean;
  size?: string;
  onChange?: (item?: T, e?: React.ChangeEvent<any>) => void;
}

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

export function DropdownList<T>({ name, source, title, render, renderToggle, keyValue, value, description, hasEmpty, search, size, onChange }: DropdownListProps<T>) {
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSource, setFilteredSource] = useState(source);
  
  const normalize = useCallback((input?: string) => input?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    , []);
  const matchItem = useCallback((item: T, searchText: string) => normalize(item && item[title] as string)?.includes(normalize(searchText) || "")
  , [title, normalize]);
  
  const debouncedSearchTerm = useDebouncedValue(searchValue, 200);
  useEffect(() => {
    setFilteredSource(source.filter(item => matchItem(item, debouncedSearchTerm)));
  }, [debouncedSearchTerm, matchItem, source]);

  const handleChange: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, item?: T) => void = (e, item) => {
    if (onChange) {
      onChange(item, { ...e, target: { ...e.target, name, ddlValue: !keyValue ? item : item && item[keyValue] } });
    }
  }


  const renderItem = render || ((item?: T) => item && item[title] as string);
  const renderToggleItem = renderToggle || renderItem;
  return (
    <Dropdown size={size} direction="down" isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <DropdownToggle caret>{value ? renderToggleItem(value) : description}</DropdownToggle>
      <DropdownMenu>
        {search && (
          <Input name="searchText" autoFocus type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Rechercher" />
        )}
        {value && (
          <>
            <DropdownItem active>{renderItem(value)}</DropdownItem>
            <DropdownItem divider />
          </>
        )}
        {hasEmpty && (
            <DropdownItem active={!value} onClick={e => handleChange(e)}>Aucun</DropdownItem>
        )}
        {filteredSource.filter(item =>(!value || value !== item)).map((item, index) => {
          return (
            <DropdownItem key={index + 1} onClick={e => handleChange(e, item)}>
              {renderItem(item)}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}