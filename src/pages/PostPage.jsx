import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import axios from "axios";
import Card from "../components/Card";
import { useGlobalContext } from "../contexts/GlobalContext";

const apiUrl = import.meta.env.VITE_API_URL;

function PostPage() {
    const { id } = useParams();
    const { posts, setPosts } = useGlobalContext();

    const navigate = useNavigate();

    useEffect(getData, [id, navigate]);

    function getData() {
        axios.get(apiUrl + "/posts/" + id)
            .then((res) => {
                console.log(res)
                setPosts(res.data.item);
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
            <h1 className="text-center">Post con id {id}</h1>
            {posts ? (
                <Card
                    title={posts.title}
                    image={posts.image}
                    content={posts.content}
                    id={posts.id}
                />
            ) : (
                <p>Post non trovato</p>
            )}
        </section>
    )
}

export default PostPage;