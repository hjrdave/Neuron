import { Col, Container, Row, Card } from "react-bootstrap";
import "./styles.scss";
import Header from "./components/organisms/Header";
import Inspect from "./scenes/Inspect";

export default function DevTools() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className={"shadow-lg"} data-bs-theme="dark">
              <Card.Body className={"py-0"}>
                <Header />
                <Inspect />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
