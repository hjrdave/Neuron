import React, { Fragment } from "react";
import ListItem from "./ListItem";
import ListProvider, { ListData } from "./List.neurons";
import RenderListItems from "./RenderListItems";

interface Props {
  name: string;
  className?: string;
  data: ListData[];
}
export default function List({ name, data }: Props) {
  return (
    <>
      <ListProvider name={name} listData={data}>
        <div style={{ paddingTop: "2rem" }}>
          <p>List {name}</p>
          <div>
            <RenderListItems />
          </div>
        </div>
      </ListProvider>
    </>
  );
}
