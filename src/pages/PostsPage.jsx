import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import axios from "axios";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useGlobalContext } from "../contexts/GlobalContext";

const apiUrl = import.meta.env.VITE_API_URL;

function MainComponent() {
    //const [postItem, setPostItem] = useState([]);
    const { posts, setPosts } = useGlobalContext();

    const [loading, setLoading] = useState(false);
    useEffect(getData, []);

    function getData() {
        setLoading(true);
        axios.
            get(apiUrl + "/posts")
            .then((res) => {
                console.log(res)
                setPosts(res.data.data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/posts");
            })
            .finally(() => {
                console.log("Finally");
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
                {posts.length > 0
                    ? posts.map((post) => (
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