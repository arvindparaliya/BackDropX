import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const TryNow = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6 py-16">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Remove Image Background in Seconds
      </h2>

      <p className="text-gray-600 mb-10 text-lg text-center max-w-xl">
        Upload your photo and let our AI instantly remove the background for a clean, professional look.
      </p>

      {/* Upload Box */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center space-y-6 border border-gray-100 transition hover:shadow-3xl">
        {/* Hidden File Input */}
        <input
          type="file"
          id="upload2"
          hidden
          accept="image/*"
          onChange={(e) => removeBg(e.target.files[0])}
        />

        {/* Upload Button */}
        <label
          htmlFor="upload2"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:from-indigo-700 hover:to-purple-700"
        >
          Upload Image
        </label>

        {/* Extra Options */}
        <p className="text-gray-500 text-sm text-center">
          or <span className="font-medium">drag & drop</span>, paste an image, or use a{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            URL link
          </a>
        </p>
      </div>
    </div>
  )
}

export default TryNow
