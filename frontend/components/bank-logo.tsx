import Link from "next/link"

interface BankLogoProps {
  size?: "sm" | "default"
}

export function BankLogo({ size = "default" }: BankLogoProps) {
  const logoSize = size === "sm" ? "h-5 w-5" : "h-6 w-6"
  const textSize = size === "sm" ? "text-base" : "text-xl"

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${logoSize} text-primary`}>
          <path
            d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6L7.5 8.5V15.5L12 18L16.5 15.5V8.5L12 6Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 6V18" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 8.5L16.5 15.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 8.5L7.5 15.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className={`font-bold ${textSize}`}>Floosy</span>
    </Link>
  )
}
