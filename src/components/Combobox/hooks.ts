import { useContext } from 'react'
import { ComboboxContext } from './context'

export function useComboboxContext() {
  return useContext(ComboboxContext)
}