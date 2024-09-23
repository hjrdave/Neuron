import React from "react";

interface Props {
  postId: number;
  name: string;
  body: string;
}
export default function ListItem({ postId, name, body }: Props) {
  return (
    <>
      <div
        style={{
          padding: ".75rem",
          border: "1px solid white",
          marginTop: "1rem",
          borderRadius: ".25rem",
        }}
      >
        <small style={{ color: "lightgray" }}>Id: {postId}</small>
        <p style={{ marginBottom: "0rem", fontSize: "1.5rem" }}>{name}</p>
        <p>{body}</p>
      </div>
    </>
  );
}
