import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { Link } from "react-router-dom";

import FooterColumn from "./FooterColumn";
import footerData from "./footerData";

import logo from "../../../assets/images/logo/foot-logo.png";

function Footer() {
  return (
    <footer className="bg-[#163824] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">

          {/* Brand */}
          <div>

            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Earthmool"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              Bringing authentic Indian flavours to your kitchen with
              carefully selected spices, traditional recipes, and
              uncompromising quality.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-green-900"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-green-900"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-green-900"
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>

          {/* Shop */}
          <FooterColumn
            title="Shop"
            links={footerData.shop}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={footerData.company}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={footerData.support}
          />

          {/* Contact */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                />

                <p className="text-sm leading-6 text-white/70">
                  Indore, Madhya Pradesh
                  <br />
                  India
                </p>
              </div>

              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
              >
                <Phone size={18} />
                +91 99999 99999
              </a>

              <a
                href="mailto:hello@earthmool.com"
                className="flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
              >
                <Mail size={18} />
                hello@earthmool.com
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p>
            © {new Date().getFullYear()} Earthmool. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/shipping"
              className="transition hover:text-white"
            >
              Shipping Policy
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;