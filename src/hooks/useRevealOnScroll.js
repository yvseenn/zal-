import { useEffect } from 'react'

// Small hook that marks visible blocks once, avoiding repeated animation churn.
export function useRevealOnScroll() {
  useEffect(() => {
    // Any block with data-reveal participates automatically.
    const elements = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          // Persist reveal state outside React className updates.
          entry.target.setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    // Observe every reveal block found on mount.
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}
