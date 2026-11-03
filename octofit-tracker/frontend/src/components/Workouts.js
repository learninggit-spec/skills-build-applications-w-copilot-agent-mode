import { useEffect, useState } from 'react';
import DataTable from './DataTable';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : null;
    console.log('Workouts REST API endpoint:', endpoint);
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
        console.log('Workouts fetched data:', data);
        setWorkouts(Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []);
      })
      .catch((fetchError) => {
        console.error('Unable to fetch workouts:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="card resource-card shadow-sm">
      <div className="card-header bg-white border-0 px-4 pt-4">
        <h1 className="h3 fw-bold mb-1">Workouts</h1>
        <p className="text-body-secondary mb-0">Explore available workout suggestions.</p>
      </div>
      <div className="card-body p-4">
        {loading && <p className="alert alert-info" role="status">Loading workouts...</p>}
        {error && <div className="alert alert-danger">Unable to load workouts: {error}</div>}
        {!loading && !error && (
          <DataTable caption="Workouts" rows={workouts} emptyMessage="No workouts found." />
        )}
      </div>
    </section>
  );
}

export default Workouts;
