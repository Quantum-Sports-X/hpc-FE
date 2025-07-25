import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider} from 'antd'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import {BrowserRouter} from 'react-router-dom'
import Feature from './feature-module/Feature'
import 'aos/dist/aos.css'
import {Provider} from 'react-redux'
import store from './core/data/redux/store'
import '../src/style/scss/main.scss'
import '../src/style/css/feather.css'
import './index.scss'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
          <ConfigProvider theme={{hashed: false}}>
            <Feature />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
} else {
  console.error("Element with id 'root' not found.")
}
