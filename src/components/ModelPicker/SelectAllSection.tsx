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
        <li className="w-full border-b border-line/10 hover:bg-raised transition-colors">
            <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer" onClick={onHandleChange}>
                <label htmlFor="select-all-checkbox" className="text-sm text-muted cursor-pointer select-none">Select All</label>
                <Checkbox
                    attrBtn={{
                        id: "select-all-checkbox",
                        checked: isSelectedAll,
                        className: "h-4 w-4 accent-ink cursor-pointer",
                        onChange: onHandleChange,
                    }}
                />
            </div>
        </li>
    )
}

export default SelectAllSection