import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '#lib/FontIcons';
import OutsideAlerter from '#lib/OutsideAlerter';
import * as Text from '#lib/Text';
import FlexRow from '#lib/FlexRow';
import { fonts } from '#constants/styleConstants';

function SearchBar({
    value,
    postInputBoxExt,
    preInputBoxExt,
    onSearch,
    onChange,
    onRequestClear,
    message,
    placeholder,
}) {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (focus) {
            inputRef.current.focus();
        }
    }, [focus]);

    function setUnfocus() {
        if (focus) {
            setFocus(false);
            if (!value) {
                onSearch();
            }
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSearch();
    }

    const showSearchField = focus || value !== '';

    return (
        <Wrapper>
            <OutsideAlerter onClickOutside={setUnfocus}>
                <form onSubmit={handleSubmit}>
                    <SearchWrapper
                        onClick={() => setFocus(true)}
                        focus={focus}
                        hasValue={value !== ''}
                    >
                        {!!preInputBoxExt.length && showSearchField && <>{preInputBoxExt}</>}
                        {focus && (
                            <InputBox
                                ref={inputRef}
                                onChange={onChange}
                                value={value}
                                placeholder={placeholder || 'Search'}
                            />
                        )}
                        <FlexRow desktopSpacing={1}>
                            {!!postInputBoxExt.length && showSearchField && <>{postInputBoxExt}</>}
                            {value && <Icon name="close" size="16px" onClick={onRequestClear} />}

                            <Icon
                                name="search"
                                size="24px"
                                color="theme.mainColorOne"
                                title="search"
                            />
                        </FlexRow>
                    </SearchWrapper>
                    {showSearchField && <MessageText>{message}</MessageText>}
                </form>
            </OutsideAlerter>
        </Wrapper>
    );
}

export default SearchBar;

SearchBar.propTypes = {
    value: PropTypes.string,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    onRequestClear: PropTypes.func.isRequired,
    postInputBoxExt: PropTypes.element,
    preInputBoxExt: PropTypes.element,
};

SearchBar.defaultProps = {
    value: '',
    message: '',
    placeholder: '',
    onSearch: () => {},
    postInputBoxExt: [],
    preInputBoxExt: [],
};

const Wrapper = styled.div`
    max-width: 100%;
    width: 360px;
`;

export const SearchWrapper = styled.div`
    border-radius: 24px;
    border: ${(prop) => {
        if (prop.focus) return `1px solid ${prop.theme.secondary.blue}`;
        if (prop.hasValue) return `1px solid ${prop.theme.gray}`;
        return 'none';
    }};
    padding: ${prop => (prop.focus || prop.hasValue ? '8px 24px' : '0')};
    align-items: center;
    display: flex;
    justify-content: ${prop => (prop.focus || prop.hasValue ? 'space-between' : 'flex-end')};
    margin-bottom: 8px;
`;

export const InputBox = styled.input`
    ${fonts.Regular};
    outline: none;
    border: none;
    font-size: 16px;
    background-color: transparent;
    ::-ms-clear {
        display: none;
    }
    ::-ms-reveal {
        display: none;
    }
`;

const MessageText = styled(Text.Label2)`
    padding: 0 24px;
`;
