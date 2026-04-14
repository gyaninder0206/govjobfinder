export default function SoftBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="
          absolute left-1/2 top-20
          -translate-x-1/2
          h-[460px] w-[980px]
          rounded-full
          bg-gradient-to-tr from-violet-800/40 to-transparent
          blur-3xl
        "
      />

      <div
        className="
          absolute bottom-10 right-12
          h-[220px] w-[420px]
          rounded-full
          bg-gradient-to-bl from-fuchsia-700/40 to-transparent
          blur-2xl
        "
      />
    </div>
  );
}
