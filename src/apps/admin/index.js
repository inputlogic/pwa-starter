import { API_URL } from '/consts'
import url from '/util/url'

// This component would render the base layout and navigation.
// It would also hold some defaults that nested Components would
// extend from. Ex. `auth`.
const Admin = () => null

// This registers a navigation item for Admin to render, and
// boilerplate UI for interacting with a resource.
const Resource = () => null

// This tells the parent Resource that we want a form to create
// new instances of the parent Resource.
const Create = () => null

// Tells the parent Resource we want a tabular list of instances.
const Read = () => null

// Tells parent we want a form to edit existing instances.
const Update = () => null

// Tells parent Resource that we want the Delete action available.
const Delete = () => null

// Interface for creating custom Actions to be used in the admin.
const Action = () => null

// Rendering custom components can be done by nesting them in any
// of the above components. Interacting with data could rely on
// global atom/redux state or React Context, etc.
// We could also pass down props by default:
const MyCustomInline = ({ instance, form, preProcess }) => {
  // preProcess could accept a function that's called when the form
  // is submitted, so we have a chance to normalize/mutate the data.
  return (
    <div>
      We could show a related object model to the current instance here.
    </div>
  )
}

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
        <Update>
          <MyCustomInline />
        </Update>
        <Delete auth={isAdmin} />
        <Action label='Mark selected users as active' action={(selected) => {
          // We want to send a PATCH to API/users with data:
          // [{ id, isActive: true }, { id, isActive: true }, ...]
          // Then our API can handle each item in the array, updating the user by id.
        }} />
      </Resource>
    </Admin>
  )
}
