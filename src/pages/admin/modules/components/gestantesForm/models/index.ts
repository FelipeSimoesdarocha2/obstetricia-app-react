// React
import { Dispatch, SetStateAction } from 'react';

// Models
import { DataItemGestantes } from '../../../../models';

export interface GestantesFormProps {
    data: DataItemGestantes[];
    setData: Dispatch<SetStateAction<DataItemGestantes[]>>;
    onClose: () => void;
}
