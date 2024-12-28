import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = React.memo(() => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        const width = img.style.width;
        const height = img.style.height;
        if ((width && width !== 'auto') || (height && height !== 'auto')) {
          if (width && width !== 'auto') {
            img.style.height = 'auto';
          }
          if (height && height !== 'auto') {
            img.style.width = 'auto';
          }
          console.warn('Image with src', img.src, 'has either width or height modified, but not the other. Both are now set to "auto" to maintain the aspect ratio.');
        }
      });
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <footer className="relative bg-white dark:bg-black pt-8 pb-6 text-black dark:text-white">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style={{ transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">Let&apos;s keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond within 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex flex-wrap justify-center lg:justify-start text-left">
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightBlue-400 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightBlue-600 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 text-2xl"
              >
                <FaFacebook />
              </a>
              
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blueGray-800 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightBlue-400 shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2 text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#aboutus"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="www.google.com"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://www.github.com/xtharshh"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="www.google.com"
                    >
                      Free Products
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#features"
                    >
                      Upcoming Features
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="www.google.com"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="www.google.com"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#contactus"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="#select-college-section"
                    >
                      Get Notes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full  px-4 mx-auto text-center">
            <div className="text-blueGray-500 text-xl py-1 font-newGab font-bold">
              ©{year} Made With ❤️ by&nbsp;
              <a
                href="https://www.instagram.com/xt.harshh"
                className="text-blueGray-500 hover:text-gray-500"
              >
                Harsh
              </a>
              <span>&nbsp;&&nbsp;</span>
              <a
                href="https://www.instagram.com/yash._.deep"
                className="text-blueGray-500 hover:text-gray-500"
              >
                Yashdeep
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        img {
          width: auto;
          height: auto;
        }
      `}</style>
    </footer>
  );
});
Footer.displayName = 'Footer';
export default Footer;
