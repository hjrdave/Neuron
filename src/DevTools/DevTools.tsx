import { Col, Container, Row, Card } from "react-bootstrap";
import "./styles.scss";
import Header from "./components/organisms/Header";
import Inspect from "./scenes/Inspect";

export default function DevTools() {
  return (
    <>
      <Container className={"p-1 z-3 position-fixed top-0"}>
        <Row>
          <Col>
            <Card
              className={"shadow-md"}
              data-bs-theme="dark"
              style={{ borderRadius: "0px" }}
            >
              <Card.Body className={"p-0"}>
                <Container fluid>
                  <Row>
                    <Col>
                      <Header />
                      <Inspect />
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
