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
            <div className='flex flex-col min-h-40 max-h-96 w-full bg-surface hairline rounded-lg overflow-hidden transition-colors hover:border-line/20' key={aiModal.id}>
                {/* model header */}
                <div className='flex items-center justify-between gap-3 px-4 py-3 border-b border-line/10'>
                    <div className='flex items-center gap-3 min-w-0'>
                        <Image
                            src={aiModal.image}
                            alt={aiModal.name}
                            attrBtn={{
                                height: 28,
                                width: 28,
                                className: "rounded-md shrink-0"
                            }}
                        />
                        <h3 className="font-semibold truncate">{aiModal.name}</h3>
                    </div>
                    <span className="text-xs text-muted tabular-nums shrink-0">
                        {loading ? 'running…' : error ? 'failed' : response ? `${response.usage.total_tokens} tokens` : ''}
                    </span>
                </div>

                {/* response */}
                <div className='flex-1 overflow-y-auto custom-scrollbar px-4 py-4 text-sm leading-relaxed'>
                    {loading && (
                        <div className="flex items-center gap-2 text-muted">
                            <span className="loading loading-dots loading-sm"></span>
                            <span className="text-xs">Generating response...</span>
                        </div>
                    )}
                    {error && <p className='text-danger bg-danger/10 p-3 rounded-lg border border-danger/20'>{error}</p>}
                    {response && <TypeWriterAnimation text={response.choices[0].message.content} />}
                </div>

                {/* ask more button */}
                {response && (
                    <div className='flex justify-end px-4 py-3 border-t border-line/10'>
                        <Button
                            attrBtn={{
                                className: 'btn-accent px-3.5 py-2 text-sm',
                                onClick: openModel,
                            }}
                        >
                            Continue chat
                        </Button>
                    </div>
                )}
            </div >


            {/* chat modal */}
            {response && (
                <dialog id={modelName} className="modal">
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
