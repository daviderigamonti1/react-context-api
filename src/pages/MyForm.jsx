import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Loader from "../components/Loader";

const apiUrl = import.meta.env.VITE_API_URL;

const newPost = {
    title: '',
    content: '',
    image: "",
    checkbox: false,
}

function MyForm() {
    const [formData, setFormData] = useState(newPost);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleInput(e) {
        const { name, type, value, checked } = e.target;
        const inputValue = type == "checkbox" ? checked : value;
        setFormData({ ...formData, [e.target.name]: inputValue, id: crypto.randomUUID() });
    }

    function addPost(e) {
        e.preventDefault();
        setLoading(true);
        if (formData.checkbox) {
            axios
                .post(apiUrl + "/posts", formData)
                .then((res) => {
                    navigate("/posts")
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    console.log("finally");
                    setLoading(false);
                })
        }
    }
    return (
        <>
            {loading && <Loader />}
            <section>
                <h3 className="ps-3 pt-5">Aggiungi un tuo post</h3>
                <form className="p-4" onSubmit={addPost}>
                    <label htmlFor="title" className="form-label">Titolo</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        onChange={handleInput}
                        value={formData.title}
                        placeholder="Inserisci Il titolo"
                    />
                    <label htmlFor="content" className="form-label">Contenuto</label>
                    <textarea
                        className="form-control mb-3"
                        name="content"
                        onChange={handleInput}
                        value={formData.content}
                        placeholder="Inserisci il contenuto">
                    </textarea>
                    <label htmlFor="image" className="form-label">Immagine</label>
                    <input
                        type="text"
                        name="image"
                        className="form-control mb-3"
                        onChange={handleInput}
                        value={formData.image}
                        placeholder="Inserisci l'immagine" />
                    <div className="d-flex pt-3">
                        <label htmlFor="checkbox" className="form-label">Vuoi aggiungere il post al blog?</label>
                        <input
                            type="checkbox"
                            name="checkbox"
                            className="ms-2 mb-1"
                            onChange={handleInput}
                            checked={formData.checkbox} />
                    </div>
                    <button className="btn btn-primary mt-4">Invia</button>
                </form>
            </section>
        </>
    );
}

export default MyForm;