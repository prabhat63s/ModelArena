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
            <div className="modal-box w-11/12 max-w-5xl h-[80vh] overflow-hidden flex flex-col p-0 glass-strong border border-white/10 shadow-2xl bg-[#0a0a0a]/95 rounded-3xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md z-10">
                    <div className='flex items-center gap-4'>
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-50 blur-sm"></div>
                            <Image
                                src={currentAiModel.image}
                                alt={currentAiModel.name}
                                attrBtn={{
                                    height: 40,
                                    width: 40,
                                    className: "relative rounded-full border border-white/20 bg-black"
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-white tracking-tight">
                                {currentAiModel.name}
                            </h3>
                            <p className="text-xs text-gray-400">AI Assistant</p>
                        </div>
                    </div>
                    <form method="dialog">
                        <Button
                            attrBtn={{
                                className: "btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white hover:bg-white/10 transition-colors",
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </Button>
                    </form>
                </div>

                {/* Chat Area */}
                <div className='flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar'>
                    {allMessages.map((message, i) => {
                        const isLastItem = i === allMessages.length - 1;
                        const text = (message.content as string);
                        const isUser = message.role === "user";

                        return (
                            <div key={i} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                                <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} gap-3`}>
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 mt-1">
                                        {isUser ? (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                                You
                                            </div>
                                        ) : (
                                            <Image
                                                src={currentAiModel.image}
                                                alt={currentAiModel.name}
                                                attrBtn={{
                                                    height: 32,
                                                    width: 32,
                                                    className: "rounded-full border border-white/10"
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${isUser
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none"
                                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
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
                            <div className="flex max-w-[80%] flex-row gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={currentAiModel.image}
                                        alt={currentAiModel.name}
                                        attrBtn={{
                                            height: 32,
                                            width: 32,
                                            className: "rounded-full border border-white/10"
                                        }}
                                    />
                                </div>
                                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-gray-200 shadow-lg">
                                    {loading && <span className="loading loading-dots loading-md text-primary"></span>}
                                    {error && <p className='text-red-400 font-medium'>{error}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className='p-4 md:p-6 border-t border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md'>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
                        <div className="relative flex items-center">
                            <Input
                                attrBtn={{
                                    type: "text",
                                    placeholder: "Type your message...",
                                    className: "w-full pl-6 pr-14 py-4 text-base border border-white/10 rounded-full bg-[#0a0a0a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-xl",
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
                                    className: "absolute right-2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center border-0 disabled:opacity-50 disabled:cursor-not-allowed",
                                    onClick: updateAllMessages,
                                    disabled: !newPrompt.trim() || loading
                                }}
                            >
                                <Image
                                    src={'/sparkling-dark.svg'}
                                    alt='send'
                                    attrBtn={{
                                        width: 20,
                                        height: 20,
                                        className: 'text-white brightness-200 invert',
                                    }}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMoreModal;
