"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { DirectionArrowRight, DirectionArrowUpRight } from "@/components/ui/direction-icon";
import "./CardNav.css";

const CLOSED_HEIGHT = 60;
const DESKTOP_OPEN_HEIGHT = 268;

const CardNav = ({
  brand = "Ruang Sinergi",
  homeHref = "/",
  items = [],
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor = "#17345f",
  buttonLabel = "Mulai latihan",
  buttonHref = "/latihan",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  const calculateHeight = () => {
    const navElement = navRef.current;
    if (!navElement || typeof window === "undefined") return DESKTOP_OPEN_HEIGHT;

    if (window.matchMedia("(max-width: 768px)").matches) {
      const contentElement = navElement.querySelector(".card-nav-content");
      if (!contentElement) return DESKTOP_OPEN_HEIGHT;

      const previous = {
        visibility: contentElement.style.visibility,
        pointerEvents: contentElement.style.pointerEvents,
        position: contentElement.style.position,
        height: contentElement.style.height,
      };

      Object.assign(contentElement.style, {
        visibility: "visible",
        pointerEvents: "auto",
        position: "static",
        height: "auto",
      });

      const contentHeight = contentElement.scrollHeight;
      Object.assign(contentElement.style, previous);

      return Math.min(CLOSED_HEIGHT + contentHeight + 16, window.innerHeight - 16);
    }

    return DESKTOP_OPEN_HEIGHT;
  };

  const createTimeline = () => {
    const navElement = navRef.current;
    if (!navElement) return null;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(navElement, { height: CLOSED_HEIGHT, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: reducedMotion ? 0 : 28, opacity: 0 });

    const timeline = gsap.timeline({ paused: true });
    timeline.to(navElement, {
      height: calculateHeight,
      duration: reducedMotion ? 0 : 0.38,
      ease,
    });
    timeline.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: reducedMotion ? 0 : 0.32,
        ease,
        stagger: reducedMotion ? 0 : 0.06,
      },
      reducedMotion ? 0 : "-=0.12",
    );
    return timeline;
  };

  useLayoutEffect(() => {
    const timeline = createTimeline();
    timelineRef.current = timeline;

    return () => {
      timeline?.kill();
      timelineRef.current = null;
    };
    // Recreate the GSAP measurements when the navigation data changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      timelineRef.current?.kill();
      const timeline = createTimeline();
      if (timeline && isExpanded) timeline.progress(1);
      timelineRef.current = timeline;
    };

    const handlePointerDown = (event) => {
      if (isExpanded && navRef.current && !navRef.current.contains(event.target)) closeMenu();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isExpanded) closeMenu();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const closeMenu = () => {
    const timeline = timelineRef.current;
    setIsHamburgerOpen(false);
    if (!timeline) {
      setIsExpanded(false);
      return;
    }
    timeline.eventCallback("onReverseComplete", () => setIsExpanded(false));
    timeline.reverse();
  };

  const toggleMenu = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      timeline.play(0);
    } else {
      closeMenu();
    }
  };

  const setCardRef = (index) => (element) => {
    if (element) cardsRef.current[index] = element;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        aria-label="Navigasi utama"
      >
        <div className="card-nav-top" style={{ backgroundColor: baseColor }}>
          <button
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? "Tutup menu" : "Buka menu"}
            aria-expanded={isExpanded}
            style={{ color: menuColor }}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <Link href={homeHref} className="card-nav-brand" onClick={closeMenu}>
            {brand}
          </Link>

          <Link href={buttonHref} className="card-nav-cta-button ui-button ui-button-primary" onClick={closeMenu}>
            {buttonLabel}
            <DirectionArrowRight size={15} />
          </Link>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, index) => (
            <section
              key={`${item.label}-${index}`}
              ref={setCardRef(index)}
              className={`nav-card ${item.compact ? "is-compact" : ""}`}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <h2 className="nav-card-label">{item.label}</h2>
              <div className="nav-card-links">
                {item.links?.map((link, linkIndex) => (
                  <Link
                    key={`${link.label}-${linkIndex}`}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    tabIndex={isExpanded ? 0 : -1}
                    className="nav-card-link"
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>
                    <DirectionArrowUpRight className="nav-card-link-icon" size={14} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
