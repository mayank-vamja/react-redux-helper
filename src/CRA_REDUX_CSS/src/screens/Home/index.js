import { useDispatch, useSelector } from "react-redux"
import { getRandomQuote } from "../../store/actions/quoteActions"
import "./index.css"

const Home = () => {
  const dispatch = useDispatch()
  const { quote, loading } = useSelector((state) => state.quote)
  const handleRandomQuote = () => getRandomQuote(dispatch)

  return (
    <div className={"home"}>
      <h2 className={"heading"}>Home</h2>
      <div className={"quote"}>
        <p>{quote?.content ?? (loading ? "Loading..." : "- - -")}</p>
        <button onClick={handleRandomQuote}>Get Random Quote</button>
      </div>
    </div>
  )
}

export default Home
