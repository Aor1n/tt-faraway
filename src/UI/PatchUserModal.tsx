import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import usePatchUser, { User } from '@/hooks/usePatchUser';
import { TextField } from '@UI/TextField';
import { notify } from '@/helpers/notify';
import { Select } from '@UI/Select';

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

export interface ModalProps {
  isShown: boolean;
  close: () => void;
  user: User & Id;
  cacheKey: string;
}

const GENDERS = ['male', 'female', 'hermaphrodite', 'none', 'n/a'] as const;

export const PatchUserModal = ({ isShown, close, user, cacheKey }: ModalProps) => {
  const { form, handleSubmit } = usePatchUser({
    user,
    cacheKey,
    onSuccessfulSubmit: () => {
      notify('success', `${user.name} has been updated`);
      close();
    },
  });

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
            Edit {user.name}
          </Typography>

          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            <TextField form={form} name={'name'} />
            <Select data={GENDERS} form={form} name={'gender'} />
            <TextField form={form} name={'height'} type={'number'} />
            <TextField form={form} name={'mass'} type={'number'} />
          </Box>

          <Box display={'flex'} justifyContent={'end'} sx={{ mt: 3 }}>
            <Button sx={{ mr: 1 }} variant={'contained'} color={'error'} onClick={close}>
              Cancel
            </Button>

            <Button variant={'contained'} onClick={handleSubmit}>
              Update
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
