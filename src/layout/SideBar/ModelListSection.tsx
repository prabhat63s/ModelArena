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
                        className={`w-full border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors duration-200`}
                        key={ele.id}
                    >
                        <div className="flex items-center p-4 cursor-pointer" onClick={() => onHandleClick(ele.id)}>
                            <div className="flex-shrink-0 mr-3">
                                <Image
                                    src={ele.image}
                                    alt={ele.name}
                                    attrBtn={{
                                        width: 24,
                                        height: 24,
                                        className: "rounded-full"
                                    }}
                                />
                            </div>
                            <label
                                htmlFor={`${ele.id}-select`}
                                className="w-full text-sm font-medium text-gray-200 cursor-pointer select-none flex-grow"
                                onClick={(e) => e.preventDefault()} // Prevent double toggle since parent div has onClick
                            >
                                {ele.name}
                            </label>
                            <Checkbox
                                attrBtn={{
                                    id: `${ele.id}-select`,
                                    checked: isSelected,
                                    className: "checkbox checkbox-primary checkbox-sm border-white/20",
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
