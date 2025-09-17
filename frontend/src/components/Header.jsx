import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { UploadCloud } from "lucide-react";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
      {/* Left Side: Video Banner */}
      <div className="order-2 md:order-1 flex justify-center">
        <div className="rounded-3xl overflow-hidden">
          <video
            src={assets.videoBanner}
            autoPlay
            loop
            muted
            className="w-full max-w-[420px] h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Side: Text Content */}
      <div className="order-1 md:order-2">
        {/* Badge */}
        <span className="inline-block mb-4 text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow-sm">
          🚀 New AI Feature
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Fastest Background {" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Remover website. Now It’s your time to shine
          </span>
          .
        </h1>

        <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-lg">
        Make your photos truly stand out with{" "}
        <span className="font-semibold text-gray-800">BackDropX</span>. 
          Effortlessly remove backgrounds, focus on your subject, and place your photos anywhere — all in seconds.
        </p>

        <div>
          <input
            type="file"
            accept="image/*"
            id="upload1"
            hidden
            onChange={(e) => removeBg(e.target.files[0])}
          />
          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <UploadCloud size={20} />
            Upload your image
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
