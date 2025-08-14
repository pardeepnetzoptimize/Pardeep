import React, { useEffect, useRef, useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const sectionsRef = useRef([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // Header visibility on scroll
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > 100);
    };

    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setActiveSection(entry.target.id);
            // Update body data attribute for dynamic navigation colors
            document.body.setAttribute('data-active-section', entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentSections = sectionsRef.current;
    currentSections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      currentSections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const FloatingCard = ({ children, className, delay = 0 }) => (
    <div className={`floating-card ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );

  const skills = [
    {
      name: 'Manual Testing',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: 'Automation Testing',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 14L20.5 17.5L22 14L20.5 12.5L19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 14L3.5 17.5L5 14L3.5 12.5L2 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: 'Selenium WebDriver',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.5 3.2 14 3.2 13.5 3.5L9.5 5.5C9 5.8 8.5 6.2 8.5 6.8V8L3 11V13L8.5 9.5V19C8.5 19.8 9.2 20.5 10 20.5S11.5 19.8 11.5 19V14L13.5 15V19C13.5 19.8 14.2 20.5 15 20.5S16.5 19.8 16.5 19V13L21 9Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Java',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" fill="currentColor"/>
          <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: 'Bug Reporting',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7C12 5.89543 11.1046 5 10 5C8.89543 5 8 5.89543 8 7V11C8 12.1046 8.89543 13 10 13C11.1046 13 12 12.1046 12 11V7Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 7C16 5.89543 15.1046 5 14 5C12.8954 5 12 5.89543 12 7V11C12 12.1046 12.8954 13 14 13C15.1046 13 16 12.1046 16 11V7Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11C5.89543 11 5 11.8954 5 13V15C5 17.7614 7.23858 20 10 20H14C16.7614 20 19 17.7614 19 15V13C19 11.8954 18.1046 11 17 11" stroke="currentColor" strokeWidth="2"/>
          <path d="M5 13L3 11M19 13L21 11M7 7L4 4M17 7L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: 'Test Case Creation',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: 'Regression Testing',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 7V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: 'API Testing',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: 'Postman',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF6C37" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 0 .211.073l.19-.190-.487-.487v-.517zm1.324.238l1.555 1.555a7.028 7.028 0 0 0 2.97-2.611l-1.777-1.777a.7.7 0 0 0-.998.017l-.1.1-.65.65v2.066z"/>
        </svg>
      )
    },
    {
      name: 'Jira',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#0052CC" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129V13.03A5.218 5.218 0 0 0 18.3 18.245V6.763a1.006 1.006 0 0 0-1.005-1.006zM23.013.592H11.455a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.218 5.215V1.598A1.006 1.006 0 0 0 23.013.592z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#F7DF1E" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    {
      name: 'HTML/CSS',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3L3.5 20.5L12 22L20.5 20.5L22 3H2Z" stroke="#E34F26" strokeWidth="2" fill="#E34F26" fillOpacity="0.1"/>
          <path d="M12 5V20L18 19L19 5H12Z" fill="#E34F26"/>
          <path d="M12 9H16L15.5 13.5L12 14.5V17.5L16.5 16L17 11H12V9Z" fill="white"/>
          <path d="M12 9V11H8L7.5 9H12Z" fill="#E34F26"/>
          <path d="M12 14.5V17.5L7.5 16L8 11H12V14.5Z" fill="#E34F26"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185m-2.993 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185"/>
        </svg>
      )
    },
    {
      name: 'Linux',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 0 1-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 0 1-.004-.021l-.004-.024a1.807 1.807 0 0 1-.15.706.953.953 0 0 1-.213.335.71.71 0 0 1-.088.069c-.014.01-.022.015-.04.021-.04.025-.08.045-.124.06a.879.879 0 0 1-.151.033c-.283.011-.568-.005-.577-.018a17.69 17.69 0 0 1-.265-.55c-.13-.288-.204-.646-.14-.978.055-.334.214-.584.388-.784.146-.16.307-.29.472-.363a.54.54 0 0 1 .295-.046c-.093-.076-.222-.143-.361-.185a.56.56 0 0 0-.421.054.87.87 0 0 0-.308.302.655.655 0 0 0-.17.415c-.048.314.001.631.062.945.058.298.235.469.413.611.136.101.281.154.427.147.87.085 1.758-.064 2.617-.203 1.032-.166 2.033-.318 3.013.19 1.048.54 1.834 1.43 2.185 2.534.363 1.148.315 2.437-.262 3.608-.577 1.17-1.681 2.08-3.065 1.938-.683-.07-1.336-.397-2.04-.427-.699-.03-1.504.282-2.246.334-.743.052-1.522-.105-2.334-.2-.81-.094-1.67-.12-2.4.374-.729.495-1.319 1.44-1.319 2.526 0 1.085.645 2.155 1.432 2.753.787.598 1.843.912 2.924 1.04 1.081.129 2.199.042 3.316-.046 1.116-.088 2.234-.175 3.402-.046 1.168.129 2.388.434 3.692.434 1.303 0 2.697-.305 3.692-1.26.995-.955 1.591-2.659 1.183-4.157-.408-1.498-1.824-2.795-3.416-3.614-1.592-.819-3.362-1.16-5.132-1.024-1.77.135-3.541.646-5.312.646s-3.541-.511-5.312-.646c-1.77-.136-3.54.205-5.132 1.024-1.592.819-3.008 2.116-3.416 3.614-.408 1.498.188 3.202 1.183 4.157.995.955 2.389 1.26 3.692 1.26 1.304 0 2.524-.305 3.692-.434 1.168-.129 2.286-.042 3.402.046 1.117.088 2.235.175 3.316.046 1.081-.128 2.137-.442 2.924-1.04.787-.598 1.432-1.668 1.432-2.753 0-1.085-.59-2.031-1.319-2.526-.73-.494-1.59-.468-2.4-.374-.812.095-1.591.252-2.334.2-.742-.052-1.547-.364-2.246-.334-.704.03-1.357.357-2.04.427-1.384.142-2.488-.768-3.065-1.938-.577-1.17-.625-2.46-.262-3.608.351-1.104 1.137-1.994 2.185-2.534.98-.508 1.981-.356 3.013-.19.859.139 1.747.288 2.617.203.146.007.291-.046.427-.147.178-.142.355-.313.413-.611.061-.314.11-.631.062-.945a.655.655 0 0 0-.17-.415.87.87 0 0 0-.308-.302.56.56 0 0 0-.421-.054c-.139.042-.268.109-.361.185a.54.54 0 0 1 .295.046z"/>
        </svg>
      )
    },
    {
      name: 'TestNG',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" stroke="currentColor" strokeWidth="2" fill="#ED8B00" fillOpacity="0.2"/>
          <path d="M12 8V16M8 10L16 14M16 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: 'Maven',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#C71A36" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="#C71A36" fillOpacity="0.2" stroke="#C71A36" strokeWidth="2"/>
          <path d="M7 9L12 12L17 9M7 15L12 18L17 15" stroke="#C71A36" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#C71A36"/>
        </svg>
      )
    }
  ];

  const experiences = [
    {
      title: 'Product Support & QA Intern',
      company: 'BlueBrick Technologies',
      period: 'Jan 2025 – Apr 2025',
      location: 'Remote',
      description: 'Specialized in quality assurance and product support for enterprise applications.',
      achievements: [
        'Provided Level 1 support for Axiom Protect, handling real-time client issues and escalating critical tickets',
        'Conducted comprehensive QA testing for products including Collabrix, Veri5Now, and EngageBot',
        'Collaborated with DevOps to deploy and monitor services using Docker Compose',
        'Worked with Linux systems, server management, and monitoring tools to ensure system reliability'
      ]
    }
  ];

  const projects = [
    {
      title: 'Veri5 – Digital Identity Verification System',
      description: 'Comprehensive testing of eKYC, OTP authentication, and face verification workflows. Validated API responses for Aadhaar & PAN, and reported UI/UX issues across browsers.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center',
      tech: ['Manual Testing', 'API Testing', 'Jira', 'Cross-browser Testing'],
      link: 'https://github.com'
    },
    {
      title: 'Collabrix – B2B Communication Platform',
      description: 'Tested Partner Onboarding, Workflow Automation, and Document Upload modules. Wrote and executed test cases for e-signing, document preview, and user roles.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&crop=center',
      tech: ['Web App Testing', 'Jira', 'Postman', 'User Acceptance Testing'],
      link: 'https://github.com'
    }
  ];

  const education = [
    {
      institution: 'Universal Group of Institutions',
      degree: 'Bachelor of Technology - B.Tech, Computer Science',
      period: '2021 – 2024',
      grade: 'SGPA: 7.78',
      location: 'Punjab, India',
      description: 'Comprehensive computer science program focusing on software engineering, data structures, algorithms, and emerging technologies.',
      keySubjects: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Management Systems',
        'Computer Networks',
        'Operating Systems',
        'Object-Oriented Programming',
        'Web Technologies',
        'Software Testing & QA'
      ],
      achievements: [
        'Maintained consistent academic performance with SGPA of 7.78',
        'Completed major project on web application development',
        'Participated in technical workshops and coding competitions',
        'Active member of Computer Science Society'
      ],
      relevantCoursework: 'Software Testing methodologies, Quality Assurance principles, Database design, Web development frameworks'
    },
    {
      institution: 'Thapar Polytechnic College',
      degree: 'Diploma in Computer Science Engineering',
      period: '2019 – 2021',
      grade: '64%',
      location: 'Punjab, India',
      description: 'Foundational diploma program covering core computer science concepts, programming languages, and practical application development.',
      keySubjects: [
        'Programming in C/C++',
        'Java Programming',
        'Database Concepts',
        'Computer Hardware',
        'System Analysis & Design',
        'Web Design & Development',
        'Digital Electronics',
        'Computer Networks Basics'
      ],
      achievements: [
        'Successfully completed all core technical subjects',
        'Developed strong foundation in programming languages',
        'Completed practical projects in web development',
        'Gained hands-on experience with database systems'
      ],
      relevantCoursework: 'Introduction to Software Testing, System Design, Database Management, Web Technologies'
    }
  ];

  const internships = [
    {
      title: 'MERN Stack Development Intern',
      company: 'Excellence Technology',
      period: 'Jan 2024 – Jun 2024',
      duration: '6 months',
      location: 'Remote',
      type: 'Full-time Internship',
      description: 'Comprehensive full-stack development training program focusing on MongoDB, Express.js, React.js, and Node.js technologies.',
      responsibilities: [
        'Developed full-stack web applications using MERN stack technologies',
        'Built RESTful APIs with Express.js and integrated with MongoDB databases',
        'Created responsive user interfaces using React.js and modern CSS frameworks',
        'Implemented user authentication and authorization systems',
        'Worked with Git for version control and collaborative development',
        'Participated in code reviews and agile development practices'
      ],
      technologiesUsed: [
        'MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript ES6+', 
        'HTML5/CSS3', 'Bootstrap', 'Git', 'Postman', 'VS Code'
      ],
      keyLearnings: [
        'Full-stack web development lifecycle',
        'Database design and management with MongoDB',
        'Frontend component architecture with React',
        'Backend API development and testing',
        'Version control and team collaboration'
      ],
      projects: [
        'E-commerce web application with user authentication',
        'Task management system with real-time updates',
        'Blog platform with CRUD operations'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Bar Code Developers',
      period: 'Jun 2022 – Aug 2022',
      duration: '1.5 months',
      location: 'On-site',
      type: 'Summer Internship',
      description: 'Intensive web development training focusing on frontend technologies and responsive design principles.',
      responsibilities: [
        'Developed responsive websites using HTML5, CSS3, and JavaScript',
        'Created interactive user interfaces with modern design principles',
        'Implemented mobile-first responsive design approaches',
        'Optimized websites for performance and cross-browser compatibility',
        'Collaborated with senior developers on client projects',
        'Learned best practices for web accessibility and SEO'
      ],
      technologiesUsed: [
        'HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 
        'Sass/SCSS', 'Figma', 'Adobe Photoshop', 'Git'
      ],
      keyLearnings: [
        'Modern web development best practices',
        'Responsive design and mobile-first approach',
        'Cross-browser compatibility testing',
        'UI/UX design principles',
        'Client communication and project management'
      ],
      projects: [
        'Corporate website with responsive design',
        'Portfolio website for local business',
        'Landing page optimization for conversion'
      ]
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Senior QA Lead",
      company: "BlueBrick Technologies",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Pardeep demonstrated exceptional attention to detail during his internship. His ability to identify critical bugs and provide comprehensive test reports was outstanding. A reliable team player who always delivers quality work."
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      company: "Excellence Technology",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b9e0?w=100&h=100&fit=crop&crop=face",
      text: "Working with Pardeep on the MERN stack project was a pleasure. He quickly grasped complex concepts and implemented features efficiently. His testing approach helped us deliver bug-free applications to our clients."
    },
    {
      name: "Amit Kumar",
      role: "Technical Lead",
      company: "Bar Code Developers",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Pardeep's dedication to learning and implementing best practices in web development impressed us all. His responsive designs were pixel-perfect and performed excellently across all devices and browsers."
    },
    {
      name: "Dr. Sanjay Gupta",
      role: "Professor",
      company: "Universal Group of Institutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      text: "Pardeep was one of our most dedicated students in the Computer Science program. His practical approach to problem-solving and consistent academic performance made him stand out among his peers."
    }
  ];

  // Testimonial slider functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus(''), 5000);
      })
      .catch(() => {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 5000);
      });
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className={`portfolio-header ${isHeaderVisible ? 'visible' : ''}`}>
        <div className="header-content">
          <a href="#hero" className="logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <div className="logo-icon">P</div>
            <span>Pardeep</span>
          </a>
          
          <nav>
            {['about', 'testimonials', 'experience', 'projects', 'education', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, `#${section}`)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
          
          <a
            href="#contact"
            className="header-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero" ref={addToRefs}>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              Available for opportunities
            </div>
            
            <h1 className="hero-title">
              Pardeep Sharma
            </h1>
            
            <h2 className="hero-subtitle">
              QA Automation Engineer
            </h2>
            
            <p className="hero-description">
              A motivated and detail-oriented QA professional with a passion for ensuring software quality, 
              identifying issues, and providing excellent user support. Specialized in manual testing, 
              automation, and delivering robust solutions.
            </p>
            
            <div className="hero-actions">
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Get In Touch
                <span>→</span>
              </a>
              <a
                href="#projects"
                className="btn-secondary"
                onClick={(e) => handleNavClick(e, '#projects')}
              >
                View My Work
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEXvT-sbdiUWw/profile-displayphoto-shrink_800_800/B56ZWjuKhoHQAc-/0/1742208543336?e=1758153600&v=beta&t=ubCFzNYEctBlpdeOyfPIxBKaANDICZSW75g2DiF46bE"
                alt="Pardeep Sharma"
                className="hero-image"
              />
            </div>
            
            <FloatingCard className="floating-card-1" delay={0}>
              <div className="card-icon">🧪</div>
              <div className="card-text">Automation</div>
            </FloatingCard>
            
            <FloatingCard className="floating-card-2" delay={2}>
              <div className="card-icon">⚡</div>
              <div className="card-text">API Testing</div>
            </FloatingCard>
            
            <FloatingCard className="floating-card-3" delay={4}>
              <div className="card-icon">🐛</div>
              <div className="card-text">Bug Detection</div>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">Get to know me</div>
          <h2 className="section-title">About Me</h2>
          <p className="section-description">
            Motivated and detail-oriented professional seeking opportunities in Quality Assurance (QA) 
            and Product Support.
          </p>
        </div>

        <div className="card">
          <p>
            I possess a solid foundation in manual testing, test case creation, bug tracking, and basic automation. 
            I am skilled at identifying issues, collaborating with teams, and assisting users through 
            technical troubleshooting.
          </p>
          <br />
          <p>
            My enthusiasm lies in gaining hands-on experience in collaborative environments where I can 
            contribute to building reliable, high-quality software products. With experience across various 
            testing methodologies and tools, I bring a systematic approach to quality assurance while 
            maintaining attention to detail and strong problem-solving capabilities.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">What People Say</div>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-description">
            Feedback from colleagues, mentors, and collaborators
          </p>
        </div>

        <div className="slider-container testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
              style={{ display: index === currentTestimonial ? 'block' : 'none' }}
            >
              <div className="testimonial-content">
                <p className="testimonial-text">
                  {testimonial.text}
                </p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="slider-controls slider-prev" onClick={prevTestimonial}>
            ←
          </button>
          <button className="slider-controls slider-next" onClick={nextTestimonial}>
            →
          </button>
          
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`slider-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">My Journey</div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-description">
            Professional experience in quality assurance and product support
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="card experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                </div>
                <div className="experience-period">
                  {exp.period} • {exp.location}
                </div>
              </div>
              
              <p className="experience-description">{exp.description}</p>
              
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A showcase of testing projects and quality assurance work
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">What I Do</div>
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-description">
            Technologies and methodologies I work with
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">Academic Background</div>
          <h2 className="section-title">Education</h2>
          <p className="section-description">
            My educational journey in computer science and technology
          </p>
        </div>

        <div className="experience-grid">
          {education.map((edu, index) => (
            <div key={index} className="card experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{edu.institution}</h3>
                  <div className="experience-company">{edu.degree}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    {edu.location}
                  </div>
                </div>
                <div className="experience-period">
                  {edu.period} • Grade: {edu.grade}
                </div>
              </div>
              
              <p className="experience-description">{edu.description}</p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Key Subjects
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {edu.keySubjects.map((subject, idx) => (
                    <span key={idx} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Key Achievements
                </h4>
                <ul className="experience-achievements">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Relevant Coursework
                </h4>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {edu.relevantCoursework}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">Learning Experience</div>
          <h2 className="section-title">Internships & Training</h2>
          <p className="section-description">
            Professional development and hands-on learning experiences
          </p>
        </div>

        <div className="experience-grid">
          {internships.map((internship, index) => (
            <div key={index} className="card experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{internship.title}</h3>
                  <div className="experience-company">{internship.company}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    {internship.type} • {internship.location}
                  </div>
                </div>
                <div className="experience-period">
                  {internship.period} • {internship.duration}
                </div>
              </div>
              
              <p className="experience-description">{internship.description}</p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Key Responsibilities
                </h4>
                <ul className="experience-achievements">
                  {internship.responsibilities.slice(0, 3).map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Technologies Used
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {internship.technologiesUsed.slice(0, 6).map((tech, idx) => (
                    <span key={idx} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Key Projects
                </h4>
                <ul className="experience-achievements">
                  {internship.projects.map((project, idx) => (
                    <li key={idx}>{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="content-section" ref={addToRefs}>
        <div className="section-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-description">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-container">
          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                className="form-input form-textarea"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              <span>→</span>
            </button>

            {formStatus === 'success' && (
              <div style={{
                color: 'var(--secondary-color)',
                textAlign: 'center',
                marginTop: 'var(--space-md)',
                padding: 'var(--space-sm)',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {formStatus === 'error' && (
              <div style={{
                color: '#ef4444',
                textAlign: 'center',
                marginTop: 'var(--space-md)',
                padding: 'var(--space-sm)',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                ❌ Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>

          <div className="social-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            
            <a
              href="https://www.linkedin.com/in/pardeep-sharma-19038720a/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">P</div>
              <span>Pardeep</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Navigation</h3>
            <div className="footer-links">
              {['About', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="footer-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pardeep-sharma-19038720a/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a
                href="mailto:pardeepsharma300600@gmail.com"
                className="footer-link"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Pardeep Sharma. All rights reserved. Built with React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
