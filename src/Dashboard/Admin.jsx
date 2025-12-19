import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listproducer, listbrand } from "../slice/admin-slice"
import { fetchProjects } from "../slice/producer-slice"

export default function Admin() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listproducer())
    dispatch(listbrand())
    dispatch(fetchProjects())
  }, [])

  const { producer, brand } = useSelector(state => state.Admin)
  const { projects } = useSelector(state => state.Producer)

  return (
    <>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <p>Projects</p>
          <h2>{projects.length}</h2>
        </div>

        <div className="card">
          <p>Producers</p>
          <h2>{producer.length}</h2>
        </div>

        <div className="card">
          <p>Brands</p>
          <h2>{brand.length}</h2>
        </div>

        <div className="card">
          <p>Pending Approvals</p>
          <h2>10</h2>
        </div>
      </div>
    </>
  )
}
