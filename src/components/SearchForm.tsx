import "../styles/search-form-styles.css";
import { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

interface SearchFormProps {
    onSearch: (searchInput: string) => void;
    searchCategory: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, searchCategory }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        onSearch(input.trim());
    };

    return (
        <Form onSubmit={handleSubmit} className="search-form">
            <Form.Label htmlFor="search">Search</Form.Label>
            <InputGroup>
                <FormControl
                    className="form-input"
                    id="search"
                    type="text"
                    value={input}
                    placeholder={`Search for a ${searchCategory}...`}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
            </InputGroup>
        </Form>
    );
};

export default SearchForm;
