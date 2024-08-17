import { Col, Row } from "./Container";
import { Bold } from "./Text";

interface DisplayTouchProps {
	critical: React.ReactNode;
	semiSuccess: React.ReactNode;
}

export function DisplayTouch({ critical, semiSuccess }: DisplayTouchProps) {
	return (
		<>
			<Row><Col><Bold>Semi-réussite : </Bold>{semiSuccess}</Col></Row>
			<Row><Col><Bold>Critique : </Bold>{critical}</Col></Row>
		</>
	)
}