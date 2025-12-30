// src/layout/Footer.jsx
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E6E6E6]">
      {/* BRAND STRIP */}
      <div className="w-full border-b border-[#E6E6E6]">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-wrap items-center justify-center gap-10 opacity-60">
          <img src="public\assets\homepage\fa-brands-1.png" alt="hooli" className="h-8" />
          <img src="public\assets\homepage\fa-brands-2.png" alt="lyft" className="h-8" />
          <img src="public\assets\homepage\fa-brands-4.png" alt="stripe" className="h-8" />
          <img src="public\assets\homepage\fa-brands-5.png" alt="aws" className="h-8" />
          <img src="public\assets\homepage\fa-brands-3.png" alt="reddit" className="h-8" />
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12">
        {/* TOP */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
            Bandage
          </div>

          <div className="flex flex-row items-center gap-4">
            <Facebook className="w-5 h-5 text-[#23A6F0]" />
            <Instagram className="w-5 h-5 text-[#23A6F0]" />
            <Twitter className="w-5 h-5 text-[#23A6F0]" />
          </div>
        </div>

        {/* LINKS */}
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-10">
          {/* column */}
          <div className="flex flex-col gap-3">
            <div className="font-bold text-[16px] text-[#252B42]">Company Info</div>
            <a className="text-[14px] text-[#737373]">About Us</a>
            <a className="text-[14px] text-[#737373]">Carrier</a>
            <a className="text-[14px] text-[#737373]">We are hiring</a>
            <a className="text-[14px] text-[#737373]">Blog</a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-bold text-[16px] text-[#252B42]">Legal</div>
            <a className="text-[14px] text-[#737373]">About Us</a>
            <a className="text-[14px] text-[#737373]">Carrier</a>
            <a className="text-[14px] text-[#737373]">We are hiring</a>
            <a className="text-[14px] text-[#737373]">Blog</a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-bold text-[16px] text-[#252B42]">Features</div>
            <a className="text-[14px] text-[#737373]">Business Marketing</a>
            <a className="text-[14px] text-[#737373]">User Analytic</a>
            <a className="text-[14px] text-[#737373]">Live Chat</a>
            <a className="text-[14px] text-[#737373]">Unlimited Support</a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-bold text-[16px] text-[#252B42]">Resources</div>
            <a className="text-[14px] text-[#737373]">IOS & Android</a>
            <a className="text-[14px] text-[#737373]">Watch a Demo</a>
            <a className="text-[14px] text-[#737373]">Customers</a>
            <a className="text-[14px] text-[#737373]">API</a>
          </div>

          {/* NEWSLETTER */}
          <div className="flex flex-col gap-3 max-w-[300px]">
            <div className="font-bold text-[16px] text-[#252B42]">Get In Touch</div>

            <div className="flex flex-row">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 border border-[#E6E6E6] px-4 py-2 text-[14px]"
              />
              <button className="bg-[#23A6F0] px-4 py-2 text-white text-[14px]">
                Subscribe
              </button>
            </div>

            <div className="text-[12px] text-[#737373]">
              Lorem ipsum dolor amit
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-[14px] text-[#737373]">
          Made With Love By SF All Right Reserved
        </div>
      </div>
    </footer>
  );
}
