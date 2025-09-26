import { assets } from "../assets/assets";

const BgRemovalSteps = () => {
  return (
    <div className="text-center mb-20">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14">
        Remove backgrounds in just <span className="text-indigo-600">3 easy steps</span>
      </h2>

      {/* Steps Gride */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {assets.steps.map((item, index) => (
          <div
            key={index}
            className="relative group bg-white p-10 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Step Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md">
                {index + 1}
              </span>
            </div>

            {/* Icone */}
            {item.icon && (
              <div className="mb-6 flex justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BgRemovalSteps;
