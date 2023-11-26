import React from "react"
import { Button, ButtonGroup } from "react-bootstrap"

export enum TabNames {
  State = "state",
  Payload = "payload",
  Features = "features",
  Actions = "actions"
}
interface Props {
  onChange: (activeTab: TabNames) => void
}

export default function ViewerTabs({ onChange }: Props) {
  const [active, setActive] = React.useState<TabNames>(TabNames.State)

  React.useEffect(() => {
    onChange(active)
  }, [active])

  return (
    <>
      <ButtonGroup size="sm">
        <Button
          onClick={() => setActive(TabNames.State)}
          variant={
            active === TabNames.State ? "secondary" : "outline-secondary"
          }
          className={"text-white"}>
          <i className="fa-solid fa-database pe-2 text-success"></i> State
        </Button>
        <Button
          onClick={() => setActive(TabNames.Payload)}
          variant={
            active === TabNames.Payload ? "secondary" : "outline-secondary"
          }
          className={"text-white"}>
          <i className="fa-solid fa-box-open pe-2 text-success"></i> Payload
        </Button>
        <Button
          onClick={() => setActive(TabNames.Features)}
          variant={
            active === TabNames.Features ? "secondary" : "outline-secondary"
          }
          className={"text-white"}>
          <i className="fa-solid fa-gears pe-1 text-success"></i> Features
        </Button>
        <Button
          onClick={() => setActive(TabNames.Actions)}
          variant={
            active === TabNames.Actions ? "secondary" : "outline-secondary"
          }
          className={"text-white"}>
          <i className="fa-solid fa-bolt pe-1 text-success"></i> Actions
        </Button>
      </ButtonGroup>
    </>
  )
}
