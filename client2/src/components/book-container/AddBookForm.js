import {useState} from 'react';
import {useBooksData} from "../../zustand/bookStore";
import {Form} from "react-bootstrap";
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";

const initialStates = {
    name: '',
    author: '',
    year: '',
    genre: '',
    price: '',
    imageURL: '',
    description: '',
    stockQuantity: ''
}
export const AddBookForm = ({onClose}) => {
    const [book, setBook] = useState(initialStates);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {addBook, error, loading} = useBooksData(state => ({
        addBook: state.addBook,
        error: state.error,
        loading: state.loading
    }))

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook({...book, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setSuccessMessage('');
        try {
            await addBook(book);
            setSuccessMessage('Book added successfully');
            setTimeout(() => setSuccessMessage(''), 1000);
            if (onClose) {
                onClose();
            }
        } catch (error) {
            setLocalError('Failed to add book' + error.message);
            setTimeout(() => setLocalError(''), 1000);
        }
    }

    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <Form onSubmit={handleSubmit}>
                <div className="data-container">
                    <div className="edit-profile">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={book.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Author:
                            <input
                                type="text"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Year:
                            <input
                                type="number"
                                name="year"
                                value={book.year}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Genre:
                            <input
                                type="text"
                                name="genre"
                                value={book.genre}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={book.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Image:
                            <input
                                type="text"
                                name="imageURL"
                                value={book.imageURL}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={book.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            StockQuantity:
                            <input
                                type="number"
                                name="stockQuantity"
                                value={book.stockQuantity}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button type="submit" className="btn btn-outline-success"
                                disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>

                    </div>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {localError && <div className="alert alert-danger">{localError}</div>}
                </div>
            </Form>
        </LoadingErrorHandler>
    )
}
