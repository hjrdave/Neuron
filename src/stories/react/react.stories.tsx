import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { StoryFn, Meta } from "@storybook/react";
import Store, { useNeuron } from "./Store";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
export default {
  title: "Tests/React",
} as Meta;

const Comp = () => {
  const [fruit, setFruit] = useNeuron((state) => state.fruit);
  const [carList, setCarList] = useNeuron((state) => state.carList);
  const [isLoading, setIsLoading] = useNeuron((state) => state.isLoading);
  const [gender, setGender] = useNeuron((state) => state.person.gender);
  const [jobTitle, setJobTitle] = useNeuron((state) => state.person.jobTitle);
  const [name, setName] = useNeuron((state) => state.person.name);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button className={"me-2"} onClick={() => setFruit("PineApple")}>
              Fruit
            </Button>
            <Button className={"me-2"} onClick={() => setIsLoading(true)}>
              isLoading
            </Button>
            <Button className={"me-2"} onClick={() => setGender("female")}>
              Gender
            </Button>
            <Button className={"me-2"} onClick={() => setJobTitle("Manager")}>
              JobTitle
            </Button>
            <Button className={"me-2"} onClick={() => setName("Adam Smith")}>
              Name
            </Button>
            <Button
              className={"me-2"}
              onClick={() => setCarList(["Tesla", "Volvo"])}
            >
              CarList
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className={"pt-4"}>
            <p>Fruit: {fruit}</p>
            <p>isLoading: {isLoading.toString()}</p>
            <p>Gender: {gender}</p>
            <p>JobTitle: {jobTitle}</p>
            <p>Name: {name}</p>
            <p>CarList:</p>
            <ul>
              {carList.map((car, index) => (
                <>
                  <li key={index}>{car}</li>
                </>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const UpdateAndSetStateTemplate: StoryFn = () => {
  return (
    <>
      <Store />
      <Comp />
    </>
  );
};
export const UpdateAndSetState = UpdateAndSetStateTemplate.bind({});
UpdateAndSetState.args = {};

const PersistComp = () => {
  const [score, setScore] = useNeuron((state) => state.score);
  const [userName, setUserName] = useNeuron((state) => state.userName);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button
              className={"me-2"}
              onClick={() => setUserName("Billy the Kid")}
            >
              Change UserName
            </Button>
            <Button
              className={"me-2"}
              onClick={() => setScore((prev) => prev + 10)}
            >
              10+
            </Button>
            <Button
              className={"me-2"}
              onClick={() => setScore((prev) => prev - 10)}
            >
              10-
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className={"pt-4"}>
            <p>Score: {score}</p>
            <p>UserName: {userName}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const PersistedStateTemplate: StoryFn = () => {
  return (
    <>
      <Store />
      <PersistComp />
    </>
  );
};
export const PersistedState = PersistedStateTemplate.bind({});
PersistedState.args = {};

const ActionsComp = () => {
  const [score, , scoreActions] = useNeuron("score");
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button className={"me-2"} onClick={() => scoreActions.increment()}>
              Increment
            </Button>
            <Button className={"me-2"} onClick={() => scoreActions.decrement()}>
              Decrement
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className={"pt-4"}>
            <p>Score: {score}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ActionsTemplate: StoryFn = () => {
  return (
    <>
      <Store />
      <ActionsComp />
    </>
  );
};
export const Actions = ActionsTemplate.bind({});
Actions.args = {};
