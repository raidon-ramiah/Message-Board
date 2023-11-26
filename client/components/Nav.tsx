import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const auth = useAuth0()

  // const user = {
  //   nickname: 'john.doe',
  // }

  const handleSignOut = () => {
    // console.log('sign out')
    auth.logout()
  }

  const handleSignIn = () => {
    // console.log('sign in')
    auth.loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {auth.user && <p>Signed in as: {auth.user.name}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Message Board</h1>
    </>
  )
}

export default Nav
