import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  if (!error) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: '10px 20px',
        backgroundColor: '#ff9000',
        color: 'white',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {error}
    </div>
  );
}

export default ErrorMessage;
