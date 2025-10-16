import { BookingProvider } from './context/BookingContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  )
}

export default App




