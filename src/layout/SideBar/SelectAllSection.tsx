// default library
import * as React from 'react';
import Checkbox from '@commonElements/Checkbox';

export type Props = {
    isSelectedAll: boolean;
    onHandleChange: () => void;
}

const SelectAllSection: React.FC<Props> = (props: Props) => {
    const { isSelectedAll, onHandleChange } = props;

    return (
        <li className="w-full border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={onHandleChange}>
                <label htmlFor="select-all-checkbox" className="text-sm font-semibold text-gray-200 cursor-pointer select-none">Select All</label>
                <Checkbox
                    attrBtn={{
                        id: "select-all-checkbox",
                        checked: isSelectedAll,
                        className: "checkbox checkbox-primary checkbox-sm border-white/20",
                        onChange: onHandleChange,
                    }}
                />
            </div>
        </li>
    )
}

export default SelectAllSection