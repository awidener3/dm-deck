import { Form, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Auth from '../../utils/auth';
import changelog from 'changelog';

import './header.scss';
import { useState } from 'react';

const Header = ({ theme, handleTheme }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<div>
			<p className="m-0 version-text">{changelog.current_version}</p>
			<Navbar
				expanded={expanded}
				collapseOnSelect
				expand="lg"
				variant="dark"
				className="custom-navbar"
			>
				<Navbar.Brand>
					<Link to="/">
						<h1 className="logo-text">
							DM<span className="logo-subtext">Deck</span>
						</h1>
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle
					onClick={() => setExpanded(expanded ? false : 'expanded')}
					aria-controls="responsive-navbar-nav"
				/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto">
						<Link
							to="/"
							className="custom-nav-link m-2"
							onClick={() => setExpanded(false)}
						>
							Home
						</Link>
						<Link
							to="/battle-select"
							className="custom-nav-link m-2"
							onClick={() => setExpanded(false)}
						>
							Battles
						</Link>
						<NavDropdown
							title="Build"
							menuVariant="dark"
							className="nav-dropdown ms-2"
						>
							<LinkContainer
								className="link-container"
								to="/battle-builder"
								onClick={() => setExpanded(false)}
							>
								<NavItem className="ms-2">
									Battle Builder
								</NavItem>
							</LinkContainer>
							<LinkContainer
								className="link-container"
								to="/character-builder"
								onClick={() => setExpanded(false)}
							>
								<NavItem className="ms-2">
									Character Builder
								</NavItem>
							</LinkContainer>
						</NavDropdown>

						{Auth.loggedIn() && (
							<Link
								to="/me"
								className="custom-nav-link m-2"
								onClick={() => setExpanded(false)}
							>
								Profile
							</Link>
						)}

						{Auth.loggedIn() ? (
							<Link
								to="/login"
								onClick={() => {
									Auth.logout();
									setExpanded(false);
								}}
								className="custom-nav-link m-2"
							>
								Logout
							</Link>
						) : (
							<Link
								to="/login"
								className="custom-nav-link m-2"
								onClick={() => setExpanded(false)}
							>
								Login
							</Link>
						)}
						<Link
							to="/legal"
							className="custom-nav-link m-2"
							onClick={() => setExpanded(false)}
						>
							Legal
						</Link>
						<div className="d-flex align-items-center ms-2">
							<Form.Check type="switch" onChange={handleTheme} />
							{theme === 'light' ? (
								<FaMoon color="#e6e6e6" />
							) : (
								<FaSun color="#e6e6e6" />
							)}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
