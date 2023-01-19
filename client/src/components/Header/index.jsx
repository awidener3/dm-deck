import { useState } from 'react';
import {
	Form,
	Nav,
	Navbar,
	NavItem,
	NavDropdown,
	NavbarBrand,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Auth from 'utils/auth';
import './header.scss';

const Header = ({ theme, handleTheme }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<>
			{/* Version text underneath logo */}
			<p className="m-0 version-text">v0.1.7</p>

			<Navbar
				expanded={expanded}
				collapseOnSelect
				expand="lg"
				variant="dark"
				className="custom-navbar"
			>
				<NavbarBrand>
					<Link to="/" onClick={() => setExpanded(false)}>
						<h1 className="logo-text">
							DM<span className="logo-subtext">Deck</span>
						</h1>
					</Link>
				</NavbarBrand>
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

						{/* Logged in nav links */}
						{Auth.loggedIn() && (
							<>
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
								<Link
									to="/me"
									className="custom-nav-link m-2"
									onClick={() => setExpanded(false)}
								>
									Profile
								</Link>
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
							</>
						)}

						{localStorage.getItem('guest_id') && (
							<>
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
								<Link
									to="/guest"
									className="custom-nav-link m-2"
									onClick={() => setExpanded(false)}
								>
									Profile
								</Link>
							</>
						)}

						{/* Logged out nav links */}
						{!Auth.loggedIn() &&
							!localStorage.getItem('guest_id') && (
								<>
									<Link
										to="/login"
										className="custom-nav-link m-2"
										onClick={() => setExpanded(false)}
									>
										Login
									</Link>
									<Link
										to="/signup"
										className="custom-nav-link m-2"
										onClick={() => setExpanded(false)}
									>
										Signup
									</Link>
								</>
							)}

						{/* Other links (legal, bug reports, etc.) */}
						<NavDropdown
							title="Other"
							menuVariant="dark"
							className="nav-dropdown ms-2"
						>
							<LinkContainer
								className="link-container"
								to="/legal"
								onClick={() => setExpanded(false)}
							>
								<NavItem className="ms-2">Legal</NavItem>
							</LinkContainer>
							<a
								href="https://github.com/awidener3/dm-deck/issues/new"
								target="_blank"
								rel="noreferrer"
								className="link-container ms-2 nav-item"
								onClick={() => setExpanded(false)}
							>
								Submit a bug
							</a>
						</NavDropdown>

						{/* Light/Dark mode */}
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
		</>
	);
};

export default Header;
