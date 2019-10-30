import { API_URL } from '/consts'
import url from '/util/url'

const Admin = () => null
const Resource = () => null
const Create = () => null
const Read = () => null
const Update = () => null
const Delete = () => null

const getUser = async (token) => {
  const res = await fetch(url('api.me'), {
    headers: { Authorization: `Token ${token}` }
  })
  return res.json()
}

const isStaff = async ({ token, userId }) => {
  const user = await getUser(token)
  return user.isStaff
}

const isAdmin = async ({ token, userId }) => {
  const user = await getUser(token)
  return user.isSuperuser
}

export default function AdminApp () {
  return (
    <Admin api={API_URL} auth={isStaff}>
      <Resource name='User' path='users'>
        <Create />
        <Read fields={['id', 'email', 'createdAt']} />
        <Update />
        <Delete auth={isAdmin} />
      </Resource>
    </Admin>
  )
}
