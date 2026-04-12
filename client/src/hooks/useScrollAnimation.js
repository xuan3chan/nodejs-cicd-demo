import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and whether the element is visible.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}

/**
 * Custom hook for parallax scrolling effect.
 * Returns the scroll offset that can be used for transform calculations.
 */
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.innerHeight - rect.top
      if (scrolled > 0) {
        setOffset(scrolled * speed)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}
