// ytcard.tsx or ytcard.js
import React from 'react';

type YtCardProps = {
  videoId: string;
  title: string;
  description: string;
};

const YtCard: React.FC<YtCardProps> = ({ videoId, title, description }) => {
  return (
    <div>
      <iframe
        width="800"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='className="p-2 w-[350px] md:w-[450px] lg:w-[550px] rounded-lg md:p-2"'
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default YtCard;
