import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      window.location.href = '/dashboard';
    }, 1500);
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
                  src="https://lh3.googleusercontent.com/aida/AEtjO1U7tIH3vnC8d-1Uq9bhAp02iEKrysD-mYy5LqcrDf2m_6qiM-qctqlw8TClDUCDJnhWZpsPLDVzwryxmplQuSumGvGMXGxtepBRKQw6jfIK3jiCh4uYXtyZZ4Ofl0fgkO6LHaK-5KB9AuuSDjPCb0D8fL1ZDZvDjgCR6pwIZnRHczpv_BJdSgw5pLaYgmS9seq79om9pLfAyfTqh4Kxk9hn9BJRjjZhoH-L78TeRvm4jmFdi-BaNj8pMaY"
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
                    <span className="font-label-md text-label-md">Track Progress</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-primary text-base">
                      bookmarks
                    </span>
                    <span className="font-label-md text-label-md">Categorize & Tag</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-primary text-base">
                      edit_note
                    </span>
                    <span className="font-label-md text-label-md">Personal Notes</span>
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
                    Please enter your details to sign in.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-lg">
                        mail
                      </span>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface focus:shadow-[0_0_0_2px_#6366f1] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-md text-label-md text-on-surface"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <a
                        href="#forgot"
                        className="font-label-sm text-label-sm text-primary hover:underline focus:outline-none"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-lg">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface focus:shadow-[0_0_0_2px_#6366f1] transition-all"
                      />
                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 text-outline hover:text-on-surface focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded text-primary-container focus:ring-0 focus:outline-none accent-primary cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Remember for 30 days
                      </span>
                    </label>
                  </div>

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
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <span className="material-symbols-outlined text-base">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="font-label-lg text-primary hover:underline focus:outline-none"
                    >
                      Create account
                    </Link>
                  </p>
                </div>

                <div className="relative my-7 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-surface-container-highest" />
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="font-body-sm text-body-sm text-outline leading-normal">
                    Authentication is securely handled by your verified authentication
                    provider.
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