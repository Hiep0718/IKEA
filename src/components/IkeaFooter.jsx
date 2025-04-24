const IkeaFooter = () => {
  const footerSections = [
    {
      title: "Join IKEA Family",
      items: [
        {
          text: "Bring your ideas to life with special discounts, inspiration, and lots of good things in store. It's all free.",
        },
        { text: "See more", isLink: true },
        { buttonText: "Join or log in", primary: true },
      ],
    },
    {
      title: "Join IKEA Business Network",
      items: [
        { text: "Enjoy a number of unique benefits to create a better life at work." },
        { text: "See more", isLink: true },
        { buttonText: "Join or log in", primary: true },
      ],
    },
    {
      title: "Help",
      items: [
        { text: "Customer service", isLink: true },
        { text: "FAQ", isLink: true },
        { text: "My orders", isLink: true },
        { text: "Contact Us", isLink: true },
        { text: "Product Recalls", isLink: true },
        { text: "Return Policy", isLink: true },
        { text: "Warranties", isLink: true },
        { text: "Feedback", isLink: true },
      ],
    },
    {
      title: "Shop & Learn",
      items: [
        { text: "Find a Location", isLink: true },
        { text: "IKEA Services", isLink: true },
        { text: "IKEA Family", isLink: true },
        { text: "IKEA for Business", isLink: true },
        { text: "IKEA Planning Tools", isLink: true },
        { text: "IKEA Brochures", isLink: true },
        { text: "IKEA Gift Registry", isLink: true },
        { text: "Buying guides", isLink: true },
        { text: "Payment options", isLink: true },
        { text: "Gift Cards", isLink: true },
        { text: "IKEA Credit Card Management", isLink: true },
        { text: "IKEA Credit Cards", isLink: true },
        { text: "Afterpay", isLink: true },
      ],
    },
    {
      title: "About IKEA",
      items: [
        { text: "This is IKEA", isLink: true },
        { text: "Careers", isLink: true },
        { text: "Newsroom", isLink: true },
        { text: "Life at Home", isLink: true },
        { text: "A Sustainable Everyday", isLink: true },
        { text: "IKEA Foundation", isLink: true },
        { text: "Safety at Home", isLink: true },
      ],
    },
    {
      title: "Legal",
      items: [
        { text: "Privacy & Security", isLink: true },
        { text: "Privacy policy", isLink: true, highlight: true },
        { text: "Terms and conditions", isLink: true },
        { text: "IKEA Children's Product Registration", isLink: true },
        { text: "Accessibility", isLink: true },
        { text: "IKEA SMÅLAND Privacy notice", isLink: true },
      ],
    },
  ]

  const legalLinks = [
    { text: "Cookie policy", url: "#" },
    { text: "Your privacy choices", url: "#", hasIcon: true },
    { text: "Privacy policy", url: "#" },
    { text: "California Notice at Collection", url: "#" },
  ]

  return (
    <footer className="bg-gray-100 py-10 px-4 lg:px-12">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className={`${index < 2 ? "md:col-span-1" : ""}`}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.buttonText ? (
                      <button className="bg-black text-white rounded-full px-6 py-2 text-sm hover:bg-gray-800">
                        {item.buttonText}
                      </button>
                    ) : item.isLink ? (
                      <a href="#" className={`text-sm hover:underline ${item.highlight ? "font-medium" : ""}`}>
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-sm">{item.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social media and payment methods */}
        <div className="mt-12 border-t border-gray-300 pt-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Social media icons */}
            <a href="#" className="text-gray-700 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-black mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Divider between social media and payment methods */}
            <div className="hidden lg:block h-8 w-px bg-gray-300 mx-4"></div>

            {/* Payment methods */}
            <div className="flex flex-wrap gap-2 ml-auto">
              {Array.from({ length: 14 }).map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center"
                >
                  <div className="w-6 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer section */}
        <div className="mt-8 pt-4 border-t border-gray-300 flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="text-sm text-gray-600">© Inter IKEA Systems B.V. 1999-2025</div>

          <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
            {/* Legal links */}
            <div className="flex flex-wrap gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <a key={index} href={link.url} className="text-gray-600 hover:underline flex items-center">
                  {link.text}
                  {link.hasIcon && (
                    <span className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-blue-500 text-white rounded-full text-xs">
                      ✓
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Language/region selector */}
            <div className="ml-0 lg:ml-4">
              <button className="flex items-center border border-gray-300 rounded px-3 py-1.5 text-sm bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>US</span>
                <span className="mx-1">|</span>
                <span>English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default IkeaFooter
