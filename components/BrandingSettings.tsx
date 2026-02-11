'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface BrandingSettingsProps {
  userId: string
  currentTier: string
  currentBranding: {
    logo_url?: string
    primary_color?: string
    company_name?: string
  }
}

export default function BrandingSettings({ userId, currentTier, currentBranding }: BrandingSettingsProps) {
  const [companyName, setCompanyName] = useState(currentBranding.company_name || '')
  const [primaryColor, setPrimaryColor] = useState(currentBranding.primary_color || '#0f172a')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState(currentBranding.logo_url || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const isPro = currentTier === 'pro'

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      let logoUrl = currentBranding.logo_url

      // Upload logo if new file selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop()
        const filePath = `logos/${userId}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, logoFile, {
            upsert: true,
            contentType: logoFile.type,
          })

        if (uploadError) {
          throw new Error(`Failed to upload logo: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath)
        
        logoUrl = publicUrl
      }

      // Update branding settings
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          branding_logo_url: logoUrl,
          branding_primary_color: primaryColor,
          branding_company_name: companyName,
        })
        .eq('id', userId)

      if (updateError) {
        throw new Error(`Failed to update branding: ${updateError.message}`)
      }

      setSuccess(true)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isPro) {
    return (
      <div style={{ 
        padding: '2rem', 
        background: 'var(--bg-secondary)', 
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        textAlign: 'center'
      }}>
        <p className="text-secondary" style={{ marginBottom: '1rem' }}>
          Customize your status pages with your own logo and colors.
        </p>
        <p className="text-secondary text-sm">
          Available on Pro plan
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="form-group">
        <label htmlFor="company-name">Company Name</label>
        <input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Your Company"
          disabled={loading}
        />
        <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
          Displayed on your status pages
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="logo">Logo</label>
        <div>
          {logoPreview && (
            <div style={{ marginBottom: '1rem' }}>
              <img 
                src={logoPreview} 
                alt="Logo preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '80px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem',
                  background: 'white'
                }} 
              />
            </div>
          )}
          <input
            id="logo"
            type="file"
            onChange={handleLogoChange}
            accept="image/png,image/jpeg,image/svg+xml"
            disabled={loading}
          />
          <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
            PNG, JPG, or SVG. Max 2MB. Recommended: 200x80px
          </p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="primary-color">Primary Color</label>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            id="primary-color"
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            disabled={loading}
            style={{ 
              width: '80px', 
              height: '40px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer'
            }}
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            placeholder="#0f172a"
            disabled={loading}
            style={{ flex: 1 }}
          />
        </div>
        <p className="text-secondary text-sm" style={{ marginTop: '0.25rem' }}>
          Used for buttons and accents on status pages
        </p>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="alert-success" style={{ marginBottom: '1rem' }}>
          Branding updated successfully!
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Branding'}
        </button>
      </div>
    </form>
  )
}