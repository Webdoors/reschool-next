import NextImage, { StaticImageData } from "next/image";

interface ResponsiveImageProps {
  link: string | StaticImageData;
  name: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  aspectRatio?: string | number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  link,
  name,
  width,
  height,
  className,
  style,
  fill,
  priority,
  unoptimized,
  aspectRatio,
}) => {
  const sanitizeUrl = (url: string) => {
    if (!url || url.includes("undefined") || url.includes("null")) {
      return "";
    }
    // Standardize to exactly double-slash format for this specific domain as requested
    let cleaned = url;
    if (cleaned.includes("api.reschool.world")) {
      // First, collapse any existing multiple slashes after the domain to a single one
      cleaned = cleaned.replace(/(api\.reschool\.world)\/+/g, "$1/");
      // Then, ensure it has exactly two slashes
      cleaned = cleaned.replace("api.reschool.world/", "api.reschool.world//");
    }
    // Handle duplicated storage segments
    cleaned = cleaned.replace(/\/+storage\/+storage\//g, "/storage/");

    // Handle doubled absolute URLs (occurs when base is prepended to an already absolute URL)
    if (cleaned.includes("http") && cleaned.lastIndexOf("http") > 0) {
      cleaned = cleaned.substring(cleaned.lastIndexOf("http"));
    }
    return cleaned;
  };

  const imageUrl = typeof link === "string" ? sanitizeUrl(link) : link;
  const isStatic = typeof link === "object" && link !== null && "src" in link;

  // Force unoptimized for the specific domain to avoid Next.js proxy 404s with double slashes
  const forceUnoptimized =
    unoptimized ||
    (typeof imageUrl === "string" && imageUrl.includes("api.reschool.world"));

  // For unoptimized remote images OR images from our specific backend that doesn't like the Next.js proxy,
  // use a standard img tag. This is more reliable for unusual URL patterns like //storage/
  if (
    typeof imageUrl === "string" &&
    (forceUnoptimized || (!width && !height && !fill))
  ) {
    if (!imageUrl) return null;
    return (
      <img
        src={imageUrl}
        alt={name}
        className={className}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : aspectRatio ? "auto" : "auto",
          objectFit: "cover",
          aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
          ...style,
        }}
      />
    );
  }

  // Next.js Image requires either width/height OR fill for remote images.
  // We default to fill if dimensions are missing for a remote link.
  const shouldFill = fill || (!width && !height && !isStatic);

  if (shouldFill) {
    if (!imageUrl) return null;
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: width || "100%",
          height: height || (aspectRatio ? "auto" : "100%"),
          aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
          ...style,
        }}
      >
        <NextImage
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          priority={priority}
          unoptimized={forceUnoptimized}
        />
      </div>
    );
  }

  // Otherwise, use traditional NextImage which works well for StaticImageData
  // and for remote images with provided dimensions.
  if (!imageUrl) return null;
  return (
    <NextImage
      src={imageUrl}
      alt={name}
      width={width}
      height={height}
      className={className}
      style={{
        maxWidth: "100%",
        width: height ? (width ? "100%" : "auto") : width ? "100%" : undefined,
        height: width && !height ? "auto" : height ? "auto" : "auto",
        aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
        ...style,
      }}
      priority={priority}
      unoptimized={forceUnoptimized}
    />
  );
};

export default ResponsiveImage;
