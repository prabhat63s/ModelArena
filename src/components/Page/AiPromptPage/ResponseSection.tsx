'use client'
import * as React from 'react';
import type { ChatCompletionOutput } from "@huggingface/tasks";
// custom components
import Image from '@commonElements/Image';
import Button from '@commonElements/Button';
// component for typewriter 
import TypeWriterAnimation from '@components/TypeWriterAnimation'
// type
import { AiModel } from '@interface/models';
// hugging face helper
import * as HfHelper from '@helper/HfHelper';

import ChatMoreModal from './ChatMoreModal';

export type Props = {
    aiModal: AiModel;
    prompt: string;
}

const ResponseSection: React.FC<Props> = (props: Props) => {
    const { aiModal, prompt } = props;

    const modelName = `my_model-${aiModal.id}`; //chat model name

    // State to handle the response, loading state, and error state
    const [response, setResponse] = React.useState<ChatCompletionOutput | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // fetch response from hugging face
    const fetchResponse = React.useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            setResponse(null);
            // Send prompt to hugging face model
            const message = [
                {
                    role: "user",
                    content: prompt
                }
            ];
            const res = await HfHelper.hfAIModel(message, aiModal.model);
            setResponse(res);
        } catch (err: any) {
            try {
                // Try to parse the error message if it's a JSON string
                const errorData = JSON.parse(err.message);
                setError(errorData.error || err.message);
            } catch {
                // If not JSON, use the raw message or a fallback
                setError(err.message || "An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, [aiModal.model, prompt]);

    // Fetching model response when the prompt or aiModal changes
    React.useEffect(() => {
        fetchResponse();
    }, [fetchResponse]); // Re-run when prompt or aiModal changes

    // Open model when user click on "What to ask More?" button
    const openModel = (): void => {
        (document.getElementById(modelName)! as any).showModal(); //open modal
        setIsOpen(true);
    }


    return (
        <>
            <div className='flex flex-col justify-between p-6 glass-strong rounded-3xl h-64 w-full overflow-hidden border border-white/10 transition-all hover:bg-white/5 shadow-lg group' key={aiModal.id}>
                {/* model icon */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className='flex justify-between items-center mb-4 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-10 py-2 -mt-2'>
                        <div className='flex items-center gap-3'>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500"></div>
                                <Image
                                    src={aiModal.image}
                                    alt={aiModal.name}
                                    attrBtn={{
                                        height: 36,
                                        width: 36,
                                        className: "relative rounded-full border border-white/20 bg-black"
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg leading-tight">{aiModal.name}</h3>
                                {response && <div className="text-xs text-gray-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    {response.usage.total_tokens} tokens
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='text-sm text-gray-300 leading-relaxed font-light'>
                        {loading && (
                            <div className="flex items-center gap-2 text-purple-400">
                                <span className="loading loading-dots loading-md"></span>
                                <span className="text-xs animate-pulse">Generating response...</span>
                            </div>
                        )}
                        {error && <p className='text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20'>{error}</p>}
                        {response && <TypeWriterAnimation text={response.choices[0].message.content} />}
                    </div>
                </div>

                {/* ask more button */}
                {response && (
                    <div className='flex justify-end align-bottom mt-4 pt-4 border-t border-white/5'>
                        <Button
                            attrBtn={{
                                className: 'btn btn-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 rounded-full shadow-lg hover:scale-105 transition-transform hover:shadow-purple-500/20 px-6 font-medium',
                                onClick: openModel,
                            }}
                        >
                            Continue Chat
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </div>
                )}
            </div >


            {/* chat modal */}
            {response && (
                <dialog id={modelName} className="modal backdrop-blur-sm">
                    {isOpen &&
                        <ChatMoreModal
                            currentAiModel={aiModal}
                            messages={response!.choices}
                            firstMessage={{
                                role: "user",
                                content: prompt
                            }}
                        />
                    }
                </dialog>
            )}


        </>
    )
}

export default ResponseSection
