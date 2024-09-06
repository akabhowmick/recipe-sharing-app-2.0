export const Hero = () => {
  return (
    <section className="py-5 px-4 md:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="text-center">
            <h1 className="text-3xl font-bold underline my-4 text-purple-900 mx-auto text-center">
              Welcome to the Recipe Sharing App!
            </h1>
            <button className="bg-purple-900 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
              Start Sharing!
            </button>
          </div>
        </div>
        <div className="mt-8 ">
          <div className="flex justify-center h-96">
            <div className="relative w-100 h-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/9_5wHw6l11o?si=vV4N05-wU5zjEERm"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
