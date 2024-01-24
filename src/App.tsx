import { useEffect, useState } from 'react'
import * as Combobox from './components/Combobox'
import './components/Combobox/style.css'
import { CrossCircled, MagnifyingGlassIcon } from './components/Icons'
import { TextMatchHighlight } from './components/TextMatchHighlight'
import './style.css'

const list = [
  'Narnia is in the name',
  'Has Narnia showed up',
  'At the end, Narnia',
  'Golden compass',
  "Ocean's eleven",
]

function App() {
  const [inputValue, setInputValue] = useState('')
  const [filteredList, setFilteredList] = useState<string[]>([])

  function handleFilterList() {
    if (inputValue === '') {
      setFilteredList([])
      return
    }

    const regex = new RegExp(inputValue.trim(), 'gi')
    const newList = list.filter((item) => regex.test(item))

    setFilteredList(newList)
  }

  function handleInputOnChange(newValue: string) {
    setInputValue(newValue)
  }

  useEffect(() => {
    handleFilterList()
  }, [inputValue])

  return (
    <>
      <h1>Input field with auto complete</h1>
      <br />

      <Combobox.Root listLength={filteredList.length} className='rootContainer'>
        <div className='iconSlot'><MagnifyingGlassIcon size='20' /></div>

        <Combobox.Input
          className="inputField"
          value={inputValue}
          onChange={(value) => handleInputOnChange(value)}
          placeholder="Search..."
        />

        {inputValue && (
          <div className='clearButtonSlot'>
            <button
              className='clearFieldButton'
              onClick={() => handleInputOnChange('')}
            >
              <span className='srOnly'>Clear field</span>
              <CrossCircled size='20' />
            </button>
          </div>
        )}

        <Combobox.DropdownMenu className='menuContainer'>
          {filteredList.map((item, idx) => {
            return (
              <Combobox.MenuItem key={idx} className="menuItem" index={idx}>
                <p>
                  <TextMatchHighlight
                    highlightText={inputValue}
                    style={{ fontWeight: 'bold' }}
                  >
                    {item}
                  </TextMatchHighlight>
                </p>
              </Combobox.MenuItem>
            )
          })}
        </Combobox.DropdownMenu>
      </Combobox.Root>
    </>
  )
}

export default App
