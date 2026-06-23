import { useState } from "react";
import { Form } from "react-bootstrap";
import "../../styles/search-form-styles.css";

interface SearchFormProps {
    onSearch: (searchInput: string) => void;
    searchCategory: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSearch(input.trim());
    };

    return (
        <Form onSubmit={handleSubmit} className="tmdb-search-form">
            <label className="tmdb-search-label">
                <input
                    type="text"
                    value={input}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Search for a movie..."
                    onChange={(e) => setInput(e.target.value)}
                    className="tmdb-search-input"
                />
            </label>
            <input type="submit" value="Search" className="tmdb-search-submit-btn" />
        </Form>
    );
};

export default SearchForm;
