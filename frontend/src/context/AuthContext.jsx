import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkAuth();

    }, []);

    const checkAuth = async () => {

        try {

            const { data } = await api.get("/users/current-user");

            setUser(data.user);

        }

        catch {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthContext.Provider

            value={{
                user,
                setUser,
                loading,
                checkAuth
            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);