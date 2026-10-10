'use client'
import * as React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Input from '@commonElements/Input';
import Button from '@commonElements/Button';
import ModelPicker from '@components/ModelPicker';

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
        <div className="flex items-stretch border border-line/15 rounded-lg bg-surface focus-within:border-accent/60 transition-colors">
            <ModelPicker />
            <Input
                attrBtn={{
                    type: "text",
                    placeholder: "Ask anything",
                    "aria-label": "Prompt",
                    className: "flex-1 min-w-0 bg-transparent px-4 py-3.5 placeholder:text-muted focus:outline-none",
                    value: mounted ? newPrompt : '',
                    onChange: onHandleChangeText,
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') dispatch(updatePromptText(newPrompt));
                    },
                }}
            />
            <Button
                attrBtn={{
                    className: "btn-solid m-1.5 px-4 text-sm shrink-0",
                    onClick: () => dispatch(updatePromptText(newPrompt)),
                }}
            >
                Run
            </Button>
        </div>
    )
}


export default SearchSection
