import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const { reset } = useContext(AppContext)
  const RouteElement = useRouteElement()
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', () => {
      reset
    })
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return <div>{RouteElement}</div>
}

export default App
