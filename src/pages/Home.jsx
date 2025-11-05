import React from "react"
import CoinCard from "../components/CoinCard"
import FilterInput from "../components/FilterInput"
import LimitSelector from "../components/LimitSelector"
import SortSelector from "../components/SortSelector"
import Spinner from "../components/Spinner"

const Home = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filterCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coins.filter((coin) =>
          coin.symbol.toLowerCase().includes(filter.toLowerCase())
        )
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap
        case "price_desc":
          return b.current_price - a.current_price
        case "price_asc":
          return a.current_price - b.current_price
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h
        default:
          return 0
      }
    })
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} setLimit={setLimit} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {loading && <Spinner color="white" />}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <main className="grid">
          {filterCoins.length > 0 ? (
            filterCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </main>
      )}
    </div>
  )
}

export default Home
