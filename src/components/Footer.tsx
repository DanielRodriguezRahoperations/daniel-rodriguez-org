export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Name / copyright */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <span className="font-display text-lg font-semibold text-white/60">
            Daniel Rodriguez
          </span>
          <span className="hidden md:block w-px h-4 bg-white/10" />
          <span className="font-sans text-xs text-white/25">
            &copy; {currentYear} Daniel Rodriguez. All rights reserved.
          </span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-8">
          {['LinkedIn', 'Instagram', 'Twitter/X'].map((platform) => (
            <a
              key={platform}
              href="#"
              className="font-sans text-xs tracking-widest uppercase text-white/25 hover:text-gold transition-colors duration-300"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
