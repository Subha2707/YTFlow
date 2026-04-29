export default function Loader() {
  return (
    <div className="loader-container">
      <div className="typing-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p style={{ marginLeft: 15, color: '#00ffc4' }}>AI is generating content...</p>
    </div>
  );
}