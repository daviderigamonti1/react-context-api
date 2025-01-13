import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

function Alert() {
    const { alertData, setAlertData } = useGlobalContext();
    const { type, message } = alertData;
    useEffect(
        () => {
            let timer1 = setTimeout(
                () => setAlertData({ type: "", message: "" }),
                3000
            );
            return () => {
                clearTimeout(timer1);
            };
        }, []
    );
    if (!message) return null;
    return (
        <div className={`alert alert-${type} alert-dismissible`} role="alert">
            <div>{message}</div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertData({ type: "", message: "" })}>
            </button>
        </div>
    )
}

export default Alert;