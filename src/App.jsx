import React from "react"
import { useEffect, useState } from "react"
import CoinCard from "./components/CoinCard"
import LimitSelector from "./components/LimitSelector"
import FilterInput from "./components/FilterInput"
import SortSelector from "./components/SortSelector"
import Home from "./pages/Home"
import AboutPage from "./pages/about"
import { Route, Routes } from "react-router"
import Header from "./components/Header"
import NotFound from "./pages/not-found"
import CoinDetailsPage from "./pages/coin-detail"

const API_URL = import.meta.env.VITE_COINS_API_URL

const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        )
        if (!res.ok) throw new Error("Failed to fetch data")
        const data = await res.json()
        setCoins(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [limit])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
