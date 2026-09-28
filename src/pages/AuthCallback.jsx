import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const errorParam = params.get('error');

      if (errorParam) {
        setError(params.get('error_description') || errorParam);
        return;
      }

      if (!code) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        await authService.handleCallback(code);

        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err.message || 'Authentication failed.');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <h2 className="font-heading text-xl font-semibold text-on-surface">
            Sign-in failed
          </h2>

          <p className="mt-2 text-on-surface-variant">
            {error}
          </p>

          <button
            onClick={() => navigate('/login')}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-3">
        <span className="material-symbols-outlined animate-spin text-primary text-[32px]">
          progress_activity
        </span>

        <p className="font-body-md text-on-surface-variant">
          Signing you in...
        </p>
      </div>
    </div>
  );
}