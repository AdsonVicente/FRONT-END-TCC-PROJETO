import React from 'react';
import { Link } from 'react-router-dom';

type CardProps = {
  id?: string | number;
  image: string;
  title: string;
  author: string;
  date: string;
  description?: string; // tornando a descrição opcional
  link: string;
};

const Card: React.FC<CardProps> = ({ id, image, title, author, date, description, link }) => {
  return (
    <article className="flex flex-col shadow max-w-[400px] rounded-md overflow-hidden">
      {/* Article Image */}
      <Link to={link} className="hover:opacity-75">
        <img src={image} alt={title} className="object-cover h-60 sm:h-72 md:h-80 w-full" />
      </Link>
      <div className="bg-white flex flex-col justify-start p-6">
        <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{author}</a>
        <h3 className="text-3xl font-bold hover:text-gray-700 pb-4">
          <Link to={link} className="hover:underline">{title}</Link>
        </h3>
        <p className="text-sm pb-3">
          Por <span className="font-semibold hover:text-gray-800">{author}</span>, publicado em {date}
        </p>
        <p className="pb-6">{description || 'Descrição não disponível'}</p>
        <Link to={link} className="uppercase text-gray-800 hover:text-black">
          Continue Lendo
        </Link>
      </div>
    </article>
  );
};

export default Card;
