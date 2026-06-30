import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import News from './components/News'
import Resources from './components/Resources'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'

function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <About />
      <Events />
      <News />
      <Resources />
      <CTASection />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/SUEDI">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
