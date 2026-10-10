'use client'
import * as React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Input from '@commonElements/Input';
import Button from '@commonElements/Button';

const SearchSection: React.FC = () => {

    const dispatch = useDispatch();
    const aiPrompt = useSelector(getAiPrompt); // fetch data from redux

    // state management for the search
    const [newPrompt, setNewPrompt] = React.useState<string>('');
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        setNewPrompt(aiPrompt.prompt);
    }, [aiPrompt.prompt]);

    // event handler for the search input field change event
    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPrompt(e.target.value);
    }

    return (
        <div className="flex items-center gap-2 p-2 bg-surface hairline rounded-lg focus-within:border-accent/60 transition-colors">
            <Input
                attrBtn={{
                    type: "text",
                    placeholder: "Type a prompt",
                    'aria-label': "Prompt",
                    className: "flex-1 min-w-0 bg-transparent px-3 py-3 text-base placeholder:text-muted focus:outline-none",
                    value: mounted ? newPrompt : '',
                    onChange: onHandleChangeText,
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') dispatch(updatePromptText(newPrompt));
                    },
                }}
            />
            <Button
                attrBtn={{
                    className: "btn-accent px-4 py-2.5 text-sm shrink-0",
                    onClick: () => dispatch(updatePromptText(newPrompt)),
                }}
            >
                Compare
            </Button>
        </div>
    )
}


export default SearchSection
