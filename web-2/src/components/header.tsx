import { Bell } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MIT ADT TRANSPORT</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
        <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-400">
          <Bell size={24} />
        </button>
      </div>
    </header>
  )
}