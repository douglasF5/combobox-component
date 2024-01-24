import { ReactNode, createContext, useState } from 'react'

type TComboboxContext = {
  selectedIndex: number
  shouldDisplayMenu: boolean
  listLength: number
  handleSetSelectedIndex: (value: number) => void
  handleSelection: (newSelectedIndex: number) => void
  selectNext: () => void
  selectPrevious: () => void
}

export const ComboboxContext = createContext({} as TComboboxContext)

type TComboboxContextProvider = {
  children: ReactNode
  listLength: number
}

export function ComboboxContextProvider({ children, listLength }: TComboboxContextProvider) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const shouldDisplayMenu = listLength > 0

  function handleSetSelectedIndex(newIndex: number) {
    setSelectedIndex(newIndex)
  }

  function handleSelection(newSelectedIndex: number) {
    setSelectedIndex(newSelectedIndex)
  }

  function selectNext() {
    if (selectedIndex === listLength - 1) {
      setSelectedIndex(0)
      return
    }

    setSelectedIndex((currentSelectedIndex) => currentSelectedIndex + 1)
  }

  function selectPrevious() {
    if (selectedIndex === 0) {
      setSelectedIndex(listLength - 1)
      return
    }

    setSelectedIndex((currentSelectedIndex) => currentSelectedIndex - 1)
  }

  return (
    <ComboboxContext.Provider
      value={{
        selectedIndex,
        shouldDisplayMenu,
        listLength,
        handleSetSelectedIndex,
        handleSelection,
        selectNext,
        selectPrevious,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  )
}