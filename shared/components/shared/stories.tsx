'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { Container } from './container';

import ReactStories from 'react-insta-stories';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();
  const [storySize, setStorySize] = React.useState({
    width: 520,
    height: 800,
  });

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();

    const updateSize = () => {
      const screenWidth = window.innerWidth;
  
      const width = Math.min(screenWidth - 40, 520); // відступи по краях
      const height = width * 1.6; // пропорція як у сторіс (9:16 приблизно)
  
      setStorySize({ width, height });
    };
  
    updateSize();
    window.addEventListener('resize', updateSize);
  
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('px-0 my-10 ', className)}>
        {/* stories-desktop flex items-center justify-between gap-2 my-10 px-0 */}

        {/* {stories.length === 0 &&
          [...Array(7)].map((_, index) => (
            <div
              key={index}
              className=" w-[13.7%] h-[300px] bg-gray-200 rounded-md animate-pulse"
            />
          ))} */}

        {/* {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md h-[300px] w-[13.7%] object-cover block object-center cursor-pointer transition-opacity hover:opacity-80"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))} */}

        <Swiper
          spaceBetween={8}
          slidesPerView="auto"
          centeredSlides={false} // якщо true — активний слайд буде по центру
          freeMode={false} // обов’язково, щоб не “плаваючий режим”
          grabCursor={true} // гарний UX
          breakpoints={{
            0: {
              slidesPerView: 'auto',
            },
            // 1100: {
            //   slidesPerView: 7,
            // },
          }}
        >
          {stories.map((story) => (
            <SwiperSlide className="!w-[200px]" key={story.id}>
              <img
                onClick={() => onClickStory(story)}
                className="rounded-md h-[270px] lg:h-[300px] w-full object-cover cursor-pointer"
                src={story.previewImageUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {open && (
          <div className="fixed left-0 top-0 z-50 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: storySize.width }}>
              <button
                className="absolute top-0 right-0 lg:-right-10 lg:-top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <div className="h-[90svh] flex items-center justify-center">
              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={storySize.width}
                height={storySize.height}
              />
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
