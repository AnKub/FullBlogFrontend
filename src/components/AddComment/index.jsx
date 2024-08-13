import React from "react";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {
  return (
    <div className={styles.root}>
      <Avatar
        className={styles.avatar} // Применение стиля для аватара
        src="https://mui.com/static/images/avatar/5.jpg"
      />
      <div className={styles.form}>
        <TextField
          label="Write a comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          className={styles.textField} // Применение стиля для поля ввода
        />
        <Button variant="contained" className={styles.button}>Send</Button>
      </div>
    </div>
  );
};
