import burger from '../assets/img/hero/kimchi.png';
import hotDog from '../assets/img/hero/sushi-roll.png';
import kebab from '../assets/img/hero/grilled-meat.png';
import pizza from '../assets/img/hero/chicken-soup.png';
import sandwich from '../assets/img/hero/tteok.png';
import friedChicken from '../assets/img/hero/bibimbap.png';
import dumpling from '../assets/img/hero/ramen1.png';

const Hero = () => {
  return (
    <div id="home" className="relative bg-white overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-600 sm:text-6xl">
              Discover the food you like to eat
            </h1>
            <p className="mt-9 text-xl text-gray-500">
              Freshness in every bite. Eat what is healthy. Eat what you like.
              Order food to your door.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-44 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img
                          src={burger}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={hotDog}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={friedChicken}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={kebab}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={dumpling}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={sandwich}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-44 rounded-lg overflow-hidden">
                        <img
                          src={pizza}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#menu"
                className="inline-block text-center bg-orange-600 border border-transparent rounded-full py-3 px-9 font-bold text-white hover:bg-orange-700 transition duration-300"
              >
                Food Menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
