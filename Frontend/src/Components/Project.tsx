type ProjectProps = {
  title: string;
};

export default function Project({ title }: ProjectProps) {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
}
