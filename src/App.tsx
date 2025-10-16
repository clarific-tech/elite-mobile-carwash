import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  // Updated with HashRouter for GitHub Pages compatibility - Version 4 - FINAL FIX
  console.log('App loaded with HashRouter');
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App




