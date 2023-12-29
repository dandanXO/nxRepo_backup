import {useEffect, useState} from "react";

export const useScrollToCarousel = () => {
  // NOTICE: 使用 Javascript 方式替換純 CSS stikcy，因為 iOS sticky 會滾到一半就直接上去
  const [showFixForIOSStickTab, setShowFixForIOSStickTab] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(0);

  useEffect(() => {
    const pageContainer = document.getElementById("page-container");

    const scroll = () => {
      // console.log("debug.scroll")
      // const targetContainer = pageContainer ? pageContainer : window;
      const scrollY = pageContainer ? pageContainer.scrollTop : window.scrollY;
      // console.log("debug.pageContainer", pageContainer)
      // console.log("debug.targetContainer", targetContainer)
      // console.log("debug.scrollY", scrollY)
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
      pageContainer.addEventListener("scroll", scroll);
    } else {
      window.addEventListener("scroll", scroll);
    }

    return () => {
      if(pageContainer) {
        pageContainer.removeEventListener("scroll", scroll);
      } else {
        window.removeEventListener("scroll", scroll);
      }

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
