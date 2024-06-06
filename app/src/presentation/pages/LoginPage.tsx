const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex justify-start items-center h-screen w-full md:w-1/3 shadow-lg">
        <div className="p-8 w-full">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:block md:w-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background1.jpg')" }}
      ></div>
    </div>
  );
};

export default LoginPage;
