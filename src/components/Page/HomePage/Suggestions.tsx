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
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="eyebrow self-center">Examples:</span>
            {SUGGESTIONS.map((text) => (
                <button
                    key={text}
                    type="button"
                    onClick={() => dispatch(updatePromptText(text))}
                    className="px-2.5 py-1 rounded-md bg-raised text-sm text-muted hover:text-ink transition-colors cursor-pointer"
                >
                    {text}
                </button>
            ))}
        </div>
    )
}

export default Suggestions
