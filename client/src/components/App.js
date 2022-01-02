import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Alert from "./Alert"
import { authActions, selectCurrentUser } from 'redux/reducers/authReducer'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import AuthPage from './AuthPage'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const App = () => {

  const dispatch = useDispatch()

  const history = useHistory()

  const currentUser = useSelector((state) => selectCurrentUser(state))

  useEffect(() => {
    tryLoginWithToken()
  }, [])

  useEffect(() => {
    if (currentUser) {
      history.push('/home')
    } else {
      history.push('/auth?tab=login')
    }
  }, [currentUser])

  const tryLoginWithToken = async () => {
    const token = localStorage.getItem('auth-token')

    if (token) {
      await dispatch(authActions.loginWithToken(token))
    }
  }

  return <>
    <div>
      <Switch>

        <Route path="/home" exact component={HomePage} />
        <Route path="/auth" exact component={AuthPage} />

      </Switch>
    </div>

    <Alert />
  </>
}

export default App
