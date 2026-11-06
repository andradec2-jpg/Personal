import { useState } from 'react';

export default function LoginForm({ onLogin, onRegister, busy, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (busy) return;

    if (mode === 'register') {
      if (password !== confirmPassword) {return;}

      void onRegister(username, password);
      return;
    }

    void onLogin(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log into Messenger</h2>

      <label>
        <input
	  type="radio"
	  checked={
	    mode === 'login'
	  }
	  onChange={() =>
	    setMode(
	      'login'
	    )
	  }
        />
        Log In
      </label>

      <label>
        <input
	  type="radio"
	  checked={
	    mode === 'register'
	  }
	  onChange={() =>
	    setMode(
	      'register'
	    )
	  }
        />
        Create Account
      </label>

      <label htmlFor="username">Username</label>
      <input id="username" autoComplete="username" required
	value={username} onChange={(event) => setUsername(event.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" autoComplete="current-password" required
	value={password} onChange={(event) => setPassword(event.target.value)} />

    {mode === 'register' && (
      <>
        <label htmlFor="confirm-password"> Confirm Password </label>
        <input id="confirm-password" type="password" required
          value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
      </>
    )}

      <button disabled={busy} type="submit">
	{busy 
	  ? 'Working' : mode === 'register'
	    ? 'Create Account'
	    : 'Log In'}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}
