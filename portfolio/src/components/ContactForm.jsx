
import { useState } from 'react';
import { Send, Check } from './Icons';
import { profile } from '../data/portfolio';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const targetEmail = profile.email || 'joshipriyanshu125@gmail.com';
      const endpoint =
        import.meta.env.VITE_CONTACT_ENDPOINT ||
        (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
          ? 'https://api.web3forms.com/submit'
          : `https://formsubmit.co/ajax/${targetEmail}`);

      const bodyData = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
        ? {
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.name}`,
          }
        : {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Contact Message from ${formData.name}`,
            _template: 'table',
            _captcha: 'false',
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success === 'true' || data.success === true) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(
          data.message || 'Failed to send message. Please try emailing directly.'
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Transmission failed. Please try emailing directly.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-card form-success-card">
        <div className="success-icon-badge">
          <Check size={22} />
        </div>
        <h3>Transmission Delivered!</h3>
        <p>
          Thank you for reaching out! Your message has been sent directly to{' '}
          <strong>{profile.email}</strong>. Priyanshu will get back to you as soon as possible.
        </p>
        <button
          className="button outline-pill"
          type="button"
          onClick={() => setStatus('idle')}
        >
          Send another transmission <Send size={14} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-card">
      {status === 'error' && (
        <div className="form-error-alert">
          <p>⚠️ {errorMessage}</p>
          <a href={`mailto:${profile.email}`} className="error-fallback-link">
            Send email directly to {profile.email} ↗
          </a>
        </div>
      )}

      <label>
        Name
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
        />
      </label>

      <label>
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
        />
      </label>

      <label>
        Message
        <textarea
          required
          name="message"
          placeholder="Tell me about your project or inquiry..."
          rows="4"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
        />
      </label>

      <button
        className="button primary-pill"
        type="submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <span className="spinner-loading">⏳</span> Transmitting...
          </>
        ) : (
          <>
            Send transmission <Send />
          </>
        )}
      </button>
    </form>
  );
}
