import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "redux/reducers/authReducer"

const useAuth = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state))

  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  }, [])
}

export default useAuth
