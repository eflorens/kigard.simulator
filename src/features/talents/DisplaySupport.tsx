import { Col, Row } from "../../components";
import { DisplayStatus } from "../../components/DisplayStatus";
import { Status } from "../../data/inventory";

interface DisplaySupportProps {
  status: { value: number, status: Status }[];
}

export function DisplaySupport({ status: attackStatus }: DisplaySupportProps) {
  return (
    <Row>
      <Col>Confère {attackStatus.map(({ value, status }, index) => (
        <span key={status}>
          {index > 0 && <span> et </span>}
          <span className="fw-bold">{value} </span>
          <DisplayStatus status={status} />
        </span>
      ))}
      </Col>
    </Row>
  )
}