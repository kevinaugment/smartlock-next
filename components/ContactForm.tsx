'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`
        window.location.href = `mailto:support@slockhub.com?subject=${encodeURIComponent(subject || 'Contact from SLockHub.com')}&body=${body}`
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="content-card" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '1.125rem', marginBottom: 'var(--space-sm)' }}>
                    Your email client should open shortly.
                </p>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Please send the pre-filled email to complete your message.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-secondary"
                    style={{ marginTop: 'var(--space-md)' }}
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="content-card" style={{ padding: 'var(--space-xl)' }}>
            <h2 className="section-title" style={{ marginBottom: 'var(--space-lg)' }}>Send a Message</h2>

            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                <label htmlFor="contact-name" className="form-label">Name</label>
                <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Your name"
                />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                <label htmlFor="contact-email" className="form-label">Email</label>
                <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@example.com"
                />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                    placeholder="What is this about?"
                />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-input"
                    placeholder="Tell us how we can help..."
                    style={{ resize: 'vertical' }}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send className="w-5 h-5" /> Send Message
            </button>
        </form>
    )
}
