import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();
const initialData = { type: "", message: "" };

const GlobalProvider = ({ children }) => {
    const [alertData, setAlertData] = useState(initialData);
    const [posts, setPosts] = useState([]);

    return (
        <GlobalContext.Provider value={{ alertData, setAlertData, posts, setPosts }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobalContext };