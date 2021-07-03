import React from 'react';
import SectionTitle from '@/blocks/SectionTitle';
import Title from '@/blocks/Title';
import { Button } from '@/blocks/Buttons';

export default function KreatorCard({ author }) {
    return (
        <div className="flex w-full h-full items-center	">
            <div className="flex w-1/3 h-full ">
                <img className="rounded-xl w-full" src={author.avatar} />
            </div>
            <div className="relative w-2/3 px-8">
                <Title
                    text="from the kreator"
                    component={3}
                    classes="mx-4 mb-6"
                />
                <SectionTitle
                    section={{
                        title: 'Nazar Stolyar',
                        subTitle: 'food, drings and making new friends'
                    }}
                />
                <div className="w-4/5 mb-8">
                    <p className="mt-8 mb-8">
                        Nulla consectetur nunc venenatis augue eleifend finibus.
                        Phasellus ultrices porta quam nec bibendum. Morbi a nisl
                        dictum, efficitur ex eu, pellentesque magna.
                    </p>
                    <p>
                        Nulla consectetur nunc venenatis augue eleifend finibus.
                        Phasellus ultrices porta quam nec bibendum. Morbi a nisl
                        dictum, efficitur ex eu, pellentesque magna. Orci varius
                        natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Nulla facilisi. Nulla facilisi.
                        Morbi imperdiet ac justo tristique lacinia.
                    </p>
                </div>

                <Button rounded="lg">Check Nazar's experiences</Button>
                <div className="absolute right-8 bottom-2">
                    Social media icons
                </div>
            </div>
        </div>
    );
}
