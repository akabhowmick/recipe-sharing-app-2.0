import React from "react";

type MealPlanCardProps = {
  src: string;
  title: string;
};

const MealPlanCard: React.FC<MealPlanCardProps> = ({ src, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={src} alt={title} className="rounded-lg" width="150" height="150" />
      <p className="mt-2 text-green-500 font-bold">{title}</p>
    </div>
  );
};

export default MealPlanCard;
