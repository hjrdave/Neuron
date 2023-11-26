import React from "react";
import { ListGroup } from "react-bootstrap";
import styles from "./ListItem.module.scss";

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ListItem({ label, active, onClick }: Props) {
  return (
    <>
      <div className={styles.listItem}>
        <ListGroup.Item
          active={active}
          onClick={onClick}
          className={`${onClick ? "cursor" : ""}`}
        >
          <i className="fa-solid fa-cube text-success"></i> {label}
        </ListGroup.Item>
      </div>
    </>
  );
}
