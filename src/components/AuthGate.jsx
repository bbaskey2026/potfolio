import React, { useState } from 'react';
import { Mail, Chrome, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthGate({ onAuthSuccess, children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const styles = {
    body: {
      minHeight: '100vh',
      background: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      padding: '1rem'
    },
    container: {
      width: '100%',
      maxWidth: '540px',
      background: '#fff',
      borderRadius: '0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      border: '1px solid #e5e5e5'
    },
    header: {
      padding: '3rem 2rem 2rem',
      background: '#fff',
      borderBottom: '1px solid #e5e5e5',
      textAlign: 'center'
    },
    headerIcon: {
      width: '48px',
      height: '48px',
      background: '#f0f0f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
      color: '#333'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 0.5rem 0',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#666',
      margin: 0,
      fontWeight: '400'
    },
    content: {
      padding: '2rem'
    },
    buttonGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '2rem'
    },
    methodButton: {
      padding: '1.25rem 1rem',
      border: '1px solid #e5e5e5',
      background: '#fff',
      borderRadius: '0',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#666',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem'
    },
    methodButtonActive: {
      borderColor: '#333',
      background: '#f9f9f9',
      color: '#333',
      borderBottom: '3px solid #333',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#333',
      letterSpacing: '0.3px'
    },
    input: {
      padding: '0.875rem 1rem',
      border: '1px solid #e5e5e5',
      borderRadius: '0',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'border-color 0.3s',
      fontFamily: 'inherit',
      background: '#fff'
    },
    inputGroup: {
      position: 'relative'
    },
    inputWithIcon: {
      paddingRight: '2.5rem'
    },
    inputIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#999'
    },
    button: {
      padding: '0.875rem 1.5rem',
      border: 'none',
      borderRadius: '0',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      width: '100%',
      letterSpacing: '0.3px'
    },
    primaryButton: {
      background: '#333',
      color: '#fff',
      border: '1px solid #333'
    },
    googleButton: {
      background: '#fff',
      color: '#333',
      border: '1px solid #e5e5e5'
    },
    alert: {
      padding: '1rem 1.25rem',
      borderRadius: '0',
      fontSize: '0.9rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      border: '1px solid'
    },
    alertError: {
      background: '#fef5f5',
      color: '#c00',
      borderColor: '#fcc'
    },
    alertSuccess: {
      background: '#f5fef5',
      color: '#060',
      borderColor: '#cfc'
    },
    backButton: {
      marginTop: '1.5rem',
      padding: '0.875rem 1.5rem',
      border: '1px solid #e5e5e5',
      background: '#fff',
      borderRadius: '0',
      cursor: 'pointer',
      fontSize: '0.9rem',
      color: '#666',
      transition: 'all 0.3s',
      width: '100%',
      fontWeight: '600'
    },
    divider: {
      margin: '1.5rem 0',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: '#999',
      position: 'relative'
    },
    dividerLine: {
      borderBottom: '1px solid #e5e5e5',
      marginBottom: '1rem'
    },
    infoBox: {
      padding: '1.5rem',
      background: '#f9f9f9',
      borderRadius: '0',
      fontSize: '0.85rem',
      color: '#666',
      border: '1px solid #e5e5e5',
      marginTop: '1.5rem'
    },
    infoBold: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.75rem'
    }
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    setTimeout(() => {
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      setSuccess('Authentication successful!');
      setTimeout(() => {
        setIsAuthenticated(true);
        onAuthSuccess?.({ method: 'email', email });
      }, 1000);
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setError('');
    setSuccess('');
    setLoading(true);

    setTimeout(() => {
      setSuccess('Redirecting to Google...');
      
      setTimeout(() => {
        setIsAuthenticated(true);
        onAuthSuccess?.({ method: 'google', email: 'user@gmail.com' });
      }, 1500);
    }, 500);
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <Lock size={24} />
          </div>
          <h1 style={styles.title}>DSA Portfolio</h1>
          <p style={styles.subtitle}>Access curated C++ solutions and algorithms</p>
        </div>

        <div style={styles.content}>
          {!authMethod ? (
            <>
              <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Welcome to my Data Structures & Algorithms portfolio. Sign in to view my problem solutions, code analysis, and difficulty ratings.
              </p>

              <div style={styles.buttonGroup}>
                <button
                  style={{...styles.methodButton, ...styles.methodButtonActive}}
                  onClick={() => setAuthMethod('email')}
                >
                  <Mail size={20} />
                  Email
                </button>
                <button
                  style={styles.methodButton}
                  onClick={() => setAuthMethod('google')}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottomColor = '#333';
                    e.target.style.borderBottomWidth = '3px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottomColor = '#e5e5e5';
                    e.target.style.borderBottomWidth = '1px';
                  }}
                >
                  <Chrome size={20} />
                  Google
                </button>
              </div>

              <div style={styles.infoBox}>
                <div style={styles.infoBold}>Why sign in?</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.7' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Track your portfolio visits</li>
                  <li style={{ marginBottom: '0.5rem' }}>Personalized experience</li>
                  <li>Secure access to solutions</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {error && (
                <div style={{...styles.alert, ...styles.alertError}}>
                  <AlertCircle size={18} style={{flexShrink: 0, marginTop: '0.2rem'}} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div style={{...styles.alert, ...styles.alertSuccess}}>
                  <CheckCircle size={18} style={{flexShrink: 0, marginTop: '0.2rem'}} />
                  <span>{success}</span>
                </div>
              )}

              {authMethod === 'email' ? (
                <div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#333'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                      style={styles.input}
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputGroup}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#333'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                        style={{...styles.input, ...styles.inputWithIcon}}
                        placeholder="••••••••"
                        disabled={loading}
                      />
                      <div
                        style={styles.inputIcon}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleEmailAuth}
                    style={{...styles.button, ...styles.primaryButton, marginTop: '1rem'}}
                    disabled={loading}
                    onMouseEnter={(e) => !loading && (e.target.style.background = '#000')}
                    onMouseLeave={(e) => !loading && (e.target.style.background = '#333')}
                  >
                    {loading ? 'Authenticating...' : 'Continue with Email'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGoogleAuth}
                  style={{...styles.button, ...styles.googleButton, marginTop: '1rem'}}
                  disabled={loading}
                  onMouseEnter={(e) => !loading && (e.target.style.background = '#f5f5f5')}
                  onMouseLeave={(e) => !loading && (e.target.style.background = '#fff')}
                >
                  {loading ? 'Redirecting...' : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>
              )}

              <button
                style={styles.backButton}
                onClick={() => {
                  setAuthMethod(null);
                  setEmail('');
                  setPassword('');
                  setError('');
                  setSuccess('');
                }}
                onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                onMouseLeave={(e) => e.target.style.background = '#fff'}
              >
                Back to Options
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}