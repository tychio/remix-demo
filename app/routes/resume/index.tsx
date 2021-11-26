import type { LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
type ResumeData = {
  skills: Array<string>;
};

export const loader: LoaderFunction = () => {
  const data: ResumeData = {
    skills: [
      'JavaScript',
      'CSS/HTML',
      'React',
      'Vue',
      'Angular',
      'NodeJS',
      'Ruby',
      'PHP',
      'Perl',
      'Git',
      'Docker',
      'AWS',
      'Remix'
    ]
  };
  return json(data);
}

export default function ResumeIndex() {
  const resume = useLoaderData<ResumeData>();

  return (
    <div>
      <h1>Zhang Zhengzheng</h1>
      <p>
        A full-stack developer, Senior consultant, Freelancer.
      </p>
      <p>
        {resume.skills.map((skill, index) => (
          <span>{index !== 0 ? ', ' : ''}{skill}</span>
        ))}
      </p>
    </div>
  );
}
