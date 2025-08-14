import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchItem } from '../../../types/search-item';
import { useRequest } from '../../../hooks/useRequest';
import SearchFormView from './SearchFormView';

type Props = {
    onSubmit?: () => void 
}

const SearchForm : React.FC<Props> = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [current, setCurrent] = useState<SearchItem | null | string>(null);

    const [isLoaded, options] = useRequest<SearchItem[]>(
        `/search/help/?search=${encodeURIComponent(inputValue)}`,
        { method: 'GET' }
    );

    const submitHandler = () => {
        const searchTerm = inputValue.trim();
        if (searchTerm) {
            const url = `/search/?s=${encodeURIComponent(searchTerm)}`;
            console.log(url);
            navigate(url);
            onSubmit?.();
        }
    };

    useEffect(() => {
        if (current) {
            if (typeof current === 'string') {
                console.log(`is string ${current}`)
                navigate(`/search/?s=${encodeURIComponent(current)}`);
            }
            else if (typeof current == 'object') {
                console.log(`is object ${current.url}`)
                navigate(current.url);
            }
            onSubmit?.();
        }
    }, [current]);

    return (
        <SearchFormView
        inputValue={inputValue}
        setInputValue={setInputValue}
        options={options}
        setCurrent={setCurrent}
        isLoaded={isLoaded}
        submitHandler={submitHandler}
        />
    )
};

export default SearchForm;