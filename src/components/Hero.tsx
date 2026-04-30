import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import _SplitText, { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useGSAP(() => {
    const title = new SplitText(".title", {
      type: "chars",
    });
    const leftText = new SplitText(".subtitle", {
      type: "lines",
    });
    const tl = gsap.timeline({});
    tl.from(title.chars, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.08,
      mask: "lines",
    });
    tl.from(leftText.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -200 }, 0)
      .to(".right-leaf", { y: 200 }, 0)
      .to(".subtitle", { y: -150, stagger: 0.07 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });
    if (videoRef.current) {
      const video = videoRef.current;
      video.onloadedmetadata = () => {
        tl2.to(video, {
          currentTime: video.duration,
        });
      };
    }
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">Mugio</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle" aria-label="Sip the Spirit  of Summer">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p
                className="subtitle"
                aria-label="Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses."
              >
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
