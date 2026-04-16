import type { Company, ProjectDetail, TaskItem } from '@/data/resume';
import { TechTags } from '@/components/TechTags';

type Props = {
  companies: Company[];
};

function renderHighlightedText(text: string) {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);

  return parts.map((part, index) => {
    const isHighlighted = part.startsWith('<strong>') && part.endsWith('</strong>');

    if (!isHighlighted) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <strong key={`${part}-${index}`} className="font-extrabold text-white">
        {part.slice('<strong>'.length, -'</strong>'.length)}
      </strong>
    );
  });
}

function normalizeLegacyHighlight(text: string) {
  // Backward compatibility for existing **text** data.
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function renderSubItem(sub: string) {
  return normalizeLegacyHighlight(sub).split('\n').map((line, index, arr) => (
    <span key={`${line}-${index}`}>
      {renderHighlightedText(line)}
      {index < arr.length - 1 && '\n'}
    </span>
  ));
}

export function ExperienceSection({ companies }: Props) {
  return (
    <div className="space-y-20">
      {companies.map((company) => (
        <CompanyBlock key={company.name} company={company} />
      ))}
    </div>
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <article>
      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <h3 className="text-xl font-bold">{company.name}</h3>
        <span className="text-sm text-foreground">{company.period}</span>
      </div>

      {company.roles.map((role) => (
        <div key={`${role.title}-${role.period}`} className="mt-3 mb-8">
          <h4 className="text-base font-semibold text-foreground">{role.title}</h4>
          <p className="mt-0.5 text-sm text-foreground">{role.period}</p>
        </div>
      ))}

      <div className="space-y-14">
        {company.projects.map((project, projectIndex) => (
          <ProjectBlock
            key={`${company.name}-${project.name ?? 'project'}-${project.period ?? projectIndex}`}
            project={project}
          />
        ))}
      </div>
    </article>
  );
}

function ProjectBlock({ project }: { project: ProjectDetail }) {
  return (
    <div className="border-l-2 border-border pl-6 sm:pl-8">
      <h4 className="text-lg font-semibold">{project.name}</h4>

      {project.period && <p className="mt-1 text-sm text-foreground">{project.period}</p>}

      {project.link && (
        <p className="mt-1 text-sm">
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {project.link.label}
          </a>
        </p>
      )}

      {project.description && (
        <div className="mt-5">
          <h4 className="mb-2 text-lg font-semibold text-foreground">설명</h4>
          {Array.isArray(project.description) ? (
            <div className="space-y-1.5 text-sm leading-relaxed text-foreground">
              {project.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-foreground">{project.description}</p>
          )}
        </div>
      )}

      {project.roles && project.roles.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-lg font-semibold text-foreground">역할</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
            {project.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {project.tasks.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-lg font-semibold text-foreground">업무</h4>
          <ul className="list-disc space-y-6 pl-5 text-sm leading-relaxed text-foreground">
            {project.tasks.map((task, taskIndex) => (
              <TaskItemBlock key={`${task.text}-${taskIndex}`} task={task} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TaskItemBlock({ task }: { task: TaskItem }) {
  return (
    <li>
      <p className="break-keep text-base font-semibold text-foreground">{task.text}</p>
      {task.tech && task.tech.length > 0 && (
        <div className="mt-2">
          <TechTags items={task.tech} />
        </div>
      )}
      {task.subItems && task.subItems.length > 0 && (
        <ul className="mt-1.5 list-[circle] space-y-1 pl-5 text-foreground break-keep">
          {task.subItems.map((sub) => (
            <li key={sub} className="whitespace-pre-line">
              {renderSubItem(sub)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
