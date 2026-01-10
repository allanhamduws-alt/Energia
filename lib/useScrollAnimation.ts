'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasTriggered.current) return

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
    if (isInViewport) {
      // Use setTimeout to ensure CSS transitions work after hydration
      setTimeout(() => {
        setIsVisible(true)
        hasTriggered.current = true
      }, 50)
      if (triggerOnce) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsVisible(true)
          hasTriggered.current = true
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}

// Hook for animating multiple elements with staggered delays
export function useScrollAnimationGroup(
  count: number,
  options: UseScrollAnimationOptions = {}
): [RefObject<HTMLDivElement | null>, boolean[]] {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(count).fill(false)
  )
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const hasTriggered = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasTriggered.current) return

    const triggerStaggeredAnimation = () => {
      hasTriggered.current = true
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          setVisibleItems((prev) => {
            const next = [...prev]
            next[i] = true
            return next
          })
        }, i * 100) // 100ms delay between each item
      }
    }

    // Check if element is already in viewport on mount
    const rect = container.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
    if (isInViewport) {
      setTimeout(() => {
        triggerStaggeredAnimation()
      }, 50)
      if (triggerOnce) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          triggerStaggeredAnimation()
          if (triggerOnce) {
            observer.unobserve(container)
          }
        } else if (!triggerOnce) {
          setVisibleItems(Array(count).fill(false))
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [count, threshold, rootMargin, triggerOnce])

  return [containerRef, visibleItems]
}

// Hook for counter animation
export function useCountAnimation(
  end: number,
  duration: number = 2000
): [RefObject<HTMLSpanElement | null>, number] {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(end)
            }
          }
          
          requestAnimationFrame(animate)
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [end, duration, hasAnimated])

  return [ref, count]
}
