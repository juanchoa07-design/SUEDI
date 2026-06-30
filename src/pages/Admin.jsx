import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminPanel from '../components/admin/AdminPanel'

export default function Admin() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u ?? null))
  }, [])

  if (user === undefined) return <div className="admin-loading">Cargando...</div>
  if (!user) return <AdminLogin />
  return <AdminPanel user={user} />
}
