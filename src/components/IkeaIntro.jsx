import React from "react";

const IkeaIntro = () => {
  return (
    <div className="p-8 space-y-10 w-full max-w-7xl mx-auto">
      {/* Section: This is IKEA */}
      <div>
        <h1 className="text-2xl font-bold">This is IKEA</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Column 1 */}
          <div>
            <h2 className="font-semibold">Sustainable everyday</h2>
            <p className="mt-2 text-sm text-gray-700">
              How sustainable is IKEA? Well, more sustainable every day. With
              products like veggie hot dogs, and energy-saving solutions, we’re
              paving the way for more sustainable homes for the many.
            </p>
            <a href="#" className="text-sm text-blue-600 mt-2 inline-block">Learn more</a>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="font-semibold">Climate and environment</h2>
            <p className="mt-2 text-sm text-gray-700">
              Find out how IKEA invests, inspires and acts to tackle
              environmental issues, reduce carbon footprints and drive positive
              change on a global scale.
            </p>
            <a href="#" className="text-sm text-blue-600 mt-2 inline-block">Learn more</a>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="font-semibold">Work with us</h2>
            <p className="mt-2 text-sm text-gray-700">
              Coming from all over the world, our IKEA co-workers share a
              special set of values and a vision to enable people to live a
              better, more sustainable everyday life. They come together within
              diverse, inclusive, open IKEA work environments, where each of
              them offers something unique.
            </p>
            <a href="#" className="text-sm text-blue-600 mt-2 inline-block">Learn more</a>
          </div>
        </div>
      </div>

      {/* Section: Furniture and inspiration */}
      <div>
        <h2 className="text-xl font-bold">
          Furniture and inspiration for a better everyday life at home
        </h2>
        <p className="mt-4 text-sm text-gray-700">
          Welcome to IKEA, where you will always find affordable{" "}
          <a href="#" className="text-blue-600 underline">furniture</a>, stylish{" "}
          <a href="#" className="text-blue-600 underline">home décor</a> and
          innovative modern home solutions, as well as{" "}
          <a href="#" className="text-blue-600 underline">design inspiration</a>{" "}
          and unique home ideas! If you are online furniture shopping or if you
          are visiting a local IKEA store near you, you can expect super low
          prices on a wide variety of exciting home essentials...
        </p>

        <p className="mt-4 text-sm text-gray-700">
          If you want to save even more money...{" "}
          <a href="#" className="text-blue-600 underline">join IKEA Family</a>{" "}
          so you can take advantage of our regular furniture sales...
        </p>

        <p className="mt-4 text-sm text-gray-700">
          So, now you are probably wondering, “How do I find an IKEA furniture
          store near me?” Check out the{" "}
          <a href="#" className="text-blue-600 underline">IKEA Store Locator</a>{" "}
          and we hope to see you soon!
        </p>

        <p className="mt-4 text-sm text-gray-700">
          Browse our full store experience online to find affordable home goods
          for every room, including{" "}
          <a href="#" className="text-blue-600 underline">home office</a>,{" "}
          <a href="#" className="text-blue-600 underline">living room</a>,{" "}
          <a href="#" className="text-blue-600 underline">kitchen</a>,{" "}
          <a href="#" className="text-blue-600 underline">bathroom</a>,{" "}
          <a href="#" className="text-blue-600 underline">bedroom</a> and{" "}
          <a href="#" className="text-blue-600 underline">outdoor furniture</a>,
          and get deliveries straight to your doorstep!
        </p>
      </div>
    </div>
  );
};

export default IkeaIntro;
