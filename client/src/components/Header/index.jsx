import { Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Auth from '../../utils/auth';

import './header.scss';

const Header = ({ theme, handleTheme }) => {
	return (
		<div>
			<p className="m-0 version-text">v0.1.4</p>
			<Navbar
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
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto">
						<Link to="/" className="custom-nav-link m-2">
							Home
						</Link>
						<Link to="/battles" className="custom-nav-link m-2">
							Battle
						</Link>
						<Link
							to="/create-battle"
							className={'custom-nav-link m-2'}
						>
							Create
						</Link>

						{Auth.loggedIn() ? (
							<Link to="/me" className="custom-nav-link m-2">
								Profile
							</Link>
						) : null}

						{Auth.loggedIn() ? (
							<Link
								to="/login"
								onClick={() => {
									Auth.logout();
								}}
								className="custom-nav-link m-2"
							>
								Logout
							</Link>
						) : (
							<Link to="/login" className="custom-nav-link m-2">
								Login
							</Link>
						)}
						<Link to="/legal" className="custom-nav-link m-2">
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
