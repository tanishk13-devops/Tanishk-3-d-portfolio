import React from 'react'
import { Mail, Phone, MapPin, ExternalLink, BookOpen, Layers, Trophy, Code, MessageSquare } from 'lucide-react'

const GithubIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const AboutMedia = () => {
  const [hasPhoto, setHasPhoto] = React.useState(true)

  if (hasPhoto) {
    return (
      <img
        src="/about-media.jpg"
        alt="Tanishk Jaiswal"
        onError={() => setHasPhoto(false)}
        className="w-full h-full object-cover object-top rounded-[2rem] relative z-20"
      />
    )
  }

  return (
    <div className="h-full w-full flex items-center justify-center relative z-20">
      <Code className="text-white/20 group-hover:text-white/40 transition-colors duration-500 w-16 h-16" />
    </div>
  )
}

export default function Overlay({ scrollY, scrollProgress }) {
  // Helper to calculate opacity based on scrollProgress ranges
  const getSlideStyle = (start, end, fadeInTime = 0.05, fadeOutTime = 0.05) => {
    let opacity = 0
    let transform = 'translateY(50px)'

    if (scrollProgress >= start && scrollProgress <= end) {
      // Inside active range
      opacity = 1
      transform = 'translateY(0px)'

      // Handle Fade In
      if (scrollProgress < start + fadeInTime) {
        if (start === 0.0) {
          opacity = 1
          transform = 'translateY(0px)'
        } else {
          const factor = (scrollProgress - start) / fadeInTime
          opacity = factor
          transform = `translateY(${50 * (1 - factor)}px)`
        }
      }
      // Handle Fade Out
      else if (scrollProgress > end - fadeOutTime) {
        const factor = (end - scrollProgress) / fadeOutTime
        opacity = factor
        transform = `translateY(${-50 * (1 - factor)}px)`
      }
    }

    return {
      opacity,
      transform,
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ========================================================================= */}
      {/* SCROLLYTELLING HERO SECTION (300vh) */}
      {/* ========================================================================= */}
      <div className="h-[300vh] relative w-full bg-transparent">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-8">
          
          {/* Slide 1: Title & Role */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            style={getSlideStyle(0.0, 0.12, 0.02, 0.04)}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
              Tanishk Jaiswal
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 font-light tracking-wide max-w-lg">
              Full Stack Developer &amp; IT Engineer
            </p>
            <div className="mt-8 text-xs font-mono text-zinc-500 animate-pulse">
              Scroll down to start story
            </div>
          </div>

          {/* Slide 2: Building Core Solutions */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6"
            style={getSlideStyle(0.12, 0.25, 0.04, 0.04)}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
              Building secure full-stack systems and integrated AI solutions
            </h2>
            <p className="text-md md:text-lg mt-6 text-zinc-400 font-mono tracking-widest uppercase">
              // Angular / React / Spring Boot / ASP.NET
            </p>
          </div>

          {/* Slide 3: Introduction */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6"
            style={getSlideStyle(0.25, 0.38, 0.04, 0.04)}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-normal drop-shadow-2xl">
              Final-year B.Tech IT Student
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
              Passionate about building responsive developer analytics dashboards, microservices, and AI tools that process data in under 3 seconds.
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABOUT ME SECTION */}
      {/* ========================================================================= */}
      <section id="about" className="bg-[#121212] pt-36 pb-20 px-8 md:px-16 relative z-20 w-full flex justify-center border-t border-white/5">
        <div className="max-w-7xl w-full flex flex-col md:flex-row gap-16 justify-between items-start">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">About Me</h2>
            <div className="w-20 h-1 bg-white/20 mb-8 rounded-full"></div>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-6">
              I am a dedicated software developer who enjoys building scalable backends, responsive dashboards, and deploying microservices.
            </p>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              My background as an IT student has equipped me to quickly adapt to modern architectural patterns like REST API integrations and containerization. I love linking backend APIs with interactive frontends and AI agents to build complete, functional products.
            </p>
          </div>
          
          <div className="md:w-5/12 hidden md:flex justify-center items-center w-full relative">
            <div className="aspect-square w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10"></div>
              <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent opacity-50 blur-3xl group-hover:opacity-80 transition-opacity duration-1000"></div>
              <AboutMedia />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TECHNICAL ARSENAL (SKILLS) */}
      {/* ========================================================================= */}
      <section id="skills" className="bg-[#121212] py-20 px-8 md:px-16 relative z-20 w-full flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Technical Arsenal</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gray-200 to-gray-600 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Box 1: Languages */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">// Languages</h3>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {['Python', 'Java', 'C#', 'SQL', 'C++', 'JavaScript'].map((lang) => (
                  <span key={lang} className="px-4 py-2 bg-[#1a1a1a] text-gray-300 text-sm rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 2: Frameworks */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">// Web Frameworks</h3>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {['React', 'Angular 17', 'Spring Boot', 'ASP.NET Core 8', 'Node.js', 'Streamlit'].map((fw) => (
                  <span key={fw} className="px-4 py-2 bg-[#1a1a1a] text-gray-300 text-sm rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 3: DevOps & Tools */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">// Tools &amp; Databases</h3>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {['Docker', 'Git / GitHub', 'AWS', 'Swagger', 'JWT', 'SQL Server'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-[#1a1a1a] text-gray-300 text-sm rounded-full border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Box 4: Data & AI */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group lg:col-span-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-semibold text-white mb-6 tracking-wide">// AI &amp; Data Visualization</h3>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {['Gemini API', 'OpenAI API', 'Prompt Engineering', 'Plotly', 'Recharts', 'TailwindCSS'].map((ai) => (
                  <span key={ai} className="px-4 py-2 bg-[#1a1a1a] text-gray-300 text-sm rounded-full border border-white/10 hover:border-purple-500/40 hover:text-purple-300 transition-all duration-300">
                    {ai}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CURATED SELECTED WORK (PROJECTS WITH DESCRIPTION HOVER EFFECT) */}
      {/* ========================================================================= */}
      <section id="work" className="min-h-screen bg-[#121212] pt-32 pb-32 px-8 md:px-16 relative z-20 w-full flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Selected Work
            </h2>
            <p className="text-gray-400 max-w-2xl text-xl font-light leading-relaxed">
              A curated collection of full-stack web applications, analytics dashboards, and REST microservices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Project 1 */}
            <div className="group relative cursor-pointer">
              <a href="https://tanishk2885-ziggy-delivering-happiness.hf.space/" target="_blank" rel="noopener noreferrer" className="block" aria-label="View Ziggy Delivering Happiness">
                <div className="relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] shadow-2xl transition-all duration-700 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.07)]">
                  {/* Glowing background gradient placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-zinc-900/90 to-black/95 z-0" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#121212]/90 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
                      <p className="text-xs text-gray-400 font-mono tracking-[0.2em] mb-3 uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        Full-Stack / MVC
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Ziggy Delivering Happiness
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-gray-300 font-light text-base opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                          A full-stack food delivery app with an Angular 17 interface and ASP.NET Core 8 Web API backend. Features secure JWT role-based access control and containerized deployment via Docker.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 z-20 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out bg-white text-black rounded-full p-4">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>

            {/* Project 2 */}
            <div className="group relative cursor-pointer">
              <a href="https://ai-resume-analyzer-xi-jet.vercel.app" target="_blank" rel="noopener noreferrer" className="block" aria-label="View AI Resume Analyzer">
                <div className="relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] shadow-2xl transition-all duration-700 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.07)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-zinc-900/90 to-black/95 z-0" />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#121212]/90 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
                      <p className="text-xs text-gray-400 font-mono tracking-[0.2em] mb-3 uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        Artificial Intelligence
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        AI Resume Analyzer
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-gray-300 font-light text-base opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                          ATS resume scanner built in Python and Streamlit. Employs Gemini 2.5 and GPT-4 APIs to calculate candidate keyword match scores and generate interactive Plotly gauge analytics.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 z-20 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out bg-white text-black rounded-full p-4">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>

            {/* Project 3 */}
            <div className="group relative cursor-pointer">
              <a href="https://github-profile-visualizer-silk.vercel.app/" target="_blank" rel="noopener noreferrer" className="block" aria-label="View GitHub Profile Visualizer">
                <div className="relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] shadow-2xl transition-all duration-700 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.07)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-zinc-900/90 to-black/95 z-0" />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#121212]/90 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
                      <p className="text-xs text-gray-400 font-mono tracking-[0.2em] mb-3 uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        Data Visualization
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        GitHub Profile Visualizer
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-gray-300 font-light text-base opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                          A responsive web app developed in React 18 and Vite. Connects with GitHub's REST API via Axios to map repository statistics, languages, and commits into interactive Recharts diagrams.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 z-20 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out bg-white text-black rounded-full p-4">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>

            {/* Project 4 */}
            <div className="group relative cursor-pointer">
              <a href="https://retail-analytic-app.onrender.com/" target="_blank" rel="noopener noreferrer" className="block" aria-label="View Retail Analytic App">
                <div className="relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] shadow-2xl transition-all duration-700 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.07)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-zinc-900/90 to-black/95 z-0" />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#121212]/90 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-700 ease-out group-hover:-translate-y-4">
                      <p className="text-xs text-gray-400 font-mono tracking-[0.2em] mb-3 uppercase bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        Full-Stack / Analytics
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Retail Analytic App
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-gray-300 font-light text-base opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                          A premium Sales Analytics &amp; Predictive Forecasting Dashboard built with React (Vite) and Node.js serving Indian Retail Products.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 z-20 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out bg-white text-black rounded-full p-4">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* JOURNEY & ACCOMPLISHMENTS (EXPERIENCE, EDUCATION, ACHIEVEMENTS) */}
      {/* ========================================================================= */}
      <section id="experience" className="bg-[#121212] py-24 px-8 md:px-16 border-t border-white/5 relative z-20 w-full flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Journey &amp; Accomplishments</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
              Professional history, educational timeline, and national accomplishments in tech.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Column 1: Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Layers className="text-blue-400 w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Experience</h3>
              </div>
              <div className="relative pl-8 border-l border-white/10 space-y-10">
                
                {/* Exp 1 */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <h4 className="text-xl font-bold text-gray-200">Project Lead</h4>
                  <p className="text-blue-400 mb-2 font-mono text-sm mt-1">Smart Campus IoT System</p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Led a team of 4 to design and deploy a campus IoT sensor network for environmental telemetries and ingestion REST APIs.
                  </p>
                </div>

                {/* Exp 2 */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-blue-500/40"></div>
                  <h4 className="text-xl font-bold text-gray-200">Team Member</h4>
                  <p className="text-blue-400 mb-2 font-mono text-sm mt-1">Retail Analytic App</p>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Engineered sales analytics dashboards and forecasting services in React and Node, lowering model MAPE error margin by 20%.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <BookOpen className="text-purple-400 w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>
              <div className="relative pl-8 border-l border-white/10 space-y-10">
                
                {/* Edu 1 */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                  <h4 className="text-xl font-bold text-gray-200">B.Tech IT (Grad: 2026)</h4>
                  <p className="text-purple-400 mb-1 font-mono text-sm mt-1">United College of Eng. &amp; Research</p>
                  <p className="text-gray-400 text-xs font-mono">CGPA: 6.5</p>
                </div>

                {/* Edu 2 */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-white/20"></div>
                  <h4 className="text-xl font-bold text-gray-200">Intermediate (CBSE)</h4>
                  <p className="text-gray-400 mb-1 font-mono text-sm mt-1">S.S. Convent School, Prayagraj</p>
                  <p className="text-gray-400 text-xs font-mono">Score: 76%</p>
                </div>

                {/* Edu 3 */}
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-white/20"></div>
                  <h4 className="text-xl font-bold text-gray-200">High School (ICSE)</h4>
                  <p className="text-gray-400 mb-1 font-mono text-sm mt-1">Saint Johns Academy, Prayagraj</p>
                  <p className="text-gray-400 text-xs font-mono">Score: 78%</p>
                </div>
              </div>
            </div>

            {/* Column 3: Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <Trophy className="text-yellow-400 w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-colors duration-300">
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight">Winner, Inter-College Hackathon</h4>
                  <p className="text-gray-400 text-sm font-light">Demonstrated rapid prototyping and team execution in full-stack architecture.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-colors duration-300">
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight">Selected, Smart India Hackathon</h4>
                  <p className="text-gray-400 text-sm font-light">Recognized at a national level for solving software problem statements efficiently.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONTACT SECTION (LET'S TALK) */}
      {/* ========================================================================= */}
      <section id="contact" className="bg-[#0a0a0a] pt-32 pb-20 px-8 md:px-16 border-t border-white/10 relative z-20 w-full flex justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row gap-16 justify-between">
          <div className="md:w-5/12">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
              Let's Talk.
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
              Interested in collaborating, hiring, or simply want to connect? Reach out via email, phone, or connect with me on LinkedIn and GitHub.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:tanishk13.devops@gmail.com" className="group flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Mail className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-lg">tanishk13.devops@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-lg">+91 93363 15832</span>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-lg">Prayagraj, Uttar Pradesh - 211003</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4 mt-8 border-t border-white/10">
              <a href="https://linkedin.com/in/tanishk-jaiswal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors p-2">
                <LinkedinIcon className="w-7 h-7" />
              </a>
              <a href="https://github.com/tanishk13-devops" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2">
                <GithubIcon className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="md:w-6/12 bg-[#121212] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Message</label>
                <textarea placeholder="Tell me about your project..." rows={5} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none" required></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" /> Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="absolute bottom-5 left-0 w-full text-center text-gray-500 text-sm border-t border-white/5 pt-5 mt-16 max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Tanishk Jaiswal. All rights reserved.</p>
        </div>
      </section>

    </div>
  )
}
