import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container-sm" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

      <h1 style={{ marginBottom: '2rem' }}>About Placeholder</h1>

      <div className="card">
        <h2>Our Mission</h2>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div className="card">
        <h2>How It Works</h2>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        </p>
      </div>

      <div className="card">
        <h2>Documentation</h2>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
        </p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Getting Started</h3>
        <p style={{ marginBottom: '1rem' }}>
          Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        </p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Creating Projects</h3>
        <p style={{ marginBottom: '1rem' }}>
          Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
        </p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Managing Updates</h3>
        <p>
          Cras placerat accumsan nulla. Nullam rutrum. Nam vestibulum accumsan nisl. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </p>
      </div>
    </div>
  )
}