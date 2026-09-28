import { useState } from 'react';
import { authService } from '../services/authService';

export default function Login() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await authService.login();
    } catch (error) {
      console.error('Unable to start authentication:', error);
      setSubmitting(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setSubmitting(true);
      await authService.login();
    } catch (error) {
      console.error('Unable to start authentication:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex items-center justify-center min-h-screen">
      <main className="w-full">
        <div className="flex flex-col w-full">
          <div className="w-full min-h-[calc(100vh-2rem)] flex flex-col lg:flex-row items-stretch justify-stretch overflow-hidden">

            {/* Left Hero */}
            <div className="relative w-full lg:w-7/12 bg-surface-container-low flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">

              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" />

              <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-fixed/50 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center gap-3">
                <img
                  alt="Book Manager Logo"
                  className="w-10 h-10 object-contain rounded-lg shadow-sm"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1U7tIH3vnC8d-1Uq9bhAp02iEKrysD-mYy5LqcrDf2m_6qiM-qctqlw8TClDUCDJnhWZpsPLDVzwryxmplQuSumGvGMXGxtepBRKQw6jfIK3jiCh4uYXtyZZ4Ofl0fgkO6LHaK-5KB9AuuSDjPCb0D8fL1ZDZvDjgCR6pwIZnRHczpv_BdJdSgw5pLaYgmS9seq79om9pLfAyfTqh4Kxk9hn9BJRjjZhoH-L78TeRvm4jmFdi-BaNj8pMaY"
                />

                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                    Book Manager
                  </span>

                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Personal Catalog & Insights
                  </span>
                </div>
              </div>

              <div className="relative z-10 my-12 lg:my-0 max-w-xl">
                <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">
                  Manage your reading journey
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                  Book Manager helps organize your entire library, set ambitious reading
                  targets, and effortlessly capture marginalia and profound insights in one
                  focused, distraction-free harbor.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">

                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-primary text-base">
                      auto_graph
                    </span>

                    <span className="font-label-md text-label-md">
                      Track Progress
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-primary text-base">
                      bookmarks
                    </span>

                    <span className="font-label-md text-label-md">
                      Categorize & Tag
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-primary text-base">
                      edit_note
                    </span>

                    <span className="font-label-md text-label-md">
                      Personal Notes
                    </span>
                  </div>

                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 font-label-sm text-label-sm text-outline" />
            </div>

            {/* Right Auth Panel */}
            <div className="w-full lg:w-5/12 bg-surface-container-lowest flex items-center justify-center p-6 sm:p-10 lg:p-14">

              <div className="w-full max-w-md flex flex-col justify-center">

                <div className="mb-8">
                  <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2 tracking-tight">
                    Welcome back
                  </h2>

                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Sign in securely to access your personal book library.
                  </p>
                </div>

                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >

                  {/* Authentication information */}
                  <div className="rounded-lg bg-surface-container-low p-4">
                    <div className="flex items-start gap-3">

                      <span className="material-symbols-outlined text-primary text-xl">
                        lock
                      </span>

                      <div>
                        <p className="font-label-md text-label-md text-on-surface">
                          Secure sign-in
                        </p>

                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                          You will be securely redirected to Cognito to sign in.
                          Your password is never entered into this application.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 mt-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-75"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">
                          progress_activity
                        </span>

                        <span>
                          Redirecting to sign in...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Sign In
                        </span>

                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>

                </form>

                {/* Create Account */}
                <div className="text-center mt-6">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Don't have an account?{' '}

                    <button
                      type="button"
                      onClick={handleCreateAccount}
                      disabled={submitting}
                      className="font-label-lg text-primary hover:underline focus:outline-none disabled:opacity-50"
                    >
                      Create account
                    </button>
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-7 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-surface-container-highest" />
                  </div>
                </div>

                {/* Security information */}
                <div className="pt-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-base">
                      verified_user
                    </span>

                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Secure authentication
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-outline leading-normal">
                    Authentication is securely handled by Amazon Cognito.
                    Your credentials are not stored by Book Manager.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
