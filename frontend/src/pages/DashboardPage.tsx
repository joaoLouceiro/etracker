import { useAuth0 } from '@auth0/auth0-react'

export function DashboardPage() {
  const { user, logout } = useAuth0()

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin + '/login' } })}>
        Log out
      </button>
    </main>
  )
}
