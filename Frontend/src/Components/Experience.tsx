type ExperienceProps = {
  title: string;
  description: string;
};

export default function Experience({ title, description }: ExperienceProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
