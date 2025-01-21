'use client'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0">
        {/* Primary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 via-purple-300/40 to-blue-300/40 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-blue-500/20 animate-gradient-x" />

        {/* Secondary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-200/30 via-fuchsia-200/30 to-cyan-200/30 dark:from-violet-500/10 dark:via-fuchsia-500/10 dark:to-cyan-500/10 animate-gradient-x [animation-delay:2s]" />

        {/* Accent gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 via-sky-200/20 to-emerald-200/20 dark:from-indigo-500/5 dark:via-sky-500/5 dark:to-emerald-500/5 animate-gradient-x [animation-delay:4s]" />

        {/* Overlay gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>
    </div>
  )
}

