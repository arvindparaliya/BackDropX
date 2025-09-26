import { assets } from "../assets/assets"

const Testimonials = () => {
  return (
    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-16">
      {/* Title Section */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
        What Our Users Say
      </h2>
      <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-14">
        Join thousands of happy creators who trust us to deliver stunning results every time.
      </p>

      {/* Body Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {assets.testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-5 -left-5 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
              <svg
                width="22"
                height="18"
                viewBox="0 0 24 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 7.3h-5.1L22.3.4H17l-3.4 6.9v10.3H24V7.3zM10.3 17.6V7.3H5L8.6.4H3.4L0 7.3v10.3h10.3z" />
              </svg>
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-lg leading-relaxed mt-6 mb-8 italic">
              “{testimonial.quote}”
            </p>

            {/* Author */}
            <div className="flex items-center space-x-4 mt-auto">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">
                  {testimonial.author.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-semibold text-gray-900 text-base">
                  {testimonial.author}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
