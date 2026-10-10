import { allAiModel } from '@/config/aiModelData';
import { AiModelList } from '@/interface/models';
import * as React from 'react';
import Checkbox from '@/commonElements/Checkbox';
import Image from '@/commonElements/Image';

export type Props = {
    aiModal: AiModelList;
    onHandleClick: (id: number) => void;
}

const ModelListSection: React.FC<Props> = (props: Props) => {
    const { aiModal, onHandleClick } = props;

    // Function to handle checkbox change event
    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const target = e.target;
        const id = Number(target.value);
        onHandleClick(id); // send the selected value to parent
    }

    return (
        <>
            {allAiModel.map((ele) => {
                const isSelected = aiModal.some((e) => e.id === ele.id);
                return (
                    <li
                        className={`w-full border-b border-line/10 last:border-0 hover:bg-raised transition-colors`}
                        key={ele.id}
                    >
                        <div className="flex items-center px-4 py-2.5 cursor-pointer" onClick={() => onHandleClick(ele.id)}>
                            <div className="flex-shrink-0 mr-3">
                                <Image
                                    src={ele.image}
                                    alt={ele.name}
                                    attrBtn={{
                                        width: 20,
                                        height: 20,
                                        className: "rounded-full"
                                    }}
                                />
                            </div>
                            <label
                                htmlFor={`${ele.id}-select`}
                                className="w-full text-sm text-ink cursor-pointer select-none flex-grow"
                                onClick={(e) => e.preventDefault()} // Prevent double toggle since parent div has onClick
                            >
                                {ele.name}
                            </label>
                            <Checkbox
                                attrBtn={{
                                    id: `${ele.id}-select`,
                                    checked: isSelected,
                                    className: "h-4 w-4 accent-ink cursor-pointer",
                                    onChange: handleCheckboxChange,
                                    value: ele.id,
                                }}
                            />
                        </div>
                    </li>
                );
            })}
        </>
    )
}

export default ModelListSection
