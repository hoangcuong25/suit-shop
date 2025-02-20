"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

interface ZoomImageProps {
    src: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src }) => {
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <div
            className="relative w-full max-w-[600px] h-[400px] xl:h-[500px] overflow-hidden cursor-crosshair"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt="product"
                width={600}
                height={500}
                quality={100}
                className="w-full h-full object-cover"
            />
            {zoom && (
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: "250%",
                        backgroundPosition: `${position.x}% ${position.y}%`,
                    }}
                />
            )}
        </div>
    );
};

interface ProductImagesProps {
    productInfo: {
        image1?: string;
        image2?: string;
    };
}

const ProductImages: React.FC<ProductImagesProps> = ({ productInfo }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center">
            <ZoomImage src={productInfo?.image1 || ""} />
            <ZoomImage src={productInfo?.image2 || ""} />
        </div>
    );
};

export default ProductImages;
