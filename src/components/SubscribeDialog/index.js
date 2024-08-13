import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function SubscribeDialog(props) {
  const {
    open,
    handleClose,
    handleSubmit,
  } = props;
  const [email, setEmail] = useState('');

  const onSubmit = (event) => {
    handleSubmit(email)
    setEmail('')
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          onSubmit(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Want to be notified when TCGist is ready?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          TCGist is currently in private beta.
          <br />
          Enter your email address below, to get notified when it's open to the public!
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          id="name"
          label="Email Address"
          margin="dense"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">
          Let me know!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
