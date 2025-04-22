import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LemareApp } from './LemareApp.tsx'

import './index.css'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <LemareApp />
    </StrictMode>
  </BrowserRouter>,
)
