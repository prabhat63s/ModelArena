'use client'
import * as React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Image from '@commonElements/Image';
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
        <div className="relative group mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-lg"></div>
            <div className="relative flex items-center gap-2 pl-3 pr-2 py-2 border border-white/10 rounded-full bg-[#0a0a0a]/90 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all shadow-xl">
                <ModelPicker />
                <Input
                    attrBtn={{
                        type: "text",
                        placeholder: "Ask anything...",
                        className: "flex-1 min-w-0 bg-transparent px-3 py-3 text-lg text-white placeholder-gray-500 focus:outline-none",
                        value: mounted ? newPrompt : '',
                        onChange: onHandleChangeText,
                    }}
                />
                <Button
                    attrBtn={{
                        className: "p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center border-0 shrink-0",
                        onClick: () => dispatch(updatePromptText(newPrompt)),
                    }}
                >
                    <Image
                        src={'/sparkling-dark.svg'}
                        alt='sparkling'
                        attrBtn={{
                            width: 20,
                            height: 20,
                            className: 'text-white brightness-200 invert',
                        }}
                    />
                </Button>
            </div>
        </div>
    )
}


export default SearchSection