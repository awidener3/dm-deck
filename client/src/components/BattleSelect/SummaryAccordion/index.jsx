import { ListGroup, Accordion } from 'react-bootstrap';
import { getXp } from '../../../utils/basicRuleCalculations';

const SummaryAccordion = ({ battle }) => {
	return (
		<Accordion className="mb-2" defaultActiveKey={['0']} alwaysOpen>
			<Accordion.Item eventKey="1">
				<Accordion.Header>
					<h3 className="accordion-title">
						Heroes ({battle.heroes.length})
					</h3>
				</Accordion.Header>
				<Accordion.Body>
					<ListGroup variant="flush">
						{battle.heroes.map((hero, i) => (
							<ListGroup.Item
								className="d-flex justify-content-between"
								key={i}
							>
								{hero.character_name}{' '}
								<span className="accordion-subtext">
									{hero.class} ({hero.level})
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="2">
				<Accordion.Header>
					<h3 className="accordion-title">
						Monsters ({battle.monsters.length})
					</h3>
				</Accordion.Header>
				<Accordion.Body>
					<ListGroup variant="flush">
						{battle.monsters.map((monster, i) => (
							<ListGroup.Item
								className="d-flex justify-content-between"
								key={i}
							>
								{monster.name}{' '}
								<span className="accordion-subtext">
									CR {monster.challenge_rating} (
									{getXp(monster)}
									xp)
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export default SummaryAccordion;
