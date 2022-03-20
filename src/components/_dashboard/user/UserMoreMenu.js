import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const { userData, setEditRowId, setDeleteRowId, setBucketRowId } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditRowId(userData);
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    setDeleteRowId(userData);
  };

  const handleUploadToS3 = (e) => {
    e.preventDefault();
    setBucketRowId && setBucketRowId(userData, e);
    console.log('clicked s3');
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {setDeleteRowId && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDeleteClick}>
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {setEditRowId && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleEditClick}>
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {setBucketRowId && (
          <MenuItem sx={{ color: 'text.secondary' }} onClick={handleUploadToS3}>
            <ListItemIcon>
              <Icon icon={cloudUploadFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Upload to S3" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
