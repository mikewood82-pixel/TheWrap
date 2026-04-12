import { useState } from 'react'
import { Copy, Check, Gift, Users, ArrowRight } from 'lucide-react'
import { useUser, SignInButton } from '@clerk/clerk-react'
import SEO from '../components/SEO'

const GOAL = 3

export default function ReferralPage() {
  const { isSignedIn, user } = useUser()
  const [copied, setCopied] = useState(false)

  // MVP: referral count stored in Clerk public metadata (default 0)
  const referrals = (user?.publicMetadata?.referrals as number) ?? 0
  const referralCode = user?.id?.slice(-8) ?? ''
  const referralLink = `https://ilovethewrap.com/?ref=${referralCode}`
  const progress = Math.min(referrals, GOAL)
  const earned = referrals >= GOAL

  function handleCopy() {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <SEO
        title="Refer a Friend"
        description="Refer 3 friends to The Wrap and get a free month of Wrap+."
        url="/referral"
      />

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-terracotta/10 mb-5">
          <Gift size={28} className="text-brand-terracotta" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-3">Share The Wrap</h1>
        <p className="text-brand-dark/60 text-lg max-w-md mx-auto">
          Refer 3 friends who subscribe and get a free month of Wrap+ — full vendor intel, comparison tools, and premium content.
        </p>
      </div>

      {!isSignedIn ? (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 text-center">
          <Users size={24} className="text-brand-muted mx-auto mb-3" />
          <p className="text-brand-dark/60 mb-5">Sign in to get your personal referral link.</p>
          <SignInButton mode="modal">
            <button className="bg-brand-terracotta text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors">
              Sign in to start referring
            </button>
          </SignInButton>
        </div>
      ) : (
        <>
          {/* Referral link */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 mb-6">
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-3">Your Referral Link</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-4 py-3 text-sm text-brand-dark font-mono truncate">
                {referralLink}
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 bg-brand-terracotta text-white px-4 py-3 rounded-lg hover:bg-brand-orange transition-colors inline-flex items-center gap-2 text-sm font-medium"
              >
                {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </button>
            </div>
            <p className="text-xs text-brand-dark/40 mt-3">
              Share this link on LinkedIn, Slack, email — anywhere your HR tech peers hang out.
            </p>
          </div>

          {/* Progress */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium">Your Progress</div>
              <span className="text-sm font-semibold text-brand-dark">{progress} / {GOAL} referrals</span>
            </div>

            {/* Progress bar */}
            <div className="bg-brand-surface rounded-full h-3 overflow-hidden mb-4">
              <div
                className="h-3 rounded-full bg-brand-terracotta transition-all duration-500"
                style={{ width: `${(progress / GOAL) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`text-center p-3 rounded-xl border ${
                    referrals >= step
                      ? 'bg-brand-terracotta/10 border-brand-terracotta/30 text-brand-terracotta'
                      : 'bg-brand-surface border-brand-border text-brand-dark/30'
                  }`}
                >
                  <div className="text-2xl font-bold mb-1">{referrals >= step ? '✓' : step}</div>
                  <div className="text-xs font-medium">
                    {step < 3 ? 'Friend subscribed' : 'Free month unlocked'}
                  </div>
                </div>
              ))}
            </div>

            {earned && (
              <div className="mt-5 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4 text-center">
                <div className="font-serif font-bold text-lg mb-1">You earned a free month of Wrap+!</div>
                <p className="text-sm">Your credit will be applied to your next billing cycle.</p>
              </div>
            )}
          </div>

          {/* How it works */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
            <div className="text-xs text-brand-dark/40 uppercase tracking-wide font-medium mb-4">How It Works</div>
            <div className="space-y-4">
              {[
                { step: '1', text: 'Share your unique link with friends and colleagues' },
                { step: '2', text: 'When they subscribe to The Wrap using your link, it counts' },
                { step: '3', text: 'Hit 3 referrals and get a free month of Wrap+ — automatically applied' },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-terracotta text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <p className="text-sm text-brand-dark/70 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
