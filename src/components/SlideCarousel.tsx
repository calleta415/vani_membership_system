import { useRef } from "react";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { Facebook } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import slide1 from "../assets/slides/slide1.jpeg";
import slide2 from "../assets/slides/slide2.jpeg";
import slide3 from "../assets/slides/slide3.jpeg";
import slide4 from "../assets/slides/slide4.jpeg";
import slide5 from "../assets/slides/slide5.jpeg";
import slide6 from "../assets/slides/slide6.jpeg";
import slide7 from "../assets/slides/slide7.jpeg";

export function SlideCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  return (
    <Card className="shadow-lg overflow-hidden">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 overflow-hidden rounded-lg">
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ maxWidth: '100%', maxHeight: '400px', minHeight: '400px' }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex flex-col items-center gap-3 mt-4 pb-4">
          <div className="flex items-center justify-center gap-2">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
            <CarouselNext className="relative right-0 top-0 translate-y-0" />
          </div>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 gap-2"
            onClick={() => window.open('https://www.facebook.com/share/g/1Gimkz9w7Y/?mibextid=wwXIfr', '_blank')}
          >
            <Facebook className="w-4 h-4" />
            Connect with us on Facebook
          </Button>
        </div>
      </Carousel>
    </Card>
  );
}
