import {useEffect, useState} from "react";

export const useScrollToCarousel = () => {
  // NOTICE: 使用 Javascript 方式替換純 CSS stikcy，因為 iOS sticky 會滾到一半就直接上去
  const [showFixForIOSStickTab, setShowFixForIOSStickTab] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(0);

  useEffect(() => {
    const pageContainer = document.getElementById("page-container");

    const scroll = () => {
      console.log("debug.scroll2")

      const targetContainer = pageContainer ? pageContainer : window;
      const scrollY = pageContainer ? pageContainer.scrollTop : window.scrollY;
      console.log("debug.pageContainer", pageContainer)
      console.log("debug.targetContainer", targetContainer)
      console.log("debug.scrollY", scrollY)

      const carousel = document.getElementById("app-carousel");

      let carouselHeight = 0;
      if(carousel && carousel.offsetHeight) {
        carouselHeight = carousel.offsetHeight;
        console.log("debug.carouselHeight", carouselHeight)
        console.log("debug.scrollY", scrollY)
        setCarouselHeight(carouselHeight);
      }
      if(scrollY > carouselHeight) {
        setShowFixForIOSStickTab(true)
      } else {
        setShowFixForIOSStickTab(false)
      }
    }

    if(pageContainer) {
      pageContainer.addEventListener("scroll", scroll, true);
    }
    window.addEventListener("scroll", scroll, true);
    return () => {
      console.log("debug.scroll-remove")
      const pageContainer = document.getElementById("page-container");
      if(pageContainer) {
        pageContainer.removeEventListener("scroll", scroll, true);
      }
      window.removeEventListener("scroll", scroll, true);
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
