'use client'
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updatePromptText } from '@redux/reducers/AiPromptReducer';

const SUGGESTIONS = [
    'Generate a React component',
    'Explain quantum physics simply',
    'Write a poem about AI',
    'Find the bug in this code',
];

// quick prompts that fill the search box
const Suggestions: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="mt-6 flex flex-wrap gap-2">
            <span className="eyebrow self-center mr-1">Try</span>
            {SUGGESTIONS.map((text) => (
                <button
                    key={text}
                    type="button"
                    onClick={() => dispatch(updatePromptText(text))}
                    className="px-3 py-1.5 rounded-lg hairline text-sm text-muted hover:text-ink hover:bg-raised transition-colors cursor-pointer"
                >
                    {text}
                </button>
            ))}
        </div>
    )
}

export default Suggestions
