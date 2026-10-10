'use client'
import * as React from 'react';
import Link from 'next/link';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Image from '@commonElements/Image';
import Input from '@commonElements/Input';
import ModelPicker from '@components/ModelPicker';

const SearchSection: React.FC = () => {

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
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-lg"></div>
            {/* Input box with model selector */}
            <div className="relative flex items-center gap-2 pl-3 pr-2 py-2 border border-white/10 rounded-full bg-[#0a0a0a]/90 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all shadow-xl">
                <ModelPicker openUp />
                <Input
                    attrBtn={{
                        type: "text",
                        placeholder: "Ask anything...",
                        className: "flex-1 min-w-0 bg-transparent px-3 py-3 text-lg text-white placeholder-gray-500 focus:outline-none",
                        value: mounted ? aiPrompt.prompt : '',
                        onChange: onHandleChangeText,
                    }}
                />

                {/* search button and redirect to ai-prompt page */}
                <Link
                    href={`/ai-prompt`}
                    className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center shrink-0"
                >
                    <Image
                        src={'/sparkling-dark.svg'}
                        alt='sparkling'
                        attrBtn={{
                            width: 20,
                            height: 20,
                            className: 'text-white brightness-200 invert', // Ensure icon is white/bright
                        }}
                    />
                </Link>
            </div>
        </div>
    )
}


export default SearchSection