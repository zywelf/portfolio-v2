export default function StatusBar({ accent }: { accent: boolean }) {
  return (
    <div
      className={`flex h-12 flex-none items-center justify-between px-7.5 text-base font-semibold ${accent ? 'bg-tm-accent text-tm-on-accent' : ''}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-4 border border-current" />
        <div className="h-2.75 w-6 border border-current p-px">
          <div className="h-full w-7/10 bg-current" />
        </div>
      </div>
    </div>
  )
}
