import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';

const containerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxWidth: 1400,
  backgroundColor: 'background.paper',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  p: 4,
};

interface ModalButton {
  text: string;
  action: () => Promise<void>;
  isLoading: boolean;
}

export interface ModalProps {
  isShown: boolean;
  close: () => void;
  primaryBtn: ModalButton;
}

export const PatchUserModal = ({ isShown, close, primaryBtn }: ModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isShown}
      onClose={close}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 150,
        },
      }}
    >
      <Fade in={isShown}>
        <Box sx={containerStyles}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {'User #username'}
          </Typography>
          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField fullWidth />
          </Box>

          <Box display={'flex'} justifyContent={'end'} sx={{ mt: 3 }}>
            <Button sx={{ mr: 1 }} variant={'contained'} color={'error'} onClick={close}>
              Cancel
            </Button>

            <Button
              variant={'contained'}
              onClick={async () => {
                try {
                  await primaryBtn.action();
                  close();
                } catch (e) {
                  console.error(e);
                }
              }}
              disabled={primaryBtn.isLoading}
            >
              {primaryBtn.text}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
