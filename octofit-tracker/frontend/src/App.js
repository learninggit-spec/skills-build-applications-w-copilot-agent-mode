import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
];

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container app-nav">
          <NavLink
            className="navbar-brand d-inline-flex align-items-center gap-2"
            to="/activities"
          >
            <img
              className="app-logo"
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt=""
            />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-1" aria-label="Main navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container app-content py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
