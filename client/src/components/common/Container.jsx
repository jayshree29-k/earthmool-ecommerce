function Container({ children }) {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;