'use client'
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updatePromptText } from '@redux/reducers/AiPromptReducer';

const EXAMPLES = [
    'Explain how a hash map works to a new programmer',
    'Write a Python function that merges overlapping intervals',
    'Give me three arguments for and against remote work',
];

// example prompts that fill the prompt bar when clicked
const Examples: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="mt-5">
            <p className="text-xs text-muted mb-1">Examples</p>
            <ul className="divide-y divide-line/10 border-y border-line/10">
                {EXAMPLES.map((text) => (
                    <li key={text}>
                        <button
                            type="button"
                            onClick={() => dispatch(updatePromptText(text))}
                            className="group w-full flex items-center justify-between gap-4 py-2.5 text-left text-sm text-muted hover:text-ink transition-colors cursor-pointer"
                        >
                            <span>{text}</span>
                            <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Use</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Examples
