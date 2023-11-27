import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { CrumbTypes } from "../../atoms/Crumb";

interface Props {
  onChange: (activeTab: CrumbTypes) => void;
}

export default function ViewerTabs({ onChange }: Props) {
  const [active, setActive] = React.useState<CrumbTypes>(CrumbTypes.State);

  React.useEffect(() => {
    onChange(active);
  }, [active]);

  return (
    <>
      <ButtonGroup size="sm" className={""}>
        <Button
          onClick={() => setActive(CrumbTypes.State)}
          variant={
            active === CrumbTypes.State ? "secondary" : "outline-secondary"
          }
          className={"text-white border-0 rounded-0 py-2"}
        >
          <i
            className={`fa-solid fa-database pe-2 ${
              active === CrumbTypes.State ? "" : "text-success"
            }`}
          ></i>{" "}
          State
        </Button>
        <Button
          onClick={() => setActive(CrumbTypes.Payload)}
          variant={
            active === CrumbTypes.Payload ? "secondary" : "outline-secondary"
          }
          className={"text-white border-0 rounded-0"}
        >
          <i
            className={`fa-solid fa-box-open pe-2 ${
              active === CrumbTypes.Payload ? "" : "text-success"
            }`}
          ></i>{" "}
          Payload
        </Button>
        <Button
          onClick={() => setActive(CrumbTypes.Features)}
          variant={
            active === CrumbTypes.Features ? "secondary" : "outline-secondary"
          }
          className={"text-white border-0 rounded-0"}
        >
          <i
            className={`fa-solid fa-gears pe-1 ${
              active === CrumbTypes.Features ? "" : "text-success"
            }`}
          ></i>{" "}
          Features
        </Button>
        <Button
          onClick={() => setActive(CrumbTypes.Actions)}
          variant={
            active === CrumbTypes.Actions ? "secondary" : "outline-secondary"
          }
          className={"text-white border-0 rounded-0"}
        >
          <i
            className={`fa-solid fa-bolt pe-1 ${
              active === CrumbTypes.Actions ? "" : "text-success"
            }`}
          ></i>{" "}
          Actions
        </Button>
      </ButtonGroup>
    </>
  );
}
