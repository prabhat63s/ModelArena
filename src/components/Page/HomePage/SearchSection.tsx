'use client'
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Input from '@commonElements/Input';
import ModelPicker from '@components/ModelPicker';

const SearchSection: React.FC = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const aiPrompt = useSelector(getAiPrompt); //fetch the data from redux
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // function to handle input change
    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updatePromptText(e.target.value));
    }

    return (
        <div className="flex items-stretch border border-line/15 rounded-lg bg-surface focus-within:border-accent/60 transition-colors">
            <ModelPicker openUp />
            <Input
                attrBtn={{
                    type: "text",
                    placeholder: "Ask anything",
                    "aria-label": "Prompt",
                    className: "flex-1 min-w-0 bg-transparent px-4 py-4 text-base placeholder:text-muted focus:outline-none",
                    value: mounted ? aiPrompt.prompt : '',
                    onChange: onHandleChangeText,
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') router.push('/ai-prompt');
                    },
                }}
            />
            <Link
                href={`/ai-prompt`}
                className="btn-solid m-1.5 px-4 text-sm shrink-0"
            >
                Run
            </Link>
        </div>
    )
}


export default SearchSection
