import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

//UserSync Handler
const UserSyncHandler = () => {
  const {isLoaded, isSignedIn, getToken} = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { backendUrl } = useContext(AppContext)

  useEffect(() => {
    const saveUser = async () => {
        console.log(`${isLoaded}...${isSignedIn}...${synced}`);
        if (!isLoaded || !isSignedIn || synced) {
            return;
        }

        try {
            const token = await getToken();

            const userData = {
                clerk: user?.id,
                email: user?.primaryEmailAddress.emailAddress,
                firstName: user?.firstName,
                lastName: user?.lastName
            };

            console.log(backendUrl)
            console.log(userData)
            console.log(token);

            
            await axios.post(backendUrl+"/users", userData, {
                headers: {
                    "Authorization" : `Bearer ${token}`,                     
                }
            })
            
            setSynced(true);
            
        } catch (error) {
            console.error("User sync failed", error);
            toast.error("Unable to create account. Please try again");
        }
    }

    saveUser();

  }, [isLoaded, isSignedIn, getToken, user, synced]);
  return null;
}

export default UserSyncHandler