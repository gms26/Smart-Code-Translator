import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-name">Smart Code Translator</span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Editor
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          History
        </NavLink>
      </div>

      <div className="navbar-user">
        <div className="user-info">
          {user?.picture ? (
            <img src={user.picture} alt={user.name} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="user-name">{user?.name}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
