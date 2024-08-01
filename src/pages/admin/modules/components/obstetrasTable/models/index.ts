// React
import { ChangeEvent, Dispatch, SetStateAction } from "react";

// Models
import { Column, DataItemObstetras } from "../../../../models";

export interface ObstetrasTableProps {
    columns: Column[];
    selectedItems: number[];
    data: DataItemObstetras[];
    handleCheckboxChange: (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    setSelectedItems: Dispatch<SetStateAction<number[]>>;
    handleDeleteItemConfirmation: (index: number) => void;
}
