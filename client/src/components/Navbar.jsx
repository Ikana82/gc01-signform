export default function Navbar() {
  return (
    <nav className="bg-[#ff0000] text-white p-4 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Kanara Fashion</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/auth/login" className="hover:underline">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
