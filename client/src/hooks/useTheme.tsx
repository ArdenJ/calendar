import {useState, useEffect} from 'react'

// hook sets theme in localStorage. on refresh, 
// initial state reads localStorage first before 
// falling back to 'light'
export const useTheme = ():{ theme: string; updateTheme: () => void} => {
  //@ts-ignore
  const initialState = () => window.localStorage.getItem('theme') || 'light'

  const [theme, setTheme] = useState(initialState)

  useEffect(() => window.localStorage.setItem('theme', theme), [theme])

  const updateTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return { theme, updateTheme }
}