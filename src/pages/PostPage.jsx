import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import axios from "axios";
import Card from "../components/Card"

const apiUrl = import.meta.env.VITE_API_URL;

function PostPage() {
    const { id } = useParams();
    const [post, setpost] = useState(null);

    const navigate = useNavigate();

    useEffect(getData, [id, navigate]);

    function getData() {
        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                console.log(res)
                setpost(res.data.item);
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
        <section className="container">
            <h1>Post con id {id}</h1>
            {post ? (
                <Card
                    title={post.title}
                    image={post.image}
                    content={post.content}
                    id={post.id}
                />
            ) : (
                <p>Post non trovato</p>
            )}
        </section>
    )
}

export default PostPage;