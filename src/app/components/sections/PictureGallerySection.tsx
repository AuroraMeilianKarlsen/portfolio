import BounceCards from '../BounceCards';
import {
  pictureGalleryImages,
  bounceCardsTransformStyles,
} from '../../constants/images';

export default function PictureGallerySection() {
  return (
    <section
      id="bilder"
      className="px-6 py-12 scroll-mt-20"
      aria-label="Bildegalleri"
    >
      <div className="mx-auto max-w-3xl">
        <br />
        <p className="mt-4 text-gray-300">
          Jeg er fortiden på utveksling i Italia. Under erasmus oppholdet mitt
          studerer jeg på Universitetet i Padova, men jeg har også fått mulighet
          til å reise til mange andre byer!
          <br />
          <br />
          Her har jeg også blitt glad i å ta bilder, her er noen av mine
          nyligste knips fra Italia
        </p>

        <div className="mt-8 flex justify-center">
          <BounceCards
            className="custom-bounceCards"
            images={pictureGalleryImages}
            containerWidth={1000}
            containerHeight={500}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={bounceCardsTransformStyles}
            enableHover={true}
            triggerOnScroll={true}
          />
        </div>
      </div>
    </section>
  );
}
