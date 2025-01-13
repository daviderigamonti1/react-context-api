import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import Card from "../components/Card";
import MyForm from "./MyForm";
import Loader from "../components/Loader";

const apiUrl = import.meta.env.VITE_API_URL;

function MainComponent() {
    const [postItem, setPostItem] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(getData, []);

    function getData() {
        setLoading(true);
        axios
            .get(apiUrl + "/posts")
            .then((res) => {
                setPostItem(res.data.data)
            })
            .catch((error) => console.error("Errore durante il recupero dei dati", error))
            .finally(() => {
                console.log("finally");
                setLoading(false);
            })
    }

    function deleteItem(id) {
        axios
            .delete(`${apiUrl}/posts/${id}`)
            .then((res) => {
                getData();
            })
            .catch((error) => {
                console.error("Errore durante la cancellazione del post", error);
            });

    }
    return (
        <>
            {loading && <Loader />}
            <Link className="btn btn-info m-4" to="create">Aggiungi un post</Link>
            <div className="row gy-4">
                {postItem.length > 0
                    ? postItem.map((post) => (
                        <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                            <Card
                                image={post.image}
                                title={post.title}
                                content={post.content}
                                id={post.id}
                                onDelete={() => deleteItem(post.id)}
                            />
                        </div>
                    ))
                    : console.log("Non ci sono pizze")}
            </div>
        </>
    );
}
export default MainComponent;