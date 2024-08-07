export function Bold({ children }: { children: React.ReactNode }) {
  return (
    <span className="fw-bold">{children}</span>
  )
}

export function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span className="fst-italic">{children}</span>
  )
}

export function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-decoration-underline">{children}</span>
  )
}