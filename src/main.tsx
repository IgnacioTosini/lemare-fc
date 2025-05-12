import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LemareApp } from './LemareApp.tsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify';
import { PlayerProvider } from './context/playerStore';
import { ThemeProvider } from './context/themeContext';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <PlayerProvider>
          <ToastContainer />
          <LemareApp />
        </PlayerProvider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
)
