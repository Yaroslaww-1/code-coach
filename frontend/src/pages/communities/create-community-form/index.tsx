import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import communitiesService from "api/communities.service";

interface IProps {
  open: boolean;
  close: () => void;
}

export const CreateCommunityForm: React.FC<IProps> = observer(({ open, close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const save = async () => {
    const response = await communitiesService.create(name, description);
    if (!response?.error) window.location.reload();
  };

  return (
    <Dialog open={open} fullWidth={true} onClose={close} >
      <DialogTitle>Create community</DialogTitle>
      <DialogContent>
        <div className={styles.edit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={e => { setName(e.target.value); }}
          />
        </div>

        <div className={styles.edit}>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={e => { setDescription(e.target.value); }}
          />
        </div>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button variant="outlined" color="success" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
});