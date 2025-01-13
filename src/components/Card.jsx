import { Link } from "react-router-dom";

function Card({ image, title, content, id, onDelete }) {
    const handleDelete = (e) => {
        onDelete();
    }

    return (
        <div className="card">
            <img src={image} className="card-img-top" />
            <div className="card-body">
                <h5>{title}</h5>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-primary upper" to={`/posts/${id}`}>scopri di più</Link>
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}>Elimina
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Card;