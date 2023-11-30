import {useEffect, useState} from "react";

export const useScrollToCarousel = () => {
  // NOTICE: 使用 Javascript 方式替換純 CSS stikcy，因為 iOS sticky 會滾到一半就直接上去
  const [showFixForIOSStickTab, setShowFixForIOSStickTab] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(0);

  useEffect(() => {
    const scroll = () => {
      const carousel = document.getElementById("app-carousel");
      let carouselHeight = 0;
      if(carousel && carousel.offsetHeight) {
        carouselHeight = carousel.offsetHeight;
        setCarouselHeight(carouselHeight);
      }
      if(window.scrollY > carouselHeight) {
        setShowFixForIOSStickTab(true)
      } else {
        setShowFixForIOSStickTab(false)
      }
    }
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    }
  }, []);

  const scrollToCarousel = () => {
    if(window.scrollY > carouselHeight) {
      window.scrollTo({ top: carouselHeight, behavior: "smooth" });
    }
  }

  const scrollToWindowTop = () => {
    window.scrollTo({ left: 0, behavior: "smooth"});
  }

  return {
    showFixForIOSStickTab,
    scrollToCarousel,
    scrollToWindowTop,
  }
}
