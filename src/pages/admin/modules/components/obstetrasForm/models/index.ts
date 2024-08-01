// React
import { Dispatch, SetStateAction } from 'react';

// Model
import { DataItemObstetras } from '../../../../models';

export interface ObstetrasFormProps {
    data: DataItemObstetras[];
    onClose: () => void;
    setData: Dispatch<SetStateAction<DataItemObstetras[]>>;
}
