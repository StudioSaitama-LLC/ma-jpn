export function GrainOverlay() {
  return (
    <>
      {/* Sumi ink texture overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.07] mix-blend-multiply overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/textures/sumi-01.jpg`}
          alt=""
          className="w-full h-full object-cover sumi-animate"
        />
      </div>
      {/* Subtle grain */}
      <div className="grain-overlay fixed inset-0 z-[100]" />
    </>
  );
}
