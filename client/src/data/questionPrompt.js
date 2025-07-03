export function getFreelancerQPrompt(personalInfo, interviewSettings, randomNum) {
    return `
        <InterviewPrompt>
          <Candidate>
            <FullName>${personalInfo.fullName}</FullName>
            <Email>${personalInfo.email}</Email>
            <Location>${personalInfo.location}</Location>
            <Education>
              <Current>${personalInfo.education}</Current>
            </Education>
            <JobRole>${personalInfo.jobRole}</JobRole>
            <HardSkills>${personalInfo.hardSkills}</HardSkills>
            <SoftSkills>${personalInfo.softSkills}</SoftSkills>
            <Projects>
              ${personalInfo.projects.split(';').map(project => {
        const [title, ...desc] = project.trim().split(':');
        return `
                <Project>
                  <Name>${title?.trim()}</Name>
                  <Description>${desc.join(':').trim()}</Description>
                </Project>`;
    }).join('')}
            </Projects>
            <Bio>${personalInfo.bio}</Bio>
            <Certifications>${personalInfo.certification}</Certifications>
          </Candidate>
        
          <InterviewContext>
            <InterviewType>${interviewSettings.interviewType}</InterviewType>
            <QuestionType>${interviewSettings.questionType}</QuestionType>
            <Difficulty>${interviewSettings.difficulty}</Difficulty>
            <NumQuestions>${interviewSettings.numQuestions}</NumQuestions>
            <MaximumFollowUpQuestions>${interviewSettings.maximumFQ}</MaximumFollowUpQuestions>
          </InterviewContext>
        
          <Agent>
            <Name>${interviewSettings.selectedAgent.name}</Name>
            <Personality>${interviewSettings.selectedAgent.personality}</Personality>
          </Agent>
        
          <Instruction>
              Generate ${interviewSettings.numQuestions} ${interviewSettings.difficulty.toLowerCase()}-level ${interviewSettings.questionType.description} (${interviewSettings.questionType.id}) questions focuses on ${interviewSettings.questionType.focus} for a candidate applying as a ${personalInfo.jobRole}.
              It should also be based generally on ${interviewSettings.interviewType} type questions.
              Tailor the questions to match the agent's personality ("${interviewSettings.selectedAgent.personality}") and include references to the candidate's projects, skills, certification, and soft skills where relevant, but not exclusively focused on the projects.
              Do not include follow-up questions.
              Respond only with a valid JSON array of strings, like: ["Question 1", "Question 2", ..., "Question N"].
            
              You are a highly professional and skilled interviewer, consistently delivering effective interviews for freelancers and recent graduates applying to projects or companies.
            </Instruction>
          
          <Randomnum>randomize-${randomNum}</Randomnum>
        </InterviewPrompt>
        `;
}
