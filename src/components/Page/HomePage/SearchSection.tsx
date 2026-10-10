'use client'
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Input from '@commonElements/Input';

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
        <div className="flex items-center gap-2 p-2 bg-surface hairline rounded-xl focus-within:border-accent/60 transition-colors">
            {/* Input box */}
            <Input
                attrBtn={{
                    type: "text",
                    placeholder: "Ask anything...",
                    'aria-label': "Prompt",
                    className: "flex-1 min-w-0 bg-transparent px-3 py-3 text-base placeholder:text-muted focus:outline-none",
                    value: mounted ? aiPrompt.prompt : '',
                    onChange: onHandleChangeText,
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') router.push('/ai-prompt');
                    },
                }}
            />

            {/* search button and redirect to ai-prompt page */}
            <Link
                href={`/ai-prompt`}
                className="btn-accent px-4 py-3 text-sm shrink-0"
            >
                Run
                <span aria-hidden>→</span>
            </Link>
        </div>
    )
}


export default SearchSection
