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

const URL = 'https://f2e35394-7411-45e2-b5c3-ed23ec39b671.mock.pstmn.io'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [filteredList, setFilteredList] = useState<string[]>([])

  useEffect(() => {
    function fetchData() {
      fetch(URL).then(v => v.json()).then(a => console.log(a))
    }

    fetchData()
  }, [])

  useEffect(() => {
    function handleFilterList() {
      if (inputValue === '') {
        setFilteredList([])
        return
      }

      const regex = new RegExp(inputValue.trim(), 'gi')
      const newList = list.filter((item) => {
        return regex.test(item) && !(item === inputValue)
      })

      setFilteredList(newList)
    }

    handleFilterList()
  }, [inputValue])

  return (
    <>
      <h1>Input field with auto complete</h1>
      <br />

      {/* Root component */}
      <Combobox.Root
        listLength={filteredList.length}
        className='rootContainer'
      >
        {/* Left icon */}
        <div className='iconSlot'><MagnifyingGlassIcon size='20' /></div>

        {/* Input field */}
        <Combobox.Input
          className="inputField"
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          placeholder="Search..."
        />

        {/* Clear button */}
        {inputValue && (
          <div className='clearButtonSlot'>
            <button
              className='clearFieldButton'
              onClick={() => setInputValue('')}
            >
              <span className='srOnly'>Clear field</span>
              <CrossCircled size='20' />
            </button>
          </div>
        )}

        {/* Dropdown menu */}
        <Combobox.DropdownMenu className='menuContainer'>
          {filteredList.map((item, idx) => {
            return (
              <Combobox.MenuItem
                key={idx}
                className="menuItem"
                index={idx}
                onClick={() => setInputValue(item)}
              >
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
