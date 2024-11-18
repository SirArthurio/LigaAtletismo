import React, {createContext} from 'react';
import { useState } from 'react';

export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

function UserContextProvider({children}){

    const [user, setUser] = useState(null);

   return(
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
   );
}

export default UserContextProvider
