import aboutImage from '../assets/img/about/about.svg';

const About = () => {
  return (
    <section id="about" className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-32 pb-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={aboutImage}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-5 font-bold text-gray-600">
            Order your food
            <br className="hidden lg:inline-block" />
            Faster & Easier
          </h1>
          <p className="mb-8 leading-relaxed">
            Order your favorite food at any time and we will deliver them right
            to where you are. We are a company dedicated to the distribution of
            food by delivery to your home or to the place where you are, with
            the best quality of delivery.
          </p>
          <div className="flex justify-center">
            <a
              href="#menu"
              className="mr-2 inline-block text-center bg-orange-600 border border-transparent rounded-full py-3 px-9 font-bold text-white hover:bg-orange-700 transition duration-300"
            >
              Food Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
