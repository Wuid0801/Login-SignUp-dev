import React, { useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CardBox } from './ui/card';

const messages = [
    '오늘 공부 다했어?',
    'TIL 적었어?',
    '잠은 푹 잤어?',
    '운동은 했어?',
    '물 한 모금 마셨어?',
];

export const Footer = () => {
    const usedMessagesRef = useRef<string[]>([]);

    const getRandomMessage = () => {
        const availableMessages = messages.filter(message => !usedMessagesRef.current.includes(message));
        const randomIndex = Math.floor(Math.random() * availableMessages.length);
        const randomMessage = availableMessages[randomIndex];
        usedMessagesRef.current.push(randomMessage);
        return randomMessage;
    };

    return (
        <div className="flex justify-center">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <CardBox.Card>
                                    <CardBox.CardContent className="flex aspect-auto items-center justify-center p-6 text-center">
                                        <span className="font-bold">
                                            {getRandomMessage()}
                                        </span>
                                    </CardBox.CardContent>
                                </CardBox.Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
