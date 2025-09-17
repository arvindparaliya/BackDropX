import { useAuth, useClerk } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { placeOrder } from "../service/OrderService";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CheckCircle2 } from "lucide-react";

//Pricing
const Pricing = () => {
  const { isSignedIn, getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { loadUserCredits, backendUrl } = useContext(AppContext);

  const handleOrder = (planId) => {
    if (!isSignedIn) {
      return openSignIn();
    }

    placeOrder({
      planId,
      getToken,
      onSuccess: () => {
        loadUserCredits();
      },
      backendUrl,
    });
  };

  return (
    <div className="py-16 md:px-20 lg:px-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Select from our carefully designed packages to suit your needs, 
            whether you’re an individual, a freelancer, or a growing business.
          </p>
        </div>

        {/* Section body */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {assets.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative pt-8 p-8 rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${
                plan.popular
                  ? "bg-white border-2 border-purple-500 shadow-purple-200"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Popular Badgee */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 text-white text-sm font-semibold shadow-md">
                  ⭐ Most Popular
                </div>
              )}

              {/* Plan Title & Price */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 text-center">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    ₹{plan.price}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="px-2 pb-8">
                <ul className="mb-8 space-y-3 text-left">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="text-purple-600 w-5 h-5" />
                    {plan.credits}
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="text-purple-600 w-5 h-5" />
                    {plan.description}
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 text-center text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      : "bg-gray-800 hover:bg-gray-900"
                  }`}
                  onClick={() => {
                    handleOrder(plan.id);
                  }}
                >
                  {plan.popular ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
