import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

      <h1 style={{ marginBottom: '1rem' }}>Contact Us</h1>
      <p className="text-secondary" style={{ marginBottom: '2rem' }}>
        Have a question or feedback? We'd love to hear from you.
      </p>

      <div className="card">
        <ContactForm />
      </div>
    </div>
  )
}