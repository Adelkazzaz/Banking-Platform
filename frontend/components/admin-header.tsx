interface AdminHeaderProps {
  title: string
  description: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
