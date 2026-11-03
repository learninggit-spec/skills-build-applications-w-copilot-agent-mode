import { useEffect, useState } from 'react';
import DataTable from './DataTable';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : null;
    console.log('Teams REST API endpoint:', endpoint);
    if (!endpoint) {
      setError('REACT_APP_CODESPACE_NAME is not configured.');
      setLoading(false);
      return;
    }

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams fetched data:', data);
        setTeams(Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []);
      })
      .catch((fetchError) => {
        console.error('Unable to fetch teams:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="card resource-card shadow-sm">
      <div className="card-header bg-white border-0 px-4 pt-4">
        <h1 className="h3 fw-bold mb-1">Teams</h1>
        <p className="text-body-secondary mb-0">Browse teams in OctoFit Tracker.</p>
      </div>
      <div className="card-body p-4">
        {loading && <p className="alert alert-info" role="status">Loading teams...</p>}
        {error && <div className="alert alert-danger">Unable to load teams: {error}</div>}
        {!loading && !error && (
          <DataTable caption="Teams" rows={teams} emptyMessage="No teams found." />
        )}
      </div>
    </section>
  );
}

export default Teams;
