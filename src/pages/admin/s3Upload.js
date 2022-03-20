import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import * as Promise from 'bluebird';
import { useDropzone } from 'react-dropzone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { styled } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { uploadFilesToS3 } from '../../services/admin/lessions';
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDropzone = (props) => {
  const { setAllAcceptedFiles, setAllFiles, allFiles } = props;

  const reset = () => {
    setAllAcceptedFiles([]);
    setAllFiles([]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setAllAcceptedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      {allFiles.length > 0 ? (
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {allFiles.length > 0 &&
            allFiles.map((file, index) => {
              return (
                <Chip
                  key={index}
                  label={file.name}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              );
            })}
          <Chip label={'Reset'} onClick={reset} size="small" color="primary" variant="filled" />
        </div>
      ) : (
        <div style={{ border: '5px dashed black', padding: '10px' }} {...getRootProps()}>
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </>
  );
};

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.darker,
  position: 'absolute',
  right: '47%',
  top: '45%'
}));

export default function AlertDialogSlide(props) {
  const { lessionRowData = 'frsfe', setOpenS3Modal, openS3Modal = false } = props;
  const [allFiles, setAllFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [allAcceptedFiles, setAllAcceptedFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const parse = function (file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = function (event) {
        const payload = {
          data: event.target.result,
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.name.match(/\.[0-9a-z]+$/i)[0]
        };
        resolve(payload);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (allAcceptedFiles.length > 0) {
      Promise.map(allAcceptedFiles, function (file) {
        return parse(file);
      }).then((res) => {
        console.log('allFiles', res);
        setAllFiles(res);
        setAllAcceptedFiles([]);
      });

      // Do something with the files
    }
  }, [allAcceptedFiles]);

  const handleClose = () => {
    setOpenS3Modal(false);
    setAllAcceptedFiles([]);
    setAllFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRefresh(true);
    uploadFilesToS3({
      data: allFiles,
      courseId: lessionRowData.courseId.value,
      moduleId: lessionRowData.moduleId.value,
      lessionId: lessionRowData.id
    }).then((res) => {
      setTimeout(() => {
        console.log('setTimeout call');
        setRefresh(false);
        handleClose();
        enqueueSnackbar('Files Added Successfully', {
          variant: 'success'
        });
      }, 2000);

      return res;
    });
  };

  const handleDelete = (index) => {
    const array = allFiles.splice(index, 1);
    setAllFiles(array);
  };

  console.log('allFiles', allFiles, lessionRowData);

  return (
    <div>
      <Dialog
        open={openS3Modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {refresh ? (
          <DialogContent style={{ minWidth: '453px', maxWidth: '453px', height: '300px' }}>
            <Spinner />
            <div>Please Wait... </div>
          </DialogContent>
        ) : (
          <>
            <DialogTitle id="alert-dialog-slide-title">
              {`Upload files to S3`}

              <div style={{ fontSize: '13px', opacity: '0.8', fontWeight: '400' }}>
                Title:{' '}
                {lessionRowData && lessionRowData.lessionName && lessionRowData.lessionName.value}
              </div>
            </DialogTitle>
            <DialogContent style={{ minWidth: '453px', maxWidth: '453px' }}>
              <MyDropzone
                allFiles={allFiles}
                setAllFiles={setAllFiles}
                setAllAcceptedFiles={setAllAcceptedFiles}
              />
            </DialogContent>
            {/* <DialogContent>
          {allFiles.length > 0 &&
            allFiles.map((file, index) => {
              return (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={handleDelete(index)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              );
            })}
        </DialogContent> */}
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Upload
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
