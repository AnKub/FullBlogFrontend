import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styles from "./SideBlock.module.scss";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper className={styles.root}> {/* Исправляем сюда использование className */}
      <Typography variant="h6" className={styles.title}> {/* Исправляем сюда использование className */}
        {title}
      </Typography>
      <div className={styles.title.children}> {/* Исправляем сюда использование className */}
        {children}
      </div>
    </Paper>
  );
};
