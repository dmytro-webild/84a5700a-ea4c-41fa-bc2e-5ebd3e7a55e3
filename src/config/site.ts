export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      callout?: string;
      bulletPoints?: string[];
    }[];
    conclusion: string;
  };
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
  schema?: object[];
}

export const siteConfig = {
  name: "Register It Yourself",
  shortName: "RIY",
  domain: "registerityourself.com",
  baseUrl: "https://registerityourself.com",
  email: "hello@registerityourself.com",
  phone: "+234 814 900 2026",
  whatsapp: "+234 814 900 2026",
  cacNumber: "BN 3892014",
  address: "Victoria Island, Lagos, Nigeria",
  disclaimer:
    "Register It Yourself provides general information and step-by-step guidance on the CAC registration process in Nigeria. It is not a law firm, does not provide legal advice, and is not affiliated with the Corporate Affairs Commission (CAC).",
  tagline: "Register your business with CAC. Yourself. This week.",
  positioning:
    "The trusted middle path: cheaper than an agent, clearer than YouTube, with a real person beside you if you want one.",
  socialLinks: {
    instagram: "https://instagram.com/registerityourself",
    tiktok: "https://tiktok.com/@registerityourself",
    twitter: "https://x.com/registerityself",
    whatsapp: "https://wa.me/2348149002026",
  },
  founder: {
    name: "Dr. Michelle",
    title: "Physician & Founder",
    storyHeadline: "Name approved in 3 minutes without paying agent fees.",
    bio: "After paying N65,000 to an agent who stopped responding for three weeks, Dr. Michelle decided to master the CAC portal herself. She got her business name approved in 3 minutes and created RIY to help thousands of Nigerian business owners save money and register with confidence.",
  },
  pricing: {
    ebook: {
      price: "₦10,000",
      amount: 10000,
      title: "Register It Yourself Ebook Guide",
      description: "Screen-by-screen CAC walkthrough for business names & LTD companies with templates & checklists.",
    },
    doItWithUs: {
      priceFull: "₦25,000",
      amountFull: 25000,
      priceUpgrade: "₦15,000",
      amountUpgrade: 15000,
      depositAmount: 7500,
      depositPrice: "₦7,500",
      balanceNew: "₦17,500",
      balanceUpgrade: "₦7,500",
      title: "Do It With Us 1-on-1 Guided Session",
      description: "Full ebook + live 1-on-1 screen session from name search to CAC submission + 2 custom letterhead designs.",
    },
    orderBumpLetterheads: {
      price: "₦5,000",
      amount: 5000,
      title: "2 Custom Letterheads Order Bump",
    },
    addOns: [
      {
        id: "letterheads-2",
        title: "2 Custom Letterhead Designs",
        badge: "Included in Do It With Us",
        price: "₦5,000",
        amount: 5000,
        description: "Print-ready PDF + editable Word/Docs template formatted for official company correspondence.",
        popular: true,
      },
      {
        id: "letterhead-extra",
        title: "Extra Letterhead Variations",
        badge: "Add-on",
        price: "₦3,000 each",
        amount: 3000,
        description: "Additional letterhead style variations for secondary brands or subsidiary divisions.",
        popular: false,
      },
      {
        id: "business-card",
        title: "Professional Business Card Design",
        badge: "Brand Identity",
        price: "₦5,000",
        amount: 5000,
        description: "Double-sided print-ready business card layout with QR code link to your website/WhatsApp.",
        popular: false,
      },
      {
        id: "email-signature",
        title: "Clickable HTML Email Signature",
        badge: "Corporate Email",
        price: "₦4,000",
        amount: 4000,
        description: "Clickable email signature for Gmail, Outlook & Apple Mail with social icons & phone link.",
        popular: false,
      },
      {
        id: "starter-kit",
        title: "Business Starter Documents Kit",
        badge: "Essential Templates",
        price: "₦12,000",
        amount: 12000,
        description: "Branded invoice, official receipt, business quotation, and standard service agreement contract templates.",
        popular: true,
      },
      {
        id: "trademark-support",
        title: "Trademark Filing Support",
        badge: "Legal Protection",
        price: "Quote-based",
        amount: 0,
        description: "Protect your logo and brand name across Class 35 & Class 42 in Nigeria with official trademark filing support.",
        quote: true,
      },
    ],
  },
  seo: {
    defaultTitle: "Register It Yourself (RIY) | CAC Registration Without Lawyer in Nigeria",
    defaultDescription:
      "Register your business name or LTD company independently with the Corporate Affairs Commission (CAC) in Nigeria. Step-by-step guide, free name generator, and 1-on-1 live session.",
    defaultKeywords: [
      "how to register business name in Nigeria",
      "CAC registration without lawyer",
      "register company CAC yourself",
      "business name generator Nigeria",
      "CAC online registration guide",
      "CAC approval process Nigeria",
      "business name search Nigeria",
      "register business name Lagos",
      "CAC portal walkthrough 2026",
    ],
    ogDefaultImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    pages: {
      home: {
        title: "Register Business Name in Nigeria | CAC Registration Without Lawyer",
        description:
          "Register your business name or LTD company with the Corporate Affairs Commission (CAC) yourself this week. Skip lawyer fees with our step-by-step guide and live 1-on-1 help.",
        keywords: [
          "how to register business name in Nigeria",
          "CAC registration without lawyer",
          "register company CAC yourself",
          "CAC approval in 3 minutes",
          "business registration guide Nigeria",
        ],
        ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/",
      },
      ebook: {
        title: "CAC Registration Ebook & Walkthrough — ₦10,000 | Register It Yourself",
        description:
          "Complete Register It Yourself ebook: screen-by-screen CAC portal walkthrough for Business Names & Limited Companies in Nigeria. Instant download with bonus document templates.",
        keywords: [
          "CAC registration ebook Nigeria",
          "how to register business name PDF guide",
          "CAC portal screen by screen walkthrough",
          "register company CAC template checklist",
        ],
        ogImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/ebook",
      },
      doItWithUs: {
        title: "Do It With Us — Live 1-on-1 CAC Registration Session (₦25,000 / ₦15,000 Upgrade)",
        description:
          "Book a live 1-on-1 Zoom or Meet session to complete your CAC business registration together step-by-step. Includes the full ebook, live expert session, and 2 custom letterhead designs.",
        keywords: [
          "CAC live registration assistance",
          "CAC registration Zoom session Nigeria",
          "1-on-1 business name registration help",
          "register company CAC expert guided session",
        ],
        ogImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/do-it-with-us",
      },
      nameGenerator: {
        title: "Free Business Name Generator Nigeria | CAC Search Ready Names",
        description:
          "Generate unique, CAC-ready business names for your Nigerian company in tech, retail, agriculture, healthcare, trade, and finance. Instant CAC availability tips included.",
        keywords: [
          "business name generator Nigeria",
          "CAC business name finder",
          "company name ideas Nigeria",
          "CAC name search tool",
        ],
        ogImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/name-generator",
      },
      addOns: {
        title: "Branded Add-ons & Design Services | Letterheads & Templates",
        description:
          "Order print-ready letterheads, business cards, clickable HTML email signatures, and legal document kits formatted for newly registered Nigerian businesses.",
        keywords: [
          "business letterhead design Nigeria",
          "corporate email signature design",
          "business starter kit invoice receipt templates",
          "trademark filing support Lagos Nigeria",
        ],
        ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/add-ons",
      },
      about: {
        title: "About Dr. Michelle & Register It Yourself (RIY) | Our Story",
        description:
          "Learn how Dr. Michelle got her business name registered on the CAC portal in 3 minutes without paying lawyer markups, and why RIY is empowering Nigerian founders.",
        keywords: [
          "Dr Michelle RIY founder story",
          "register business CAC without agent",
          "about Register It Yourself Nigeria",
        ],
        ogImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/about",
      },
      legal: {
        title: "Terms, Privacy Policy (NDPA-Compliant) & Booking Policy | RIY",
        description:
          "Official Terms of Service, NDPA-compliant Privacy Policy, and Booking Refund Policy for Register It Yourself. We delete ID documents immediately after your registration session.",
        keywords: [
          "RIY terms of service",
          "NDPA privacy policy Nigeria business registration",
          "CAC booking refund policy",
        ],
        ogImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/legal",
      },
      blog: {
        title: "CAC Business Registration Blog & Tutorials | Step-by-Step Guides",
        description:
          "Free guides, CAC portal updates, name approval tips, and business startup tutorials to help you register and run your company in Nigeria without agent stress.",
        keywords: [
          "how to register business name in Nigeria blog",
          "CAC registration tutorials 2026",
          "reasons CAC rejected business name",
          "CAC business name vs LTD company",
        ],
        ogImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
        canonical: "https://registerityourself.com/blog",
      },
    },
  },
  schema: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Register It Yourself",
      url: "https://registerityourself.com",
      logo: "https://registerityourself.com/favicon.svg",
      sameAs: [
        "https://instagram.com/registerityourself",
        "https://tiktok.com/@registerityourself",
        "https://x.com/registerityself",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-814-900-2026",
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: ["English"],
      },
    },
    ebookProduct: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Register It Yourself (RIY) CAC Ebook Guide",
      image: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop"],
      description:
        "Screen-by-screen CAC walkthrough guide for registering Business Names and Limited Liability Companies independently in Nigeria.",
      brand: {
        "@type": "Brand",
        name: "Register It Yourself",
      },
      offers: {
        "@type": "Offer",
        url: "https://registerityourself.com/ebook",
        priceCurrency: "NGN",
        price: "10000",
        priceValidUntil: "2027-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.95",
        reviewCount: "1420",
      },
    },
    doItWithUsService: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Do It With Us — 1-on-1 Guided CAC Registration Session",
      provider: {
        "@type": "Organization",
        name: "Register It Yourself",
      },
      serviceType: "Business Registration Assistance",
      areaServed: "Nigeria",
      description:
        "Live 1-on-1 Zoom/Meet session guiding you through the Corporate Affairs Commission (CAC) business registration process in real-time.",
      offers: [
        {
          "@type": "Offer",
          name: "Full Guided Package",
          priceCurrency: "NGN",
          price: "25000",
        },
        {
          "@type": "Offer",
          name: "Ebook Upgrade Package",
          priceCurrency: "NGN",
          price: "15000",
        },
      ],
    },
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I really register my business with CAC without paying a lawyer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Since the Companies and Allied Matters Act (CAMA) 2020 updates, business owners in Nigeria can register business names and small companies directly on the CAC portal without hiring an intermediary or lawyer.",
          },
        },
        {
          "@type": "Question",
          name: "How long does CAC business name approval take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Name availability approvals can take as little as 3 minutes to 24 hours when formatted properly according to CAC guidelines.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Do It Yourself and Do It With Us?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Do It Yourself (₦10,000) gives you the instant download ebook and video templates to register at your own pace. Do It With Us (₦25,000) includes the ebook plus a live 1-on-1 screen share session with our team to complete your application together, plus 2 custom letterheads.",
          },
        },
      ],
    },
  },
  blogPosts: [
    {
      slug: "5-reasons-cac-rejected-business-name",
      title: "5 Reasons CAC Rejected Your Business Name (And How to Fix Them in 24 Hours)",
      excerpt:
        "Stuck on name availability denial? Learn the 5 most common reasons the Corporate Affairs Commission rejects business name submissions and how to get instant approval on your next attempt.",
      category: "CAC Troubleshooting",
      readTime: "5 min read",
      publishedDate: "November 14, 2026",
      author: {
        name: "Dr. Michelle",
        role: "Founder, RIY",
        avatar: "https://images.pexels.com/photos/28472225/pexels-photo-28472225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
      tags: ["CAC Rejection", "Business Name", "Name Availability", "Query Resolution"],
      metaTitle: "5 Reasons CAC Rejected Your Business Name & How to Fix It | RIY",
      metaDescription:
        "Learn why the CAC rejects business name applications in Nigeria and how to fix name queries within 24 hours without paying extra fees.",
      keywords: [
        "reasons CAC rejected business name",
        "CAC name availability query",
        "how to fix CAC name rejection",
        "business name search Nigeria query",
      ],
      content: {
        introduction:
          "Receiving a rejection notice from the Corporate Affairs Commission (CAC) can feel disheartening, especially after spending hours filling forms. The good news? Over 90% of CAC business name rejections stem from five predictable, easily fixable mistakes.",
        sections: [
          {
            heading: "1. Using Generic or Common Descriptive Words",
            body: "Names like 'Lagos Supermarket' or 'Global Tech Solutions' are routinely rejected because they contain generic terms without a distinctive prefix. The CAC requires business names to be unique and memorable.",
            callout: "Pro-Tip: Always pair your generic business activity with a unique personal or abstract brand word (e.g., 'Velorn Apex Logistics' instead of 'Apex Logistics').",
            bulletPoints: [
              "Avoid single-word common nouns like 'Ventures' or 'Enterprise' without a distinctive front name.",
              "Do not use geographic regions (e.g. 'Nigeria', 'Lagos') unless part of a registered corporate trademark.",
            ],
          },
          {
            heading: "2. Phonetic Similarity to Existing Registered Brands",
            body: "Even if your exact spelling is available, CAC officers check for phonetic resemblance. For instance, 'Koka Kola' will be rejected due to 'Coca-Cola', and 'Paystack Analytics' will be rejected due to existing brand rights.",
            bulletPoints: [
              "Perform a thorough public register check before submitting.",
              "Vary your prefix and postfix combinations to prevent phonetic overlap.",
            ],
          },
          {
            heading: "3. Including Restricted or Protected Words Without Approval",
            body: "Words such as 'Government', 'Federal', 'State', 'National', 'Royal', 'Bank', 'University', or 'Cooperative' require official regulatory consent letters (e.g. from the CBN or NUC) prior to CAC submission.",
          },
          {
            heading: "4. Misclassifying the Nature of Business",
            body: "If your proposed business name mentions 'Consulting' but your selected nature of business in the portal says 'General Goods Merchant', CAC reviewers will flag a conflict. Ensure your name aligns directly with your selected PSIC codes.",
          },
          {
            heading: "5. Uploading Unclear or Expired ID Documents",
            body: "A blurry photograph of your NIN slip, Voter's Card, or International Passport is an instant query trigger. Ensure all text and document borders are crisp, well-lit, and legible.",
          },
        ],
        conclusion:
          "Need help reviewing your proposed name before your next submission? Use our free Name Generator tool or book a 1-on-1 Do It With Us session to get expert guidance before you hit submit.",
      },
    },
    {
      slug: "how-to-register-business-name-in-nigeria-without-lawyer",
      title: "How to Register a Business Name in Nigeria Without Paying Lawyer Fees (Step-by-Step 2026 Guide)",
      excerpt:
        "Save ₦40,000 to ₦60,000 in agent fees! A complete 2026 walkthrough for registering your business name on the CAC CRP portal directly from your laptop or phone.",
      category: "DIY Registration",
      readTime: "7 min read",
      publishedDate: "November 10, 2026",
      author: {
        name: "Dr. Michelle",
        role: "Founder, RIY",
        avatar: "https://images.pexels.com/photos/28472225/pexels-photo-28472225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      tags: ["CAC Walkthrough", "Business Name", "No Lawyer Fees", "Step-by-Step"],
      metaTitle: "How to Register Business Name in Nigeria Without Lawyer (2026 Step-by-Step)",
      metaDescription:
        "Learn how to register your business name with CAC in Nigeria without a lawyer. Step-by-step 2026 portal guide, document list, and cost breakdown.",
      keywords: [
        "how to register business name in Nigeria",
        "CAC registration without lawyer",
        "register business name Lagos self service",
        "CAC portal step by step guide 2026",
      ],
      content: {
        introduction:
          "In the past, registering a business with the Corporate Affairs Commission (CAC) required hiring an accredited lawyer or corporate agent. Thanks to the CAC CRP online portal, any Nigerian citizen can register their business name from home in 3 straightforward steps.",
        sections: [
          {
            heading: "Step 1: Create your CAC CRP Account & Perform Name Search",
            body: "Visit the official Corporate Affairs Commission portal. Create a personal account using your National Identification Number (NIN), phone number, and functional email address.",
            bulletPoints: [
              "Choose two distinct options for your business name (Option 1 and Option 2).",
              "Pay the official name availability search fee via Remita.",
            ],
          },
          {
            heading: "Step 2: Fill Out Business Details & Proprietor Info",
            body: "Once your name availability status changes to 'APPROVED', proceed immediately to registration. Enter your principal business address, email, phone number, and nature of business code.",
          },
          {
            heading: "Step 3: Pay Official Fees & Upload Valid Photo ID",
            body: "Pay the official CAC registration fee. Upload a clean scan of your NIN slip, Voter Card, or Passport, along with your signature specimen.",
            callout: "Important: Ensure your signature scan has a clean white background and matches your official ID signature.",
          },
        ],
        conclusion:
          "Want a screen-by-screen visual guide with video demonstrations for every click? Download the complete RIY Ebook Guide for just ₦10,000 today.",
      },
    },
    {
      slug: "cac-business-name-vs-ltd-company-guide",
      title: "CAC Business Name vs Limited Liability Company (LTD): Which One Should You Register?",
      excerpt:
        "Unsure whether to register a Business Name or a Limited Liability Company? Compare cost, tax liabilities, legal liability, corporate banking requirements, and growth flexibility.",
      category: "Business Strategy",
      readTime: "6 min read",
      publishedDate: "November 05, 2026",
      author: {
        name: "Dr. Michelle",
        role: "Founder, RIY",
        avatar: "https://images.pexels.com/photos/28472225/pexels-photo-28472225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
      tags: ["Business Name", "LTD Company", "CAC Comparison", "Tax & Legal"],
      metaTitle: "CAC Business Name vs Limited Liability Company (LTD) | Nigeria Comparison",
      metaDescription:
        "Understand the key differences between a CAC Business Name and a Limited Liability Company (LTD) in Nigeria. Costs, legal protection, tax, and banking.",
      keywords: [
        "CAC business name vs LTD",
        "register company CAC yourself",
        "limited liability company CAC Nigeria",
        "business registration types Nigeria",
      ],
      content: {
        introduction:
          "One of the first major decisions every founder in Nigeria faces is choosing between registering a Business Name (Enterprise/Sole Proprietorship) or a Private Limited Liability Company (Ltd). Here is a clear breakdown.",
        sections: [
          {
            heading: "Business Name (Sole Proprietorship / Partnership)",
            body: "Best for sole proprietors, freelancers, small retailers, vendors, and startups getting started with minimal capital.",
            bulletPoints: [
              "Lower registration fee and simpler annual return requirements.",
              "Proprietor is personally liable for business debt.",
              "Sufficient for opening corporate bank accounts with major Nigerian banks.",
            ],
          },
          {
            heading: "Limited Liability Company (LTD)",
            body: "Best for tech startups seeking investment, companies bidding for government tenders, or businesses with corporate contracts.",
            bulletPoints: [
              "Creates a separate legal entity protecting personal assets from company debt.",
              "Allows issuing equity shares to co-founders and investors.",
              "Requires share capital declaration and tax identification number (TIN) alignment.",
            ],
          },
        ],
        conclusion:
          "Both options are fully covered step-by-step in our Register It Yourself Ebook and 1-on-1 Do It With Us sessions.",
      },
    },
    {
      slug: "how-to-check-cac-business-name-availability",
      title: "How to Check CAC Business Name Availability on the Public Portal Before You Apply",
      excerpt:
        "Learn how to perform a quick, free check on the public CAC search portal to confirm if your desired company name is already registered by someone else.",
      category: "Name Search",
      readTime: "4 min read",
      publishedDate: "October 28, 2026",
      author: {
        name: "Dr. Michelle",
        role: "Founder, RIY",
        avatar: "https://images.pexels.com/photos/28472225/pexels-photo-28472225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
      tags: ["CAC Search", "Public Portal", "Name Availability", "Free Tool"],
      metaTitle: "How to Check CAC Business Name Availability in Nigeria (Free Search)",
      metaDescription:
        "Step-by-step instructions on checking if your business name is available on the official Corporate Affairs Commission (CAC) public registry.",
      keywords: [
        "how to check CAC business name availability",
        "business name generator Nigeria",
        "CAC public search portal",
        "check business name availability CAC",
      ],
      content: {
        introduction:
          "Before paying the official name reservation fee, you can perform a free preliminary check on the Corporate Affairs Commission public index to ensure no registered company shares your target name.",
        sections: [
          {
            heading: "Accessing the Public Search Engine",
            body: "Navigate to the CAC public search portal. Type the primary keywords of your business name into the search bar.",
            bulletPoints: [
              "Search variations with and without spaces.",
              "Check common abbreviations and spelling variants.",
            ],
          },
          {
            heading: "Interpreting Search Results",
            body: "If your exact name appears with 'ACTIVE' or 'INACTIVE' status, the name is taken. If no matches appear, you can proceed with high confidence to submit your formal reservation.",
          },
        ],
        conclusion:
          "Try our free Business Name Generator tool to generate hundreds of CAC-compatible names categorized by your industry!",
      },
    },
  ] as BlogPost[],
};
