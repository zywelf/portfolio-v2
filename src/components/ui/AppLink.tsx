import type { ComponentProps } from 'react'
import { Link as LocaleLink } from '../../../i18n/navigation'

type AppLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string }

// Internal paths ("/...") go through the locale-aware Link so they keep /it or /en;
// anything else opens in a new tab with safe rel attributes.
export default function AppLink({ href, ...props }: AppLinkProps) {
  if (href.startsWith('/')) return <LocaleLink href={href} {...props} />
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}
