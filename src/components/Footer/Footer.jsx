import React from "react";
import { Mail, MapPin, Headphones } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import "./Footer.css";
import img1 from "../../assets/images/secqurity-01.png";
import img2 from "../../assets/images/secqurity-02.png";
import img3 from "../../assets/images/secqurity-03.png";
import payment from "../../assets/images/payment.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="bg-[#313c46] text-white relative">
        <div className="mx-auto">
          {/* Main Footer Content */}
          <div className="bg-[#2d3741] py-12">
            <div className="container flex justify-between">
              {/* Newsletter Section */}
              <div className="border-r border-gray-600 pr-70">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} />
                  <span className="text-2xl font-semibold">
                    Sign up to our Newsletter
                  </span>
                </div>
                <p className="mb-4 text-gray-300 w-90">
                  Give your inbox some love with new products, tips, & more.
                </p>
                <div className="border-0 p-2 bg-white">
                  <input
                    type="text"
                    placeholder="Enter Ur Email address..."
                    className="outline-none text-gray-800 rounded-3xl"
                  />
                  <button className="search bg-[#ffcc00] text-gray-950 font-semibold py-2 px-4 rounded ms-5">
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="md:pl-8">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <p className="mb-4 text-gray-300 w-90">
                  We make consolidating, marketing and tracking your social
                  media website easy.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="bg-[#3b5998] transition-transform duration-300 hover:-translate-y-1 p-2 rounded"
                  >
                    <Facebook size={24} color="#fff" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#1da1f2]  p-2 rounded transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Twitter size={24} color="#fff" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#b7081b]  p-2 rounded transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Instagram size={24} color="#fff" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#0077b5] p-2 rounded transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Mail size={24} color="#fff" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#00a8e8] p-2 rounded transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Linkedin size={24} color="#fff" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Footer Content */}
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-between gap-8 text-gray-300 container py-12">
              {/* Contact Information */}
              <div className="w-full sm:w-auto flex-1">
                <span className="text-xl font-semibold text-white">
                  Contact Information
                </span>
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex gap-3 items-center cursor-pointer headphone">
                    <Headphones className="text-orange-500 mt-1 rotate" size={40} />
                    <div className="flex flex-col">
                      <span>Call On Order? Call us 24/7</span>
                      <span className="text-orange-500 font-bold">
                        (+001) 123-456-7890
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1" size={20} />
                    <span>7515 Carriage Court, Coachella, CA, 92236 USA</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1" size={20} />
                    <p>sales@yourcompany.com</p>
                  </div>
                </div>
              </div>

              {/* Quick View */}
              <div className="w-full sm:w-auto flex-1">
                <span className="text-xl font-semibold mb-4 text-white">
                  Quick view
                </span>
                <span className="flex flex-col gap-2 mt-3">
                  {["Service", "Find a Store", "FAQ's", "About Us"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="list-none hover:text-[#f04708] transition duration-300 text-gray-400 cursor-pointer"
                      >
                        <a
                          href="#"
                          className="text-inherit text-decoration-none"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </span>
              </div>

              {/* Information */}
              <div className="w-full sm:w-auto flex-1">
                <span className="text-xl font-semibold mb-4 text-white">
                  Information
                </span>
                <span className="flex flex-col gap-2 mt-3">
                  {["Wishlist", "My account", "Checkout", "Cart"].map(
                    (item, index) => (
                      <li
                        key={index}
                        className="list-none hover:text-[#f04708] transition duration-300 text-gray-400 cursor-pointer"
                      >
                        <a
                          href="#"
                          className="text-inherit text-decoration-none"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </span>
              </div>

              {/* Popular Tags */}
              <div className="w-full sm:w-auto flex-1">
                <span className="text-xl font-semibold mb-4 text-white">
                  Popular tag
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "ElectraWave",
                    "EnergoTech",
                    "NexusElectronics",
                    "SparkFlare",
                    "QuantumElectro",
                    "PulseTech",
                    "CircuitMasters",
                    "TechNova",
                    "AmpereFusion",
                    "VoltVibe",
                  ].map((tag, index) => (
                    <>
                      <div className="bg-gray-700 rounded px-3 py-1 tags text-white">
                        <a
                          key={index}
                          href="/"
                          className="text-sm text-decoration-none"
                        >
                          {tag}
                        </a>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Logos */}
            <div className="flex justify-center mt-12 mb-8">
              <div className="flex gap-2">
                <img
                  src={img1}
                  alt="F-Secure"
                  className="opacity-60 transition-transform duration-400 hover:-translate-y-2"
                />
                <img
                  src={img3}
                  alt="SiteLock"
                  className="opacity-60 transition-transform duration-400 hover:-translate-y-2"
                />
                <img
                  src={img2}
                  alt="McAfee"
                  className="opacity-60 transition-transform duration-400 hover:-translate-y-2"
                />
              </div>
            </div>
          </div>

          {/* Copyright and Payment Methods */}
          <div className="container flex md:flex-row justify-between items-center border-t border-gray-600 py-6">
            <span className="text-gray-400 text-sm">
              Copyright 2025, All Rights Reserved.
            </span>
            <div className="flex gap-2 mt-4 md:mt-0 transition hover:opacity-70 duration-400">
              <img src={payment} alt="Payment" />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
