import React, { useEffect, useState } from "react";
import { User } from "./types/user";
import Sidebar from "./sidebar/Sidebar";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=20");
        const data = await res.json();
        setUsers(data.results);
      } catch (err) {
        console.error("Błąd podczas pobierania danych:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (index: number) => {
    setUsers(prevUsers => prevUsers.filter((_, i) => i !== index));
  };

  if (loading) return <p className="text-center text-xl mt-10 text-gray-300">Ładowanie...</p>;

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {/* Burger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        aria-label="Otwórz menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex items-center justify-center  p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-purple-400">Witaj!</h1>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-300">Lista Użytkowników</h1>

      {/* Siatka kart: flex wrap + wycentrowane */}
      <div className="flex flex-wrap justify-center gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-80 p-6 shadow-lg rounded-lg border border-gray-700 bg-gray-800 
            hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 relative"
          >
            <button
              onClick={() => handleDeleteUser(index)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              aria-label="Usuń użytkownika"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src={user.picture.large}
                alt="avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-500/30"
              />
              <h2 className="text-xl font-bold text-gray-200">
                {user.name.first} {user.name.last}
              </h2>
              <div className="text-gray-400 space-y-1">
                <p>
                  <span className="font-semibold text-purple-400">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-semibold text-purple-400">Wiek:</span> {user.dob.age}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
