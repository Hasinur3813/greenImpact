import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-darkGray text-offWhite py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-primaryColor hover:text-accent-hover"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-primaryColor hover:text-accent-hover"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-primaryColor hover:text-accent-hover"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#donate"
                  className="text-primaryColor hover:text-accent-hover"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primaryColor hover:text-accent-hover"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 justify-center sm:justify-start">
              <a
                href="https://facebook.com"
                className="text-primaryColor hover:text-accent-hover"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://instagram.com"
                className="text-primaryColor hover:text-accent-hover"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://twitter.com"
                className="text-primaryColor hover:text-accent-hover"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-primaryColor hover:text-accent-hover"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <strong>Email:</strong> info@greenimpact.org
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center">
          <p className="text-muted text-sm">
            © 2025 GreenImpact. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
