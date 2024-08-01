/* eslint-disable react/require-default-props */
import React from "react";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import styles from "./FileList.module.scss";
import downloadPdf from "./download.svg";
import deletePdf from "./trash.svg";


interface iProps {
    disabled?: boolean
    loading?: boolean
    files?: any[]
    onRemove: (id: string) => void
    onDownload: (id: string, name: string) => void
}

const FileList: React.FC<iProps> = ({ loading, disabled, files, onRemove, onDownload }) => {
    const renderContent = () => {
        if (loading) {
            return <Stack direction="row" justifyContent="center"><CircularProgress sx={{color: '#3E6C75'}}/></Stack>
        }

        return files?.map(file => (
            <div key={file.id}>
                <div className={styles.FileInfo} >
                    <div className={styles.Preview}>
                        <strong>{file.fileName}</strong>
                    </div>
                    <div className={styles.actions}>
                        <Button onClick={() => onDownload(file.id, file.fileName)}>
                            <img src={downloadPdf} alt="download" />
                        </Button>
                        {!disabled && (
                            <Button disabled={disabled} onClick={() => onRemove(file.id)}>
                                <img src={deletePdf} alt="deletar" />
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        ))
    }
    
    if (!files) {
        return null
    }

    return (
        <ul className={styles.Container}>
            <p className={styles.Title}>Documentos Salvos</p>
            {renderContent()}
        </ul >
    )

}

FileList.defaultProps = {
    files: []
}

export default FileList;
