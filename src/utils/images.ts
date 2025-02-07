"use server";
import sharp from "sharp";

const FALLBACK_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==";

function bufferToBase64(buffer: Buffer): string {
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function getBuffer(url: string): Promise<Buffer> {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) throw new Error("Failed to fetch image");
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export async function getPlaceholderImage(url: string) {
  try {
    // Handle remote URLs differently from local URLs
    const imageBuffer = await getBuffer(
      url.startsWith("http")
        ? url // Direct remote URL
        : `${process.env.NEXT_URL}_next/image?url=${encodeURIComponent(url)}&w=48&q=50`, // Local URL
    );

    const resizedBuffer = await sharp(imageBuffer)
      .resize(10, 10, { fit: "inside" }) // Smaller size, still effective
      .jpeg({ quality: 20, progressive: true }) // Use progressive JPEG with low quality
      .toBuffer();

    return {
      placeholder: bufferToBase64(resizedBuffer),
    };
  } catch {
    return { placeholder: FALLBACK_BLUR_DATA_URL };
  }
}
