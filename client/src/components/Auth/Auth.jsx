import Login from "./Login"
import ResetPassword from "./ResetPassword"
import Signup from "./Signup"

const Auth = props => {
  const { setUsersInfo } = props

  return (
    <div>
      hello from auth!
      <Signup setUsersInfo={setUsersInfo}/>
      <Login setUsersInfo={setUsersInfo}/>
      <ResetPassword setUsersInfo={setUsersInfo}/>
    </div>
  )
}

export default Auth