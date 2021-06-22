import { BiSearch } from "react-icons/bi"

const SearchBox = () => {
  return (
    <div className="w-full h-10 flex items-center p-4">
      <BiSearch className="text-gray-500"/>
      <input type="text" placeholder="Search" className="w-full bg-transparent text-gray-800 pl-2"/>
    </div>
  )
}

export default SearchBox