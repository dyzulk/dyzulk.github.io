import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Dyzulk Portfolio</h1>
      <p className="mb-4">Welcome to the future portfolio.</p>
      <Link to="/admin" className="text-blue-500 hover:underline">Go to Admin Dashboard</Link>
    </div>
  )
}
