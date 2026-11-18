import { useParams, Link, Navigate } from "react-router-dom";
import { siteConfig } from "@/config/site";
import SEOHead from "@/components/kit/SEOHead";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = siteConfig.blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = siteConfig.blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.publishedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.baseUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        ogImage={post.image}
        canonical={`${siteConfig.baseUrl}/blog/${post.slug}`}
        schema={blogSchema}
      />

      <article className="mx-auto max-w-4xl space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <Link to="/" className="hover:text-amber-400">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-amber-400">Blog</Link>
          <span>/</span>
          <span className="text-zinc-200 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 font-semibold font-mono">
              {post.category}
            </span>
            <span className="text-zinc-400">• {post.readTime}</span>
            <span className="text-zinc-400">• Published {post.publishedDate}</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
            />
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-amber-400">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 leading-relaxed">
          <p className="text-base md:text-lg font-medium text-zinc-200 border-l-4 border-amber-500 pl-4 py-1 bg-amber-500/5 rounded-r-lg">
            {post.content.introduction}
          </p>

          {post.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4 pt-4 border-t border-zinc-800/60">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                {section.body}
              </p>

              {section.callout && (
                <div className="my-4 rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 text-xs md:text-sm text-amber-200 shadow-lg">
                  💡 {section.callout}
                </div>
              )}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 text-sm text-zinc-300 list-disc list-inside bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  {section.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Summary & Next Steps</h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-800">
          <span className="text-xs text-zinc-400 font-mono">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300 border border-zinc-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Embedded Callout Box for Product Services */}
        <div className="my-8 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 p-6 md:p-8 space-y-4 text-center shadow-2xl">
          <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 font-mono">
            Register It Yourself (RIY)
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Need Expert CAC Assistance Today?
          </h3>
          <p className="text-xs md:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Whether you want to follow our step-by-step DIY ebook guide or share your screen 1-on-1 on Zoom, we ensure your business is approved without extra agent fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/ebook"
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-amber-400 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Download DIY Ebook Guide (₦10,000)
            </Link>
            <Link
              to="/do-it-with-us"
              className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Book 1-on-1 Zoom Session (₦25,000)
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Related CAC Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all"
                >
                  <div>
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="w-full aspect-[16/10] object-cover rounded-xl mb-3"
                    />
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2 mt-1 mb-2">
                      <Link to={`/blog/${rPost.slug}`} className="hover:text-amber-400">
                        {rPost.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    to={`/blog/${rPost.slug}`}
                    className="text-xs font-bold text-amber-400 hover:underline pt-2 border-t border-zinc-800"
                  >
                    Read Article →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
