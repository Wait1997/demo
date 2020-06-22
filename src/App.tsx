import React from 'react'
import { Provider } from 'react-redux'
import Spec from './pages/index'
import Store from './store'

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={Store}>
        <Spec />
      </Provider>
    </div>
  )
}

export default App
