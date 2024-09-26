export function Header({ student, degree, points }: { student: string; degree: string; points: number }) {
    return (
      <header>
        <h1>{student}</h1>
        <p>{degree} {points} points</p>
      </header>
    );
  }