import { DOCTOR_DATA, USER_DATA } from "@/data/consts";
import { Doctors } from "@/types/appointments";
import { UserData, Users } from "@/types/users";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the context type
type UserContextType = {
  users: Users | null;
  setUsers: (users: Users | null) => void;
  doctors: Doctors | null,
  setDoctors: (doctors: Doctors | null) => void;
  userID: string | null;
  setUserID: (id: string | null) => void;
};

// Create the context with the defined type or as undefined initially
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Define the UserProvider component with explicit return type
const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [userID, setUserID] = useState<string | null>(null);
  const [users, setUsers] = useState<Users | null>(null);
  const [doctors, setDoctors] = useState<Doctors | null>(null);

  useEffect(() => {
      setDoctors(DOCTOR_DATA);
      setUsers(USER_DATA);
  }, []);

  return (
    <UserContext.Provider value={{ userID, setUserID, users, setUsers, doctors, setDoctors }}>
      {children}
    </UserContext.Provider>
  );
};

// Export UserProvider
export default UserProvider;

// Hook to use the User context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
