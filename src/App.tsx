import React, { ReactNode, useCallback, useEffect } from 'react';

type Command = {
  description: string;
  execute: (args: string[]) => void;
};

const intro = `
   $$$$$\\                               $$$$$$$$\\      ©2024 
   \\__$$ |                              \\____$$  |          
      $$ | $$$$$$\\  $$$$$$$\\  $$\\   $$\\     $$  / $$$$$$$$\\ 
      $$ | \\____$$\\ $$  __$$\\ $$ |  $$ |   $$  /  \\____$$  |
$$\\   $$ | $$$$$$$ |$$ |  $$ |$$ |  $$ |  $$  /     $$$$ _/ 
$$ |  $$ |$$  __$$ |$$ |  $$ |$$ |  $$ | $$  /     $$  _/   
\\$$$$$$  |\\$$$$$$$ |$$ |  $$ |\\$$$$$$  |$$$$$$$$\\ $$$$$$$$\\ 
 \\______/  \\_______|\\__|  \\__| \\______/ \\________|\\________|
                                                            
  Welcome to my website! Type 'help' to see all available commands.
  If you have any questions, feel free to contact me at:
`;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [history, setHistory] = React.useState<ReactNode[]>([]);
  const [current, setCurrent] = React.useState<string>('');
  const prefix = 'JanuZz@github:~$';

  useEffect(() => {
    setHistory([]);
    const lines = intro.split('\n');
    lines.forEach((line, i) => {
      writeRaw(
        <span className='line'>
          <pre>{line}</pre>
        </span>,
      );
    });

    writeRaw(
      <span className='line'>
        {'   - '}
        <a href='mailto: janus.langkilde.pedersen@gmail.com'>Email</a>
      </span>,
    );
    writeRaw(
      <span className='line'>
        {'   - '}
        <a href='https://www.linkedin.com/in/janus-pedersen-25ba49298/'>
          LinkedIn
        </a>
      </span>,
    );
    writeLine(' ');

    inputRef.current?.focus();
  }, []);

  const commands: { [key: string]: Command } = {
    clear: {
      description: 'Clear the terminal screen',
      execute: () => {
        setHistory([]);
      },
    },
    help: {
      description: 'List all available commands',
      execute: () => {
        Object.keys(commands).forEach((command, i) => {
          setTimeout(() => {
            writeLineWithStyle(
              `${command} - ${commands[command].description}`,
              '',
            );
          }, i * 100);
        });
      },
    },
    skills: {
      description: "List some of the things i'm good at",
      execute: () => {
        const skills = [
          'TypeScript',
          'Node.js',
          'React',
          'HTML',
          'CSS',
          'Git',
          'C#',
          'Python',
          'Learning new things ;)',
        ];

        skills.forEach((skill, i) => {
          setTimeout(() => {
            writeLineWithStyle(skill, 'skill');
          }, i * 100);
        });
      },
    },
    whoami: {
      description: 'Display information about me',
      execute: () => {
        writeLine(
          'My name is Janus, im from Denmark and i study Computer Science in school.',
        );

        writeLine(
          "Its my main passion and interest and i've been doing it for as long as i can remember",
        );

        writeLine(
          "I love to learn new things and i'm always looking for new challenges",
        );

        writeLine(
          "I'm currently looking for an internship or job for when im done with school, so if you know of any, please let me know :)",
        );
      },
    },
    projects: {
      description: 'List all my public projects',
      execute: () => {
        const projects = [
          {
            name: 'Codebreaker',
            description:
              'A simple game where you have to hack into other computers and steal their money. Made for a school project.',
            link: 'https://github.com/JanuZz/codebreaker',
          },
          {
            name: 'Archery Scorecard',
            description:
              'A simple scorecard for archery. Keep track of your and your competitors scores',
            link: 'https://januzz.github.io/bueskydning-scorecard/',
          },
          {
            name: 'Grammar Analyzer',
            description:
              'A grammar analyzer made for a school project, works in the same sort of way that a compiler does. Written in TypeScript',
            link: 'https://github.com/JanuZz/GrammarAnalyser',
          },
        ];

        projects.forEach((project, i) => {
          setTimeout(() => {
            writeRaw(
              <span className='line'>
                <span>- </span>
                <a href={project.link}>{project.name}</a>
                <span> - {project.description}</span>
              </span>,
            );
          }, i * 100);
        });
      },
    },
    contact: {
      description: 'Display my contact information',
      execute: () => {
        writeLine('You can contact me at:');
        writeRaw(
          <span className='line'>
            {'   - '}
            <a href='mailto: janus.langkilde.pedersen@gmail.com'>Email</a>
            <span> - janus.langkilde.pedersen@gmail.com</span>
          </span>,
        );
        writeRaw(
          <span className='line'>
            {'   - '}
            <a href='https://www.linkedin.com/in/janus-pedersen-25ba49298/'>
              LinkedIn
            </a>
          </span>,
        );
      },
    },
    github: {
      description: 'Display my github profile',
      execute: () => {
        writeLine('My github profile:');
        writeRaw(
          <span className='line'>
            {'   - '}
            <a href='https://github.com/JanuZz'>januzz.github.io</a>
          </span>,
        );
      },
    },
  };

  const scrollToBottom = useCallback((delay: number = 5) => {
    setTimeout(() => {
      const scrollingElement = document.scrollingElement || document.body;
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, delay);
  }, []);

  const writeRaw = useCallback(
    (line: ReactNode) => {
      setHistory((prev) => [...prev, line]);
      scrollToBottom();
    },
    [setHistory, scrollToBottom],
  );

  const writeLine = useCallback(
    (line: string) => {
      setHistory((prev) => [...prev, line]);
      scrollToBottom();
    },
    [setHistory, scrollToBottom],
  );

  function writeLineWithStyle(line: string, style: string) {
    setHistory((prev) => [
      ...prev,
      <span className={style + ' line'}>{line}</span>,
    ]);
    scrollToBottom();
  }

  function handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      writeRaw(
        <span className='line no-anim'>
          <span className='prefix'>{prefix}</span>
          {current}
        </span>,
      );

      if (current === '') return;

      const args = current.split(' ');
      const command = args[0];
      args.shift();

      const cmd = commands[command];

      if (!cmd) {
        writeLineWithStyle(`Command not found: ${command}`, 'error');
      } else {
        cmd.execute(args);
      }

      setCurrent('');
    }

    scrollToBottom();
  }

  return (
    <div>
      {history.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <span key={index} className={'line'}>
              {item}
            </span>
          );
        } else {
          return item;
        }
      })}

      <span className='prefix'>
        {prefix}
        <input
          ref={inputRef}
          className='input'
          value={current}
          onChange={(event) => setCurrent(event.target.value)}
          onKeyDown={(event) => handleInput(event as any)}
          onBlur={() => inputRef.current?.focus()}
          autoFocus
        />
      </span>
    </div>
  );
}

export default App;
