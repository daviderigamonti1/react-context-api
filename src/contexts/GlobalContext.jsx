import { createContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const GlobalContext = createContext();
const initialData = { type: "", message: "" };

const GlobalProvider = ({ children }) => {
    const [alertData, setAlertData] = useState(initialData);
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(getData, [id, navigate]);

    function getData() {

        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                console.log(res)
                setPost(res.data.item);
            })
            .catch((error) => {
                console.log(error);
                navigate("/posts");
            })
            .finally(() => {
                console.log("Finally");
            })
    }
    return (
        <GlobalContext.Provider value={{ alertData, setAlertData, post, setPost }}>
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export default { GlobalProvider, useGlobalContext };