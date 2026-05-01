export function LoadingScreen(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        fontFamily: 'sans-serif'
      }}
    >
      <b style={{color: '#4481c3'}}>Loading...</b>
    </div>
  );
}

