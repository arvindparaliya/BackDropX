import { useAuth, useClerk } from "@clerk/clerk-react"
import { assets } from "../assets/assets"
import { placeOrder } from "../service/OrderService";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const BuyCredits = () => {
    const { isSignedIn, getToken} = useAuth();
    const { openSignIn } = useClerk();
    const { loadUserCredits, backendUrl } = useContext(AppContext)

  const handleOrder = (planId) => {
    if (!isSignedIn) {
        return openSignIn();
    }

    placeOrder({
        planId, 
        getToken, 
        onSuccess: () => {
            loadUserCredits()
        },
        backendUrl
    });
  }
  return (
    <div className="py-10 md:px-20 lg:px-20">
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    assets.plans.map((plan, idx) => (
                        <div 
                            key={plan.id} 
                            className={`relative pt-6 p-6 ${plan.popular ? 'backdrop-blur-lg rounded-2xl' : 'border-gray-800 rounded-xl'} bg-[#1A1A1A] hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer` }>
                            {
                                plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-white text-sm font-semibold">
                                        Most Popular 
                                    </div>
                                )
                            }

                            <div className="text-center p-6">
                                <h3 className="text-2xl font-bold text-white">
                                    {
                                        plan.name
                                    }
                                </h3>

                                <div className="mt-4 text-center">
                                    <span className="text-4xl text-violet-400 font-bold">
                                        &#8377;{plan.price}
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 pb-8">
                                <ul className="mb-8 space-y-4">
                                    <li className="flex items-center text-white">
                                        {
                                            plan.credits
                                        }
                                    </li>

                                    <li className="flex items center text-white">
                                        {
                                            plan.description
                                        }
                                    </li>
                                </ul>

                                <button className="w-full py-3 px-6 text-center text-white font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                                
                                onClick={
                                    () => {handleOrder(plan.id)}
                                }

                                >
                                    Choose Plan 
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default BuyCredits