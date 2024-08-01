/* eslint-disable */

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Toolbar } from "@mui/material";
import DropZone from "./components/Upload/DropZoneComponent";
import FileList from "./components/FileList/FileListComponent";
import Button from "../../../../../../components/button/Button";
import { saveAs } from 'file-saver';

import {
  getDocumentsGestation,
  saveDocumentsGestation,
  deleteDocument,
  downloadDocument
} from '../../../../../../@core/@http/documents/documents'

import { useToast } from '../../../../../../providers/ToastProvider/ToastProvider'
import { useConfirm } from '../../../../../../providers/ConfirmProvider/ConfirmProvider'

interface iProps {
  patient: string
  open: boolean;
  onClose: () => void;
  disabled?: boolean;
}

function DocumentModal({ patient, open, onClose, disabled }: iProps) {
  const navigate = useNavigate();

  const {toast} = useToast();

  const { confirm } = useConfirm();

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [files, setFiles] = useState<any[]>([]);

  const onUploadFiles = async (newFiles: File[]) => {
    try {
      setUploading(true);

      const formData = new FormData()

      newFiles.forEach((file) => formData.append('files', file))

      await saveDocumentsGestation(patient, formData)
      
      await fetchFiles()
    } catch (error: any) {
      toast.error({
        title: 'Erro',
        message: error.message
      })
    } finally {
      setUploading(false);
    }
  };

  const onRemoveFile = async (id: string) => {
    try {
      setLoading(true);

      await deleteDocument(id)
      
      await fetchFiles()
    } catch (error: any) {
      toast.error({
        title: 'Erro',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  const handleOnRemoveFile = (id: string) => { 
    confirm.show({
      title: 'Tem certeza que deseja excluir este arquivo?',
      onConfirm: () => onRemoveFile(id)
    });
  }

  const onDownloadFile = async (id: string, name: string) => {
    try {
      setLoading(true);

      const response = await downloadDocument(id)
      
      saveAs(response.data, name)
    } catch (error: any) {
      toast.error({
        title: 'Erro',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  const onDownloadAllFiles = () => {
    files.forEach((file) => onDownloadFile(file.id, file.fileName))
  }

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await getDocumentsGestation(patient)

      setFiles(response?.data?.pacientShipments || [])
    } catch (error: any) {
      toast.error({
        title: 'Erro',
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles()
  }, [patient])

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => { }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}  >
        <span />
        <DialogTitle style={{ fontFamily: 'Sarabun', fontWeight: '700', marginLeft: '2rem' }}>
          Documentos
        </DialogTitle>
        <IconButton
          edge="end"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogContent dividers >
        <Grid container spacing={3} style={{ justifyContent: 'center', display: 'flex' }} xs={12}>
          {!disabled && (
            <Grid item md={12} sm={12} xl={12} xs={12}>
              <DropZone
                multiple
                disabled={loading}
                loading={uploading}
                onChange={onUploadFiles}
              />
            </Grid>
          )}
          <Grid item md={12} sm={12} xl={12} xs={12}>
            <FileList
              disabled={uploading || disabled}
              loading={loading}
              files={files}
              onRemove={handleOnRemoveFile}
              onDownload={onDownloadFile}
            />
          </Grid>
        </Grid>
      </DialogContent>
      {!!files?.length && (
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Button disabled={loading} onClick={onDownloadAllFiles} name="BAIXAR TODOS" />
            </Grid>
          </Grid>
        </DialogActions>
      )}
    </Dialog >
  );
}

DocumentModal.defaultProps = {
  disabled: false
};

export default DocumentModal;
