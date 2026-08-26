import { FaInstagram } from "react-icons/fa";

function InstagramCard({ image, alt }) {
  return (
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden"
      aria-label="View Earthmool on Instagram"
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
        <FaInstagram
          size={32}
          className="scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        />
      </div>
    </a>
  );
}

export default InstagramCard;