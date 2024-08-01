// React
import { ChangeEvent, Dispatch, SetStateAction } from "react";

// Models
import { Column, DataItemGestantes } from "../../../../models";

export interface GestantesTableProps {
    data: DataItemGestantes[];
    columns: Column[];
    selectedItems: number[];
    handleCheckboxChange: (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    setSelectedItems: Dispatch<SetStateAction<number[]>>;
    OpenModal: (args: { index: number; itemId: string }) => void;
    handleDeleteItemConfirmation: (index: number) => void;
}
