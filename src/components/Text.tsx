export function Bold({ className, ...props }: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
  return (
    <span className={`fw-bold ${className}`} {...props} />
  )
}

export function Italic({ className, ...props }: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
  return (
    <span className={`fst-italic ${className}`} {...props} />
  )
}

export function Underline({ className, ...props }: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
  return (
    <span className={`text-decoration-underline ${className}`} {...props} />
  )
}