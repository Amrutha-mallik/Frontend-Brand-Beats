import {useState} from "react"
export default function EditProfile({ user, updateUser, setEdit }) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    location: user.location || ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateUser(formData)
    setEdit(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <br/>

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      <br/>

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <br/>

      <button type="submit">Save</button>
      <button type="button" onClick={() => setEdit(false)}>
        Cancel
      </button>
    </form>
  )
}


