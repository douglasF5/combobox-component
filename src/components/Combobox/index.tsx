import {
  CSSProperties,
  HTMLProps,
  KeyboardEvent,
  ReactNode,
  useEffect,
} from 'react'
import { ComboboxContextProvider } from './context'
import { useComboboxContext } from './hooks'
import './style.css'

// Root
type TComboboxRoot = {
  children: ReactNode
  listLength: number
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
}

function Root({ children, listLength, className, style }: TComboboxRoot) {
  return (
    <ComboboxContextProvider listLength={listLength}>
      <KeyboardEventsWrapper className={className} style={style}>{children}</KeyboardEventsWrapper>
    </ComboboxContextProvider>
  )
}

// KeyboardEventsWrapper
type TKeyboardEventsWrapper = {
  children: ReactNode
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
}

function KeyboardEventsWrapper({ children, className, style }: TKeyboardEventsWrapper) {
  const { selectNext, selectPrevious } = useComboboxContext()

  function handleArrowKeys(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowUp': {
        selectPrevious()
        break
      }
      case 'ArrowDown': {
        selectNext()
        break
      }
    }
  }

  return (
    <div onKeyDown={handleArrowKeys} tabIndex={-1} className={className} style={style}>
      {children}
    </div>
  )
}

// Input component
type TInput = {
  value?: string
  onChange?: (value: string) => void
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
}

function Input({
  value,
  onChange,
  className,
  style,
  readOnly,
  disabled,
  placeholder,
}: TInput) {
  /** Prevent ArrowUp and ArrowDown from moving the cursor */
  function handleKeyboardEvents(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        event.preventDefault()
        break
      }
    }
  }

  return (
    <input
      type="search"
      onKeyDown={handleKeyboardEvents}
      placeholder={placeholder}
      className={className}
      readOnly={readOnly}
      disabled={disabled}
      style={style}
      value={value ?? undefined}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  )
}

// Dropdown menu component
type TDropdownMenu = {
  children: ReactNode
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
}

function DropdownMenu({ children, className, style }: TDropdownMenu) {
  const {
    shouldDisplayMenu,
    listLength,
    selectedIndex,
    handleSetSelectedIndex
  } = useComboboxContext()

  useEffect(() => {
    if (selectedIndex > listLength - 1) {
      handleSetSelectedIndex(listLength - 1)
    }

    handleSetSelectedIndex(0)
  }, [listLength])

  if (!shouldDisplayMenu) return null

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

// Menu item component
type TMenuItem = {
  children: ReactNode
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
  index: number
  onClick?: () => void
}

function MenuItem({ children, index, className, style, onClick }: TMenuItem) {
  const { selectedIndex, handleSelection } = useComboboxContext()

  return (
    <div
      onMouseEnter={() => handleSelection(index)}
      className={className}
      style={style}
      onClick={() => onClick?.()}
      data-selected={index === selectedIndex}
    >
      {children}
    </div>
  )
}

export { DropdownMenu, Input, MenuItem, Root }

