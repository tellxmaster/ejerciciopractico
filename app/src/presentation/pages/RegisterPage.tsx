import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic here
  };

  return (
    <div className="flex h-screen">
      <div className="flex justify-start items-center h-screen w-full md:w-1/3 shadow-lg">
        <div className="p-8 w-full">
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="lastname"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleRegister}
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:block md:w-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background2.jpg')" }}
      ></div>
    </div>
  );
};

export default RegisterPage;
