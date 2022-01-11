import classNames from "classnames"
import Icon from "components/Icon"
import LoadingButton from "components/LoadingButton"
import { useFormik } from "formik"
import useQuery from "hooks/useQuery"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { authActions } from "redux/reducers/authReducer"



const AuthPage = () => {

  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate(v) {
      const errors = {}
      
      if (!v.username.trim()) {
        errors.username = 'Empty password'
      }

      if (!v.password.trim()) {
        errors.password = 'Empty username'
      }

      return errors
    },
    async onSubmit({ username, password }) {
      try {
        if (getSelectedTab() === 'register') {

          const { data } = await dispatch(authActions.register({ username, password })).unwrap()

          localStorage.setItem('auth-token', data.token)
        } else if (getSelectedTab() === 'login') {
          const { data } = await dispatch(authActions.login({ username, password })).unwrap()

          localStorage.setItem('auth-token', data.token)
        }
      } catch (e) {

      } finally {
        form.resetForm()
      }
    }
  })

  const dispatch = useDispatch()

  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    if (!getSelectedTab()) {
      history.push('/auth?tab=register')
    }
  }, [])

  const getSelectedTab = () => {
    return query.get('tab')
  }

  return (
    <div className="auth-page" role="auth-page">
      <form className="auth-page__form" onSubmit={form.handleSubmit}>


        <h1 className="auth-page__title" role="auth-page-title">
          {getSelectedTab() === 'login' && 'Login'}
          {getSelectedTab() === 'register' && 'Register'}
        </h1>


        <div className="auth-page__input-group">
          <div className="auth-page__icon-wrapper">
            <Icon
              className="auth-page__icon"
              children="person"
            />
          </div>
          <input
            type="text"
            className={classNames('auth-page__input', { 'auth-page__input--error': form.touched.username && form.errors.username })}
            placeholder="Username"
            {...form.getFieldProps('username')}
            role="auth-page-username-input"
          />
        </div>


        <div className="auth-page__input-group">
          <div className="auth-page__icon-wrapper">
            <Icon
              className="auth-page__icon"
              children="lock"
            />
          </div>
          <input
            type="password"
            className={classNames('auth-page__input', { 'auth-page__input--error': form.touched.password && form.errors.password })}
            placeholder="Password"
            {...form.getFieldProps('password')}
            role="auth-page-password-input"
          />
        </div>


        <LoadingButton type="submit" isLoading={form.isSubmitting} className="auth-page__submit-btn">
          Submit
        </LoadingButton>

        <div className="auth-page__footer">

          {getSelectedTab() === 'login' && (
            <Link to="/auth?tab=register" role="auth-page-switch-to-register">
              Don't have an account? Register
            </Link>
          )}

          {getSelectedTab() === 'register' && (
            <Link to="/auth?tab=login" role="auth-page-switch-to-login">
              Already have an account? Login
            </Link>
          )}

        </div>


      </form>
    </div>
  )
}

export default AuthPage
