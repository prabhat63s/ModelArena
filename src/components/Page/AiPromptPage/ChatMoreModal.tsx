import React from 'react';
import type { ChatCompletionOutputComplete, ChatCompletionInputMessage } from "@huggingface/tasks";
// common component
import Input from '@commonElements/Input';
import Button from '@commonElements/Button';
import Image from '@commonElements/Image';
// hugging fce helper
import * as HfHelper from '@helper/HfHelper';
// component for typewriter 
import TypeWriterAnimation from '@components/TypeWriterAnimation'
// interface for ai currentAiModel data structure
import { AiModel } from '@interface/models';

type Props = {
    currentAiModel: AiModel;
    messages: ChatCompletionOutputComplete[];
    firstMessage: ChatCompletionInputMessage;
}

const ChatMoreModal: React.FC<Props> = (props: Props) => {
    const { messages, firstMessage, currentAiModel } = props;

    // State to all messages form chat modal, error state, new messages
    const [allMessages, setAllMessages] = React.useState<ChatCompletionInputMessage[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [newPrompt, setNewPrompt] = React.useState<string>('');
    const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        const allMessages = [
            firstMessage,
        ]
        // add all messages from the response to the chat modal state
        for (const chunk of messages) {
            console.log(chunk.message)
            allMessages.push(chunk.message as ChatCompletionInputMessage)
        }
        setAllMessages([...allMessages,]);

        return () => {
            setNewPrompt(''); //reset prompt
        }
    }, [firstMessage, messages]);


    // handle input change
    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPrompt(e.target.value);
    }

    // handle send button click and get the response form hugging face
    const fetchResponse = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const res = await HfHelper.hfAIModel(allMessages, currentAiModel.model);
            const message: ChatCompletionInputMessage = {
                role: res.choices[0].message.role,
                content: res.choices[0].message.content as string,
            }

            // add the response message to the chat modal state
            setAllMessages((prev) => [
                ...prev,
                message,
            ]);

            setIsFirstLoad(true)

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
    };

    // handle send button click
    const updateAllMessages = (): void => {
        const message: ChatCompletionInputMessage = {
            role: "user",
            content: newPrompt
        };
        allMessages.push(message);
        fetchResponse();
        setNewPrompt('');
    }

    return (
        <>
            <div className="modal-box w-11/12 max-w-4xl h-[80vh] overflow-hidden flex flex-col p-0 bg-surface text-ink hairline shadow-2xl rounded-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-line/10">
                    <div className='flex items-center gap-3'>
                        <Image
                            src={currentAiModel.image}
                            alt={currentAiModel.name}
                            attrBtn={{
                                height: 32,
                                width: 32,
                                className: "rounded-md"
                            }}
                        />
                        <div>
                            <h3 className="font-semibold leading-tight">{currentAiModel.name}</h3>
                            <p className="eyebrow">Chat</p>
                        </div>
                    </div>
                    <form method="dialog">
                        <Button
                            attrBtn={{
                                'aria-label': 'Close chat',
                                className: "h-9 w-9 grid place-items-center rounded-lg text-muted hover:text-ink hover:bg-raised",
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </Button>
                    </form>
                </div>

                {/* Chat Area */}
                <div className='flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-5 custom-scrollbar'>
                    {allMessages.map((message, i) => {
                        const isLastItem = i === allMessages.length - 1;
                        const text = (message.content as string);
                        const isUser = message.role === "user";

                        return (
                            <div key={i} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                                <div className="max-w-[85%]">
                                    <p className={`eyebrow mb-1.5 ${isUser ? "text-right" : ""}`}>{isUser ? "You" : currentAiModel.name}</p>
                                    <div className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${isUser
                                        ? "bg-accent text-accent-ink"
                                        : "bg-raised"
                                        }`}>
                                        {(isFirstLoad && isLastItem && !isUser)
                                            ? <TypeWriterAnimation text={text} />
                                            : <div className="whitespace-pre-wrap">{text}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {(loading || error) && (
                        <div className="flex w-full justify-start">
                            <div className="px-4 py-3 rounded-lg bg-raised">
                                {loading && <span className="loading loading-dots loading-sm text-muted"></span>}
                                {error && <p className='text-danger font-medium text-sm'>{error}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className='p-4 md:p-6 border-t border-line/10'>
                    <div className="flex items-center gap-2 p-2 bg-bg hairline rounded-lg focus-within:border-accent/60 transition-colors">
                        <Input
                            attrBtn={{
                                type: "text",
                                placeholder: "Type your message...",
                                'aria-label': "Message",
                                className: "flex-1 min-w-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted focus:outline-none",
                                value: newPrompt,
                                onChange: onHandleChangeText,
                                onKeyDown: (e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        updateAllMessages();
                                    }
                                }
                            }}
                        />
                        <Button
                            attrBtn={{
                                className: "btn-accent px-4 py-2 text-sm shrink-0",
                                onClick: updateAllMessages,
                                disabled: !newPrompt.trim() || loading
                            }}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMoreModal;
