import { assets } from "../assets/assets";

// BackDrop fOOTER
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 lg:px-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src={assets.logo}
            alt="Logo"
            width={40}
            className="rounded-lg shadow-md"
          />
          <span className="text-lg font-semibold text-white">BackDropX</span>
        </div>

        {/* Quick Access: Login & Sig up */}
        <div className="flex gap-4 text-sm font-medium">
          <a href="/login" className="hover:text-white transition-colors border border-gray-600 px-3 py-1 rounded-md hover:border-white">
            Login
          </a>
          <a
            href="/signup"
            className="hover:text-white transition-colors border border-gray-600 px-3 py-1 rounded-md hover:border-white"
          >
            Signup
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          {assets.footerConstants.map((item, index) => (
            <a
              href={item.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors shadow"
            >
              <img src={item.logo} alt="logo" width={20} className="invert" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-4"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-medium text-white">Arvind Paraliya</span> | All
        rights reserved
      </div>
    </footer>
  );
};

export default Footer;
