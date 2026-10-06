export const FocusBackdrop = ({ isVisible, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 bg-slate-900/50 backdrop-blur-sm visible"
          : "opacity-0 bg-transparent backdrop-blur-none invisible pointer-events-none"
      }`}
    />
  );
};