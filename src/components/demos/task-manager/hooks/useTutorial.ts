import { useState } from 'react'
import { TUTORIAL_STEPS } from '../constants'

// Steps are 1-based; 0 means the tutorial card is hidden.
export function useTutorial() {
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState(false)

  return {
    step,
    current: step > 0 ? TUTORIAL_STEPS[step - 1] : null,
    total: TUTORIAL_STEPS.length,
    /** Show the first step unless the user already completed or skipped it */
    startIfNew: () => setStep(finished ? 0 : 1),
    restart: () => setStep(1),
    /** Move on only if the user is on `from`, so actions out of order don't skip steps */
    advanceFrom: (from: number) => setStep(s => (s === from ? s + 1 : s)),
    finish: () => {
      setStep(0)
      setFinished(true)
    },
    hide: () => setStep(0),
  }
}
