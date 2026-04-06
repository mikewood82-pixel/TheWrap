import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useWrapPlus } from '../context/WrapPlusContext'

interface ProGateProps {
  children: React.ReactNode
  preview?: React.ReactNode
  feature?: string
}

export default function ProGate({ children, preview, feature }: ProGateProps) {
  const { isPro } = useWrapPlus()

  if (isPro) return <>{children}</>

  return (
    <div className="relative">
      {preview && (
        <div className="pointer-events-none select-none">
          <div className="opacity-40 blur-[2px]">{preview}</div>
        </div>
      )}
      <div className={`${preview ? 'absolute inset-0' : ''} flex items-center justify-center`}>
        <div className="bg-brand-dark text-brand-cream rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl border border-brand-terracotta/30">
          <div className="w-12 h-12 bg-brand-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={22} className="text-brand-terracotta" />
          </div>
          <div className="text-brand-gold text-xs uppercase tracking-widest font-medium mb-2">Wrap+</div>
          <h3 className="font-serif text-xl font-bold mb-2">
            {feature ?? 'This is a Wrap+ feature'}
          </h3>
          <p className="text-brand-cream/60 text-sm mb-6 leading-relaxed">
            Full vendor database, comparison tools, deep dives, and premium newsletter content — included with Wrap+.
          </p>
          <Link
            to="/subscribe"
            className="block bg-brand-terracotta text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors mb-3"
          >
            Upgrade to Wrap+
          </Link>
          <Link to="/subscribe" className="text-brand-cream/40 text-xs hover:text-brand-cream transition-colors">
            See what's included →
          </Link>
        </div>
      </div>
    </div>
  )
}
