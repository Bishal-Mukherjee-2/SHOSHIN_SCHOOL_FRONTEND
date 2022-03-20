import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import GoogleButton from 'react-google-button';
// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button> */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <GoogleButton
            type="dark"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/auth/google';
            }}
          />
        </div>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Any issues in Login? Contact Support
        </Typography>
      </Divider>
    </>
  );
}
