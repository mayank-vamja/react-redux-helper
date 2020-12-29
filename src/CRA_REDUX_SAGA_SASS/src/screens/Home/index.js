import { useDispatch, useSelector } from "react-redux"
import { ActionTypes } from "../../store/actions"
import styles from "./index.module.scss"

const Home = () => {
  const dispatch = useDispatch()
  const { quote, loading } = useSelector((state) => state.quote)
  const handleRandomQuote = () =>
    dispatch({ type: ActionTypes.GET_RANDOM_QUOTE })

  return (
    <div className={styles.home}>
      <h2 className={styles.heading}>Home</h2>
      <div className={styles.quote}>
        <p>{quote?.content ?? (loading ? "Loading..." : "- - -")}</p>
        <button onClick={handleRandomQuote}>Get Random Quote</button>
      </div>
    </div>
  )
}

export default Home
