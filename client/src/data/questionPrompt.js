export function getFreelancerQPrompt(
  personalInfo,
  interviewSettings,
  randomNum
) {
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
            ${personalInfo.projects
              .split(";")
              .map((project) => {
                const [title, ...desc] = project.trim().split(":");
                return `
              <Project>
                <Name>${title?.trim()}</Name>
                <Description>${desc.join(":").trim()}</Description>
              </Project>`;
              })
              .join("")}
          </Projects>
          <Bio>${personalInfo.bio}</Bio>
          <Certifications>${personalInfo.certification}</Certifications>
        </Candidate>
      
        <InterviewContext>
          <InterviewType>${interviewSettings.interviewType}</InterviewType>
          <QuestionType>${interviewSettings.questionType}</QuestionType>
          <Difficulty>${interviewSettings.difficulty}</Difficulty>
          <NumQuestions>${interviewSettings.numQuestions}</NumQuestions>
          <MaximumFollowUpQuestions>${
            interviewSettings.maximumFQ
          }</MaximumFollowUpQuestions>
        </InterviewContext>
      
        <Agent>
          <Name>${interviewSettings.selectedAgent.name}</Name>
          <Personality>${
            interviewSettings.selectedAgent.personality
          }</Personality>
        </Agent>
      
        <Instruction>
          Generate ${
            interviewSettings.numQuestions
          } ${interviewSettings.difficulty.toLowerCase()}-level ${
    interviewSettings.questionType.description
  } (${
    interviewSettings.questionType.id
  }) questions appropriate for a mock interview.

          Consider the following:
          - The candidate is applying for the role of "${personalInfo.jobRole}".
          - The context is a "${
            interviewSettings.interviewType
          }" interview (e.g., technical, behavioral, entrepreneurial, etc.).
          - Use broader knowledge of common industry expectations, challenges, and standards for this job role — not just the resume.
          - Optionally reference the candidate’s skills, certifications, projects, and soft skills for added personalization, but do not make it the sole source of context.
          - Reflect the tone and style of the agent’s personality: "${
            interviewSettings.selectedAgent.personality
          }".

          Ensure that:
          - The questions are relevant across professionals in the same job role or field.
          - You do NOT generate follow-up questions.
          - You ONLY respond with a valid JSON array of strings. Example: ["Question 1", "Question 2", ..., "Question N"].
          - No explanation, no extra formatting, just a raw JSON array.
        </Instruction>

        <Randomnum>randomize-${randomNum}</Randomnum>
      </InterviewPrompt>
  `;
}
