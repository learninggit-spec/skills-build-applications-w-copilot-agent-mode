function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return <span className="text-body-secondary">—</span>;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item)
      )
      .join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function formatHeading(field) {
  return field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function DataTable({ caption, rows, emptyMessage }) {
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row || {})))];

  if (rows.length === 0) {
    return <p className="alert alert-light border mb-0">{emptyMessage}</p>;
  }

  if (columns.length === 0) {
    return <p className="alert alert-light border mb-0">No fields to display.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <caption className="visually-hidden">{caption}</caption>
        <thead className="table-light">
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {formatHeading(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row?.id ?? row?._id ?? index}>
              {columns.map((column) => (
                <td key={column}>{formatValue(row?.[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
