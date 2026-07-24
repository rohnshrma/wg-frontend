import BlogDetailContent from "./BlogDetailContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    description: `Read "${title}" on the WebiGeeks blog — insights on tech, career tips, and industry trends.`,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailContent slug={slug} />;
}
