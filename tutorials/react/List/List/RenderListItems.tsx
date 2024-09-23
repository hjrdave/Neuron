import React, { Fragment } from "react";
import ListItem from "./ListItem";
import { useListData } from "./List.neurons";

export default function RenderListItems() {
  const [listData, listDataActions] = useListData();
  return (
    <>
      <div>
        <div>
          <button onClick={() => listDataActions.set(listData.slice(0, 3))}>
            Click
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            columnGap: ".25rem",
          }}
        >
          {listData?.map((item, index) => (
            <Fragment key={index}>
              <ListItem
                postId={item.postId}
                name={item.name}
                body={item.body}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
